import { LEVELS } from './levels';
import { TOPICS_L1_3 } from './topicsL1_3';
import { TOPICS_L4_6 } from './topicsL4_6';
import { TOPICS_L7_8 } from './topicsL7_8';
import { TOPICS_L9_10 } from './topicsL9_10';
import { Topic } from '../types';

const RAW_MAP = new Map<string, Topic>(
  [...TOPICS_L1_3, ...TOPICS_L4_6, ...TOPICS_L7_8, ...TOPICS_L9_10].map((t) => [t.id, t])
);

const ORDERED_IDS = LEVELS.flatMap((lvl) => lvl.topicIds);

export const ORDERED_TOPICS: Topic[] = ORDERED_IDS.map((id, idx) => {
  const base = RAW_MAP.get(id);
  if (!base) {
    throw new Error(`Missing topic definition for ${id}`);
  }
  return {
    ...base,
    prevTopicId: idx > 0 ? ORDERED_IDS[idx - 1] : undefined,
    nextTopicId: idx < ORDERED_IDS.length - 1 ? ORDERED_IDS[idx + 1] : undefined,
  };
});

export const TOPIC_BY_ID: Record<string, Topic> = Object.fromEntries(
  ORDERED_TOPICS.map((t) => [t.id, t])
);

export { LEVELS };
