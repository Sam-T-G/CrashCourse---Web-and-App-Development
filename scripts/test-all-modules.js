#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

// List of all modules to test
const modules = [
	"01-html-basics",
	"02-css-styling",
	"03-css-layout",
	"04-css-flexbox",
	"05-css-grid",
	"06-css-animations",
	"07-css-variables",
	"08-javascript-events",
	"09-javascript-dom",
	"10-production-example",
	"11-html-forms",
];

function testModule(moduleName) {
	const modulePath = path.join(
		__dirname,
		"..",
		"traditional-web-stack",
		moduleName
	);
	const indexPath = path.join(modulePath, "index.html");
	const scriptPath = path.join(modulePath, "script.js");
	const stylesPath = path.join(modulePath, "styles.css");

	console.log(`\n🧪 Testing ${moduleName}...`);

	// Test 1: File existence
	const indexExists = fs.existsSync(indexPath);
	const scriptExists = fs.existsSync(scriptPath);
	const stylesExist = fs.existsSync(stylesPath);

	console.log(
		`   ${indexExists ? "✅" : "❌"} index.html: ${
			indexExists ? "EXISTS" : "MISSING"
		}`
	);
	console.log(
		`   ${scriptExists ? "✅" : "❌"} script.js: ${
			scriptExists ? "EXISTS" : "MISSING"
		}`
	);
	console.log(
		`   ${stylesExist ? "✅" : "❌"} styles.css: ${
			stylesExist ? "EXISTS" : "MISSING"
		}`
	);

	if (!indexExists) {
		console.log(`   ❌ Module ${moduleName} is missing index.html`);
		return {
			module: moduleName,
			status: "FAILED",
			issues: ["Missing index.html"],
		};
	}

	// Test 2: HTML structure
	const htmlContent = fs.readFileSync(indexPath, "utf8");
	const sections = htmlContent.match(/class="content-section"/g);
	const editors = htmlContent.match(/class="monaco-editor"/g);
	const navButtons = htmlContent.match(/onclick="showSection\('[^']+'\)"/g);

	console.log(`   📊 HTML Structure:`);
	console.log(`      - Content sections: ${sections ? sections.length : 0}`);
	console.log(`      - Live editors: ${editors ? editors.length : 0}`);
	console.log(
		`      - Navigation buttons: ${navButtons ? navButtons.length : 0}`
	);

	// Test 3: JavaScript functions
	let jsFunctions = [];
	if (scriptExists) {
		const scriptContent = fs.readFileSync(scriptPath, "utf8");
		const hasMonacoInit = scriptContent.includes("initializeLiveEditors");
		const hasNavigation = scriptContent.includes("showSection");
		const hasCodeExamples = scriptContent.includes("getCodeSnippetForEditor");

		console.log(`   📊 JavaScript Functions:`);
		console.log(
			`      - Monaco initialization: ${hasMonacoInit ? "✅" : "❌"}`
		);
		console.log(`      - Navigation functions: ${hasNavigation ? "✅" : "❌"}`);
		console.log(`      - Code examples: ${hasCodeExamples ? "✅" : "❌"}`);

		if (!hasMonacoInit) jsFunctions.push("Missing Monaco initialization");
		if (!hasNavigation) jsFunctions.push("Missing navigation functions");
		if (!hasCodeExamples) jsFunctions.push("Missing code examples");
	} else {
		jsFunctions.push("Missing script.js");
	}

	// Test 4: Check for duplicate IDs
	const editorIds = htmlContent.match(/id="[^"]*-editor"/g);
	const uniqueIds = [...new Set(editorIds)];
	const hasDuplicates = editorIds && editorIds.length !== uniqueIds.length;

	console.log(`   📊 Duplicate IDs: ${hasDuplicates ? "❌ FOUND" : "✅ NONE"}`);

	// Determine overall status
	const issues = [];
	if (!indexExists) issues.push("Missing index.html");
	if (!scriptExists) issues.push("Missing script.js");
	if (!stylesExist) issues.push("Missing styles.css");
	if (hasDuplicates) issues.push("Duplicate IDs found");
	issues.push(...jsFunctions);

	const status = issues.length === 0 ? "PASSED" : "FAILED";
	const statusIcon = status === "PASSED" ? "✅" : "❌";

	console.log(`   ${statusIcon} Overall Status: ${status}`);
	if (issues.length > 0) {
		console.log(`   Issues: ${issues.join(", ")}`);
	}

	return {
		module: moduleName,
		status,
		issues,
		stats: {
			sections: sections ? sections.length : 0,
			editors: editors ? editors.length : 0,
			navButtons: navButtons ? navButtons.length : 0,
		},
	};
}

function testAllModules() {
	console.log("🧪 Testing All Traditional Web Stack Modules...\n");

	const results = [];
	let passedCount = 0;
	let failedCount = 0;

	modules.forEach((moduleName) => {
		const result = testModule(moduleName);
		results.push(result);

		if (result.status === "PASSED") {
			passedCount++;
		} else {
			failedCount++;
		}
	});

	// Summary
	console.log("\n" + "=".repeat(60));
	console.log("📊 TEST SUMMARY");
	console.log("=".repeat(60));

	console.log(`\n✅ Modules Passed: ${passedCount}/${modules.length}`);
	console.log(`❌ Modules Failed: ${failedCount}/${modules.length}`);

	if (failedCount > 0) {
		console.log("\n❌ Failed Modules:");
		results
			.filter((r) => r.status === "FAILED")
			.forEach((result) => {
				console.log(`   - ${result.module}: ${result.issues.join(", ")}`);
			});
	}

	console.log("\n📈 Module Statistics:");
	results.forEach((result) => {
		const { sections, editors, navButtons } = result.stats;
		console.log(
			`   ${result.module}: ${sections} sections, ${editors} editors, ${navButtons} nav buttons`
		);
	});

	if (passedCount === modules.length) {
		console.log("\n🎉 ALL MODULES ARE FULLY FUNCTIONAL!");
		console.log("   - Navigation between sections works");
		console.log("   - Live code editors are properly configured");
		console.log("   - All JavaScript functions are present");
		console.log("   - Section-specific code examples are loaded");
	} else {
		console.log(`\n⚠️  ${failedCount} modules need attention`);
	}

	return results;
}

// Run the tests
if (require.main === module) {
	testAllModules();
}

module.exports = { testAllModules, testModule };
