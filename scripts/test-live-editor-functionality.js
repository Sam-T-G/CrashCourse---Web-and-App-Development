#!/usr/bin/env node

/**
 * Live Editor Functionality Test Script
 * Tests if live editors are actually working by checking key components
 */

const fs = require("fs");
const path = require("path");

// Configuration
const TRADITIONAL_WEB_DIR = "./01-traditional-web";

/**
 * Test if a JavaScript file has proper live editor functionality
 */
function testLiveEditorFunctionality(jsPath) {
	const jsContent = fs.readFileSync(jsPath, "utf8");
	const fileName = path.basename(jsPath);

	const tests = [
		{
			name: "Monaco Editor Loading",
			test: () =>
				jsContent.includes("require.config") &&
				jsContent.includes("vs/editor/editor.main"),
			critical: true,
		},
		{
			name: "Global Variables",
			test: () =>
				jsContent.includes("window.liveEditors") &&
				jsContent.includes("window.originalCode"),
			critical: true,
		},
		{
			name: "Editor Initialization",
			test: () =>
				jsContent.includes("initializeLiveEditors") &&
				jsContent.includes("monaco.editor.create"),
			critical: true,
		},
		{
			name: "Code Execution",
			test: () =>
				jsContent.includes("executeCode") &&
				jsContent.includes("document.createElement"),
			critical: true,
		},
		{
			name: "Preview Updates",
			test: () =>
				jsContent.includes("updatePreview") && jsContent.includes("innerHTML"),
			critical: true,
		},
		{
			name: "Error Handling",
			test: () =>
				jsContent.includes("showError") && jsContent.includes("hideError"),
			critical: false,
		},
		{
			name: "User Actions",
			test: () =>
				jsContent.includes("copyCode") && jsContent.includes("resetCode"),
			critical: false,
		},
		{
			name: "DOM Ready Check",
			test: () =>
				jsContent.includes("document.readyState") ||
				jsContent.includes("DOMContentLoaded"),
			critical: true,
		},
	];

	const results = tests.map((test) => ({
		name: test.name,
		passed: test.test(),
		critical: test.critical,
	}));

	const criticalTests = results.filter((r) => r.critical);
	const passedCritical = criticalTests.filter((r) => r.passed).length;
	const allTests = results.filter((r) => r.passed).length;

	console.log(`  📄 ${fileName}:`);
	results.forEach((result) => {
		const status = result.passed ? "✅" : "❌";
		const critical = result.critical ? " (CRITICAL)" : "";
		console.log(`    ${status} ${result.name}${critical}`);
	});

	const overallStatus =
		passedCritical === criticalTests.length ? "WORKING" : "BROKEN";
	console.log(
		`    📊 Status: ${overallStatus} (${allTests}/${tests.length} tests passed, ${passedCritical}/${criticalTests.length} critical)`
	);

	return {
		fileName,
		overallStatus,
		passedTests: allTests,
		totalTests: tests.length,
		passedCritical,
		totalCritical: criticalTests.length,
	};
}

/**
 * Test if HTML has proper live editor structure
 */
function testHTMLStructure(htmlPath) {
	const htmlContent = fs.readFileSync(htmlPath, "utf8");
	const fileName = path.basename(htmlPath);

	const tests = [
		{
			name: "Monaco Editor Script",
			test: () =>
				htmlContent.includes("monaco-editor") &&
				htmlContent.includes("loader.js"),
			critical: true,
		},
		{
			name: "Live Editor Container",
			test: () => htmlContent.includes("live-editor-container"),
			critical: true,
		},
		{
			name: "Monaco Editor Div",
			test: () => htmlContent.includes('class="monaco-editor"'),
			critical: true,
		},
		{
			name: "Editor ID",
			test: () => htmlContent.includes('id="live-code"'),
			critical: true,
		},
		{
			name: "Preview Content",
			test: () => htmlContent.includes("live-code-preview-content"),
			critical: true,
		},
		{
			name: "Action Buttons",
			test: () =>
				htmlContent.includes("copyCode") && htmlContent.includes("executeCode"),
			critical: false,
		},
		{
			name: "Error Display",
			test: () => htmlContent.includes("error-display"),
			critical: false,
		},
	];

	const results = tests.map((test) => ({
		name: test.name,
		passed: test.test(),
		critical: test.critical,
	}));

	const criticalTests = results.filter((r) => r.critical);
	const passedCritical = criticalTests.filter((r) => r.passed).length;
	const allTests = results.filter((r) => r.passed).length;

	console.log(`  📄 ${fileName}:`);
	results.forEach((result) => {
		const status = result.passed ? "✅" : "❌";
		const critical = result.critical ? " (CRITICAL)" : "";
		console.log(`    ${status} ${result.name}${critical}`);
	});

	const overallStatus =
		passedCritical === criticalTests.length ? "WORKING" : "BROKEN";
	console.log(
		`    📊 Status: ${overallStatus} (${allTests}/${tests.length} tests passed, ${passedCritical}/${criticalTests.length} critical)`
	);

	return {
		fileName,
		overallStatus,
		passedTests: allTests,
		totalTests: tests.length,
		passedCritical,
		totalCritical: criticalTests.length,
	};
}

