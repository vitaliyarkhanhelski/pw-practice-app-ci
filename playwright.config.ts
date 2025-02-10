import { EyesFixture } from '@applitools/eyes-playwright/fixture';
import { defineConfig, devices } from '@playwright/test';

export default defineConfig<EyesFixture>({
  // reporter: [['@applitools/eyes-playwright/reporter'], ['html']],
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [
    process.env.CI ? ["dot"] : ["list"],
    [
      "@argos-ci/playwright/reporter",
      {
        // Upload to Argos on CI only.
        uploadToArgos: !!process.env.CI,

        // Set your Argos token (required if not using GitHub Actions).
        token: "argos_ca5875f05e2169a54d113f802f9e42a9bc",
      },
    ],
    ['html']
  ],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Configuration for Eyes VisualAI */
    eyesConfig: {
      /* The following and other configuration parameters are documented at: https://applitools.com/tutorials/playwright/api/overview */
      apiKey: 'VO2c1018cETmdGccHvriqJRYfKqDWH0MpOOXCv4jlcgfg110', // alternatively, set this via environment variable APPLITOOLS_API_KEY
      appName: 'Hello World',
      // serverUrl: 'https://eyes.applitools.com',

      // failTestsOnDiff: false,
      // appName: 'My App',
      // matchLevel: 'Strict',
      // batch: { name: 'My Batch' },
      // proxy: {url: 'http://127.0.0.1:8888'},
      // stitchMode: 'CSS',
      // matchTimeout: 0,
      // waitBeforeScreenshots: 50,
      // saveNewTests: true,
    },

    /* Base URL to use in actions like `await page.goto('/')`. */
    // baseURL: 'http://127.0.0.1:3000',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
    baseURL: 'http://localhost:4200/',
    screenshot: "only-on-failure",
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    /* {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    }, */

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  webServer: {
    command: 'npm run start',
    url: 'http://localhost:4200/',
    timeout: 120000,
    // reuseExistingServer: !process.env.CI,
  },
});


//ARGOS_TOKEN=argos_ca5875f05e2169a54d113f802f9e42a9bc