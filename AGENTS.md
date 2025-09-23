# Repository Guidelines

## Project Structure & Module Organization
The Expo Router entry point lives in `app/`, with `_layout.tsx` configuring the shell, `(tabs)/` holding tab screens (history, favorites, settings), and `converter/` serving dynamic category routes. Shared UI primitives sit in `components/`, while `store/index.ts` wires the Zustand state and `hooks/` contains data access helpers. Domain data such as supported unit definitions is centralized in `data/units.ts`, and Jest specs live in `_tests_/`. Static fonts and imagery are under `assets/`; keep new binaries optimized and reference them through `app.config.ts`.

## Build, Test, and Development Commands
Use `npm start` for the Expo dev server, then press the on-screen shortcuts (`a`, `i`, `w`) for platform targets. `npm run android`, `npm run ios`, and `npm run web` launch the server pre-scoped to a platform and are ideal for CI scripts. Run unit tests with `npm test`, and lint the project with `npm run lint`; both commands must pass before opening a pull request. If you need a clean slate, `npm run reset-project` clears caches and reinstalls dependencies.

## Coding Style & Naming Conventions
Write TypeScript with React components using PascalCase filenames (`ConverterScreen.tsx`). Favor 2-space indentation to match the existing codebase. Leverage Expo’s ESLint setup (`eslint.config.js`) and resolve any warnings before committing. Co-locate small helper functions in `utils/` and export them with named exports; avoid default exports unless required by Expo Router conventions.

## Testing Guidelines
Author tests with Jest and React Native Testing Library APIs provided via `jest-expo`; keep shared mocks in `jest.setup.js`. Place new suites in `_tests_/` or next to the feature behind a `.test.ts(x)` suffix. Aim to cover calculation paths in `data/units.ts` and state mutations in `store/` whenever you touch them.

## Commit & Pull Request Guidelines
Recent history favors concise, imperative commit titles (e.g., `feat: add pressure conversions`). Group related changes and avoid bundling formatting-only updates with feature work. Pull requests should outline the motivation, list test commands run, and link any related issues or screenshots for UI tweaks. Ensure CI passes and request a review before merging.

## Environment & Configuration Tips
`app.config.ts` holds bundle identifiers and splash assets; update both iOS and Android blocks when changing app identity. Prefer `.env`-style secrets managed through Expo’s EAS when sensitive data is required; never hard-code keys in the repo. When adding fonts or images, register them in `assets/` and preload via the existing splash configuration to avoid runtime flashes.
