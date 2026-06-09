---
name: shadcn-rules
description: "Rules for adding shadcn/ui components to this project. ALWAYS use the CLI — never create component files manually."
---

# shadcn/ui Component Rules

## The Golden Rule

**Never create shadcn/ui component files by hand.** Always run the CLI to add components. The CLI reads `components.json`, applies the correct style (`radix-lyra`), base color (`mauve`), path aliases, and writes the file to the right location automatically. Manually written components will diverge from the design system.

## CLI Command

Run from `apps/frontend/` (or use `-c` to point at the config):

```bash
# From apps/frontend/
pnpm dlx shadcn@latest add <component-name>

# From repo root
pnpm dlx shadcn@latest add <component-name> -c apps/frontend/components.json
```

Examples:

```bash
pnpm dlx shadcn@latest add dialog
pnpm dlx shadcn@latest add table
pnpm dlx shadcn@latest add form
pnpm dlx shadcn@latest add card badge avatar
```

Multiple components can be added in one command.

## Project Config (`components.json`)

| Setting | Value |
|---|---|
| Style | `radix-lyra` |
| Base color | `mauve` |
| CSS variables | `true` |
| Icon library | `lucide` |
| Components land in | `app/components/ui/` (alias `~/components/ui`) |
| Utils | `~/lib/utils` (`cn()` helper) |

## After Adding a Component

- Import from `~/components/ui/<component>` using the `~` alias.
- Use `cn()` from `~/lib/utils` for conditional class merging — never string-concatenate Tailwind classes.
- Do not edit generated files in `app/components/ui/` unless you have a project-specific reason. Customise by wrapping the primitive, not by modifying it.

## What NOT to Do

- Do not copy-paste component code from the shadcn docs into a new file.
- Do not write a `Button.tsx` (or any other UI primitive) from scratch.
- Do not change the style, base color, or icon library without updating `components.json` and regenerating affected components.
- Do not import from `@radix-ui/*` directly in page/feature code — always go through the generated shadcn wrapper.
