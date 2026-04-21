# Playwright Functional Tests

This directory contains end-to-end integration tests for the Chrome extension using Playwright.

## Setup

Playwright has been configured for Chrome extension testing with:

- **Playwright**: Installed and configured
- **Chromium browser**: Downloaded and ready
- **Test fixtures**: Custom fixtures for loading the extension
- **TypeScript**: Configured for Playwright tests

## Running Tests

```bash
# Run all integration tests
npm run test:e2e

# Run tests with UI mode (interactive)
npm run test:e2e:ui

# Run specific test file
npx playwright test on-click-set-current-tab-default-url.test.ts
```

## Test Structure

Functional tests are organized by feature:

```
tests/integration/
├── fixtures.ts                    # Shared test fixtures for extension loading
├── features/                      # Feature-specific tests
│   └── default-url/
│       └── presentation/
│           └── background/
│               └── context-menu-listeners/
│                   ├── on-click-set-current-tab-default-url.test.ts
│                   ├── on-click-clear-current-tab-default-url.test.ts
│                   └── on-click-reset-current-tab-to-default-url.test.ts
└── tsconfig.json                  # TypeScript config for integration tests
```

## Writing Tests

### Import Fixtures

```typescript
import { test, expect } from '../../../../../../fixtures.ts';
```

### Basic Test Template

```typescript
test.describe('Feature Name', () => {
  let page: Page;

  test.beforeEach(async ({ context }) => {
    page = await context.newPage();
    await page.goto('https://example.com');
  });

  test.afterEach(async () => {
    await page.close();
  });

  test('should do something', async ({ context, extensionId }) => {
   // Your test logic here
  });
});
```

## Fixtures Available

- `context`: Browser context with the extension loaded
- `extensionId`: The ID of the loaded Chrome extension
- `page`: Manually created in beforeEach for each test

## Notes

- Extension must be built (`npm run build`) before running integration tests
- Tests run in headful mode (required for Chrome extensions)
- TypeScript import resolution may show errors in IDE but tests will run correctly

## Troubleshooting

### Extension not loading
- Ensure `npm run build` has been run
- Check that `dist/` folder exists and contains the built extension

### Tests failing
- Check browser console in headful mode for extension errors
- Verify extension is loaded correctly in `chrome://extensions`

### TypeScript errors in IDE
- This is a known issue with relative imports in deep directory structures
- Tests will still run correctly via Playwright CLI
- Alternative: Use absolute import aliases (to be configured)
