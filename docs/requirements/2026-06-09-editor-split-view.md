# Editor Split View — Requirements

**Date:** 2026-06-09  
**Status:** Ready for implementation

## Overview

A `/editor` route with a resizable split-pane layout: left pane is a Tiptap rich-text editor, right pane is a live HTML preview. A "Preview in Full" button opens the rendered content in a new tab.

## Route & File Structure

- `app/routes/editor.tsx` — thin route wrapper with `meta`, delegates to page component
- `app/pages/editor/index.tsx` — split-view shell using `WithSidebar`
- `app/pages/editor/EditorPane.tsx` — Tiptap editor instance + toolbar
- `app/pages/editor/PreviewPane.tsx` — renders Tiptap HTML output with prose styles
- `app/pages/editor/Toolbar.tsx` — formatting action buttons

## Split Pane Behavior

- Library: `react-resizable-panels`
- Default split: 50/50
- User can drag the divider handle to resize panes
- Handle styled to match the mauve shadcn/ui theme

## Editor (Tiptap)

- Library: `@tiptap/react` + `@tiptap/starter-kit`
- Toolbar — Standard formatting set:
  - Bold, Italic
  - Heading H1, H2, H3
  - Bullet list, Ordered list
  - Blockquote
  - Code block
  - Horizontal rule
  - Links

## Preview Pane

- Renders `editor.getHTML()` via `dangerouslySetInnerHTML`
- Styled with `@tailwindcss/typography` (`prose` class) for readable output
- Pane header contains a "Preview in Full" button (top-right)

## Preview in Full

- Button opens `window.open('/editor/preview', '_blank')`
- Content passed via `localStorage` (no backend yet)
- `/editor/preview` route reads from `localStorage` and renders the full prose view

## Dependencies to Install

```bash
pnpm add @tiptap/react @tiptap/starter-kit @tiptap/extension-link react-resizable-panels
pnpm add -D @tailwindcss/typography
```
