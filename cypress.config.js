const { defineConfig } = require("cypress");
// const registerDataSession = require('cypress-data-session/src/plugin')
module.exports = defineConfig({
  projectId: "wumo2i",
  video: true,

  e2e: {
    specPattern: [
      "cypress/e2e/**/*.{js,jsx,ts,tsx}",
      "cypress/demo/**/*.{js,jsx,ts,tsx}",
    ],
    baseUrl: "http://localhost:3000",
    supportFile: "cypress/support/e2e.ts",
    env: {
      users: {
        standard: {
          username: "standard_user",
          password: "secret_sauce",
        },
        lockedout: {
          username: "locked_out_user",
          password: "secret_sauce",
        },
        problemUser: {
          username: "problem_user",
          password: "secret_sauce",
        },
        glitchUser: {
          username: "performance_glitch_user",
          password: "secret_sauce",
        },
      },
      "cypress-watch-and-reload": {
        watch: ["src/**"],
      },
    },
    setupNodeEvents(on, config) {
      // implement node event listeners here
      // registerDataSession(on, config)
      // return config
    },
  },

  component: {
    devServer: {
      framework: "create-react-app",
      bundler: "webpack",
    },
  },
});
