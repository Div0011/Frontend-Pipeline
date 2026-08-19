#!/bin/bash
# Video encoding pipeline for Superfan — produces HLS adaptive streams
# Usage: ./scripts/encode-videos.sh [input.mp4]

set -e

if [ -z "$1" ]; then
  echo "Usage: $0 <input-video.mp4>"
  exit 1
fi

INPUT="$1"
BASE="${INPUT%.*}"

echo "Encoding HLS adaptive streams for: $INPUT"

# 1080p high quality
ffmpeg -i "$INPUT" -c:v libx264 -crf 23 -preset slow -vf "yadif,scale=1920:1080" -an "${BASE}_1080p.mp4"

# 480p lower quality
ffmpeg -i "$INPUT" -c:v libx264 -crf 26 -preset slow -vf "yadif,scale=854:480" -an "${BASE}_480p.mp4"

# HLS master playlist
ffmpeg -i "$INPUT" -c:v libx264 -c:a aac -f hls \
  -hls_time 4 -hls_playlist_type vod \
  -master_pl_name "${BASE}.m3u8" \
  -var_stream_map "v:0,a:0 v:1,a:1" \
  -b:v:0 0 -b:v:1 0 \
  -s:v:0 1920x1080 -s:v:1 854x480 \
  "${BASE}_%v.m3u8"

echo "Done. Files created:"
ls -la "${BASE}"*
