# `/e2e` Architecture

Contains the automated end-to-end testing suite powered by Playwright.

## Files
- **`fixtures.ts`**: Defines reusable testing fixtures that setup the environment (like launching the Chrome extension).

## Folders
- `/flows`: Tests that cover full user interaction flows.
- `/integration`: Tests for specific architecture integrations, mocking dependencies and ensuring listeners fire correctly.
- `/pop-up`: Tests specifically targeting the popup UI.
- `/test-services`: Mocking and utility services (like `playwright-browser-message-service.ts`) used to validate extension behavior in a headless browser environment.
