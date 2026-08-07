# Pipeline Diagnostic & Claude API Analysis

> **Purpose:** Detailed architectural analysis of the Frontend Pipeline codebase, identifying why single-prompt generation currently faces limitations for cinematic websites, and evaluating the impact of Anthropic Claude 3.5 Sonnet.

---

## 1. Codebase Audit: Core Architectural Gaps

After auditing `pipeline/orchestrator.py`, `pipeline/llm.py`, `pipeline/agents/nodes.py`, and `pipeline/schemas.py`, we identified **4 structural reasons** why a single prompt currently produces generic or simplified outputs:

### 1. Single-Turn Token Ceiling (8,192 Max Output Tokens)
* In `pipeline/agents/nodes.py`, the `engineering` node attempts to generate the entire codebase in **a single structured JSON output**.
* High-end cinematic sites like *Smash Guys* require 15+ complex component files (~25,000+ code tokens: canvas scrubbers, custom cursors, preloader, responsive menu boards, mobile SVGs).
* Pushing an LLM to generate all files in 1 turn hits the 8k output limit, forcing it to generate small stubs.

### 2. Missing Video & Frame Extraction Tooling
* High-end scrollytelling requires 200+ WebP frames for smooth scrubbing.
* The current pipeline tools (`pipeline/tools/`) handle web crawling and Lighthouse audits, but lack FFmpeg video processing or automated asset generation tools.

### 3. Absence of a Code Compilation / Verification Loop
* The `engineering` node generates code in-memory and immediately packages it without executing `npx tsc --noEmit` or testing responsive breakpoints.
* Complex motion libraries (GSAP, Framer Motion, Lenis) require a compile-and-fix feedback loop to catch type errors and mobile layout glitches.

### 4. Missing Master Scrollytelling System Prompts
* System prompts in `pipeline/prompts/` instruct the engineering agent to build basic Next.js/Tailwind components, but do not provide the exact `CanvasScrubber`, `100svh` mobile lock, or dynamic cursor inversion blueprints.

---

## 2. Will Using a Claude API Key (`claude-3-5-sonnet`) Solve the Issue?

### Summary:
**Claude 3.5 Sonnet will dramatically elevate code aesthetics, motion math, and typography, BUT IT WILL NOT SOLVE THE PROBLEM ALONE.**

| Capability | Impact of Claude 3.5 Sonnet | Remaining Pipeline Gap |
| :--- | :--- | :--- |
| **Visual Aesthetics** | **Massive Upgrade:** Exceptional Tailwind styling, color harmony, and micro-interactions. | Solved |
| **Motion Math** | **Massive Upgrade:** Excellent GSAP, Framer Motion, and scroll logic. | Solved |
| **Multi-File Generation** | **Still Limited:** Max response token limits (8k) prevent outputting 15+ complex files in one turn. | Needs Multi-File Loop |
| **Media Asset Slicing** | **Cannot Solve:** Claude is a text/vision model; it cannot run FFmpeg or slice video frames without pipeline tools. | Needs FFmpeg Tools |
| **Mobile & Build Repair** | **Cannot Solve:** Needs an execution loop that runs `npx tsc` to self-heal build or layout errors. | Needs Verification Loop |

---

## 3. Recommended Roadmap for 1-Prompt High-End Generation

1. **Implement Multi-File Generation Loop:** Change `engineering` node to iterate through files sequentially rather than generating the whole site in 1 JSON payload.
2. **Add FFmpeg Tooling:** Create `pipeline/tools/media.py` for automated WebP frame extraction.
3. **Inject Master Blueprints:** Add code patterns from `reference.md` into `pipeline/prompts/engineering.txt`.
4. **Add `npx tsc` Self-Healing Loop:** Run TypeScript compilation after generation; if errors occur, prompt the agent to fix them automatically.
