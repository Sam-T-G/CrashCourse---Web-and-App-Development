#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

function testCSSFlexboxModule() {
	console.log("🧪 Testing Enhanced CSS Flexbox Module...\n");

	const modulePath = path.join(
		__dirname,
		"..",
		"traditional-web-stack",
		"04-css-flexbox"
	);
	const scriptPath = path.join(modulePath, "script.js");

	console.log("📝 Testing CSS Flexbox module...");

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
	const expectedSections = ["flexbox-basics", "flexbox-advanced"];
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

	// Check for specific CSS Flexbox properties
	const flexboxProperties = [
		"display: flex",
		"flex-direction",
		"justify-content",
		"align-items",
		"flex-wrap",
		"flex-grow",
		"flex-shrink",
		"flex-basis",
		"align-self",
		"order:",
	];

	console.log("\n📊 CSS Flexbox Properties Found:");
	flexboxProperties.forEach((property) => {
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
		"flex-item:hover",
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

	// Check for real-world examples
	const realWorldExamples = [
		"card-layout",
		"navbar-layout",
		"media-layout",
		"card-header",
		"navbar-brand",
		"media-object",
	];

	console.log("\n🌍 Real-World Examples Found:");
	realWorldExamples.forEach((example) => {
		const hasExample = scriptContent.includes(example);
		console.log(
			`   ${hasExample ? "✅" : "❌"} ${example}: ${
				hasExample ? "FOUND" : "MISSING"
			}`
		);
	});

	// Check for advanced flexbox features
	const advancedFeatures = [
		"flex: 0 1 200px",
		"flex: 1 1 200px",
		"flex: 2 1 200px",
		"order: 1",
		"order: 2",
		"order: 3",
		"order: 4",
		"align-self: flex-start",
		"align-self: center",
		"align-self: flex-end",
	];

	console.log("\n🚀 Advanced Flexbox Features Found:");
	advancedFeatures.forEach((feature) => {
		const hasFeature = scriptContent.includes(feature);
		console.log(
			`   ${hasFeature ? "✅" : "❌"} ${feature}: ${
				hasFeature ? "FOUND" : "MISSING"
			}`
		);
	});

	// Check for responsive design
	const responsiveElements = [
		"flex-wrap: wrap",
		"flex-wrap: nowrap",
		"flex-wrap: wrap-reverse",
		"gap:",
	];

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
		`📈 Estimated code example lines: ${Math.floor(exampleLines * 0.4)}`
	);

	console.log("\n🎉 CSS Flexbox module testing complete!");

	// Summary
	const allChecks = [
		hasCodeExamples,
		scriptContent.includes('"flexbox-basics"'),
		scriptContent.includes('"flexbox-advanced"'),
		hasHTMLContent,
		hasCSSContent,
		scriptContent.includes("display: flex"),
		scriptContent.includes("flex-direction"),
		scriptContent.includes("justify-content"),
		scriptContent.includes("align-items"),
		scriptContent.includes("flex-grow"),
		scriptContent.includes("flex-shrink"),
		scriptContent.includes("flex-basis"),
		scriptContent.includes("align-self"),
		scriptContent.includes("order:"),
		scriptContent.includes("hover"),
		scriptContent.includes("card-layout"),
		scriptContent.includes("navbar-layout"),
		scriptContent.includes("media-layout"),
	];

	const passedChecks = allChecks.filter((check) => check).length;
	const totalChecks = allChecks.length;

	console.log(`\n📊 Summary: ${passedChecks}/${totalChecks} checks passed`);

	if (passedChecks === totalChecks) {
		console.log("🎉 CSS Flexbox module is fully enhanced and ready for use!");
	} else {
		console.log("⚠️  Some enhancements may be missing");
	}
}

// Run the test
if (require.main === module) {
	testCSSFlexboxModule();
}

module.exports = { testCSSFlexboxModule };
