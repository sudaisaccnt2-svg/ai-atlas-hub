import React, { useState, useEffect } from 'react';
import { Topic, ProgressState } from '../types';
import { LEVELS, TOPIC_BY_ID } from '../data/curriculum';
import { Icon } from './Icons';
import { InteractiveSim } from './Simulations';
import { sound } from '../lib/sound';

interface LessonStudioProps {
  topic: Topic;
  progress: ProgressState;
  onBackToMap: () => void;
  onNavigateTopic: (topicId: string) => void;
  onToggleComplete: (topicId: string) => void;
  onMarkSubTopic: (key: string) => void;
  onStartGate: (levelId: number) => void;
}

export const LessonStudio: React.FC<LessonStudioProps> = ({
  topic,
  progress,
  onBackToMap,
  onNavigateTopic,
  onToggleComplete,
  onMarkSubTopic,
  onStartGate,
}) => {
  const [activeBeat, setActiveBeat] = useState(0);
  const [rightTab, setRightTab] = useState<'concepts' | 'resources'>('concepts');
  const [openSubIdx, setOpenSubIdx] = useState<number | null>(0);

  useEffect(() => {
    setActiveBeat(0);
    setOpenSubIdx(0);
  }, [topic.id]);

  const isCompleted = progress.completedTopics.includes(topic.id);
  const currentLevel = LEVELS.find((l) => l.id === topic.levelId)!;
  const isLastInLevel =
    currentLevel.topicIds[currentLevel.topicIds.length - 1] === topic.id;

  const prevTopic = topic.prevTopicId ? TOPIC_BY_ID[topic.prevTopicId] : undefined;
  const nextTopic = topic.nextTopicId ? TOPIC_BY_ID[topic.nextTopicId] : undefined;
  const nextTopicUnlocked = nextTopic ? nextTopic.levelId <= progress.unlockedLevel : false;

  const handleAdvance = () => {
    if (!isCompleted) {
      onToggleComplete(topic.id);
    }
    if (activeBeat < 2) {
      sound.tick();
      setActiveBeat(activeBeat + 1);
      return;
    }
    if (isLastInLevel) {
      sound.tick();
      onStartGate(topic.levelId);
    } else if (nextTopic && nextTopicUnlocked) {
      sound.tick();
      onNavigateTopic(nextTopic.id);
    }
  };

  const videos = topic.resources.filter((r) => r.type === 'video');
  const reads = topic.resources.filter((r) => r.type === 'text');

  return (
    <div className="studio-layout">
      {/* Connected Story Spine Strip */}
      <div className="story-spine-bar">
        <button className="ghost-nav" onClick={onBackToMap}>
          <Icon name="arrow-left" size={15} />
          <span>Map</span>
        </button>

        {prevTopic && (
          <button
            className="bridge-chip"
            onClick={() => onNavigateTopic(prevTopic.id)}
            title={topic.prevBridge}
          >
            <Icon name="branch" size={13} />
            <span className="bridge-text">{topic.prevBridge}</span>
          </button>
        )}

        <div className="spine-spacer" />

        <button
          className={`complete-toggle ${isCompleted ? 'done' : ''}`}
          onClick={() => {
            if (!isCompleted) sound.right(1);
            else sound.tick();
            onToggleComplete(topic.id);
          }}
        >
          <Icon name="check" size={15} />
          <span>{isCompleted ? 'Understood' : 'Mark Understood'}</span>
        </button>
      </div>

      {/* Main Two-Column Full-Space Workspace */}
      <div className="studio-columns">
        {/* LEFT STAGE: Question + Interactive Visual Lab + 3 Linked Beats */}
        <section className="studio-stage">
          <div className="question-header">
            <div className="q-meta">
              <span>LEVEL {String(topic.levelId).padStart(2, '0')}</span>
              <span>·</span>
              <span>INDEX #{topic.indexNum}</span>
              <span>·</span>
              <span>{topic.title}</span>
            </div>
            <h1>{topic.bigQuestion}</h1>
          </div>

          <div className="lab-frame">
            <div className="lab-hint-row">
              <span className="lab-badge">
                <Icon name="sliders" size={13} /> Interactive Lab
              </span>
              <span className="lab-hint">{topic.simHint}</span>
            </div>
            <InteractiveSim
              topic={topic}
              activeBeat={activeBeat}
              onInteract={() => {}}
            />
          </div>

          {/* 3 Connected Beginner Beats */}
          <div className="beats-deck">
            <div className="beat-tabs">
              {topic.beats.map((b, idx) => (
                <button
                  key={b.label}
                  className={`beat-tab ${activeBeat === idx ? 'on' : ''}`}
                  onClick={() => {
                    sound.tick();
                    setActiveBeat(idx);
                  }}
                >
                  <span className="beat-num">{idx + 1}</span>
                  <span>{b.label}</span>
                </button>
              ))}
            </div>

            <div className="beat-card">
              <h2>{topic.beats[activeBeat].headline}</h2>
              <p>{topic.beats[activeBeat].body}</p>

              <div className="beat-footer">
                <span className="next-bridge-line">{topic.nextBridge}</span>
                <button className="primary-step-btn" onClick={handleAdvance}>
                  <span>
                    {activeBeat < 2
                      ? `Step ${activeBeat + 2} of 3`
                      : isLastInLevel
                      ? 'Play Level Gate Trial'
                      : nextTopic && nextTopicUnlocked
                      ? `Next: ${nextTopic.friendlyTitle}`
                      : 'Complete Lesson'}
                  </span>
                  <Icon name="arrow-right" size={15} />
                </button>
              </div>
            </div>
          </div>

          {/* Compact Decision Compass */}
          <div className="decision-strip">
            <div className="dec-cell">
              <span className="dec-tag">Use When</span>
              <p>{topic.useWhen}</p>
            </div>
            <div className="dec-cell">
              <span className="dec-tag">Avoid When</span>
              <p>{topic.avoidWhen}</p>
            </div>
            <div className="dec-cell">
              <span className="dec-tag">Failure Trap</span>
              <p>{topic.watchOut}</p>
            </div>
          </div>
        </section>

        {/* RIGHT DOCK: All Index Sub-Topics + Curated Video & Text Resources */}
        <aside className="studio-dock">
          <div className="dock-tabs">
            <button
              className={rightTab === 'concepts' ? 'on' : ''}
              onClick={() => {
                sound.tick();
                setRightTab('concepts');
              }}
            >
              <Icon name="layers" size={15} />
              <span>Sub-Topics ({topic.subTopics.length})</span>
            </button>
            <button
              className={rightTab === 'resources' ? 'on' : ''}
              onClick={() => {
                sound.tick();
                setRightTab('resources');
              }}
            >
              <Icon name="film" size={15} />
              <span>Watch & Read ({topic.resources.length})</span>
            </button>
          </div>

          {rightTab === 'concepts' ? (
            <div className="dock-scroll">
              {topic.subTopics.map((st, idx) => {
                const subKey = `${topic.id}:${idx}`;
                const seen = progress.exploredSubTopics.includes(subKey);
                const isOpen = openSubIdx === idx;
                return (
                  <div
                    key={st.title}
                    className={`sub-pill-card ${isOpen ? 'open' : ''} ${seen ? 'seen' : ''}`}
                  >
                    <button
                      className="sub-pill-head"
                      onClick={() => {
                        sound.tick();
                        setOpenSubIdx(isOpen ? null : idx);
                        onMarkSubTopic(subKey);
                      }}
                    >
                      <span className="sub-dot" />
                      <strong>{st.title}</strong>
                      <Icon name={isOpen ? 'close' : 'arrow-right'} size={13} />
                    </button>
                    {isOpen && (
                      <div className="sub-pill-body">
                        <p>{st.plain}</p>
                        <div className="sub-example">
                          <span>Real life:</span> {st.example}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="dock-scroll">
              <div className="res-group-label">
                <Icon name="play" size={13} /> Video Explainers ({videos.length})
              </div>
              {videos.map((r) => (
                <a
                  key={r.url + r.title}
                  href={r.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="resource-card"
                  onClick={() => sound.tick()}
                >
                  <div className="res-icon">
                    <Icon name="film" size={17} />
                  </div>
                  <div className="res-info">
                    <strong>{r.title}</strong>
                    <span className="res-meta">
                      {r.source} · {r.duration}
                    </span>
                    <p>{r.why}</p>
                  </div>
                  <Icon name="external" size={14} className="res-ext" />
                </a>
              ))}

              <div className="res-group-label" style={{ marginTop: 14 }}>
                <Icon name="book" size={13} /> Visual & Text Guides ({reads.length})
              </div>
              {reads.map((r) => (
                <a
                  key={r.url + r.title}
                  href={r.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="resource-card"
                  onClick={() => sound.tick()}
                >
                  <div className="res-icon">
                    <Icon name="book" size={17} />
                  </div>
                  <div className="res-info">
                    <strong>{r.title}</strong>
                    <span className="res-meta">
                      {r.source} · {r.duration}
                    </span>
                    <p>{r.why}</p>
                  </div>
                  <Icon name="external" size={14} className="res-ext" />
                </a>
              ))}
            </div>
          )}
        </aside>
      </div>
    </div>
  );
};
