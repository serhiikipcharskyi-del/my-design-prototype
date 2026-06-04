@AGENTS.md

# Worktrace Prototype

Front-end-only dashboard prototype using mocked data. No real backend — all data is hardcoded or generated locally.

## Stack

- **Next.js 16** — App Router (`src/app/`)
- **React 19** + **TypeScript**
- **Tailwind CSS v4** — tokens defined in `src/app/globals.css` via `@theme`
- **Storybook 10** — component development and visual testing
- **Figma MCP** — design context via the Worktrace AI Platform Design file
- **Mock data only** — no API calls, no database

## Common Commands

```bash
npm run dev          # Start Next.js dev server → http://localhost:3000
npm run storybook    # Start Storybook → http://localhost:6006
npm run build        # Production build
npm run lint         # ESLint
```

## Workflow Orchestration

- **Use Plan Mode** (`Shift+Tab`) for any non-trivial task before writing code. Review the plan before approving execution.
- **Switch modes with `Shift+Tab`**, not by running extra commands.
- **Build complex pages in layers**: shared layout and sidebar first → reusable components → full page assembly.
- **Use separate terminals when helpful**: one Claude session for components, one for pages, one for servers. Claude can keep the dev server or Storybook running in one terminal while you continue working in another.
- **Visual refinement**: paste screenshots and describe the issues in text so Claude can match the design more closely.
- **Figma context**: never invent design details when Figma context is incomplete. Ask for a smaller frame or an additional screenshot instead of guessing.
