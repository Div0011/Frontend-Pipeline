-- Autonomous Website Redesign Platform — application schema (PostgreSQL 15+)
-- LangGraph's Postgres checkpointer/store create their own tables
-- (checkpoints, writes, store) automatically via .setup(); this file holds the
-- *application-level* tables the FastAPI layer and analytics use.

CREATE TABLE IF NOT EXISTS redesign_jobs (
    project_id      TEXT PRIMARY KEY,
    request         TEXT NOT NULL,
    url             TEXT,
    status          TEXT NOT NULL DEFAULT 'queued',   -- queued|running|paused|done|failed
    human_approval  BOOLEAN NOT NULL DEFAULT FALSE,
    qa_score        REAL,
    artifacts_path  TEXT,
    created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS redesign_events (
    id          BIGSERIAL PRIMARY KEY,
    project_id  TEXT NOT NULL REFERENCES redesign_jobs(project_id) ON DELETE CASCADE,
    step        TEXT,
    agent       TEXT,
    level       TEXT,
    message     TEXT,
    created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_events_project ON redesign_events(project_id, id);

-- Long-term, cross-run brand memory (mirrors LangGraph PostgresStore but
-- queryable for analytics / warm starts).
CREATE TABLE IF NOT EXISTS redesign_brand_memory (
    brand_key   TEXT NOT NULL,
    namespace   TEXT NOT NULL DEFAULT 'brand',
    version     INT  NOT NULL DEFAULT 1,
    payload     JSONB NOT NULL,
    created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
    PRIMARY KEY (brand_key, namespace, version)
);

-- QA gate history — feeds the auto-retry tuner and quality dashboards.
CREATE TABLE IF NOT EXISTS redesign_qa_reports (
    project_id   TEXT PRIMARY KEY REFERENCES redesign_jobs(project_id) ON DELETE CASCADE,
    passed       BOOLEAN,
    overall_score REAL,
    scores       JSONB,
    issues       JSONB,
    weakest_agent TEXT,
    created_at   TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS redesign_artifacts (
    project_id  TEXT NOT NULL REFERENCES redesign_jobs(project_id) ON DELETE CASCADE,
    kind        TEXT NOT NULL,                  -- report|code|zip
    rel_path    TEXT NOT NULL,
    bytes       BIGINT,
    created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
    PRIMARY KEY (project_id, kind, rel_path)
);
