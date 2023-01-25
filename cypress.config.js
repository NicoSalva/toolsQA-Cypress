const { defineConfig } = require('cypress');

module.exports = defineConfig({
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
