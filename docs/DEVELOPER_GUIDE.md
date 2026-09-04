# Developer Guide

This document is the working map for the Pick It Up website repository. It explains what each tracked project file does, how the frontend and Sanity Studio fit together, and whether a developer should normally edit the file.

## Edit-status legend

- **Edit**: normal application or content-model work belongs here.
- **Edit carefully**: edit only when changing configuration, infrastructure, or a shared contract.
- **Generated**: change the source that produces this file, then regenerate it.
- **Managed**: update through the relevant package manager or service rather than editing by hand.
- **Asset**: replace or add when the visual asset itself changes.
- **Do not edit**: a marker or installed/generated file that should remain untouched.

## How the project is organized

- `frontend/` is the Next.js application. Routes live directly under `frontend/app/`; reusable UI is under `frontend/app/components/`; Sanity access is under `frontend/sanity/lib/`.
- `studio/` is the Sanity Studio. Document and object schemas live under `studio/src/schemaTypes/`.
- The root workspace runs both packages through npm workspaces and Turborepo.
- Sanity is the content source. The Studio schema defines the content shape, GROQ queries select it, generated TypeScript types describe it, and Next.js components render it.

## Normal developer workflow

1. Install Node.js and dependencies with `npm install` at the repository root.
2. Copy `frontend/.env.example` to `frontend/.env.local` and provide the Sanity project values. Never commit secrets.
3. Run both applications with `npm run dev`, or use `npm run dev:next` and `npm run dev:studio` separately.
4. For a content-model change, edit the Studio schema first, run the type-generation scripts, then update queries and rendering code.
5. For a new page, add a route under `frontend/app/`, add or reuse components, and add any required GROQ query in `frontend/sanity/lib/queries.ts`.
6. Run `npm run lint` and `npm run type-check` from the root before opening a pull request.
7. Run `npm run build` in the relevant workspace when changing deployment, routing, or production-only behavior.

### Content-model change flow

1. Edit the relevant schema in `studio/src/schemaTypes/`.
2. Register a new schema in `studio/src/schemaTypes/index.ts` if needed.
3. Run `npm run type-check` or the package `sanity:typegen` script. This extracts `sanity.schema.json` and regenerates both type files.
4. Update GROQ in `frontend/sanity/lib/queries.ts` and the consuming page/component.
5. Test the Studio editor and the rendered frontend with real and empty content.

Do not hand-edit `sanity.schema.json`, `frontend/sanity.types.ts`, or `studio/sanity.types.ts`.

## Root files

| Path                                  | What it does                                                                                                              | Developer action                                                                                          |
| ------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| `package.json`                        | Defines the npm workspaces and root commands for development, formatting, linting, type checking, and sample-data import. | **Edit** when workspace commands or shared tooling change.                                                |
| `package-lock.json`                   | Locks the complete npm dependency tree.                                                                                   | **Managed**; update through npm, never by hand.                                                           |
| `turbo.json`                          | Defines task dependencies and caching; frontend development depends on Sanity type generation.                            | **Edit carefully** when task ordering or caching changes.                                                 |
| `README.md`                           | Project overview and product goals.                                                                                       | **Edit** when the product scope or entry-point setup changes. Keep detailed file ownership in this guide. |
| `CONTRIBUTING.md`                     | Branching, setup, validation, and pull-request workflow.                                                                  | **Edit** when team workflow changes.                                                                      |
| `requirements.txt`                    | A short Node.js/npm prerequisite note; it is not a Python dependency file.                                                | **Edit carefully**; update only when prerequisites change.                                                |
| `vercel-installation-instructions.md` | Deployment and environment-variable instructions for Vercel and Sanity.                                                   | **Edit** when hosting or deployment steps change.                                                         |
| `AGENTS.md`                           | Requires reading the installed Next.js documentation before Next.js work.                                                 | **Edit carefully**; this controls agent behavior.                                                         |
| `CLAUDE.md`                           | Points Claude-based tooling to `AGENTS.md`.                                                                               | **Edit carefully**; keep it aligned with repository guidance.                                             |
| `.gitignore`                          | Excludes secrets, dependencies, builds, and local generated output from Git.                                              | **Edit carefully** when adding a new local-only or generated path.                                        |
| `.prettierignore`                     | Excludes selected files from Prettier.                                                                                    | **Edit carefully**; avoid hiding source files from formatting.                                            |
| `sanity.schema.json`                  | Extracted Sanity schema used as an input to frontend type generation.                                                     | **Generated**; edit Studio schemas instead.                                                               |
| `skills-lock.json`                    | Lock metadata for the repository's checked-in agent skill.                                                                | **Managed**; change only when updating that skill.                                                        |
| `sanity-next-preview.png`             | Repository preview image used for project presentation.                                                                   | **Asset**; replace only when branding changes.                                                            |