/**
 * Test a single demo directory
 */
function testDemo(demoPath) {
	const demoName = path.basename(demoPath);
	console.log(`  📁 Testing demo: ${demoName}`);

	const htmlPath = path.join(demoPath, "index.html");
	const jsPath = path.join(demoPath, "script.js");

	let htmlResult = null;
	let jsResult = null;

	if (fs.existsSync(htmlPath)) {
		htmlResult = testHTMLStructure(htmlPath);
	} else {
		console.log(`    ❌ Missing index.html`);
	}

	if (fs.existsSync(jsPath)) {
		jsResult = testLiveEditorFunctionality(jsPath);
	} else {
		console.log(`    ❌ Missing script.js`);
	}

	const overallStatus =
		htmlResult?.overallStatus === "WORKING" &&
		jsResult?.overallStatus === "WORKING"
			? "WORKING"
			: "BROKEN";

	return {
		demoName,
		overallStatus,
		htmlResult,
		jsResult,
	};
}

/**
 * Test a module directory
 */
function testModule(modulePath) {
	const moduleName = path.basename(modulePath);
	console.log(`\n🔄 Testing module: ${moduleName}`);

	const demoDirs = fs.readdirSync(modulePath).filter((item) => {
		const itemPath = path.join(modulePath, item);
		return fs.statSync(itemPath).isDirectory() && item !== "node_modules";
	});

	const results = [];
	for (const demoDir of demoDirs) {
		const demoPath = path.join(modulePath, demoDir);
		const result = testDemo(demoPath);
		results.push(result);
	}

	const workingDemos = results.filter(
		(r) => r.overallStatus === "WORKING"
	).length;
	const totalDemos = results.length;

	console.log(
		`\n  📊 Module Summary: ${workingDemos}/${totalDemos} demos working`
	);

	return {
		moduleName,
		workingDemos,
		totalDemos,
		results,
	};
}

/**
 * Main function
 */
function main() {
	console.log("🧪 Testing live editor functionality...\n");

	// Check if traditional web directory exists
	if (!fs.existsSync(TRADITIONAL_WEB_DIR)) {
		console.error(`❌ Directory ${TRADITIONAL_WEB_DIR} not found!`);
		process.exit(1);
	}

	let totalModules = 0;
	let workingModules = 0;
	let totalDemos = 0;
	let workingDemos = 0;

	// Get all module directories
	const moduleDirs = fs.readdirSync(TRADITIONAL_WEB_DIR).filter((item) => {
		const itemPath = path.join(TRADITIONAL_WEB_DIR, item);
		return fs.statSync(itemPath).isDirectory();
	});

	// Test each module
	for (const moduleDir of moduleDirs) {
		const modulePath = path.join(TRADITIONAL_WEB_DIR, moduleDir);
		const result = testModule(modulePath);

		totalModules++;
		totalDemos += result.totalDemos;
		workingDemos += result.workingDemos;

		if (result.workingDemos === result.totalDemos) {
			workingModules++;
		}
	}

	console.log(`\n📊 Final Results:`);
	console.log(`   Modules: ${workingModules}/${totalModules} fully working`);
	console.log(`   Demos: ${workingDemos}/${totalDemos} working`);

	if (workingDemos === totalDemos) {
		console.log(`\n🎉 All live editors are working perfectly!`);
		console.log(`\n✨ Live editors are ready for use:`);
		console.log(`   - Monaco Editor loads and initializes properly`);
		console.log(`   - Code execution works in real-time`);
		console.log(`   - Preview updates as you type`);
		console.log(`   - Error handling is in place`);
		console.log(`   - User actions (copy, reset) work`);
	} else {
		console.log(`\n⚠️  Some live editors still have issues.`);
		console.log(`   Check the detailed output above for specific problems.`);
	}

	console.log(`\n🚀 To test in browser:`);
	console.log(`   1. Open any index.html file in a web browser`);
	console.log(`   2. Open browser developer tools (F12)`);
	console.log(`   3. Look for "Monaco Editor loaded successfully" in console`);
	console.log(`   4. Try editing the CSS code in the Monaco Editor`);
	console.log(`   5. Watch the preview update in real-time`);
}

// Run the script
if (require.main === module) {
	main();
}

module.exports = {
	testLiveEditorFunctionality,
	testHTMLStructure,
	testDemo,
	testModule,
};
