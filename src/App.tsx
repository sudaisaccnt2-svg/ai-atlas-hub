import React, { useState, useEffect, useCallback } from 'react';
import { ProgressState } from './types';
import { ORDERED_TOPICS, TOPIC_BY_ID } from './data/curriculum';
import {
  loadLocalProgress,
  saveLocalProgress,
  getSupabaseConfig,
  pushProgressToSupabase,
  pullProgressFromSupabase,
  mergeProgress,
  SyncConnectionStatus,
} from './lib/supabaseSync';
import { sound } from './lib/sound';
import { Icon } from './components/Icons';
import { HorizonMap } from './components/HorizonMap';
import { LessonStudio } from './components/LessonStudio';
import { GateGameModal } from './components/GateGameModal';
import { ResourceHubDrawer } from './components/ResourceHubDrawer';
import { SyncModal } from './components/SyncModal';

export const App: React.FC = () => {
  const [progress, setProgress] = useState<ProgressState>(() => loadLocalProgress());
  const [activeTopicId, setActiveTopicId] = useState<string | null>(null);
  const [activeGateLevel, setActiveGateLevel] = useState<number | null>(null);
  const [showHub, setShowHub] = useState(false);
  const [showSync, setShowSync] = useState(false);

  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    try {
      return localStorage.getItem('ai_atlas_theme') === 'light' ? 'light' : 'dark';
    } catch {
      return 'dark';
    }
  });

  const [soundOn, setSoundOn] = useState<boolean>(() => sound.isEnabled());
  const [isOnline, setIsOnline] = useState<boolean>(() =>
    typeof navigator !== 'undefined' ? navigator.onLine : true
  );
  const [syncStatus, setSyncStatus] = useState<SyncConnectionStatus>(() => {
    if (typeof navigator !== 'undefined' && !navigator.onLine) return 'offline';
    return getSupabaseConfig() ? 'syncing' : 'local-only';
  });

  // Apply theme attribute
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    try {
      localStorage.setItem('ai_atlas_theme', theme);
    } catch {
      // ignore
    }
  }, [theme]);

  // Synchronize actual hardware/network online state
  useEffect(() => {
    const onOnline = () => {
      setIsOnline(true);
      setSyncStatus(getSupabaseConfig() ? 'syncing' : 'local-only');
    };
    const onOffline = () => {
      setIsOnline(false);
      setSyncStatus('offline');
    };
    window.addEventListener('online', onOnline);
    window.addEventListener('offline', onOffline);
    return () => {
      window.removeEventListener('online', onOnline);
      window.removeEventListener('offline', onOffline);
    };
  }, []);

  // Support hash URL navigation (#topic=t01) while respecting locked levels
  useEffect(() => {
    const readHash = () => {
      const m = window.location.hash.match(/topic=(t\d+)/);
      if (m && TOPIC_BY_ID[m[1]] && TOPIC_BY_ID[m[1]].levelId <= progress.unlockedLevel) {
        setActiveTopicId(m[1]);
      } else if (!window.location.hash) {
        setActiveTopicId(null);
      }
    };
    readHash();
    window.addEventListener('hashchange', readHash);
    return () => window.removeEventListener('hashchange', readHash);
  }, [progress.unlockedLevel]);

  const syncWithCloud = useCallback(async (current: ProgressState) => {
    if (!navigator.onLine) {
      setSyncStatus('offline');
      return;
    }
    if (!getSupabaseConfig()) {
      setSyncStatus('local-only');
      return;
    }
    setSyncStatus('syncing');
    try {
      const remote = await pullProgressFromSupabase(current.learnerKey);
      const merged = remote ? mergeProgress(current, remote) : current;
      saveLocalProgress(merged);
      setProgress(merged);
      const ok = await pushProgressToSupabase(merged);
      setSyncStatus(ok ? 'cloud-synced' : 'cloud-error');
    } catch {
      setSyncStatus('cloud-error');
    }
  }, []);

  useEffect(() => {
    syncWithCloud(progress);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOnline]);

  const commitProgress = (updater: (prev: ProgressState) => ProgressState) => {
    setProgress((prev) => {
      const next = { ...updater(prev), updatedAt: Date.now() };
      saveLocalProgress(next);
      if (navigator.onLine && getSupabaseConfig()) {
        setSyncStatus('syncing');
        pushProgressToSupabase(next)
          .then((ok) => setSyncStatus(ok ? 'cloud-synced' : 'cloud-error'))
          .catch(() => setSyncStatus('cloud-error'));
      }
      return next;
    });
  };

  const openTopic = (topicId: string) => {
    const t = TOPIC_BY_ID[topicId];
    if (!t || t.levelId > progress.unlockedLevel) return;
    setActiveTopicId(topicId);
    window.location.hash = `topic=${topicId}`;
    commitProgress((p) => ({ ...p, lastActiveTopicId: topicId }));
  };

  const closeTopicToMap = () => {
    sound.tick();
    setActiveTopicId(null);
    if (window.location.hash) {
      history.pushState('', document.title, window.location.pathname + window.location.search);
    }
  };

  const handleToggleComplete = (topicId: string) => {
    commitProgress((p) => {
      const exists = p.completedTopics.includes(topicId);
      return {
        ...p,
        completedTopics: exists
          ? p.completedTopics.filter((id) => id !== topicId)
          : [...p.completedTopics, topicId],
      };
    });
  };

  const handleMarkSubTopic = (subKey: string) => {
    commitProgress((p) =>
      p.exploredSubTopics.includes(subKey)
        ? p
        : { ...p, exploredSubTopics: [...p.exploredSubTopics, subKey] }
    );
  };

  const handleGateFinished = (
    levelId: number,
    accuracy: number,
    passed: boolean,
    bestStreak: number
  ) => {
    commitProgress((p) => {
      const prevScore = p.levelScores[levelId];
      const nextUnlocked =
        passed && levelId >= p.unlockedLevel
          ? Math.min(10, levelId + 1)
          : p.unlockedLevel;
      return {
        ...p,
        unlockedLevel: nextUnlocked,
        levelScores: {
          ...p.levelScores,
          [levelId]: {
            bestAccuracy: Math.max(prevScore?.bestAccuracy || 0, accuracy),
            attempts: (prevScore?.attempts || 0) + 1,
            passed: Boolean(prevScore?.passed || passed),
            bestStreak: Math.max(prevScore?.bestStreak || 0, bestStreak),
          },
        },
      };
    });
  };

  const activeTopic = activeTopicId ? TOPIC_BY_ID[activeTopicId] : null;
  const resumeTopic =
    progress.lastActiveTopicId &&
    TOPIC_BY_ID[progress.lastActiveTopicId] &&
    TOPIC_BY_ID[progress.lastActiveTopicId].levelId <= progress.unlockedLevel
      ? TOPIC_BY_ID[progress.lastActiveTopicId]
      : null;

  const syncLabel =
    syncStatus === 'offline'
      ? 'Offline · Saved'
      : syncStatus === 'cloud-synced'
      ? 'Cloud Synced'
      : syncStatus === 'syncing'
      ? 'Syncing...'
      : syncStatus === 'cloud-error'
      ? 'Sync Check'
      : 'Local Saved';

  return (
    <div className="app-viewport">
      {/* Ultra-slim Minimal Top Bar */}
      <header className="top-bar">
        <button className="brand-btn" onClick={closeTopicToMap}>
          <Icon name="compass" size={18} />
          <span className="brand-name">AI ATLAS</span>
        </button>

        <div className="top-stats">
          <span className="stat-chip">
            Levels <strong>{progress.unlockedLevel}/10</strong>
          </span>
          <span className="stat-chip">
            Topics <strong>{progress.completedTopics.length}/{ORDERED_TOPICS.length}</strong>
          </span>
          {!activeTopic && resumeTopic && (
            <button
              className="resume-pill"
              onClick={() => {
                sound.tick();
                openTopic(resumeTopic.id);
              }}
            >
              <Icon name="play" size={12} />
              <span>Resume: {resumeTopic.friendlyTitle}</span>
            </button>
          )}
        </div>

        <div className="top-actions">
          <button
            className="bar-pill"
            onClick={() => {
              sound.tick();
              setShowHub(true);
            }}
            title="All unlocked videos & guides"
          >
            <Icon name="book" size={15} />
            <span className="hide-sm">Library</span>
          </button>

          <button
            className={`bar-pill sync-pill ${syncStatus}`}
            onClick={() => {
              sound.tick();
              setShowSync(true);
            }}
            title="Cloud & device progress sync"
          >
            <Icon name={isOnline ? 'cloud' : 'cloud-off'} size={15} />
            <span className="hide-sm">{syncLabel}</span>
          </button>

          <button
            className="icon-btn"
            onClick={() => setSoundOn(sound.setEnabled(!soundOn))}
            aria-label={soundOn ? 'Mute sound effects' : 'Enable sound effects'}
            title={soundOn ? 'Sound: ON' : 'Sound: Muted'}
          >
            <Icon name={soundOn ? 'volume-on' : 'volume-off'} size={16} />
          </button>

          <button
            className="icon-btn"
            onClick={() => {
              sound.tick();
              setTheme(theme === 'dark' ? 'light' : 'dark');
            }}
            aria-label="Toggle theme"
            title={theme === 'dark' ? 'Switch to Light Paper' : 'Switch to Dark Studio'}
          >
            <Icon name={theme === 'dark' ? 'sun' : 'moon'} size={16} />
          </button>
        </div>
      </header>

      {/* Main Content Area: Full-Bleed Map or Full-Screen Connected Lesson */}
      {activeTopic ? (
        <LessonStudio
          topic={activeTopic}
          progress={progress}
          onBackToMap={closeTopicToMap}
          onNavigateTopic={openTopic}
          onToggleComplete={handleToggleComplete}
          onMarkSubTopic={handleMarkSubTopic}
          onStartGate={(lvlId) => setActiveGateLevel(lvlId)}
        />
      ) : (
        <HorizonMap
          progress={progress}
          onSelectTopic={openTopic}
          onStartGate={(lvlId) => setActiveGateLevel(lvlId)}
        />
      )}

      {/* Unpredictable Random Gate Trial Modal */}
      {activeGateLevel !== null && (
        <GateGameModal
          levelId={activeGateLevel}
          onClose={() => setActiveGateLevel(null)}
          onFinishSession={handleGateFinished}
        />
      )}

      {/* Global Unlocked Materials Drawer */}
      {showHub && (
        <ResourceHubDrawer
          unlockedLevel={progress.unlockedLevel}
          onClose={() => setShowHub(false)}
          onOpenTopic={openTopic}
        />
      )}

      {/* Supabase & Portable Backup Sync Modal */}
      {showSync && (
        <SyncModal
          progress={progress}
          syncStatus={syncStatus}
          isOnline={isOnline}
          onClose={() => setShowSync(false)}
          onUpdateLearnerKey={(newKey) => {
            const updated = { ...progress, learnerKey: newKey, updatedAt: Date.now() };
            saveLocalProgress(updated);
            setProgress(updated);
            syncWithCloud(updated);
          }}
          onImportProgress={(imported) => {
            commitProgress((prev) => mergeProgress(prev, imported));
          }}
          onReconnectSupabase={() => syncWithCloud(progress)}
        />
      )}
    </div>
  );
};
