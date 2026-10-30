-- Supabase table for syncing AI Atlas Learning Hub progress across devices
create table if not exists public.ai_atlas_progress (
  learner_key text primary key,
  unlocked_level integer not null default 1 check (unlocked_level between 1 and 10),
  completed_topics jsonb not null default '[]'::jsonb,
  explored_subtopics jsonb not null default '[]'::jsonb,
  level_scores jsonb not null default '{}'::jsonb,
  last_active_topic_id text,
  updated_at timestamptz not null default now()
);

alter table public.ai_atlas_progress enable row level security;

create policy "Allow anon read/upsert by learner_key"
  on public.ai_atlas_progress
  for all
  to anon
  using (true)
  with check (true);
