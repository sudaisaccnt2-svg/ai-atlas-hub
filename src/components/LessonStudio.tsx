import React, { useState, useEffect, useCallback } from 'react';
import { Topic, ProgressState } from '../types';
import { LEVELS, TOPIC_BY_ID } from '../data/curriculum';
import { Icon } from './Icons';
import { SceneStage } from './SceneStage';
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
  const [sceneIdx, setSceneIdx] = useState(0);
  const [drawer, setDrawer] = useState<'resources' | 'concepts' | null>(null);
  const [openSubIdx, setOpenSubIdx] = useState<number | null>(0);

  useEffect(() => {
    setSceneIdx(0);
    setDrawer(null);
    setOpenSubIdx(0);
  }, [topic.id]);

  const totalScenes = topic.scenes.length;
  const scene = topic.scenes[sceneIdx] || topic.scenes[0];
  const isFirstScene = sceneIdx === 0;
  const isLastScene = sceneIdx >= totalScenes - 1;

  const isCompleted = progress.completedTopics.includes(topic.id);
  const currentLevel = LEVELS.find((l) => l.id === topic.levelId)!;
  const lessonPosInLevel = currentLevel.topicIds.indexOf(topic.id) + 1;
  const isLastInLevel = lessonPosInLevel === currentLevel.topicIds.length;

  const prevTopic = topic.prevTopicId ? TOPIC_BY_ID[topic.prevTopicId] : undefined;
  const nextTopic = topic.nextTopicId ? TOPIC_BY_ID[topic.nextTopicId] : undefined;
  const nextTopicUnlocked = nextTopic ? nextTopic.levelId <= progress.unlockedLevel : false;

  const handleBack = useCallback(() => {
    if (sceneIdx > 0) {
      sound.tick();
      setSceneIdx((s) => s - 1);
      return;
    }
    if (prevTopic) {
      sound.tick();
      onNavigateTopic(prevTopic.id);
    } else {
      onBackToMap();
    }
  }, [sceneIdx, prevTopic, onNavigateTopic, onBackToMap]);

  const handleNext = useCallback(() => {
    if (!isLastScene) {
      sound.tick();
      setSceneIdx((s) => s + 1);
      return;
    }
    if (!isCompleted) {
      sound.right(1);
      onToggleComplete(topic.id);
    } else {
      sound.tick();
    }
    if (isLastInLevel) {
      onStartGate(topic.levelId);
    } else if (nextTopic && nextTopicUnlocked) {
      onNavigateTopic(nextTopic.id);
    } else {
      onBackToMap();
    }
  }, [
    isLastScene,
    isCompleted,
    onToggleComplete,
    topic.id,
    topic.levelId,
    isLastInLevel,
    onStartGate,
    nextTopic,
    nextTopicUnlocked,
    onNavigateTopic,
    onBackToMap,
  ]);

  // Keyboard Left/Right navigation when no drawer is open
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (drawer) {
        if (e.key === 'Escape') setDrawer(null);
        return;
      }
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handleBack();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [drawer, handleNext, handleBack]);

  const videos = topic.resources.filter((r) => r.type === 'video');
  const reads = topic.resources.filter((r) => r.type === 'text');

  return (
    <div className="lesson-shell">
      {/* Slim Focused Lesson Bar */}
      <header className="lesson-topbar">
        <div className="lesson-topbar-left">
          <button className="ghost-nav" onClick={onBackToMap}>
            <Icon name="arrow-left" size={15} />
            <span>Map</span>
          </button>

          <div className="lesson-crumb">
            <span className="crumb-lvl">
              L{String(topic.levelId).padStart(2, '0')} · Lesson {lessonPosInLevel}/
              {currentLevel.topicIds.length}
            </span>
            <strong className="crumb-title">{topic.friendlyTitle}</strong>
          </div>
        </div>

        {/* Clickable Step Dots */}
        <div className="scene-progress" role="tablist" aria-label="Lesson steps">
          {topic.scenes.map((_, i) => (
            <button
              key={i}
              type="button"
              className={`scene-dot ${i === sceneIdx ? 'active' : i < sceneIdx ? 'past' : ''}`}
              onClick={() => {
                sound.tick();
                setSceneIdx(i);
              }}
              title={`Step ${i + 1} of ${totalScenes}`}
            >
              <span>{i + 1}</span>
            </button>
          ))}
        </div>

        {/* Clean Action Buttons for Videos/Reads & Sub-Topics */}
        <div className="lesson-topbar-right">
          <button
            className={`drawer-trigger ${drawer === 'resources' ? 'on' : ''}`}
            onClick={() => {
              sound.tick();
              setDrawer(drawer === 'resources' ? null : 'resources');
            }}
          >
            <Icon name="film" size={15} />
            <span>Watch & Read ({topic.resources.length})</span>
          </button>

          <button
            className={`drawer-trigger ${drawer === 'concepts' ? 'on' : ''}`}
            onClick={() => {
              sound.tick();
              setDrawer(drawer === 'concepts' ? null : 'concepts');
            }}
          >
            <Icon name="layers" size={15} />
            <span className="hide-sm">All Concepts ({topic.subTopics.length})</span>
          </button>

          <button
            className={`complete-toggle ${isCompleted ? 'done' : ''}`}
            onClick={() => {
              if (!isCompleted) sound.right(1);
              else sound.tick();
              onToggleComplete(topic.id);
            }}
            title="Mark lesson completed"
          >
            <Icon name="check" size={15} />
            <span className="hide-sm">{isCompleted ? 'Done' : 'Mark Done'}</span>
          </button>
        </div>
      </header>

      {/* Single Focused Stage — One Concrete Idea at a Time */}
      <main className="scene-canvas">
        <div className="scene-inner">
          {/* Connected Story Thread + Plain Headline */}
          <div className="scene-intro">
            <div className="scene-bridge-pill">
              <Icon name="branch" size={13} />
              <span>{scene.bridge}</span>
            </div>
            <h1>{scene.headline}</h1>
            <p className="scene-plain">{scene.plainText}</p>
          </div>

          {/* Centerpiece Hands-On Experiment */}
          <SceneStage widget={scene.widget} sceneKey={`${topic.id}-${sceneIdx}`} />

          {/* On Final Step: Direct 1-Click Video & Text Links + Next Bridge */}
          {isLastScene && (
            <section className="end-of-lesson-strip" aria-label="Videos and reading links">
              <div className="eol-head">
                <span>
                  <Icon name="book" size={14} /> Go Deeper on "{topic.friendlyTitle}" (Video &
                  Text)
                </span>
                <span className="eol-next-bridge">{topic.nextLessonBridge}</span>
              </div>
              <div className="eol-links-row">
                {topic.resources.map((r) => (
                  <a
                    key={r.url + r.title}
                    href={r.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="eol-link-chip"
                    onClick={() => sound.tick()}
                  >
                    <Icon name={r.type === 'video' ? 'film' : 'book'} size={15} />
                    <div className="eol-chip-copy">
                      <strong>{r.title}</strong>
                      <span>
                        {r.type === 'video' ? 'Video' : 'Article'} · {r.source} · {r.duration}
                      </span>
                    </div>
                    <Icon name="external" size={13} />
                  </a>
                ))}
              </div>
            </section>
          )}
        </div>
      </main>

      {/* Clean Bottom Step Bar */}
      <footer className="lesson-bottombar">
        <button className="step-back-btn" onClick={handleBack}>
          <Icon name="arrow-left" size={16} />
          <span>
            {!isFirstScene
              ? `Step ${sceneIdx}`
              : prevTopic
              ? `Prev: ${prevTopic.friendlyTitle}`
              : 'Back to Map'}
          </span>
        </button>

        <span className="step-counter-label">
          Step {sceneIdx + 1} of {totalScenes}
        </span>

        <button className="primary-step-btn large" onClick={handleNext}>
          <span>
            {!isLastScene
              ? `Next Step (${sceneIdx + 2}/${totalScenes})`
              : isLastInLevel
              ? `Play ${currentLevel.gateTitle}`
              : nextTopic && nextTopicUnlocked
              ? `Next Lesson: ${nextTopic.friendlyTitle}`
              : 'Complete & Return'}
          </span>
          <Icon name="arrow-right" size={16} />
        </button>
      </footer>

      {/* Slide-Over Sheet for Curated Video/Text Links OR Index Sub-Topics */}
      {drawer && (
        <div className="modal-backdrop" onClick={() => setDrawer(null)}>
          <aside className="side-sheet" onClick={(e) => e.stopPropagation()}>
            <header className="drawer-head">
              <div>
                <h2>
                  {drawer === 'resources'
                    ? 'Watch & Read Materials'
                    : `All ${topic.subTopics.length} Sub-Topics Covered`}
                </h2>
                <span className="drawer-sub">
                  Index #{topic.indexNum} · {topic.title}
                </span>
              </div>
              <button
                className="icon-btn"
                onClick={() => setDrawer(null)}
                aria-label="Close panel"
              >
                <Icon name="close" size={18} />
              </button>
            </header>

            {drawer === 'resources' ? (
              <div className="sheet-scroll">
                <div className="res-group-label">
                  <Icon name="film" size={14} /> Video Explainers ({videos.length})
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
                      <Icon name="film" size={18} />
                    </div>
                    <div className="res-info">
                      <strong>{r.title}</strong>
                      <span className="res-meta">
                        {r.source} · {r.duration}
                      </span>
                      <p>{r.why}</p>
                    </div>
                    <Icon name="external" size={15} className="res-ext" />
                  </a>
                ))}

                <div className="res-group-label" style={{ marginTop: 14 }}>
                  <Icon name="book" size={14} /> Visual & Text Guides ({reads.length})
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
                      <Icon name="book" size={18} />
                    </div>
                    <div className="res-info">
                      <strong>{r.title}</strong>
                      <span className="res-meta">
                        {r.source} · {r.duration}
                      </span>
                      <p>{r.why}</p>
                    </div>
                    <Icon name="external" size={15} className="res-ext" />
                  </a>
                ))}
              </div>
            ) : (
              <div className="sheet-scroll">
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
                        <Icon name={isOpen ? 'close' : 'arrow-right'} size={14} />
                      </button>
                      {isOpen && (
                        <div className="sub-pill-body">
                          <p>{st.plain}</p>
                          <div className="sub-example">
                            <span>Everyday example:</span> {st.example}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </aside>
        </div>
      )}
    </div>
  );
};
