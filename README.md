# Playwright AI Framework

A simple end-to-end testing framework built with Playwright. This project demonstrates automated testing practices using the Playwright test runner with TypeScript.

## What's Inside

This is a testing framework designed to run automated browser tests. It's configured to test against [Sauce Demo](https://www.saucedemo.com), a demo web application perfect for learning test automation.

## Getting Started

### Prerequisites
- Node.js installed on your machine

### Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

## Running Tests

### Run all tests
```bash
npm test
```

### Run tests in headed mode (see the browser)
```bash
npm run test:headed
```

### Run specific e2e tests
```bash
npm run test:e2e
```

### View test report
```bash
npm run report
```

## Project Structure

```
tests/          - All test files go here
pages/          - Page objects and helper functions
playwright.config.ts  - Playwright configuration
package.json    - Project dependencies and scripts
```

## Configuration

The framework is set up with:
- **Browser**: Google Chrome
- **Timeout**: 90 seconds per test
- **Retries**: Automatic retry on failure (1 attempt)
- **Screenshots & Videos**: Captured only when tests fail
- **Headless Mode**: Enabled by default (disabled with `--headed` flag)

## Built With

- [Playwright](https://playwright.dev/) - Modern cross-browser testing framework
- TypeScript - For type-safe test code

## License

ISC
