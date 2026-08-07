"""
Cinematic Website Templates — 5-Type Prompt Library Registry

Provides structured access to the 5 cinematic prompt templates, shared tech stack,
motion rationale principles, and AI asset generation recommendations.
"""

from typing import Any, Dict, List

CORE_PRINCIPLE = (
    "Scroll-based ≠ cinematic. A site can have GSAP ScrollTrigger on every section "
    "and still feel generic if the motion doesn't carry meaning. The test for every template: "
    "can you say *why* each animated element moves the way it does (paces a story, rewards attention, "
    "reveals structure) — if the only answer is 'because it's on the list of things that animate,' "
    "it's decoration, not direction. Synthesize the *principles* from references, never clone the execution."
)

SHARED_TECH_STACK = {
    "framework": "Next.js (App Router) + Tailwind CSS",
    "scroll_physics": "Lenis (single source of scroll truth)",
    "scroll_animation": "GSAP + ScrollTrigger (scrub)",
    "3d_full_scene": "React Three Fiber + drei",
    "3d_hero_object": "Spline (@splinetool/react-spline)",
    "micro_interactions": "Framer Motion",
    "video": "Native <video> + next/image poster frames (lazy-loaded, muted)",
    "post_processing": "@react-three/postprocessing (Bloom, ChromaticAberration, Vignette)",
}

