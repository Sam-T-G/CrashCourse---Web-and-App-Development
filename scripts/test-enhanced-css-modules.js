#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

function testEnhancedCSSModules() {
	console.log("🧪 Testing Enhanced CSS Modules...\n");

	const modules = [
		{
			name: "02-css-styling",
			expectedSections: [
				"color-palette",
				"typography",
				"backgrounds",
				"borders",
			],
		},
		{
			name: "03-css-layout",
			expectedSections: ["positioning", "box-model", "centering"],
		},
		{
			name: "04-css-flexbox",
			expectedSections: ["flex-basics", "flex-properties"],
		},
	];

	modules.forEach((module) => {
		console.log(`📝 Testing ${module.name}...`);

		const scriptPath = path.join(
			__dirname,
			"..",
			"traditional-web-stack",
			module.name,
			"script.js"
		);
		const scriptContent = fs.readFileSync(scriptPath, "utf8");

		// Check if code examples exist
		const hasCodeExamples = scriptContent.includes("sectionCodeExamples");
		console.log(
			`   ${hasCodeExamples ? "✅" : "❌"} Code examples: ${
				hasCodeExamples ? "FOUND" : "MISSING"
			}`
		);

		// Check for specific sections
		module.expectedSections.forEach((section) => {
			const hasSection = scriptContent.includes(`"${section}"`);
			console.log(
				`   ${hasSection ? "✅" : "❌"} ${section} example: ${
					hasSection ? "FOUND" : "MISSING"
				}`
			);
		});

		// Check for HTML content in examples
		const hasHTMLContent = scriptContent.includes("<!-- ");
		console.log(
			`   ${hasHTMLContent ? "✅" : "❌"} HTML content: ${
				hasHTMLContent ? "FOUND" : "MISSING"
			}`
		);

		// Check for CSS styles in examples
		const hasCSSContent = scriptContent.includes("<style>");
		console.log(
			`   ${hasCSSContent ? "✅" : "❌"} CSS styles: ${
				hasCSSContent ? "FOUND" : "MISSING"
			}`
		);

		console.log("");
	});

	console.log("🎉 Enhanced CSS modules testing complete!");
}

// Run the test
if (require.main === module) {
	testEnhancedCSSModules();
}

module.exports = { testEnhancedCSSModules };