## Repository support files

| Path                                                                           | What it does                                                                  | Developer action                                                             |
| ------------------------------------------------------------------------------ | ----------------------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| `.github/CODEOWNERS`                                                           | Assigns ownership for review.                                                 | **Edit carefully** when ownership changes.                                   |
| `.github/renovate.json`                                                        | Configures automated dependency update behavior.                              | **Edit carefully** when update policy changes.                               |
| `.github/PULL_REQUEST_TEMPLATE.md`                                             | Prompts authors for useful pull-request details.                              | **Edit** when review requirements change.                                    |
| `.github/ISSUE_TEMPLATE/bug_report.md`                                         | Bug-report form.                                                              | **Edit** when bug triage needs change.                                       |
| `.github/ISSUE_TEMPLATE/feature.md`                                            | Feature-request form.                                                         | **Edit** when product planning needs change.                                 |
| `.github/ISSUE_TEMPLATE/question.md`                                           | Question form.                                                                | **Edit** when support prompts need change.                                   |
| `.agents/skills/sanity-live-cache-components/SKILL.md`                         | Local agent guidance for Sanity Live, caching, layouts, and dynamic segments. | **Edit carefully**; update only when the recommended implementation changes. |
| `.agents/skills/sanity-live-cache-components/reference/layouts.md`             | Reference patterns for layouts and cached content.                            | **Edit carefully**.                                                          |
| `.agents/skills/sanity-live-cache-components/reference/dynamic-segments.md`    | Reference patterns for dynamic route segments.                                | **Edit carefully**.                                                          |
| `.agents/skills/sanity-live-cache-components/reference/live-helpers.md`        | Reference for Sanity Live helpers.                                            | **Edit carefully**.                                                          |
| `.agents/skills/sanity-live-cache-components/reference/three-layer-pattern.md` | Reference for separating data, cache, and UI layers.                          | **Edit carefully**.                                                          |
| `node_modules/`                                                                | Installed dependencies.                                                       | **Do not edit**; recreate with `npm install`.                                |

## Frontend configuration

| Path                          | What it does                                                                                        | Developer action                                                            |
| ----------------------------- | --------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------- |
| `frontend/package.json`       | Frontend scripts and dependencies, including Next.js, React, Sanity, Tailwind, and type generation. | **Edit** when frontend packages or commands change.                         |
| `frontend/next.config.ts`     | Next.js configuration, including permitted Sanity image domains.                                    | **Edit carefully** when Next.js or image-host behavior changes.             |
| `frontend/tsconfig.json`      | Strict TypeScript settings, Next.js plugin, and `@/*` path alias.                                   | **Edit carefully** when compiler or alias behavior changes.                 |
| `frontend/eslint.config.mjs`  | Frontend ESLint rules and generated-file exclusions.                                                | **Edit carefully** when lint policy changes.                                |
| `frontend/tailwind.config.ts` | Tailwind content paths, theme colors, typography, and fonts.                                        | **Edit** for design-system changes.                                         |
| `frontend/postcss.config.mjs` | Connects Tailwind to PostCSS.                                                                       | **Edit carefully**; most styling changes belong in CSS or components.       |
| `frontend/vercel.json`        | Tells Vercel this workspace is a Next.js application.                                               | **Edit carefully** for deployment changes.                                  |
| `frontend/sanity.cli.ts`      | Frontend Sanity project settings and type-generation destination.                                   | **Edit carefully** when Sanity project setup changes.                       |
| `frontend/.env.example`       | Documents required frontend environment variables.                                                  | **Edit** when environment requirements change; never put real secrets here. |
| `frontend/.gitignore`         | Frontend-specific local/build exclusions.                                                           | **Edit carefully**.                                                         |
| `frontend/.prettierignore`    | Frontend-specific formatting exclusions.                                                            | **Edit carefully**.                                                         |
| `frontend/README.md`          | Frontend setup notes and template guidance.                                                         | **Edit** when frontend setup or structure changes.                          |

## Frontend routes and application shell

