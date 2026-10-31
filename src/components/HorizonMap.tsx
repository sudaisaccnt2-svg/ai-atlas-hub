import React, { useState, useEffect } from 'react';
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
  const [selectedLevelId, setSelectedLevelId] = useState<number>(unlockedLevel);

  // Automatically focus newly unlocked level when unlockedLevel increases
  useEffect(() => {
    setSelectedLevelId(unlockedLevel);
  }, [unlockedLevel]);

  const activeLevel = LEVELS.find((l) => l.id === selectedLevelId) || LEVELS[0];
  const activeTopics = activeLevel.topicIds.map((id) => TOPIC_BY_ID[id]);
  const doneInActive = activeTopics.filter((t) => completedTopics.includes(t.id)).length;
  const allTopicsDone = doneInActive === activeTopics.length;
  const activeGateScore = levelScores[activeLevel.id];

  // Next 2 locked levels shown as a subtle fading horizon below
  const fogTeasers = LEVELS.filter(
    (l) => l.id > unlockedLevel && l.id <= unlockedLevel + 2
  );
  const deeperHiddenCount = Math.max(0, LEVELS.length - (unlockedLevel + 2));

  // Find first unfinished topic in active level for quick "Continue" highlight
  const nextSuggestedTopic =
    activeTopics.find((t) => !completedTopics.includes(t.id)) || activeTopics[0];

  return (
    <main className="horizon-stage">
      {/* 10-Level Fading Horizon Track */}
      <nav className="horizon-ribbon" aria-label="10-Level Learning Path">
        {LEVELS.map((lvl) => {
          const dist = lvl.id - unlockedLevel;
          const isUnlocked = dist <= 0;
          const passed = Boolean(levelScores[lvl.id]?.passed);
          const isViewing = lvl.id === activeLevel.id;
          // Progressive fog fade for locked levels
          const opacity = isUnlocked ? 1 : Math.max(0.1, 0.62 - dist * 0.13);

          return (
            <button
              key={lvl.id}
              type="button"
              disabled={!isUnlocked}
              onClick={() => {
                if (!isUnlocked) return;
                sound.tick();
                setSelectedLevelId(lvl.id);
              }}
              className={`ribbon-step ${isUnlocked ? 'unlocked' : 'locked'} ${
                passed ? 'passed' : ''
              } ${isViewing ? 'current' : ''}`}
              style={{ opacity }}
              title={
                isUnlocked
                  ? `Level ${lvl.id}: ${lvl.title}`
                  : `Locked — Pass Level ${unlockedLevel} Trial to clear the fog`
              }
            >
              <span className="ribbon-top">
                <span className="ribbon-num">LEVEL {String(lvl.id).padStart(2, '0')}</span>
                <Icon
                  name={passed ? 'check' : isUnlocked ? lvl.icon : 'lock'}
                  size={13}
                />
              </span>
              <span className="ribbon-title">
                {isUnlocked ? lvl.title : dist === 1 ? lvl.title : 'Hidden in Mist'}
              </span>
            </button>
          );
        })}
      </nav>

      {/* Main Active Level Workspace — Uses Full Space Cleanly */}
      <section className="active-level-board">
        <header className="board-header">
          <div className="board-title-group">
            <div className="board-kicker">
              <Icon name={activeLevel.icon} size={15} />
              <span>LEVEL {String(activeLevel.id).padStart(2, '0')} OF 10</span>
              <span className="dot-sep">·</span>
              <span>
                {doneInActive} of {activeTopics.length} lessons completed
              </span>
            </div>
            <h1>{activeLevel.title}</h1>
            <p className="board-subtitle">{activeLevel.subtitle}</p>
          </div>

          {/* Unpredictable Random Gate Trial Action Card */}
          <div className={`gate-callout ${allTopicsDone ? 'ready' : ''}`}>
            <div className="gate-callout-copy">
              <span className="gate-kicker">
                <Icon name="shuffle" size={13} /> Unpredictable Test Game
              </span>
              <strong>{activeLevel.gateTitle}</strong>
              <span>
                {activeGateScore?.passed
                  ? `Passed (Best: ${activeGateScore.bestAccuracy}%) · Every replay shuffles new scenarios`
                  : activeLevel.id < 10
                  ? `Score 80%+ on 6 random rounds to unlock Level ${String(
                      activeLevel.id + 1
                    ).padStart(2, '0')}`
                  : 'Score 80%+ on 6 random rounds to complete AI Atlas'}
              </span>
            </div>
            <button
              className={`gate-launch-btn ${allTopicsDone ? 'ready' : ''}`}
              onClick={() => {
                sound.tick();
                onStartGate(activeLevel.id);
              }}
            >
              <Icon name={activeGateScore?.passed ? 'refresh' : 'play'} size={15} />
              <span>{activeGateScore?.passed ? 'Play Again' : 'Start Trial'}</span>
            </button>
          </div>
        </header>

        {/* Spacious Connected Lesson Cards */}
        <div className="lesson-cards-grid">
          {activeTopics.map((topic, idx) => {
            const isDone = completedTopics.includes(topic.id);
            const isUpNext = !isDone && topic.id === nextSuggestedTopic?.id;
            const videoCount = topic.resources.filter((r) => r.type === 'video').length;
            const textCount = topic.resources.filter((r) => r.type === 'text').length;

            return (
              <button
                key={topic.id}
                className={`lesson-card ${isDone ? 'done' : ''} ${
                  isUpNext ? 'up-next' : ''
                }`}
                onClick={() => {
                  sound.tick();
                  onSelectTopic(topic.id);
                }}
              >
                <div className="lesson-card-top">
                  <span className="lesson-step-pill">
                    Lesson {idx + 1} of {activeTopics.length}
                  </span>
                  {isDone ? (
                    <span className="status-tag done">
                      <Icon name="check" size={13} /> Done
                    </span>
                  ) : isUpNext ? (
                    <span className="status-tag next">Start Here</span>
                  ) : null}
                </div>

                <div className="lesson-card-main">
                  <div className="lesson-title-row">
                    <span className="lesson-icon-box">
                      <Icon name={topic.icon} size={18} />
                    </span>
                    <h2>{topic.friendlyTitle}</h2>
                  </div>
                  <p className="lesson-question">{topic.summaryQuestion}</p>
                </div>

                <div className="lesson-card-foot">
                  <span className="lesson-meta">
                    {topic.scenes.length} interactive steps · {videoCount} video, {textCount}{' '}
                    read
                  </span>
                  <span className="lesson-open-cta">
                    <span>{isDone ? 'Review' : 'Open'}</span>
                    <Icon name="arrow-right" size={15} />
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* Progressive Fog-of-War Horizon Strip (Compact, Zero Wasted Space) */}
      {fogTeasers.length > 0 && (
        <section className="fog-horizon-strip" aria-label="Locked future levels">
          {fogTeasers.map((lvl) => {
            const dist = lvl.id - unlockedLevel;
            const blurPx = dist === 1 ? 3 : 7;
            const cardOpacity = dist === 1 ? 0.56 : 0.26;
            return (
              <div
                key={lvl.id}
                className="fog-teaser-card"
                style={{ opacity: cardOpacity }}
              >
                <div className="fog-badge">
                  <Icon name="lock" size={14} />
                  <span>
                    LEVEL {String(lvl.id).padStart(2, '0')} · Pass Level{' '}
                    {String(unlockedLevel).padStart(2, '0')} Trial to reveal
                  </span>
                </div>
                <div className="fog-blurred-preview" style={{ filter: `blur(${blurPx}px)` }}>
                  <strong>{lvl.title}</strong>
                  <p>{lvl.subtitle}</p>
                </div>
              </div>
            );
          })}

          {deeperHiddenCount > 0 && (
            <div className="fog-deep-note">
              <Icon name="eye-off" size={16} />
              <span>+{deeperHiddenCount} deeper levels fade out beyond the mist</span>
            </div>
          )}
        </section>
      )}
    </main>
  );
};
