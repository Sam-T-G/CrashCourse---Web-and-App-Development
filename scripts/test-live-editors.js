#!/usr/bin/env node

/**
 * Live Editor Test Script
 * Tests all live editors to ensure they're functioning properly
 */

const fs = require("fs");
const path = require("path");

// Configuration
const TRADITIONAL_WEB_DIR = "./01-traditional-web";

/**
 * Test a single JavaScript file for required functions
 */
function testJSFile(jsPath) {
	const jsContent = fs.readFileSync(jsPath, "utf8");
	const fileName = path.basename(jsPath);

	const requiredFunctions = [
		"copyCode",
		"showFeedback",
		"updateStats",
		"executeCode",
		"updatePreview",
		"resetCode",
		"showError",
		"hideError",
		"updateStatus",
	];

	const missingFunctions = requiredFunctions.filter(
		(func) => !jsContent.includes(`function ${func}(`)
	);

	if (missingFunctions.length > 0) {
		console.log(
			`    ❌ ${fileName}: Missing functions: ${missingFunctions.join(", ")}`
		);
		return false;
	} else {
		console.log(`    ✅ ${fileName}: All functions present`);
		return true;
	}
}

/**
 * Test a single HTML file for required elements
 */
function testHTMLFile(htmlPath) {
	const htmlContent = fs.readFileSync(htmlPath, "utf8");
	const fileName = path.basename(htmlPath);

	// Check for live editor containers
	if (!htmlContent.includes("live-editor-container")) {
		console.log(`    ❌ ${fileName}: Missing live-editor-container`);
		return false;
	}

	// Check for Monaco Editor divs
	if (!htmlContent.includes("monaco-editor")) {
		console.log(`    ❌ ${fileName}: Missing monaco-editor divs`);
		return false;
	}

	// Check for preview content divs
	if (!htmlContent.includes("-preview-content")) {
		console.log(`    ❌ ${fileName}: Missing preview content divs`);
		return false;
	}

	// Check for error display divs
	if (!htmlContent.includes("error-display")) {
		console.log(`    ❌ ${fileName}: Missing error display divs`);
		return false;
	}

	console.log(`    ✅ ${fileName}: All required elements present`);
	return true;
}

/**
 * Test a single CSS file for required styles
 */
function testCSSFile(cssPath) {
	const cssContent = fs.readFileSync(cssPath, "utf8");
	const fileName = path.basename(cssPath);

	const requiredStyles = [
		".live-editor-container",
		".live-editor-header",
		".live-editor-btn",
		".live-preview",
		".error-display",
	];

	const missingStyles = requiredStyles.filter(
		(style) => !cssContent.includes(style)
	);

	if (missingStyles.length > 0) {
		console.log(
			`    ❌ ${fileName}: Missing styles: ${missingStyles.join(", ")}`
		);
		return false;
	} else {
		console.log(`    ✅ ${fileName}: All required styles present`);
		return true;
	}
}

/**
 * Test a single demo directory
 */
function testDemo(demoPath) {
	const demoName = path.basename(demoPath);
	console.log(`  📁 Testing demo: ${demoName}`);

	let allTestsPassed = true;

	// Test HTML file
	const htmlPath = path.join(demoPath, "index.html");
	if (fs.existsSync(htmlPath)) {
		if (!testHTMLFile(htmlPath)) allTestsPassed = false;
	} else {
		console.log(`    ❌ Missing index.html`);
		allTestsPassed = false;
	}

	// Test CSS file
	const cssPath = path.join(demoPath, "styles.css");
	if (fs.existsSync(cssPath)) {
		if (!testCSSFile(cssPath)) allTestsPassed = false;
	} else {
		console.log(`    ❌ Missing styles.css`);
		allTestsPassed = false;
	}

	// Test JavaScript file
	const jsPath = path.join(demoPath, "script.js");
	if (fs.existsSync(jsPath)) {
		if (!testJSFile(jsPath)) allTestsPassed = false;
	} else {
		console.log(`    ❌ Missing script.js`);
		allTestsPassed = false;
	}

	return allTestsPassed;
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

	let moduleTestsPassed = true;

	for (const demoDir of demoDirs) {
		const demoPath = path.join(modulePath, demoDir);
		if (!testDemo(demoPath)) {
			moduleTestsPassed = false;
		}
	}

	return moduleTestsPassed;
}

/**
 * Main function
 */
function main() {
	console.log("🧪 Testing live editors...\n");

	// Check if traditional web directory exists
	if (!fs.existsSync(TRADITIONAL_WEB_DIR)) {
		console.error(`❌ Directory ${TRADITIONAL_WEB_DIR} not found!`);
		process.exit(1);
	}

	let totalModules = 0;
	let passedModules = 0;
	let totalDemos = 0;
	let passedDemos = 0;

	// Get all module directories
	const moduleDirs = fs.readdirSync(TRADITIONAL_WEB_DIR).filter((item) => {
		const itemPath = path.join(TRADITIONAL_WEB_DIR, item);
		return fs.statSync(itemPath).isDirectory();
	});

	// Test each module
	for (const moduleDir of moduleDirs) {
		const modulePath = path.join(TRADITIONAL_WEB_DIR, moduleDir);
		totalModules++;

		const demoDirs = fs.readdirSync(modulePath).filter((item) => {
			const itemPath = path.join(modulePath, item);
			return fs.statSync(itemPath).isDirectory() && item !== "node_modules";
		});

		totalDemos += demoDirs.length;

		if (testModule(modulePath)) {
			passedModules++;
			passedDemos += demoDirs.length;
		}
	}

	console.log(`\n📊 Test Results:`);
	console.log(`   Modules: ${passedModules}/${totalModules} passed`);
	console.log(`   Demos: ${passedDemos}/${totalDemos} passed`);

	if (passedModules === totalModules && passedDemos === totalDemos) {
		console.log(`\n🎉 All tests passed! Live editors are ready to use.`);
		console.log(`\n✨ To test in browser:`);
		console.log(`   1. Open any index.html file in a web browser`);
		console.log(`   2. Open browser developer tools (F12)`);
		console.log(`   3. Check console for initialization messages`);
		console.log(`   4. Try editing code in the Monaco Editor`);
		console.log(`   5. Verify real-time execution and preview updates`);
	} else {
		console.log(`\n⚠️  Some tests failed. Check the output above for details.`);
	}
}

// Run the script
if (require.main === module) {
	main();
}

module.exports = {
	testJSFile,
	testHTMLFile,
	testCSSFile,
	testDemo,
	testModule,
};
