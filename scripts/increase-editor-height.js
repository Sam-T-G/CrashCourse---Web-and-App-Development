#!/usr/bin/env node

/**
 * Increase Editor Height Script
 * Makes the live code editors larger by increasing their height
 */

const fs = require("fs");
const path = require("path");

// Configuration
const TRADITIONAL_WEB_DIR = "./01-traditional-web";

/**
 * Update CSS file to increase Monaco Editor height
 */
function increaseEditorHeight(cssPath) {
	console.log(`  🔧 Increasing editor height: ${path.basename(cssPath)}`);

	let cssContent = fs.readFileSync(cssPath, "utf8");

	// Check if Monaco Editor styles exist
	if (!cssContent.includes(".monaco-editor")) {
		console.log(`    ⚠️  No Monaco Editor styles found`);
		return;
	}

	// Update Monaco Editor height
	if (cssContent.includes("height: 300px")) {
		cssContent = cssContent.replace(/height:\s*300px/g, "height: 500px");
		console.log(`    ✅ Updated height from 300px to 500px`);
	} else if (cssContent.includes("height: 400px")) {
		cssContent = cssContent.replace(/height:\s*400px/g, "height: 500px");
		console.log(`    ✅ Updated height from 400px to 500px`);
	} else {
		// Add or update Monaco Editor height
		const monacoEditorRegex = /\.monaco-editor\s*\{[^}]*\}/g;
		const match = cssContent.match(monacoEditorRegex);

		if (match) {
			// Update existing rule
			cssContent = cssContent.replace(
				monacoEditorRegex,
				`.monaco-editor {
    height: 500px !important;
    border: none !important;
}`
			);
			console.log(`    ✅ Updated existing Monaco Editor height to 500px`);
		} else {
			// Add new rule
			const monacoEditorCSS = `
/* Monaco Editor Styles */
.monaco-editor {
    height: 500px !important;
    border: none !important;
}`;
			cssContent += monacoEditorCSS;
			console.log(`    ✅ Added Monaco Editor height of 500px`);
		}
	}

	// Also increase live preview height for better balance
	if (cssContent.includes("min-height: 100px")) {
		cssContent = cssContent.replace(
			/min-height:\s*100px/g,
			"min-height: 200px"
		);
		console.log(`    ✅ Increased live preview min-height to 200px`);
	}

	fs.writeFileSync(cssPath, cssContent);
}

/**
 * Process a single demo directory
 */
function processDemo(demoPath) {
	const demoName = path.basename(demoPath);
	console.log(`  📁 Processing demo: ${demoName}`);

	// Update CSS file
	const cssPath = path.join(demoPath, "styles.css");
	if (fs.existsSync(cssPath)) {
		increaseEditorHeight(cssPath);
	} else {
		console.log(`    ⚠️  Missing styles.css`);
	}
}

/**
 * Process a module directory
 */
function processModule(modulePath) {
	const moduleName = path.basename(modulePath);
	console.log(`\n🔄 Processing module: ${moduleName}`);

	const demoDirs = fs.readdirSync(modulePath).filter((item) => {
		const itemPath = path.join(modulePath, item);
		return fs.statSync(itemPath).isDirectory() && item !== "node_modules";
	});

	for (const demoDir of demoDirs) {
		const demoPath = path.join(modulePath, demoDir);
		processDemo(demoPath);
	}
}

/**
 * Main function
 */
function main() {
	console.log("🚀 Increasing live editor height...\n");

	// Check if traditional web directory exists
	if (!fs.existsSync(TRADITIONAL_WEB_DIR)) {
		console.error(`❌ Directory ${TRADITIONAL_WEB_DIR} not found!`);
		process.exit(1);
	}

	let processedCount = 0;

	// Get all module directories
	const moduleDirs = fs.readdirSync(TRADITIONAL_WEB_DIR).filter((item) => {
		const itemPath = path.join(TRADITIONAL_WEB_DIR, item);
		return fs.statSync(itemPath).isDirectory();
	});

	// Process each module
	for (const moduleDir of moduleDirs) {
		const modulePath = path.join(TRADITIONAL_WEB_DIR, moduleDir);
		processModule(modulePath);
		processedCount++;
	}

	console.log(`\n🎉 Editor height increase complete!`);
	console.log(`📊 Processed ${processedCount} modules`);
	console.log(`\n✨ Changes made:`);
	console.log(`   - Increased Monaco Editor height to 500px`);
	console.log(`   - Increased live preview min-height to 200px`);
	console.log(`   - Applied !important to ensure height is respected`);
	console.log(
		`\n🚀 The live code editors should now be much larger and easier to use!`
	);
}

// Run the script
if (require.main === module) {
	main();
}

module.exports = { increaseEditorHeight, processDemo, processModule };
