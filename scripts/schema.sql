create table if not exists pred_cache (
  pk text not null,
  sk text not null,
  p50 double precision, lo double precision, hi double precision,
  valid_until timestamptz,
  primary key (pk, sk)
);
create table if not exists runs (
  id uuid primary key default gen_random_uuid(),
  stage text not null,
  start_ts timestamptz default now(),
  end_ts timestamptz,
  status text check (status in ('running','ok','error')),
  message text
);
create table if not exists model_registry (
  model_id text primary key,
  version text not null,
  path text not null,
  train_meta jsonb
);
