# Playwright Tests

This directory contains end-to-end tests for the Scriptae blog application using Playwright.

## Test Files

- **home.spec.ts** - Tests for the homepage functionality
  - Blog title and description display
  - Post list rendering
  - Pagination controls
  - Post navigation
  - Theme switcher

- **pagination.spec.ts** - Tests for pagination features
  - Show All button
  - Posts limit input
  - Newer/Older posts navigation
  - Pagination visibility

- **post.spec.ts** - Tests for individual post pages
  - Post content rendering
  - Back button navigation
  - Markdown rendering (headings, paragraphs, links)

- **code-blocks.spec.ts** - Tests for code block rendering
  - Syntax highlighting
  - Line numbers
  - Green gutter line
  - Monaco font
  - Inline vs block code styling

- **theme.spec.ts** - Tests for theme switching
  - Light/Dark theme toggle
  - Color variable changes
  - Theme persistence
  - Theme consistency across pages
  - Code block theme support

## Running Tests

```bash
# Run all tests (headless)
npm test

# Run tests with UI mode (interactive)
npm run test:ui

# Run tests in headed mode (see browser)
npm run test:headed

# Debug tests
npm run test:debug

# Run specific test file
npx playwright test home.spec.ts

# Run tests in specific browser
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit
```

## Test Configuration

Tests are configured in `playwright.config.ts`:
- **Base URL**: http://localhost:5173
- **Browsers**: Chromium, Firefox, WebKit
- **Test Directory**: ./tests
- **Web Server**: Auto-starts dev server before tests
- **Retries**: 2 on CI, 0 locally
- **Reporters**: HTML report

## Writing New Tests

Follow the existing test structure:
1. Use descriptive test names
2. Group related tests with `test.describe()`
3. Use `test.beforeEach()` for common setup
4. Use proper selectors (prefer data attributes or semantic selectors)
5. Add appropriate waits for dynamic content
6. Test positive and negative cases

## Best Practices

- **Selectors**: Use semantic selectors or data-action attributes
- **Waits**: Use `waitForSelector()` for dynamic content
- **Assertions**: Use Playwright's built-in `expect()` assertions
- **Isolation**: Each test should be independent
- **Cleanup**: No manual cleanup needed, Playwright handles it
- **Timeouts**: Adjust timeouts if needed for slower operations

## CI/CD Integration

Tests are configured to run in CI with:
- Fail-fast on `test.only`
- Retries enabled (2 retries)
- Sequential execution (workers: 1)
- No existing server reuse

## View Test Reports

After running tests, view the HTML report:
```bash
npx playwright show-report
```
