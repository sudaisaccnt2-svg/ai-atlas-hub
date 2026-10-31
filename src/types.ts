export type SceneWidget =
  | {
      kind: 'tester';
      promptLabel: string;
      modes: [
        { name: string; badge: string },
        { name: string; badge: string }
      ];
      cases: {
        name: string;
        detail: string;
        results: [
          { pass: boolean; output: string; why: string },
          { pass: boolean; output: string; why: string }
        ];
      }[];
    }
  | {
      kind: 'slider';
      dialLabel: string;
      stops: {
        label: string;
        tag: string;
        sampleInput: string;
        sampleOutput: string;
        verdict: 'good' | 'warn' | 'bad';
        why: string;
      }[];
    }
  | {
      kind: 'pipeline';
      requestText: string;
      stations: {
        name: string;
        role: string;
        defaultOn: boolean;
        whenOffOutput: string;
        whenOffProblem: string;
      }[];
      allOnOutput: string;
      allOnWhy: string;
    }
  | {
      kind: 'compare';
      scenario: string;
      cards: {
        name: string;
        tag: string;
        output: string;
        speed: string;
        cost: string;
        best: boolean;
        why: string;
      }[];
    }
  | {
      kind: 'spotter';
      instruction: string;
      xrayLabel: string;
      items: {
        title: string;
        preview: string;
        hiddenTruth: string;
        isTrap: boolean;
      }[];
    };

export interface LessonScene {
  bridge: string;          // 1 short line connecting from previous scene/lesson
  headline: string;        // Big, clear, <= 12 words
  plainText: string;       // 1-2 simple everyday sentences, zero unexplained jargon
  widget: SceneWidget;
}

export interface SubTopicItem {
  title: string;
  plain: string;
  example: string;
}

export interface LearningResource {
  title: string;
  type: 'video' | 'text';
  source: string;
  duration: string;
  url: string;
  why: string;
}

export interface Topic {
  id: string;
  indexNum: number;        // 1..40 matching AI_Detailed_Topic_Index.md
  levelId: number;         // 1..10
  orderInLevel: number;
  title: string;           // Original index title
  friendlyTitle: string;   // Clear beginner title
  summaryQuestion: string; // Shown on the map card
  icon: string;
  prevTopicId?: string;
  nextTopicId?: string;
  nextLessonBridge: string;
  scenes: LessonScene[];   // 3-4 connected hands-on visual scenes
  subTopics: SubTopicItem[];
  resources: LearningResource[];
}

export interface LevelDef {
  id: number;
  title: string;
  subtitle: string;
  icon: string;
  topicIds: string[];
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
  steps: string[];
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
  unlockedLevel: number;
  completedTopics: string[];
  exploredSubTopics: string[];
  levelScores: Record<number, LevelScore>;
  lastActiveTopicId: string | null;
  updatedAt: number;
}
