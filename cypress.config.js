const { defineConfig } = require('cypress');
const { reporters } = require('mocha');

module.exports = defineConfig({
	reporter: 'mochawesome',
	reporterOptions: {
		reportDir: 'cypress/results',
		overwrite: false,
		html: true,
		json: true
	},

	e2e: {
		baseUrl: 'https://demoqa.com',
		testIsolation: false,

		setupNodeEvents(on, config) {}
	}
});