CINEMATIC_TEMPLATES: Dict[str, Dict[str, Any]] = {
    "minimal_editorial": {
        "id": "minimal_editorial",
        "title": "Minimal / Editorial (No Generated Media)",
        "genre": "genre_0",
        "references": ["Hadaka", "Obys Agency", "1 Place Vendôme", "L'Oréal Mediaroom"],
        "design_philosophy": (
            "Cinematic quality comes from restraint, not media. The site must feel deliberate "
            "and paced using only typography, color, whitespace, and well-directed motion on "
            "ordinary photos. No 3D, no video, no generated assets. Every element earns its place."
        ),
        "creative_direction": (
            "Create a premium editorial experience that feels more cinematic than most WebGL-heavy sites "
            "through pure restraint and pacing. Hadaka proves this: stark black/white/red, no hero video, "
            "no 3D, and it reads as cinematic because every element earns its place. "
            "Oversized display typography is the structural element. A single consistent CSS-filter grade "
            "unifies all photography. Unconventional masking/cropping on ordinary images reads as directed. "
            "Generous negative space does the framing work a camera move would do."
        ),
        "ux_philosophy": (
            "Single-column flow with generous whitespace. One focal point per screen — if a section "
            "has two competing attention magnets, remove one. Cold open → statement → work → close "
            "chapter structure gives scroll narrative shape. Images arrive late, not immediately. "
            "Typography does the emotional work an image would otherwise carry."
        ),
        "technical_architecture": (
            "Next.js App Router. Zero Three.js/WebGL imports. Zero video files. "
            "GSAP + ScrollTrigger + Lenis for scroll choreography. Ordinary stock/client photos with "
            "CSS filter grading. Custom cursor as signature micro-interaction. "
            "Server Components by default; mark only interactive pieces 'use client'."
        ),
        "motion_system": (
            "Scroll-paced reveals with 40–80ms stagger offsets and expo-out easing. "
            "Typography motion: character-level or line-level text splitting for display headlines. "
            "Custom easing on every transition (never default ease-in-out). "
            "One signature micro-interaction (custom cursor, magnetic button, hover-reveal caption). "
            "No decorative motion — if an animation doesn't serve pacing, attention, or UX purpose, remove it."
        ),
        "performance_rules": (
            "60 FPS. GPU-accelerated transforms only. Image preloading with AVIF/WebP. "
            "No WebGL overhead means simpler performance profile. "
            "Code splitting. Lazy-loaded below-fold images. "
            "Custom font loading with font-display: swap."
        ),
        "master_prompt": (
            "Create a premium editorial experience that feels cinematic through restraint and pacing alone — "
            "no 3D, no video, no generated assets. Hadaka (hadaka.jp) proves this works: stark limited palette, "
            "no hero video, no 3D, and it reads as more cinematic than most WebGL-heavy sites.\n\n"
            "Requirements:\n"
            "- Oversized display typography (10–15vw) as the visual centerpiece\n"
            "- Single consistent CSS-filter grade across all photography\n"
            "- Unconventional masking/cropping on ordinary images (clip-path, organic shapes)\n"
            "- Generous negative space (minimum 120px vertical padding at desktop)\n"
            "- Custom easing on every transition (expo.out, power3.inOut, back.out(1.7))\n"
            "- Chapter-paced content structure (cold open → beat → beat → close)\n"
            "- One signature micro-interaction (custom cursor, magnetic button, hover-reveal)\n"
            "- Zero Three.js/WebGL imports\n"
            "- Zero video files\n"
            "- Single accent color maximum; reject gradient blobs and mesh gradients\n\n"
            "Before generating code, produce a structured implementation plan covering:\n"
            "1. Design rationale (why each interaction exists)\n"
            "2. Page architecture (high-level structure and flow)\n"
            "3. Component hierarchy (reusable UI elements)\n"
            "4. Animation timeline (orchestration of sequences)\n"
            "5. Scroll choreography (how motion maps to user navigation)\n"
            "6. State management strategy\n"
            "7. Asset loading strategy (zero 3D/video — progressive image loading, font loading)\n"
            "8. Accessibility plan\n"
            "9. Performance budget (achievable without WebGL overhead)\n"
            "10. Mobile adaptation strategy (preserve motion intent without bloat)\n\n"
            "Only after the plan is complete should implementation begin. "
            "Develop an original editorial experience inspired by Hadaka, Obys Agency, and 1 Place Vendôme "
            "without reproducing their layouts, branding, or visual identity. "
            "The test: does the site feel deliberate and paced, or like a template with animations added? "
            "If uncertain, remove an element rather than add one — restraint is the default lever."
        ),
        "assets_to_generate": ["Ordinary stock photos with CSS grading (no generated assets)"],
    },
    "creative_portfolio": {
        "id": "creative_portfolio",
        "title": "Creative / Film Portfolio",
        "genre": "genre_2b",
        "references": ["Obys Agency", "Minh Pham", "Imagina Studio"],
        "design_philosophy": (
            "The website should feel like a digital exhibition rather than a portfolio. "
            "Projects are the primary content, and every interaction exists only to elevate the work. "
            "Motion should create rhythm and anticipation without competing with the content. "
            "Typography is treated as a first-class visual element. Layouts embrace asymmetry, "
            "negative space, and editorial pacing. Visual hierarchy must always favor the work "
            "over decorative effects."
        ),
        "creative_direction": (
            "Create a premium editorial portfolio inspired by award-winning creative studios "
            "without reproducing any existing layout or branding. "
            "The experience should prioritize storytelling, typography, and project presentation "
            "over decorative effects. Motion should feel cinematic and restrained. "
            "Use generous whitespace, asymmetrical editorial layouts, smooth scroll choreography, "
            "fullscreen media transitions, and carefully timed typography animations. "
            "Every interaction must reinforce the work rather than distract from it."
        ),
        "ux_philosophy": (
            "One project per screen. Reel section: thumbnail grid where hover/click morphs the "
            "thumbnail directly into a full-bleed looping video player — no modal, no page transition. "
            "Case-study pages read as magazine spreads: one hero still, short restrained paragraph, "
            "credits line in a contrasting monospace accent. Cold-open hero: single striking still "
            "or muted loop, wordmark reveal via masked-wipe or character-stagger (once per session, skippable). "
            "Each screen transition should feel like turning a page in a high-end publication, not clicking a link."
        ),
        "technical_architecture": (
            "Next.js 15 App Router. Server Components by default, client islands for motion. "
            "GSAP + ScrollTrigger for scroll choreography. Lenis for inertial scrolling. "
            "Framer Motion for micro-interactions only. Canvas-based video morph transition "
            "instead of modal overlays. Video assets lazy-loaded with poster frames. "
            "No 3D centerpiece by default; if used, restrict to subtle depth layers behind editorial content."
        ),
        "motion_system": (
            "Smooth inertial scrolling via Lenis. Grid → fullscreen morph transitions (no modals). "
            "Image reveal masks on scroll. Cinematic page transitions. Typography synchronized with scroll. "
            "Sticky editorial sections. Sequential staggered animations (40-80ms stagger, expo-out easing). "
            "Subtle parallax. Cursor interactions. Magnetic buttons. Image distortion only during transitions. "
            "No default ease-in-out. No spring-bounce effects."
        ),
        "performance_rules": (
            "60 FPS target. GPU-accelerated transforms only. Image preloading with AVIF/WebP. "
            "Route transitions below 300ms. Code splitting. Lazy-loaded media. "
            "Video posters and first frame cache. `loading='lazy'` on all below-fold media."
        ),
        "master_prompt": (
            "Create a premium editorial portfolio inspired by award-winning creative studios "
            "without reproducing any existing layout or branding.\n\n"
            "The experience should prioritize storytelling, typography, and project presentation "
            "over decorative effects. Motion should feel cinematic and restrained. Use generous "
            "whitespace, asymmetrical editorial layouts, smooth scroll choreography, fullscreen "
            "media transitions, and carefully timed typography animations. Every interaction must "
            "reinforce the work rather than distract from it.\n\n"
            "Before generating code, produce a structured implementation plan covering:\n"
            "1. Design rationale (why each interaction exists)\n"
            "2. Page architecture (high-level structure and flow)\n"
            "3. Component hierarchy (reusable UI elements)\n"
            "4. Animation timeline (orchestration of sequences)\n"
            "5. Scroll choreography (how motion maps to user navigation)\n"
            "6. State management strategy\n"
            "7. Asset loading strategy\n"
            "8. Accessibility plan\n"
            "9. Performance budget\n"
            "10. Mobile adaptation strategy\n\n"
            "Only after the plan is complete should implementation begin. "
            "Avoid copying navigation structures, layouts, or visual identities from any reference. "
            "Instead, synthesize the common design principles into a unique implementation with "
            "original spacing, hierarchy, motion timing, and interaction patterns."
        ),
        "assets_to_generate": ["5-8s muted looping clips per project", "hero clip/still for cold open"],
    },
    "saas_product_launch": {
        "id": "saas_product_launch",
        "title": "SaaS Product Launch",
        "genre": "genre_2",
        "references": ["Jeton", "Hubtown", "Lusion"],
        "design_philosophy": (
            "The interface should communicate confidence through clarity. "
            "A single interactive 3D object acts as the visual centerpiece while the surrounding "
            "UI remains intentionally restrained. Motion exists to explain the product rather than "
            "decorate the page. Every transition should reinforce the relationship between the "
            "product and its features."
        ),
        "creative_direction": (
            "Design a premium SaaS landing page centered around a single interactive 3D object "
            "that visually represents the product ecosystem. The object should respond naturally to "
            "scrolling, camera movement, and user interaction while remaining secondary to the "
            "product messaging. Maintain a clean architectural layout with strong typography, "
            "generous whitespace, and minimal color usage. Avoid excessive visual effects. "
            "Build a cohesive motion language based on physically believable movement, smooth "
            "interpolation, and consistent easing."
        ),
        "ux_philosophy": (
            "Scroll through feature sections while the 3D structure explodes apart to reveal internal "
            "layers, then reassembles at the final CTA section. This motion must map 1:1 to the feature "
            "copy being revealed at that scroll position. Everything else (feature grid, pricing, "
            "testimonials) is conventional, well-executed GSAP-choreographed DOM. The 3D centerpiece "
            "is punctuation, not the whole page. Static-image fallbacks for reduced-motion and low-GPU devices."
        ),
        "technical_architecture": (
            "Next.js App Router. R3F canvas isolated in a single client component. "
            "GSAP ScrollTrigger drives both DOM reveals and 3D transforms via shared scroll state. "
            "Lenis as single scroll truth. Postprocessing for bloom/chromatic aberration on centerpiece. "
            "Draco-compressed glTF. Dynamic import for R3F scene. Feature grid uses Framer Motion layout animations."
        ),
        "motion_system": (
            "3D object assembly and exploded view. Mouse parallax on centerpiece. "
            "Scroll-controlled timeline. Floating component labels. Feature callouts. "
            "Section-to-section camera interpolation. Environment lighting transitions. "
            "Magnetic buttons. 1:1 scroll-to-object mapping. No independent/decoupled 3D motion."
        ),
        "performance_rules": (
            "60 FPS. Draco + KTX2 compression. GPU-accelerated transforms. "
            "Image preloading (AVIF/WebP). Code splitting. Dynamic imports for 3D. "
            "Route transitions below 300ms. Static fallback images."
        ),
        "master_prompt": (
            "Design a premium SaaS landing page centered around a single interactive 3D object "
            "that visually represents the product ecosystem. The object should respond naturally to "
            "scrolling, camera movement, and user interaction while remaining secondary to the "
            "product messaging. Maintain a clean architectural layout with strong typography, "
            "generous whitespace, and minimal color usage. Avoid excessive visual effects. "
            "Build a cohesive motion language based on physically believable movement, smooth "
            "interpolation, and consistent easing.\n\n"
            "Before generating code, produce a structured implementation plan covering:\n"
            "1. Design rationale (why each interaction exists)\n"
            "2. Page architecture (high-level structure and flow)\n"
            "3. Component hierarchy (reusable UI elements)\n"
            "4. Animation timeline (orchestration of sequences)\n"
            "5. Scroll choreography (how motion maps to user navigation)\n"
            "6. State management strategy\n"
            "7. Asset loading strategy\n"
            "8. Accessibility plan\n"
            "9. Performance budget\n"
            "10. Mobile adaptation strategy\n\n"
            "Only after the plan is complete should implementation begin. "
            "Create an original experience that captures the principles of modern premium SaaS design "
            "without reproducing any reference website."
        ),
        "assets_to_generate": ["AI-generated abstract 3D model (geometric blocks / node network glTF)"],
    },
    "corporate_institutional": {
        "id": "corporate_institutional",
        "title": "Corporate / Institutional Company Site",
        "genre": "genre_1",
        "references": ["L'Oréal Mediaroom", "Canals Amsterdam", "History of Animation"],
        "design_philosophy": (
            "This website should communicate credibility, heritage, and scale. "
            "The experience is intentionally restrained, relying on rhythm, narrative structure, "
            "and cinematic imagery rather than flashy animation. Chapters guide the visitor through "
            "a coherent story with consistent pacing and visual hierarchy."
        ),
        "creative_direction": (
            "Create a premium institutional website that emphasizes trust, heritage, and innovation "
            "through cinematic storytelling rather than visual spectacle. Structure the experience into "
            "clearly defined narrative chapters with restrained motion, sophisticated typography, and "
            "carefully paced transitions. Use immersive background media only where it strengthens the narrative."
        ),
        "ux_philosophy": (
            "3-4 chapter narrative structure. Each chapter = one narrative beat + one lighting/color mood shift, "
            "signaled by a background transition, not a hard cut. Mega-menu navigation with visual hierarchy "
            "for deeper content (press, investor relations, etc.) sitting outside the scroll-narrative track. "
            "Trust signals (certifications, press mentions) integrated naturally, not as badge clutter. "
            "Motion: measured, deliberate — no snappy/mechanical easing, this brand doesn't rush."
        ),
        "technical_architecture": (
            "Next.js App Router. GSAP ScrollTrigger + Lenis for chapter pinning and lighting transitions. "
            "Background video or high-res stills with consistent color grading. "
            "Mega-menu as a separate DOM layer outside the scroll track. "
            "Typography: premium, tight tracking, refined weight hierarchy."
        ),
        "motion_system": (
            "Chapter transitions with background color/lighting shifts. Pinned storytelling. "
            "Background video progression. Editorial image reveals. Timeline animations. "
            "Data visualization. Progress indicators. Section fades. "
            "All easing measured and deliberate, never snappy."
        ),
        "performance_rules": (
            "60 FPS. GPU-accelerated transforms. Image preloading (AVIF/WebP). "
            "Code splitting. Lazy-loaded background media. "
            "Route transitions below 300ms."
        ),
        "master_prompt": (
            "Create a premium institutional website that emphasizes trust, heritage, and innovation "
            "through cinematic storytelling rather than visual spectacle. Structure the experience into "
            "clearly defined narrative chapters with restrained motion, sophisticated typography, and "
            "carefully paced transitions. Use immersive background media only where it strengthens the narrative.\n\n"
            "Before generating code, produce a structured implementation plan covering:\n"
            "1. Design rationale (why each interaction exists)\n"
            "2. Page architecture (high-level structure and flow)\n"
            "3. Component hierarchy (reusable UI elements)\n"
            "4. Animation timeline (orchestration of sequences)\n"
            "5. Scroll choreography (how motion maps to user navigation)\n"
            "6. State management strategy\n"
            "7. Asset loading strategy\n"
            "8. Accessibility plan\n"
            "9. Performance budget\n"
            "10. Mobile adaptation strategy\n\n"
            "Only after the plan is complete should implementation begin. "
            "Develop an original information architecture and interaction model inspired by best practices "
            "from high-end institutional websites without reproducing their layouts, branding, or visual identity."
        ),
        "assets_to_generate": ["3-4 atmospheric background loops or stills with consistent color grade"],
    },
    "creative_agency": {
        "id": "creative_agency",
        "title": "Marketing / Creative Agency",
        "genre": "genre_1",
        "references": ["Locomotive", "Active Theory", "Resn"],
        "design_philosophy": (
            "The agency website should feel experimental but purposeful. Every interaction demonstrates "
            "technical capability while remaining usable. Motion is expressive yet disciplined, combining "
            "immersive transitions, playful interactions, and sophisticated visual systems into a "
            "cohesive brand experience."
        ),
        "creative_direction": (
            "Build an award-level creative agency website that demonstrates technical excellence through "
            "purposeful interaction design. Every animation should communicate craftsmanship rather than novelty. "
            "Integrate WebGL, motion graphics, and advanced scrolling techniques into a cohesive experience "
            "that remains fast, accessible, and intuitive."
        ),
        "ux_philosophy": (
            "High-energy experience. Hero: full-bleed agency showreel (10-20s cut), autoplay muted, "
            "with a skip/mute control visible immediately. Project grid: aggressive but controlled stagger "
            "(40-60ms) on entrance, hover reveals project name + one-line result stat (not a full case study inline). "
            "Services section: confident, short copy blocks, no hedging language. Motion signature: snappier easing "
            "than corporate/portfolio templates — should read as capable and fast-moving, not restrained."
        ),
        "technical_architecture": (
            "Next.js App Router. R3F + custom GLSL shaders for hero WebGL scene. "
            "GSAP + ScrollTrigger for scroll-driven scenes. Lenis for smooth scroll. "
            "Matter.js for physics-based interactions where appropriate. "
            "Canvas transitions and page morphing via GSAP Flip. "
            "Custom cursor and cursor-driven effects via Framer Motion."
        ),
        "motion_system": (
            "Interactive hero with WebGL. Dynamic cursor. Physics-based interactions. "
            "Scroll-driven scenes. Canvas transitions. Page morphing. Advanced hover effects. "
            "3D typography. Procedural particles. Snappy, confident easing — not restrained."
        ),
        "performance_rules": (
            "60 FPS. GPU-accelerated transforms. Image preloading (AVIF/WebP). "
            "Code splitting. Lazy-loaded media. Route transitions below 300ms. "
            "WebGL fallback for low-GPU devices."
        ),
        "master_prompt": (
            "Build an award-level creative agency website that demonstrates technical excellence through "
            "purposeful interaction design. Every animation should communicate craftsmanship rather than novelty. "
            "Integrate WebGL, motion graphics, and advanced scrolling techniques into a cohesive experience "
            "that remains fast, accessible, and intuitive.\n\n"
            "Before generating code, produce a structured implementation plan covering:\n"
            "1. Design rationale (why each interaction exists)\n"
            "2. Page architecture (high-level structure and flow)\n"
            "3. Component hierarchy (reusable UI elements)\n"
            "4. Animation timeline (orchestration of sequences)\n"
            "5. Scroll choreography (how motion maps to user navigation)\n"
            "6. State management strategy\n"
            "7. Asset loading strategy\n"
            "8. Accessibility plan\n"
            "9. Performance budget\n"
            "10. Mobile adaptation strategy\n\n"
            "Only after the plan is complete should implementation begin. "
            "The design should synthesize principles from leading creative agencies while maintaining an "
            "entirely original layout, interaction model, and visual identity. "
            "Avoid reproducing distinctive scenes, navigation patterns, or branded effects from any single reference."
        ),
        "assets_to_generate": ["10-20s fast-cut agency showreel", "project thumbnails as stills or short loops"],
    },
    "consumer_product_ecommerce": {
        "id": "consumer_product_ecommerce",
        "title": "Consumer Product / E-commerce (Physical Object)",
        "genre": "genre_1",
        "references": ["Kieran Clarke", "Vertigo 1958"],
        "design_philosophy": (
            "The product itself is the interface. Users discover features through controlled motion, "
            "cinematic camera work, and interactive disassembly. The experience should resemble a "
            "luxury product launch, with every animation reinforcing craftsmanship, engineering, "
            "and material quality."
        ),
        "creative_direction": (
            "Create a premium product experience where a fully interactive 3D model serves as the "
            "central storytelling element. Use scroll-driven assembly, exploded views, camera choreography, "
            "and contextual feature reveals to communicate engineering quality and product craftsmanship. "
            "Treat the product as the primary interface, supported by restrained typography and minimal surrounding UI."
        ),
        "ux_philosophy": (
            "Camera orbit + mechanical disassembly on scroll. Scroll drives both a camera path AND a "
            "component-explode animation on the SAME 3D product model. Typography stays out of the way — "
            "use small technical-spec labels (material, dimensions) next to each exploded part rather than "
            "large display type. Magnetic-cursor or click-to-rotate interaction on assembled state as secondary "
            "signature moment. Mandatory 2D fallback: pre-rendered frame sequence for mobile/low-GPU."
        ),
        "technical_architecture": (
            "Next.js App Router. R3F + Drei with HDR environment maps. "
            "GSAP ScrollTrigger drives camera path + component positions from same scroll progress value. "
            "Lenis as single scroll truth. Postprocessing for material polish. "
            "2D fallback: pre-rendered WebP frame sequence served via CanvasScrubber on low-GPU/mobile. "
            "Feature hotspots as HTML overlays positioned via 3D-to-screen projection."
        ),
        "motion_system": (
            "Exploded view assembly animation. Scroll-driven timelines. Interactive orbit. "
            "Camera tracking and choreography. Feature hotspots with contextual reveals. "
            "Material transitions (roughness/metalness scrubs). Mouse tilt on assembled state. "
            "Magnetic cursor interaction. 2D fallback frame sequence on mobile."
        ),
        "performance_rules": (
            "60 FPS. Draco + KTX2 compression. HDR environment maps compressed. "
            "GPU-accelerated transforms. Image preloading (AVIF/WebP). "
            "Code splitting. Lazy-loaded 3D assets. Route transitions below 300ms. "
            "2D fallback active on mobile/low-GPU automatically."
        ),
        "master_prompt": (
            "Create a premium product experience where a fully interactive 3D model serves as the "
            "central storytelling element. Use scroll-driven assembly, exploded views, camera choreography, "
            "and contextual feature reveals to communicate engineering quality and product craftsmanship. "
            "Treat the product as the primary interface, supported by restrained typography and minimal surrounding UI.\n\n"
            "Before generating code, produce a structured implementation plan covering:\n"
            "1. Design rationale (why each interaction exists)\n"
            "2. Page architecture (high-level structure and flow)\n"
            "3. Component hierarchy (reusable UI elements)\n"
            "4. Animation timeline (orchestration of sequences)\n"
            "5. Scroll choreography (how motion maps to user navigation)\n"
            "6. State management strategy\n"
            "7. Asset loading strategy\n"
            "8. Accessibility plan\n"
            "9. Performance budget\n"
            "10. Mobile adaptation strategy\n\n"
            "Only after the plan is complete should implementation begin. "
            "Build an original experience inspired by premium hardware product launches "
            "without reproducing any existing layout, animation sequence, or visual identity."
        ),
        "assets_to_generate": [
            "Breakable/exploded 3D model (segmented glTF mesh)",
            "2D WebP frame sequence fallback",
        ],
    },
}


