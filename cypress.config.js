const { defineConfig } = require('cypress');
const { reporters } = require('mocha');

module.exports = defineConfig({
	reporter: 'mochawesome',
	reporterOptions: {
		reportDir: 'cypress/results',
		overwrite: false,
		html: false,
		json: true
	},
	// viewportWidth: 717,
	// viewportHeight: 916,
	e2e: {
		baseUrl: 'https://demoqa.com',
		testIsolation: false,

		setupNodeEvents(on, config) {
			// implement node event listeners here
		}
	}
});
