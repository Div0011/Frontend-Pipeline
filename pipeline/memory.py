"""
Memory architecture.

Two distinct memory systems, both powered by LangGraph's Postgres backends in
production and falling back to in-process stores for local/dev/tests:

1. **Checkpointer** — per-run execution state (the graph's channels at every
   step). Enables pause/resume, crash recovery and time-travel debugging.
2. **Store** — cross-run *long-term* memory (brand DNA, reusable design
   systems, prior QA learnings) namespaced by project/brand, so future
   redesigns start warmer.

Both are selected by ``get_checkpointer`` / ``get_store`` which try Postgres and
gracefully degrade to ``MemorySaver`` / ``InMemoryStore`` when the DB is absent.
"""

from __future__ import annotations

import logging

from pipeline.config import get_settings

logger = logging.getLogger("pipeline.memory")


def get_checkpointer():
    settings = get_settings()
    try:
        from langgraph.checkpoint.postgres import PostgresSaver

        saver = PostgresSaver.from_conn_string(settings.postgres_dsn)
        saver.setup()
        logger.info("Using Postgres checkpointer")
        return saver
    except Exception as exc:  # missing dep or DB unreachable
        from langgraph.checkpoint.memory import MemorySaver

        logger.warning("Postgres checkpointer unavailable (%s); using MemorySaver", exc)
        return MemorySaver()


def get_store():
    settings = get_settings()
    try:
        from langgraph.store.postgres import PostgresStore

        store = PostgresStore.from_conn_string(settings.postgres_dsn)
        store.setup()
        logger.info("Using Postgres long-term store")
        return store
    except Exception as exc:
        from langgraph.store.memory import InMemoryStore

        logger.warning("Postgres store unavailable (%s); using InMemoryStore", exc)
        return InMemoryStore()
