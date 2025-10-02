#!/usr/bin/env node

/**
 * Verify Editor Height Script
 * Checks that all Monaco Editor heights are set to 500px
 */

const fs = require("fs");
const path = require("path");

// Configuration
const TRADITIONAL_WEB_DIR = "./01-traditional-web";

/**
 * Check Monaco Editor height in CSS file
 */
function checkEditorHeight(cssPath) {
	const cssContent = fs.readFileSync(cssPath, "utf8");
	const fileName = path.basename(cssPath);

	// Check for Monaco Editor styles
	if (!cssContent.includes(".monaco-editor")) {
		return { status: "missing", height: null };
	}

	// Check for 500px height
	if (cssContent.includes("height: 500px")) {
		return { status: "correct", height: "500px" };
	}

	// Check for other heights
	const heightMatch = cssContent.match(/height:\s*(\d+)px/);
	if (heightMatch) {
		return { status: "incorrect", height: heightMatch[1] + "px" };
	}

	return { status: "unknown", height: null };
}

/**
 * Process a single demo directory
 */
function processDemo(demoPath) {
	const demoName = path.basename(demoPath);
	const cssPath = path.join(demoPath, "styles.css");

	if (!fs.existsSync(cssPath)) {
		console.log(`  📁 ${demoName}: ❌ Missing styles.css`);
		return false;
	}

	const result = checkEditorHeight(cssPath);
	const status = result.status === "correct" ? "✅" : "❌";
	const height = result.height || "unknown";

	console.log(`  📁 ${demoName}: ${status} Monaco Editor height: ${height}`);
	return result.status === "correct";
}

/**
 * Process a module directory
 */
function processModule(modulePath) {
	const moduleName = path.basename(modulePath);
	console.log(`\n🔄 Module: ${moduleName}`);

	const demoDirs = fs.readdirSync(modulePath).filter((item) => {
		const itemPath = path.join(modulePath, item);
		return fs.statSync(itemPath).isDirectory() && item !== "node_modules";
	});

	let correctCount = 0;
	for (const demoDir of demoDirs) {
		const demoPath = path.join(modulePath, demoDir);
		if (processDemo(demoPath)) {
			correctCount++;
		}
	}

	console.log(
		`  📊 ${correctCount}/${demoDirs.length} demos have correct height`
	);
	return { correct: correctCount, total: demoDirs.length };
}

/**
 * Main function
 */
function main() {
	console.log("🔍 Verifying Monaco Editor heights...\n");

	// Check if traditional web directory exists
	if (!fs.existsSync(TRADITIONAL_WEB_DIR)) {
		console.error(`❌ Directory ${TRADITIONAL_WEB_DIR} not found!`);
		process.exit(1);
	}

	let totalCorrect = 0;
	let totalDemos = 0;

	// Get all module directories
	const moduleDirs = fs.readdirSync(TRADITIONAL_WEB_DIR).filter((item) => {
		const itemPath = path.join(TRADITIONAL_WEB_DIR, item);
		return fs.statSync(itemPath).isDirectory();
	});

	// Process each module
	for (const moduleDir of moduleDirs) {
		const modulePath = path.join(TRADITIONAL_WEB_DIR, moduleDir);
		const result = processModule(modulePath);
		totalCorrect += result.correct;
		totalDemos += result.total;
	}

	console.log(`\n📊 Final Results:`);
	console.log(
		`   Demos with correct height (500px): ${totalCorrect}/${totalDemos}`
	);

	if (totalCorrect === totalDemos) {
		console.log(`\n🎉 All Monaco Editors have the correct height of 500px!`);
		console.log(
			`✨ The live code editors should now be much larger and easier to use.`
		);
	} else {
		console.log(`\n⚠️  Some editors still need height adjustments.`);
	}

	console.log(`\n🚀 To test the larger editors:`);
	console.log(`   1. Open any index.html file in a web browser`);
	console.log(`   2. Look for the Monaco Editor section`);
	console.log(`   3. The editor should now be 500px tall (much larger!)`);
	console.log(`   4. Try editing code - it should be much more comfortable`);
}

// Run the script
if (require.main === module) {
	main();
}

module.exports = { checkEditorHeight, processDemo, processModule };
