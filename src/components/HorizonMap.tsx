import React from 'react';
import { LEVELS, TOPIC_BY_ID } from '../data/curriculum';
import { ProgressState } from '../types';
import { Icon } from './Icons';
import { sound } from '../lib/sound';

interface HorizonMapProps {
  progress: ProgressState;
  onSelectTopic: (topicId: string) => void;
  onStartGate: (levelId: number) => void;
}

export const HorizonMap: React.FC<HorizonMapProps> = ({
  progress,
  onSelectTopic,
  onStartGate,
}) => {
  const { unlockedLevel, completedTopics, levelScores } = progress;

  // Show all unlocked levels + up to 3 fading fog levels so space goes to active content while horizon visibly fades out
  const visibleLevels = LEVELS.filter((l) => l.id <= unlockedLevel + 3);
  const hiddenCount = Math.max(0, LEVELS.length - visibleLevels.length);

  return (
    <main className="horizon-stage">
      {/* Compact Horizon Track Indicator */}
      <div className="horizon-ribbon" aria-label="Level progression track">
        {LEVELS.map((lvl) => {
          const dist = lvl.id - unlockedLevel;
          const isUnlocked = dist <= 0;
          const passed = Boolean(levelScores[lvl.id]?.passed);
          const opacity = isUnlocked ? 1 : Math.max(0.08, 0.55 - dist * 0.14);
          return (
            <div
              key={lvl.id}
              className={`ribbon-step ${isUnlocked ? 'unlocked' : 'locked'} ${passed ? 'passed' : ''} ${lvl.id === unlockedLevel ? 'current' : ''}`}
              style={{ opacity }}
            >
              <span className="ribbon-num">L{String(lvl.id).padStart(2, '0')}</span>
              <span className="ribbon-dot" />
            </div>
          );
        })}
      </div>

      {/* Full-Viewport Adaptive Level Grid */}
      <div className="levels-grid">
        {visibleLevels.map((lvl) => {
          const dist = lvl.id - unlockedLevel;
          const isUnlocked = dist <= 0;
          const topics = lvl.topicIds.map((id) => TOPIC_BY_ID[id]);
          const doneCount = topics.filter((t) => completedTopics.includes(t.id)).length;
          const allTopicsSeen = doneCount === topics.length;
          const gateScore = levelScores[lvl.id];

          if (!isUnlocked) {
            // Progressive fog-of-war fade out
            const fogOpacity = dist === 1 ? 0.38 : dist === 2 ? 0.16 : 0.06;
            const fogBlur = dist === 1 ? 3.5 : dist === 2 ? 8 : 14;
            return (
              <section
                key={lvl.id}
                className={`level-card fog-level fog-d${dist}`}
                style={{ opacity: fogOpacity }}
                aria-hidden="true"
              >
                <div className="fog-lock-badge">
                  <Icon name="lock" size={16} />
                  <span>Level {String(lvl.id).padStart(2, '0')} Locked</span>
                </div>
                <div className="fog-inner" style={{ filter: `blur(${fogBlur}px)` }}>
                  <div className="level-head">
                    <span className="lvl-tag">LEVEL {String(lvl.id).padStart(2, '0')}</span>
                    <h2>{dist === 1 ? lvl.title : 'Uncharted Horizon'}</h2>
                  </div>
                  <div className="fog-bars">
                    {lvl.topicIds.map((_, idx) => (
                      <div key={idx} className="fog-pill-placeholder" />
                    ))}
                  </div>
                </div>
              </section>
            );
          }

          return (
            <section
              key={lvl.id}
              className={`level-card unlocked ${lvl.id === unlockedLevel ? 'active-frontier' : ''}`}
            >
              <header className="level-head">
                <div className="level-head-top">
                  <span className="lvl-tag">
                    <Icon name={lvl.icon} size={14} />
                    LEVEL {String(lvl.id).padStart(2, '0')}
                  </span>
                  <span className="lvl-progress">
                    {doneCount}/{topics.length} learned
                  </span>
                </div>
                <h2>{lvl.title}</h2>
                <p className="lvl-sub">{lvl.subtitle}</p>
              </header>

              {/* Connected Topic Chain */}
              <div className="topic-chain">
                {topics.map((topic, idx) => {
                  const isDone = completedTopics.includes(topic.id);
                  const resVideos = topic.resources.filter((r) => r.type === 'video').length;
                  const resReads = topic.resources.filter((r) => r.type === 'text').length;

                  return (
                    <button
                      key={topic.id}
                      className={`topic-node ${isDone ? 'done' : ''}`}
                      onClick={() => {
                        sound.tick();
                        onSelectTopic(topic.id);
                      }}
                    >
                      <span className="node-step">{String(idx + 1).padStart(2, '0')}</span>
                      <span className="node-icon">
                        <Icon name={isDone ? 'check' : topic.icon} size={16} />
                      </span>
                      <span className="node-copy">
                        <strong>{topic.friendlyTitle}</strong>
                        <small>
                          #{topic.indexNum} · {topic.subTopics.length} concepts · {resVideos}V {resReads}R
                        </small>
                      </span>
                      <Icon name="arrow-right" size={15} className="node-go" />
                    </button>
                  );
                })}
              </div>

              {/* Unpredictable Random Gate Trial */}
              <footer className="level-gate-bar">
                <button
                  className={`gate-btn ${allTopicsSeen ? 'ready' : ''} ${gateScore?.passed ? 'passed' : ''}`}
                  onClick={() => {
                    sound.tick();
                    onStartGate(lvl.id);
                  }}
                >
                  <Icon name={gateScore?.passed ? 'unlock' : 'shuffle'} size={16} />
                  <span>
                    {gateScore?.passed
                      ? `${lvl.gateTitle} · Best ${gateScore.bestAccuracy}% (Replay)`
                      : `Play ${lvl.gateTitle} -> Unlock L${String(Math.min(10, lvl.id + 1)).padStart(2, '0')}`}
                  </span>
                </button>
              </footer>
            </section>
          );
        })}

        {hiddenCount > 0 && (
          <div className="deep-fog-tail" aria-hidden="true">
            <Icon name="eye-off" size={18} />
            <span>+{hiddenCount} deeper levels hidden beyond the mist</span>
          </div>
        )}
      </div>
    </main>
  );
};
