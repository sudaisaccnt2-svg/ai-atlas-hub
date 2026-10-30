import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { ProgressState } from '../types';

const PROGRESS_STORAGE_KEY = 'ai_atlas_progress_v1';
const SUPABASE_CONFIG_KEY = 'ai_atlas_supabase_cfg_v1';

export interface SupabaseConfig {
  url: string;
  anonKey: string;
}

export type SyncConnectionStatus = 'offline' | 'local-only' | 'syncing' | 'cloud-synced' | 'cloud-error';

function randomKey(): string {
  const chars = 'abcdefghjkmnpqrstuvwxyz23456789';
  let out = 'atlas-';
  for (let i = 0; i < 8; i++) {
    out += chars[Math.floor(Math.random() * chars.length)];
  }
  return out;
}

export function getDefaultProgress(): ProgressState {
  return {
    learnerKey: randomKey(),
    unlockedLevel: 1,
    completedTopics: [],
    exploredSubTopics: [],
    levelScores: {},
    lastActiveTopicId: null,
    updatedAt: Date.now(),
  };
}

export function loadLocalProgress(): ProgressState {
  try {
    const raw = localStorage.getItem(PROGRESS_STORAGE_KEY);
    if (!raw) {
      const fresh = getDefaultProgress();
      saveLocalProgress(fresh);
      return fresh;
    }
    const parsed = JSON.parse(raw) as Partial<ProgressState>;
    return {
      learnerKey: parsed.learnerKey || randomKey(),
      unlockedLevel: Math.max(1, Math.min(10, parsed.unlockedLevel || 1)),
      completedTopics: Array.isArray(parsed.completedTopics) ? parsed.completedTopics : [],
      exploredSubTopics: Array.isArray(parsed.exploredSubTopics) ? parsed.exploredSubTopics : [],
      levelScores: parsed.levelScores || {},
      lastActiveTopicId: parsed.lastActiveTopicId ?? null,
      updatedAt: parsed.updatedAt || Date.now(),
    };
  } catch {
    return getDefaultProgress();
  }
}

export function saveLocalProgress(state: ProgressState): void {
  try {
    localStorage.setItem(PROGRESS_STORAGE_KEY, JSON.stringify(state));
  } catch {
    // ignore quota errors
  }
}

export function getSupabaseConfig(): SupabaseConfig | null {
  const envUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined;
  const envKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;
  if (envUrl && envKey) {
    return { url: envUrl.trim(), anonKey: envKey.trim() };
  }
  try {
    const raw = localStorage.getItem(SUPABASE_CONFIG_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as SupabaseConfig;
    if (parsed.url && parsed.anonKey) return parsed;
    return null;
  } catch {
    return null;
  }
}

export function saveSupabaseConfig(cfg: SupabaseConfig | null): void {
  try {
    if (!cfg || !cfg.url.trim() || !cfg.anonKey.trim()) {
      localStorage.removeItem(SUPABASE_CONFIG_KEY);
    } else {
      localStorage.setItem(
        SUPABASE_CONFIG_KEY,
        JSON.stringify({ url: cfg.url.trim(), anonKey: cfg.anonKey.trim() })
      );
    }
  } catch {
    // ignore
  }
}

let cachedClient: { key: string; client: SupabaseClient } | null = null;

function getClient(cfg: SupabaseConfig): SupabaseClient {
  const cacheKey = `${cfg.url}|${cfg.anonKey}`;
  if (cachedClient && cachedClient.key === cacheKey) return cachedClient.client;
  const client = createClient(cfg.url, cfg.anonKey);
  cachedClient = { key: cacheKey, client };
  return client;
}

export function mergeProgress(a: ProgressState, b: ProgressState): ProgressState {
  const completedTopics = Array.from(new Set([...a.completedTopics, ...b.completedTopics]));
  const exploredSubTopics = Array.from(new Set([...a.exploredSubTopics, ...b.exploredSubTopics]));
  const levelScores: ProgressState['levelScores'] = { ...a.levelScores };
  for (const [lvlStr, scoreB] of Object.entries(b.levelScores || {})) {
    const lvl = Number(lvlStr);
    const scoreA = levelScores[lvl];
    if (!scoreA) {
      levelScores[lvl] = scoreB;
    } else {
      levelScores[lvl] = {
        bestAccuracy: Math.max(scoreA.bestAccuracy, scoreB.bestAccuracy),
        attempts: Math.max(scoreA.attempts, scoreB.attempts),
        passed: scoreA.passed || scoreB.passed,
        bestStreak: Math.max(scoreA.bestStreak, scoreB.bestStreak),
      };
    }
  }
  return {
    learnerKey: a.learnerKey,
    unlockedLevel: Math.max(a.unlockedLevel, b.unlockedLevel),
    completedTopics,
    exploredSubTopics,
    levelScores,
    lastActiveTopicId: b.updatedAt > a.updatedAt ? b.lastActiveTopicId : a.lastActiveTopicId,
    updatedAt: Math.max(a.updatedAt, b.updatedAt, Date.now()),
  };
}

export async function pushProgressToSupabase(state: ProgressState): Promise<boolean> {
  if (typeof navigator !== 'undefined' && !navigator.onLine) return false;
  const cfg = getSupabaseConfig();
  if (!cfg) return false;
  const client = getClient(cfg);
  const { error } = await client.from('ai_atlas_progress').upsert(
    {
      learner_key: state.learnerKey,
      unlocked_level: state.unlockedLevel,
      completed_topics: state.completedTopics,
      explored_subtopics: state.exploredSubTopics,
      level_scores: state.levelScores,
      last_active_topic_id: state.lastActiveTopicId,
      updated_at: new Date(state.updatedAt).toISOString(),
    },
    { onConflict: 'learner_key' }
  );
  return !error;
}

export async function pullProgressFromSupabase(learnerKey: string): Promise<ProgressState | null> {
  if (typeof navigator !== 'undefined' && !navigator.onLine) return null;
  const cfg = getSupabaseConfig();
  if (!cfg) return null;
  const client = getClient(cfg);
  const { data, error } = await client
    .from('ai_atlas_progress')
    .select('*')
    .eq('learner_key', learnerKey)
    .maybeSingle();

  if (error || !data) return null;
  return {
    learnerKey: data.learner_key,
    unlockedLevel: data.unlocked_level ?? 1,
    completedTopics: data.completed_topics ?? [],
    exploredSubTopics: data.explored_subtopics ?? [],
    levelScores: data.level_scores ?? {},
    lastActiveTopicId: data.last_active_topic_id ?? null,
    updatedAt: data.updated_at ? new Date(data.updated_at).getTime() : Date.now(),
  };
}

export function encodePortableBackup(state: ProgressState): string {
  return btoa(encodeURIComponent(JSON.stringify(state)));
}

export function decodePortableBackup(code: string): ProgressState | null {
  try {
    const json = decodeURIComponent(atob(code.trim()));
    const parsed = JSON.parse(json) as ProgressState;
    if (typeof parsed.unlockedLevel !== 'number' || !Array.isArray(parsed.completedTopics)) {
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}