| Path                                          | What it does                                                                                    | Developer action                                                  |
| --------------------------------------------- | ----------------------------------------------------------------------------------------------- | ----------------------------------------------------------------- |
| `frontend/app/layout.tsx`                     | Root layout, metadata, fonts, draft-mode UI, Sanity Live, header, footer, and global providers. | **Edit** for site-wide shell or metadata changes.                 |
| `frontend/app/page.tsx`                       | Home route; fetches settings and posts, then renders the homepage.                              | **Edit** for homepage composition or data needs.                  |
| `frontend/app/[slug]/page.tsx`                | Renders Sanity pages by slug, including metadata and page-builder blocks.                       | **Edit** when page routing or page rendering changes.             |
| `frontend/app/posts/[slug]/page.tsx`          | Renders a post, author, cover image, Portable Text body, and related posts.                     | **Edit** for article behavior.                                    |
| `frontend/app/events/`                        | Directory reserved for events. It currently has no route implementation.                        | **Edit** only when implementing the events feature.               |
| `frontend/app/events/[slug]/`                 | Reserved dynamic event route directory; currently empty.                                        | **Edit** only when implementing event routes.                     |
| `frontend/app/sitemap.ts`                     | Builds sitemap entries from Sanity pages and posts.                                             | **Edit carefully** when adding indexable content types or routes. |
| `frontend/app/api/draft-mode/enable/route.ts` | Enables Next.js draft mode for Sanity Presentation Tool previews.                               | **Edit carefully**; preserve preview security and behavior.       |
| `frontend/app/actions.ts`                     | Server action that disables draft mode.                                                         | **Edit carefully**.                                               |
| `frontend/app/client-utils.ts`                | Client-side handling for Sanity/CORS errors and notifications.                                  | **Edit carefully** when client error behavior changes.            |
| `frontend/app/favicon.ico`                    | Browser favicon.                                                                                | **Asset**; replace for branding changes.                          |

## Frontend reusable components

| Path                                          | What it does                                                                   | Developer action                                                            |
| --------------------------------------------- | ------------------------------------------------------------------------------ | --------------------------------------------------------------------------- |
| `frontend/app/components/Posts.tsx`           | Queries and renders all or recent post cards.                                  | **Edit** when post listings change.                                         |
| `frontend/app/components/PageBuilder.tsx`     | Renders Sanity page-builder content with live/optimistic updates.              | **Edit carefully** when page-builder behavior changes.                      |
| `frontend/app/components/BlockRenderer.tsx`   | Maps Sanity block types to React components.                                   | **Edit** when adding a page-builder block; update its schema and types too. |
| `frontend/app/components/Cta.tsx`             | Renders a call-to-action block with text, button, image, theme, and alignment. | **Edit** for CTA presentation.                                              |
| `frontend/app/components/InfoSection.tsx`     | Renders an informational heading, subheading, and rich text body.              | **Edit** for info-section presentation.                                     |
| `frontend/app/components/PortableText.tsx`    | Renders Sanity rich text, images, heading anchors, and resolved links.         | **Edit carefully**; changes affect every rich-text field.                   |
| `frontend/app/components/ResolvedLink.tsx`    | Converts Sanity URL, page, and post references into usable links.              | **Edit carefully**; preserve internal/external link behavior.               |
| `frontend/app/components/SanityImage.tsx`     | Provides the frontend wrapper for Sanity CDN images.                           | **Edit carefully** when image loading or sizing changes.                    |
| `frontend/app/components/Avatar.tsx`          | Displays an author image, name, and date.                                      | **Edit** for author metadata presentation.                                  |
| `frontend/app/components/Date.tsx`            | Formats dates with `date-fns`.                                                 | **Edit carefully** because all displayed dates may change.                  |
| `frontend/app/components/Onboarding.tsx`      | Shows starter guidance when pages or posts are missing.                        | **Edit** when empty-state behavior changes.                                 |
| `frontend/app/components/DraftModeToast.tsx`  | Shows preview-mode status and provides a way to leave draft mode.              | **Edit carefully**.                                                         |
| `frontend/app/components/GetStartedCode.tsx`  | Displays and copies a starter command.                                         | **Edit** if onboarding commands change.                                     |
| `frontend/app/components/SideBySideIcons.tsx` | Displays the decorative Sanity/Next.js starter icon composition.               | **Edit or remove** when replacing starter branding.                         |

## Frontend presentation and styling

