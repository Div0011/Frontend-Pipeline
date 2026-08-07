# Pattern Analysis: Kieran Clarke — Physical Product / Mechanical Disassembly

## Genre: Physical Product — Mechanical Disassembly on Scroll (Genre 5)

## Core Architecture
- **Stack:** Webflow + Spline + Custom interactions
- **Approach:** Mechanical disassembly-on-scroll as the core mechanic
- Product literally comes apart as you scroll down

## Key Mechanical Patterns

### 1. Scroll → Disassembly
- Product starts fully assembled
- As scroll progresses, parts separate along their natural axes
- Disassembly order: top layer → middle layer → core component
- Each part moves in a straight line (no rotation)
- Movement speed varies: fast initial separation → slow reveal

### 2. Exploded View States
- State 1: Fully assembled (0-20% scroll)
- State 2: Top shell lifts off (20-40%)
- State 3: Internal components spread (40-60%)
- State 4: Core exposed, parts orbit (60-80%)
- State 5: Label callouts on individual parts (80-100%)
- Reverse scroll reassembles

### 3. Part Labeling
- Each separated part gets a label
- Label = part name + spec line
- Labels connected to parts via thin lines
- Labels appear only when part is fully separated
- Line connects from part center to label position

### 4. Camera Work
- Camera stays relatively fixed (no orbit)
- Small camera pull-back as parts separate
- Camera gently pans to follow the core component
- FOV widens slightly during exploded state

### 5. Interaction Layer
- Mouse hover on a part highlights it
- Click/tap on a part shows detailed info panel
- Hover state: part glows or changes color
- Interaction doesn't interrupt scroll flow

## Why It Works
- Shows product construction without needing a video
- Labels educate while parts are visible
- Assembled → exploded is intuitive (everyone understands "taking apart")
- Reverse scroll = reassembly feels satisfying

## Extraction For Template 5
- Scroll-progress mapped to part position offsets
- Exploded view states (5 states)
- Part labeling with connection lines
- Part hover highlight + click info panel
- Camera work: fixed position with subtle motion
- Assembly/disassembly on forward/reverse scroll
