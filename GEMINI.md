# Frontend Pipeline System Guidelines

## Core Directory Roles

- **`templates/`**: Pure, reusable design templates. Read-only during client website redesigns. Never edit base templates.
- **`projects/`**: All customized client website clones and redesigns (e.g. `projects/dans-burgers/`, `projects/fabroar/`).
- **`pipeline/`**: Lead generation, auditing, and automated design generation pipelines.

## Redesign Execution Workflow

1. Choose the best matching existing template from `templates/`, or **build a new template on the go** if none fits.
2. Copy the template to `projects/<project_name>/`.
3. **Overlay only the target website's assets and content**: logo, colors, images, menu, locations, history, contact info, copy, and metadata. Do not redesign from scratch.
4. Validate builds with `npm run typecheck` and `npm run build` in `projects/<project_name>/`.
