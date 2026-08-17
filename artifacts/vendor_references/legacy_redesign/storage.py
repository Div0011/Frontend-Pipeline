"""
Artifact storage.

Writes generated code, reports and zips to the local ``artifacts_root`` (or S3
when ``S3_BUCKET`` is set). Provides a single interface so agents/storage code
never branches on backend.
"""

from __future__ import annotations

import logging
import os
import shutil
import zipfile
from pathlib import Path

from redesign.config import get_settings

logger = logging.getLogger("redesign.storage")


class ArtifactStore:
    def __init__(self, project_id: str):
        self.settings = get_settings()
        self.project_id = project_id
        self.root = Path(self.settings.artifacts_root) / "projects" / project_id
        self.root.mkdir(parents=True, exist_ok=True)

    def write_text(self, rel_path: str, content: str) -> Path:
        path = self.root / rel_path
        path.parent.mkdir(parents=True, exist_ok=True)
        path.write_text(content, encoding="utf-8")
        return path

    def write_report(self, name: str, content: str) -> Path:
        return self.write_text(f"reports/{name}.md", content)

    def save_project_files(self, files: dict[str, str]) -> list[str]:
        manifest = []
        for rel, content in files.items():
            self.write_text(rel, content)
            manifest.append(rel)
        return manifest

    def zip(self) -> Path:
        zip_path = self.root.with_suffix(".zip")
        with zipfile.ZipFile(zip_path, "w", zipfile.ZIP_DEFLATED) as zf:
            for p in self.root.rglob("*"):
                if p.is_file() and p != zip_path:
                    zf.write(p, p.relative_to(self.root.parent))
        return zip_path

    @property
    def path(self) -> str:
        return str(self.root)
