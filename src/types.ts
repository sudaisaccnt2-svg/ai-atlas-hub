export type SimKind =
  | 'scope-onion'
  | 'system-anatomy'
  | 'problem-framer'
  | 'vector-space'
  | 'data-pipeline'
  | 'learning-signal'
  | 'decision-boundary'
  | 'neural-net'
  | 'token-attention'
  | 'adaptation-dial'
  | 'diffusion-vision'
  | 'agent-loop'
  | 'rl-grid'
  | 'compression-ops'
  | 'causality-eval';

export interface SubTopicItem {
  title: string;
  plain: string;      // 1 crisp beginner sentence
  example: string;    // Concrete everyday example
}

export interface LearningResource {
  title: string;
  type: 'video' | 'text';
  source: string;     // e.g. "3Blue1Brown", "StatQuest", "Jay Alammar"
  duration: string;   // e.g. "19m video" or "8m visual read"
  url: string;
  why: string;        // 6-10 word reason why this helps a beginner
}

export interface LessonBeat {
  label: string;      // Short badge e.g. "Everyday Hook", "Inside It", "Decision Rule"
  headline: string;   // Crisp <= 10 words
  body: string;       // Plain beginner sentence <= 24 words
  simPreset?: number; // Automatically nudges the interactive visual to match this beat
}

export interface Topic {
  id: string;               // e.g. "t01"
  indexNum: number;         // 1..40 matching AI_Detailed_Topic_Index.md
  levelId: number;          // 1..10
  orderInLevel: number;     // 1..N within level
  title: string;            // Original index section title
  friendlyTitle: string;    // Immediate plain-English title
  icon: string;             // Key in Icons.tsx
  prevTopicId?: string;
  nextTopicId?: string;
  prevBridge: string;       // Connects directly from the previous lesson
  bigQuestion: string;      // The ONE core question on screen
  nextBridge: string;       // Leads curiosity into the next lesson
  simKind: SimKind;
  simHint: string;          // Short 5-8 word prompt for interacting with the lab
  beats: [LessonBeat, LessonBeat, LessonBeat];
  useWhen: string;
  avoidWhen: string;
  watchOut: string;
  subTopics: SubTopicItem[];
  resources: LearningResource[];
}

export interface LevelDef {
  id: number;               // 1..10
  title: string;
  subtitle: string;         // <= 9 words
  icon: string;
  topicIds: string[];       // Ordered list of Topic IDs in this level
  gateTitle: string;
}

export type GameMechanic = 'SORT' | 'PIPELINE' | 'DETECTIVE' | 'TUNER' | 'DECISION';

export interface SortChallenge {
  id: string;
  levelId: number;
  mechanic: 'SORT';
  prompt: string;
  buckets: [string, string] | [string, string, string];
  items: { label: string; bucketIndex: number; why: string }[];
}

export interface PipelineChallenge {
  id: string;
  levelId: number;
  mechanic: 'PIPELINE';
  prompt: string;
  steps: string[]; // Correct order; shuffled at runtime
  why: string;
}

export interface DetectiveChallenge {
  id: string;
  levelId: number;
  mechanic: 'DETECTIVE';
  prompt: string;
  nodes: { label: string; stat: string; isBroken: boolean }[];
  why: string;
}

export interface TunerChallenge {
  id: string;
  levelId: number;
  mechanic: 'TUNER';
  prompt: string;
  unitLabel: string;
  min: number;
  max: number;
  step: number;
  targetMin: number;
  targetMax: number;
  lowStateLabel: string;
  sweetStateLabel: string;
  highStateLabel: string;
  why: string;
}

export interface DecisionChallenge {
  id: string;
  levelId: number;
  mechanic: 'DECISION';
  scenario: string;
  constraintTag: string;
  options: { label: string; isBest: boolean; why: string }[];
}

export type GameChallenge =
  | SortChallenge
  | PipelineChallenge
  | DetectiveChallenge
  | TunerChallenge
  | DecisionChallenge;

export interface LevelScore {
  bestAccuracy: number;
  attempts: number;
  passed: boolean;
  bestStreak: number;
}

export interface ProgressState {
  learnerKey: string;
  unlockedLevel: number;           // Starts at 1, max 10
  completedTopics: string[];       // Topic IDs
  exploredSubTopics: string[];     // "t01:0"
  levelScores: Record<number, LevelScore>;
  lastActiveTopicId: string | null;
  updatedAt: number;
}
