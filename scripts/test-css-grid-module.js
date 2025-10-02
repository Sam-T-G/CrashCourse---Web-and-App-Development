#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

function testCSSGridModule() {
	console.log("🧪 Testing Enhanced CSS Grid Module...\n");

	const modulePath = path.join(
		__dirname,
		"..",
		"traditional-web-stack",
		"05-css-grid"
	);
	const scriptPath = path.join(modulePath, "script.js");

	console.log("📝 Testing CSS Grid module...");

	// Read the script content
	const scriptContent = fs.readFileSync(scriptPath, "utf8");

	// Check if code examples exist
	const hasCodeExamples = scriptContent.includes("sectionCodeExamples");
	console.log(
		`   ${hasCodeExamples ? "✅" : "❌"} Code examples: ${
			hasCodeExamples ? "FOUND" : "MISSING"
		}`
	);

	// Check for specific sections
	const expectedSections = ["grid-basics", "grid-areas"];
	expectedSections.forEach((section) => {
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

	// Check for specific CSS Grid properties
	const gridProperties = [
		"display: grid",
		"grid-template-columns",
		"grid-template-rows",
		"grid-template-areas",
		"grid-area",
		"grid-column",
		"grid-row",
		"gap:",
	];

	console.log("\n📊 CSS Grid Properties Found:");
	gridProperties.forEach((property) => {
		const hasProperty = scriptContent.includes(property);
		console.log(
			`   ${hasProperty ? "✅" : "❌"} ${property}: ${
				hasProperty ? "FOUND" : "MISSING"
			}`
		);
	});

	// Check for interactive elements
	const interactiveElements = [
		"hover",
		"transition",
		"transform",
		"grid-item:hover",
	];

	console.log("\n🎮 Interactive Elements Found:");
	interactiveElements.forEach((element) => {
		const hasElement = scriptContent.includes(element);
		console.log(
			`   ${hasElement ? "✅" : "❌"} ${element}: ${
				hasElement ? "FOUND" : "MISSING"
			}`
		);
	});

	// Check for responsive design
	const responsiveElements = ["@media", "max-width", "grid-template-areas"];

	console.log("\n📱 Responsive Design Elements Found:");
	responsiveElements.forEach((element) => {
		const hasElement = scriptContent.includes(element);
		console.log(
			`   ${hasElement ? "✅" : "❌"} ${element}: ${
				hasElement ? "FOUND" : "MISSING"
			}`
		);
	});

	// Count total lines of code
	const totalLines = scriptContent.split("\n").length;
	console.log(`\n📈 Total script lines: ${totalLines}`);

	// Count code example lines
	const exampleLines = (scriptContent.match(/\n/g) || []).length;
	console.log(
		`📈 Estimated code example lines: ${Math.floor(exampleLines * 0.3)}`
	);

	console.log("\n🎉 CSS Grid module testing complete!");

	// Summary
	const allChecks = [
		hasCodeExamples,
		scriptContent.includes('"grid-basics"'),
		scriptContent.includes('"grid-areas"'),
		hasHTMLContent,
		hasCSSContent,
		scriptContent.includes("display: grid"),
		scriptContent.includes("grid-template-areas"),
		scriptContent.includes("hover"),
		scriptContent.includes("@media"),
	];

	const passedChecks = allChecks.filter((check) => check).length;
	const totalChecks = allChecks.length;

	console.log(`\n📊 Summary: ${passedChecks}/${totalChecks} checks passed`);

	if (passedChecks === totalChecks) {
		console.log("🎉 CSS Grid module is fully enhanced and ready for use!");
	} else {
		console.log("⚠️  Some enhancements may be missing");
	}
}

// Run the test
if (require.main === module) {
	testCSSGridModule();
}

module.exports = { testCSSGridModule };
