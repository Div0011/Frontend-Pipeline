# Frontend Pipeline Workspace Rules

## 1. Templates vs Projects Policy

- **`templates/`**: Holds all **pristine base reusable website templates** (`templates/smashguys`, `templates/cafe-cinematic`, `templates/hotel-cinematic`, `templates/template-1-film-portfolio`, etc.).
  - **CRITICAL**: **NEVER modify files directly in `templates/`**.
- **`projects/`**: Holds all **client redesigns and customized production websites** (`projects/dans-burgers`, `projects/fabroar`, `projects/superfan-redesign`, etc.).

## 2. Standard Website Redesign Workflow

Whenever a request asks to redesign, rebrand, or create a client website clone:
1. **Identify the Template**: Select the best matching template from `templates/<template-name>/`. If no suitable template exists, **build a new template on the go** in `templates/` before proceeding.
2. **Clone to Projects**: Copy the template to `projects/<client-slug>/` (excluding `.next`, `node_modules`, `.vercel`).
3. **Install Dependencies**: Run `npm install` in `projects/<client-slug>/`.
4. **Overlay Assets & Content**: Update **only** the target website's assets, branding, colors, typography, menu/data, components, copy, images, contact info, and metadata **inside `projects/<client-slug>/`**. Do not redesign from scratch.
5. **Verify**: Run `npm run typecheck` and `npm run build` in `projects/<client-slug>/`. Confirm `templates/` is 100% clean.
