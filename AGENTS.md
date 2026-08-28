# Frontend Pipeline Workspace Rules

## 1. Templates vs Projects Policy

- **`templates/`**: Holds all **pristine base reusable website templates** (`templates/smashguys`, `templates/cafe-cinematic`, `templates/hotel-cinematic`, `templates/template-1-film-portfolio`, etc.).
  - **CRITICAL**: **NEVER modify files directly in `templates/`**.
- **`projects/`**: Holds all **client redesigns and customized production websites** (`projects/dans-burgers`, `projects/beyondburg-inc`, `projects/truffles-bangalore`, `projects/dirty-martins`, `projects/pedrosos-pizza`, `projects/jewboy-burgers`, `projects/burger-seigneur`, etc.).

## 2. Standard Website Redesign Workflow

Whenever a request asks to redesign, rebrand, or create a client website clone:
1. **Identify the Template**: Select the best matching template from `templates/<template-name>/`. If no suitable template exists, **build a new template on the go** in `templates/` before proceeding.
2. **Clone to Projects**: Copy the template to `projects/<client-slug>/` (excluding `.next`, `node_modules`, `.vercel`).
3. **Install Dependencies**: Run `npm install` in `projects/<client-slug>/`.
4. **Overlay Assets & Content**: Update **only** the target website's assets, branding, colors, typography, menu/data, components, copy, images, contact info, and metadata **inside `projects/<client-slug>/`**. Do not redesign from scratch.
5. **Apply Cinematic v2 Standards**:
   - **Strict Palette Discipline**: Ground the site in its authentic brand colors with high-contrast text on all surfaces.
   - **Monochromatic Real-Time Cursor**: Invert cursor to black over warm/light surfaces and white/brand over dark surfaces.
   - **Shot Grammar & 3-Beat Sequences**: Integrate one of the 3 signature sequence engines (`SignatureDeconstruct.tsx`, `OriginTimeSlip.tsx`, or `CraftMatrixBuilder.tsx`).
   - **Editorial Menu Card**: Minimalist physical menu sheet without boxy tiles.
   - **PRESERVE INTACT**: `Footer.tsx` and `CanvasScrubber.tsx` / `CinematicHero.tsx` / `CinematicSmoothie.tsx` must remain preserved.
6. **Verify**: Run `npm run typecheck` and `npm run build` in `projects/<client-slug>/`. Confirm `templates/` is 100% clean.

## 3. Mandatory Vercel Deployment Target

- **CRITICAL**: Deploy **all** websites and templates exclusively to the Vercel team/account:
  - **Account / Scope**: **`cinematic-websites`** ([https://vercel.com/cinematic-websites](https://vercel.com/cinematic-websites))
  - **DO NOT** deploy under personal `div0011` account.
  - When using the Vercel CLI, always pass `--scope cinematic-websites` (e.g. `npx vercel --prod --scope cinematic-websites --yes`).
