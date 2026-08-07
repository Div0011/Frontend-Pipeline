"""
Media asset processing tools.

Provides FFmpeg automated WebP frame sequence extraction for scrollytelling scrubbers,
image compression, and media asset prep.
"""

from __future__ import annotations

import logging
import os
import shutil
import subprocess
from pathlib import Path
from typing import Any

logger = logging.getLogger("pipeline.tools.media")


def extract_webp_frames(
    video_path: str,
    output_dir: str,
    fps: int = 30,
    quality: int = 80,
    prefix: str = "frame",
) -> list[str]:
    """Extract a WebP frame sequence from an input MP4/MOV video using FFmpeg.

    Frames are zero-padded to 6 digits (e.g. frame_000000.webp). Returns a list
    of generated relative or absolute file paths.
    """
    if not os.path.exists(video_path):
        logger.warning("Video file not found: %s", video_path)
        return []

    out_path = Path(output_dir)
    out_path.mkdir(parents=True, exist_ok=True)

    ffmpeg_bin = shutil.which("ffmpeg")
    if not ffmpeg_bin:
        logger.warning("FFmpeg not installed in system PATH. Cannot extract frames automatically.")
        return []

    output_pattern = str(out_path / f"{prefix}_%06d.webp")
    cmd = [
        ffmpeg_bin,
        "-y",
        "-i", video_path,
        "-vf", f"fps={fps},scale=1920:-1",
        "-c:v", "libwebp",
        "-quality", str(quality),
        "-compression_level", "6",
        output_pattern,
    ]

    try:
        logger.info("Running FFmpeg frame extraction: %s", " ".join(cmd))
        subprocess.run(cmd, check=True, capture_output=True, text=True)
        extracted = sorted(str(p) for p in out_path.glob(f"{prefix}_*.webp"))
        logger.info("Successfully extracted %d WebP frames to %s", len(extracted), output_dir)
        return extracted
    except subprocess.CalledProcessError as exc:
        logger.error("FFmpeg frame extraction failed: %s\nStderr: %s", exc, exc.stderr)
        return []


def process_project_media(project_dir: str) -> dict[str, Any]:
    """Scans public/raw_videos or public/media in project_dir and generates WebP frame sequences."""
    proj_path = Path(project_dir)
    media_dir = proj_path / "public" / "raw_videos"
    results = {}

    if not media_dir.exists():
        return results

    for video_file in media_dir.glob("*.mp4"):
        seq_name = video_file.stem
        output_frames_dir = proj_path / "public" / "frames" / seq_name
        frames = extract_webp_frames(str(video_file), str(output_frames_dir), prefix="frame")
        results[seq_name] = len(frames)

    return results