| Path                                         | What it does                                                                            | Developer action                                                                            |
| -------------------------------------------- | --------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------- |
| `frontend/html/Header.tsx`                   | Site header with the home link, About link, and starter Sanity link.                    | **Edit** for navigation and branding.                                                       |
| `frontend/html/Footer.tsx`                   | Site footer with starter links and tile background.                                     | **Edit** for footer content and branding.                                                   |
| `frontend/html/HomePage.tsx`                 | Starter homepage hero, description, setup snippet, and post area.                       | **Edit** for the actual Pick It Up homepage experience.                                     |
| `frontend/html/README.md`                    | Explains the separation between presentational templates and data access.               | **Edit carefully** when that boundary changes.                                              |
| `frontend/css/globals.css`                   | Tailwind setup and global/base styles, including starter and class-based layout styles. | **Edit** for global visual design; remove stale starter styles when replacing the template. |
| `frontend/css/README.md`                     | Explains global stylesheet ownership.                                                   | **Edit carefully**.                                                                         |
| `frontend/public/images/tile-grid-white.png` | White tile-grid starter background.                                                     | **Asset**; replace/remove with design approval.                                             |
| `frontend/public/images/tile-grid-black.png` | Black tile-grid starter background.                                                     | **Asset**; replace/remove with design approval.                                             |
| `frontend/public/images/tile-1-white.png`    | White single-tile starter background.                                                   | **Asset**; replace/remove with design approval.                                             |
| `frontend/public/images/tile-1-black.png`    | Black single-tile starter background.                                                   | **Asset**; replace/remove with design approval.                                             |

## Frontend Sanity integration

| Path                             | What it does                                                                         | Developer action                                                       |
| -------------------------------- | ------------------------------------------------------------------------------------ | ---------------------------------------------------------------------- |
| `frontend/sanity/lib/api.ts`     | Validates project/dataset environment values and exposes API version and Studio URL. | **Edit carefully** when Sanity environment behavior changes.           |
| `frontend/sanity/lib/client.ts`  | Configures the Sanity client, CDN usage, perspective, token, and stega settings.     | **Edit carefully**; review caching and secret handling.                |
| `frontend/sanity/lib/live.ts`    | Exports `sanityFetch` and `SanityLive` for live content and visual editing.          | **Edit carefully**; this controls data freshness and preview behavior. |
| `frontend/sanity/lib/queries.ts` | Contains GROQ for settings, pages, posts, slugs, sitemap entries, and related posts. | **Edit** when data requirements change; regenerate types afterward.    |
| `frontend/sanity/lib/token.ts`   | Validates the server-only Sanity read token.                                         | **Edit carefully**; never expose the token to the client.              |
| `frontend/sanity/lib/types.ts`   | Defines helper types for page-builder blocks and dereferenced links.                 | **Edit** when query/component contracts change.                        |
| `frontend/sanity/lib/utils.ts`   | Builds Sanity image URLs, Open Graph metadata, links, and data attributes.           | **Edit carefully** because several features depend on these helpers.   |
| `frontend/sanity/lib/demo.ts`    | Provides fallback starter title, description, and Open Graph text.                   | **Edit** when fallback branding changes.                               |

## Generated frontend files

| Path                       | What it does                                                   | Developer action                                |
| -------------------------- | -------------------------------------------------------------- | ----------------------------------------------- |
| `frontend/next-env.d.ts`   | Next.js-generated environment and route/image type references. | **Generated**; never edit.                      |
| `frontend/sanity.types.ts` | TypeGen output from the extracted schema and GROQ queries.     | **Generated**; edit schemas or queries instead. |
| `frontend/.next/`          | Next.js build, cache, and generated output when present.       | **Generated**; never edit or commit.            |
| `frontend/out/`            | Static export output when generated.                           | **Generated**; never edit or commit.            |
| `frontend/.sanity/`        | Local Sanity tooling output when generated.                    | **Generated**; never edit or commit.            |

## Studio configuration and structure

| Path                              | What it does                                                                                              | Developer action                                               |
| --------------------------------- | --------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------- |
| `studio/package.json`             | Studio scripts for development, build, deploy, type checking, and type generation.                        | **Edit** when Studio packages or commands change.              |
| `studio/sanity.config.ts`         | Configures project ID, dataset, plugins, Presentation Tool, Structure Tool, Unsplash, Assist, and Vision. | **Edit** for Studio behavior and plugins.                      |
| `studio/sanity.cli.ts`            | Sanity CLI project/host configuration and type-generation destination.                                    | **Edit carefully** for CLI or deployment changes.              |
| `studio/tsconfig.json`            | Studio TypeScript settings.                                                                               | **Edit carefully**.                                            |
| `studio/.eslintrc`                | Studio ESLint configuration.                                                                              | **Edit carefully**.                                            |
| `studio/README.md`                | Sanity starter instructions.                                                                              | **Edit** to keep Studio setup project-specific.                |
| `studio/.gitignore`               | Studio-specific local/build exclusions.                                                                   | **Edit carefully**.                                            |
| `studio/src/schemaTypes/index.ts` | Registers every document, singleton, and object schema with Sanity.                                       | **Edit** when adding or removing schema types.                 |
| `studio/src/structure/index.ts`   | Defines the Studio navigation and the Site Settings singleton entry.                                      | **Edit** when Studio navigation or singleton behavior changes. |
| `studio/src/lib/initialValues.ts` | Supplies initial values for new Settings content.                                                         | **Edit** when default settings change.                         |