def get_template(template_id: str) -> Dict[str, Any]:
    """Retrieve a template dictionary by ID."""
    return CINEMATIC_TEMPLATES.get(template_id, CINEMATIC_TEMPLATES["creative_portfolio"])


def list_templates() -> List[Dict[str, Any]]:
    """Return all 5 cinematic templates."""
    return list(CINEMATIC_TEMPLATES.values())


def get_master_prompt(template_id: str) -> str:
    """Return the 6-section master prompt for a template."""
    template = get_template(template_id)
    return template["master_prompt"]


def get_synthesis_prompt(template_id: str, brief: str) -> str:
    """Build a synthesis prompt that emphasizes extracting principles over cloning."""
    template = get_template(template_id)
    references = ", ".join(template["references"])
    return (
        f"References for design-principle extraction: {references}.\n\n"
        f"Brief: {brief}\n\n"
        f"--- SYNTHESIS REQUIREMENTS ---\n"
        f"1. DO NOT clone, copy, or reproduce any reference site's layout, navigation, "
        f"   interaction pattern, or visual identity.\n"
        f"2. DO extract the underlying design principles: typography rhythm, scroll pacing, "
        f"   spacing systems, color temperature, motion easing curves, and narrative structure.\n"
        f"3. Synthesize those principles into an original implementation with new spacing, "
        f"   hierarchy, motion timing, and interaction patterns specific to this brief.\n"
        f"4. Every animation must have a stated purpose tied to content or user understanding — "
        f"   no motion for decoration alone.\n"
        f"5. The result should feel like it could win the same awards as the references, "
        f"   while being unmistakably original.\n\n"
        f"--- OUTPUT STRUCTURE (six sections) ---\n"
        f"Follow this exact structure:\n"
        f"1. Creative Direction\n"
        f"2. UX Philosophy\n"
        f"3. Technical Architecture\n"
        f"4. Motion System\n"
        f"5. Performance Requirements\n"
        f"6. Implementation Constraints\n\n"
        f"Template guidance:\n"
        f"- Creative Direction: {template['creative_direction']}\n"
        f"- UX Philosophy: {template['ux_philosophy']}\n"
        f"- Technical Architecture: {template['technical_architecture']}\n"
        f"- Motion System: {template['motion_system']}\n"
        f"- Performance Requirements: {template['performance_rules']}\n"
        f"- Implementation Constraints: Build only what is specified. No extra effects. "
        f"  Mobile/low-GPU fallbacks required where 3D is used."
    )
