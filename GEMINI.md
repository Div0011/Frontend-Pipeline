# Frontend Pipeline System Guidelines

## Core Directory Roles

- **`templates/`**: Pure, reusable design templates. Read-only during client website redesigns. Never edit base templates.
- **`projects/`**: All customized client website clones and redesigns (e.g. `projects/dans-burgers/`, `projects/beyondburg-inc/`, `projects/truffles-bangalore/`).
- **`pipeline/`**: Lead generation, auditing, and automated design generation pipelines.

## Redesign Execution Workflow

1. Choose the best matching existing template from `templates/`, or **build a new template on the go** if none fits.
2. Copy the template to `projects/<project_name>/`.
3. **Overlay only the target website's assets and content**: logo, colors, images, menu, locations, history, contact info, copy, and metadata. Do not redesign from scratch.
4. **Cinematic Architecture v2 Directives**:
   - **Shot Grammar**: Dolly-scroll parallax, rack-focus hover blur on cards, match-cut transitions.
   - **Three Signature Sequences**:
     - *Sequence A (Deconstruction & Reveal)*: `SignatureDeconstruct.tsx` (Beyondburg, Dirty Martin's, Pedroso's, Burger Seigneur).
     - *Sequence B (Origin Time-Slip)*: `OriginTimeSlip.tsx` (Dan's, Casino El Camino, Pool Burger, Sour Duck).
     - *Sequence C (Craft Matrix Builder)*: `CraftMatrixBuilder.tsx` (Truffles, JewBoy, Good Flippin', NADC, Burger Elite, Biggies).
   - **Contrast Matrix**: Multi-layer glow & drop-shadows on canvas frames; dark typography on light surfaces; off-white `text-stone-200` on dark cards.
   - **Editorial Menu Card**: Minimalist physical menu card sheet without boxy tiles.
   - **MANDATORY PRESERVATION**: Never alter `Footer.tsx` or `CanvasScrubber.tsx` / `CinematicHero.tsx` / `CinematicSmoothie.tsx`.
5. Validate builds with `npm run typecheck` and `npm run build` in `projects/<project_name>/`.

## Vercel Deployment Protocol

- **Target Vercel Account**: Deploy all websites and templates strictly to **`cinematic-websites`** ([https://vercel.com/cinematic-websites](https://vercel.com/cinematic-websites)).
- **NEVER** deploy under `div0011`.
- Always specify `--scope cinematic-websites` on all deployment CLI commands (`npx vercel --prod --scope cinematic-websites --yes`).