## Studio document schemas

| Path                                             | What it does                                                                                    | Developer action                           |
| ------------------------------------------------ | ----------------------------------------------------------------------------------------------- | ------------------------------------------ |
| `studio/src/schemaTypes/documents/person.ts`     | Defines people with first name, last name, and validated image alt text.                        | **Edit** when author/person fields change. |
| `studio/src/schemaTypes/documents/page.ts`       | Defines pages with name, slug, heading, subheading, and page-builder blocks.                    | **Edit** when page structure changes.      |
| `studio/src/schemaTypes/documents/post.ts`       | Defines posts with title, slug, rich content, excerpt, cover image, date, and author reference. | **Edit** when article fields change.       |
| `studio/src/schemaTypes/singletons/settings.tsx` | Defines site settings, description, Open Graph image, and metadata base URL.                    | **Edit** when global site settings change. |

## Studio object schemas

| Path                                                      | What it does                                                  | Developer action                                              |
| --------------------------------------------------------- | ------------------------------------------------------------- | ------------------------------------------------------------- |
| `studio/src/schemaTypes/objects/button.ts`                | Defines CTA button text and link.                             | **Edit** when button data changes.                            |
| `studio/src/schemaTypes/objects/link.ts`                  | Defines URL, page, or post links and new-tab behavior.        | **Edit carefully** because links are used by multiple blocks. |
| `studio/src/schemaTypes/objects/callToAction.ts`          | Defines CTA content, image, button, theme, and content order. | **Edit** when adding or changing CTA options.                 |
| `studio/src/schemaTypes/objects/infoSection.ts`           | Defines informational heading and rich content.               | **Edit** when the info block changes.                         |
| `studio/src/schemaTypes/objects/blockContent.tsx`         | Defines full rich text with images and annotated links.       | **Edit carefully** because it affects posts and page content. |
| `studio/src/schemaTypes/objects/blockContentTextOnly.tsx` | Defines a simplified text-only rich-text field.               | **Edit carefully** when text formatting rules change.         |
| `studio/sanity.types.ts`                                  | Studio TypeGen output for the schema.                         | **Generated**; never edit by hand.                            |

## Studio assets and generated output

| Path                                                      | What it does                                                      | Developer action                                          |
| --------------------------------------------------------- | ----------------------------------------------------------------- | --------------------------------------------------------- |
| `studio/static/page-builder-thumbnails/callToAction.webp` | Picker thumbnail for the CTA page-builder block.                  | **Asset**; update when the block preview changes.         |
| `studio/static/page-builder-thumbnails/infoSection.webp`  | Picker thumbnail for the info-section page-builder block.         | **Asset**; update when the block preview changes.         |
| `studio/static/.gitkeep`                                  | Keeps the static directory in version control.                    | **Do not edit** unless the directory strategy changes.    |
| `studio/sample-data.tar.gz`                               | Importable sample Sanity dataset used by the root import command. | **Managed**; regenerate only when sample content changes. |
| `studio/.sanity/`                                         | Local Sanity CLI state when generated.                            | **Generated**; never edit or commit.                      |
| `studio/dist/`                                            | Built Studio output when generated.                               | **Generated**; never edit or commit.                      |

## What is currently implemented

The current codebase has settings, pages, posts, people, CTA blocks, info sections, draft mode, live Sanity updates, and a homepage/post flow. The following items are described in the product README but are not currently represented by matching implementation: events, statistics, team-member content as a dedicated feature, signup embeds, video backgrounds, and Pick It Up contact details in the footer. There is also no implemented event route under `frontend/app/events/`.

When implementing one of those features, update the relevant Studio schema, registration, generated types, GROQ query, frontend route/component, sitemap behavior, and this guide together.

## Files developers should usually avoid editing

Do not hand-edit `node_modules/`, `.next/`, `out/`, `.sanity/`, `frontend/next-env.d.ts`, `frontend/sanity.types.ts`, `studio/sanity.types.ts`, `sanity.schema.json`, or `package-lock.json`. These files are generated or managed. Change their source configuration or use npm/Sanity commands instead.
