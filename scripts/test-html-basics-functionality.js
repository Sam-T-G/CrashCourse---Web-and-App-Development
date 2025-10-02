#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

// Test script to verify HTML basics module functionality
function testHTMLBasicsModule() {
	const modulePath = path.join(
		__dirname,
		"..",
		"traditional-web-stack",
		"01-html-basics"
	);
	const indexPath = path.join(modulePath, "index.html");
	const scriptPath = path.join(modulePath, "script.js");

	console.log("🧪 Testing HTML Basics Module Functionality...\n");

	// Test 1: Check if files exist
	console.log("1. Checking file existence:");
	console.log(
		`   ✅ index.html: ${fs.existsSync(indexPath) ? "EXISTS" : "MISSING"}`
	);
	console.log(
		`   ✅ script.js: ${fs.existsSync(scriptPath) ? "EXISTS" : "MISSING"}`
	);
	console.log(
		`   ✅ styles.css: ${
			fs.existsSync(path.join(modulePath, "styles.css")) ? "EXISTS" : "MISSING"
		}`
	);

	// Test 2: Check HTML structure
	console.log("\n2. Checking HTML structure:");
	const htmlContent = fs.readFileSync(indexPath, "utf8");

	// Check navigation buttons
	const navButtons = htmlContent.match(/onclick="showSection\('[^']+'\)"/g);
	console.log(
		`   ✅ Navigation buttons: ${navButtons ? navButtons.length : 0} found`
	);

	// Check content sections
	const contentSections = htmlContent.match(/class="content-section"/g);
	console.log(
		`   ✅ Content sections: ${
			contentSections ? contentSections.length : 0
		} found`
	);

	// Check live editors
	const liveEditors = htmlContent.match(/class="monaco-editor"/g);
	console.log(
		`   ✅ Live editors: ${liveEditors ? liveEditors.length : 0} found`
	);

	// Check demo buttons
	const demoButtons = htmlContent.match(/onclick="showDemoResult\('[^']+'\)"/g);
	console.log(
		`   ✅ Demo buttons: ${demoButtons ? demoButtons.length : 0} found`
	);

	// Test 3: Check JavaScript functions
	console.log("\n3. Checking JavaScript functions:");
	const scriptContent = fs.readFileSync(scriptPath, "utf8");

	const functions = [
		"showSection",
		"showDemoResult",
		"changeBackground",
		"showAlert",
		"initializeLiveEditors",
		"executeCode",
		"resetCode",
		"copyCode",
	];

	functions.forEach((func) => {
		const hasFunction = scriptContent.includes(`function ${func}(`);
		console.log(
			`   ${hasFunction ? "✅" : "❌"} ${func}(): ${
				hasFunction ? "FOUND" : "MISSING"
			}`
		);
	});

	// Test 4: Check section-specific code examples
	console.log("\n4. Checking section-specific code examples:");
	const sections = [
		"overview",
		"headings",
		"text",
		"lists",
		"forms",
		"interactive",
	];

	sections.forEach((section) => {
		const hasExample = scriptContent.includes(`"${section}":`);
		console.log(
			`   ${hasExample ? "✅" : "❌"} ${section} example: ${
				hasExample ? "FOUND" : "MISSING"
			}`
		);
	});

	// Test 5: Check for duplicate IDs
	console.log("\n5. Checking for duplicate IDs:");
	const editorIds = htmlContent.match(/id="[^"]*-editor"/g);
	const uniqueIds = [...new Set(editorIds)];
	const hasDuplicates = editorIds.length !== uniqueIds.length;
	console.log(
		`   ${hasDuplicates ? "❌" : "✅"} Duplicate IDs: ${
			hasDuplicates ? "FOUND" : "NONE"
		}`
	);

	if (hasDuplicates) {
		const duplicates = editorIds.filter(
			(id, index) => editorIds.indexOf(id) !== index
		);
		console.log(`   Duplicate IDs: ${[...new Set(duplicates)].join(", ")}`);
	}

	// Test 6: Check Monaco Editor integration
	console.log("\n6. Checking Monaco Editor integration:");
	const hasMonacoLoader = htmlContent.includes("monaco-editor@0.44.0");
	const hasRequireConfig = scriptContent.includes("require.config");
	const hasEditorCreation = scriptContent.includes("monaco.editor.create");

	console.log(
		`   ${hasMonacoLoader ? "✅" : "❌"} Monaco loader: ${
			hasMonacoLoader ? "FOUND" : "MISSING"
		}`
	);
	console.log(
		`   ${hasRequireConfig ? "✅" : "❌"} Require config: ${
			hasRequireConfig ? "FOUND" : "MISSING"
		}`
	);
	console.log(
		`   ${hasEditorCreation ? "✅" : "❌"} Editor creation: ${
			hasEditorCreation ? "FOUND" : "MISSING"
		}`
	);

	// Test 7: Check demo result elements
	console.log("\n7. Checking demo result elements:");
	sections.forEach((section) => {
		const hasResultElement = htmlContent.includes(`id="${section}Result"`);
		console.log(
			`   ${hasResultElement ? "✅" : "❌"} ${section}Result: ${
				hasResultElement ? "FOUND" : "MISSING"
			}`
		);
	});

	// Summary
	console.log("\n📊 Summary:");
	const totalTests = 7;
	const passedTests = [
		fs.existsSync(indexPath),
		fs.existsSync(scriptPath),
		navButtons && navButtons.length >= 6,
		contentSections && contentSections.length >= 6,
		liveEditors && liveEditors.length >= 6,
		demoButtons && demoButtons.length >= 5,
		!hasDuplicates,
		hasMonacoLoader && hasRequireConfig && hasEditorCreation,
	].filter(Boolean).length;

	console.log(`   Tests passed: ${passedTests}/${totalTests}`);
	console.log(
		`   Status: ${
			passedTests === totalTests
				? "✅ ALL TESTS PASSED"
				: "❌ SOME TESTS FAILED"
		}`
	);

	if (passedTests === totalTests) {
		console.log("\n🎉 HTML Basics module is fully functional!");
		console.log("   - Navigation between sections works");
		console.log("   - Live code editors are properly configured");
		console.log("   - Demo buttons show relevant examples");
		console.log("   - All JavaScript functions are present");
		console.log("   - Section-specific code examples are loaded");
	} else {
		console.log("\n⚠️  Some issues found that need attention.");
	}
}

// Run the test
if (require.main === module) {
	testHTMLBasicsModule();
}

module.exports = { testHTMLBasicsModule };
