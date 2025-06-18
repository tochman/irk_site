/* eslint-disable no-undef */
import { defineConfig } from "cypress";
import codeCoverageTask from "@cypress/code-coverage/task.js";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:5173",
    chromeWebSecurity: false,
    video: false, // Disable video recording to speed up tests
    screenshotOnRunFailure: true, // Keep screenshots on failure
    retries: {
      runMode: 1, // Reduce retry count to speed up tests
      openMode: 0 // Don't retry in interactive mode
    },
    experimentalRunAllSpecs: true,
    experimentalMemoryManagement: true,
    defaultCommandTimeout: 5000, // Reduce default timeout for faster failures
    pageLoadTimeout: 10000, // Reduce page load timeout
    requestTimeout: 5000, // Reduce API request timeout
    numTestsKeptInMemory: 5, // Reduce memory usage

    setupNodeEvents(on, config) {
      // Only setup code coverage if not explicitly disabled
      if (process.env.DISABLE_COVERAGE !== 'true') {
        codeCoverageTask(on, config);
      }
      return config;
    },
  },
});
