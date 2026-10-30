import React, { useState, useMemo } from 'react';
import { ORDERED_TOPICS } from '../data/curriculum';
import { Icon } from './Icons';
import { sound } from '../lib/sound';

interface ResourceHubDrawerProps {
  unlockedLevel: number;
  onClose: () => void;
  onOpenTopic: (topicId: string) => void;
}

export const ResourceHubDrawer: React.FC<ResourceHubDrawerProps> = ({
  unlockedLevel,
  onClose,
  onOpenTopic,
}) => {
  const [filterType, setFilterType] = useState<'all' | 'video' | 'text'>('all');
  const [query, setQuery] = useState('');

  // Strictly respect fog-of-war: only surface resources from unlocked levels!
  const unlockedTopics = useMemo(
    () => ORDERED_TOPICS.filter((t) => t.levelId <= unlockedLevel),
    [unlockedLevel]
  );

  const items = useMemo(() => {
    const q = query.trim().toLowerCase();
    return unlockedTopics.flatMap((topic) =>
      topic.resources
        .filter((r) => filterType === 'all' || r.type === filterType)
        .filter(
          (r) =>
            !q ||
            r.title.toLowerCase().includes(q) ||
            r.source.toLowerCase().includes(q) ||
            topic.friendlyTitle.toLowerCase().includes(q)
        )
        .map((r) => ({ ...r, topic }))
    );
  }, [unlockedTopics, filterType, query]);

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <aside className="hub-drawer" onClick={(e) => e.stopPropagation()}>
        <header className="drawer-head">
          <div>
            <h2>Learning Materials Hub</h2>
            <span className="drawer-sub">
              Showing {items.length} curated links across Levels 01–{String(unlockedLevel).padStart(2, '0')}
            </span>
          </div>
          <button className="icon-btn" onClick={onClose} aria-label="Close library">
            <Icon name="close" size={18} />
          </button>
        </header>

        <div className="drawer-controls">
          <div className="search-input-wrap">
            <Icon name="search" size={15} />
            <input
              type="text"
              placeholder="Search videos, guides, creators, or topics..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <div className="seg-group">
            <button
              className={filterType === 'all' ? 'on' : ''}
              onClick={() => {
                sound.tick();
                setFilterType('all');
              }}
            >
              All
            </button>
            <button
              className={filterType === 'video' ? 'on' : ''}
              onClick={() => {
                sound.tick();
                setFilterType('video');
              }}
            >
              Videos
            </button>
            <button
              className={filterType === 'text' ? 'on' : ''}
              onClick={() => {
                sound.tick();
                setFilterType('text');
              }}
            >
              Text & Interactive
            </button>
          </div>
        </div>

        <div className="drawer-list">
          {items.map((item, idx) => (
            <div key={item.url + idx} className="hub-item-card">
              <div className="res-icon">
                <Icon name={item.type === 'video' ? 'film' : 'book'} size={17} />
              </div>
              <div className="hub-item-body">
                <div className="hub-item-top">
                  <button
                    className="topic-jump-tag"
                    onClick={() => {
                      sound.tick();
                      onOpenTopic(item.topic.id);
                      onClose();
                    }}
                  >
                    L{String(item.topic.levelId).padStart(2, '0')} · {item.topic.friendlyTitle}
                  </button>
                  <span className="res-meta">
                    {item.source} · {item.duration}
                  </span>
                </div>
                <a href={item.url} target="_blank" rel="noopener noreferrer" className="hub-link-title">
                  <strong>{item.title}</strong>
                  <Icon name="external" size={14} />
                </a>
                <p>{item.why}</p>
              </div>
            </div>
          ))}
        </div>
      </aside>
    </div>
  );
};
