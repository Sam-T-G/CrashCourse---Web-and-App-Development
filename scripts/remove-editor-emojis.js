#!/usr/bin/env node

/**
 * Remove Editor Emojis Script
 * Removes emojis from live code editor buttons and titles
 */

const fs = require("fs");
const path = require("path");

// Configuration
const TRADITIONAL_WEB_DIR = "./01-traditional-web";

/**
 * Remove emojis from HTML file
 */
function removeEmojisFromHTML(htmlPath) {
	console.log(`  🔧 Removing emojis from: ${path.basename(htmlPath)}`);

	let htmlContent = fs.readFileSync(htmlPath, "utf8");

	// Remove emojis from button text
	htmlContent = htmlContent.replace(/📋 Copy/g, "Copy");
	htmlContent = htmlContent.replace(/▶️ Run/g, "Run");
	htmlContent = htmlContent.replace(/🔄 Reset/g, "Reset");

	// Remove emojis from language icons
	htmlContent = htmlContent.replace(/<span>📄<\/span>/g, "<span></span>");
	htmlContent = htmlContent.replace(/<span>🎨<\/span>/g, "<span></span>");
	htmlContent = htmlContent.replace(/<span>⚡<\/span>/g, "<span></span>");

	// Remove emojis from section titles
	htmlContent = htmlContent.replace(
		/<h2>🚀 Live Code Editor<\/h2>/g,
		"<h2>Live Code Editor</h2>"
	);

	fs.writeFileSync(htmlPath, htmlContent);
	console.log(`    ✅ Removed emojis from HTML`);
}

/**
 * Process a single demo directory
 */
function processDemo(demoPath) {
	const demoName = path.basename(demoPath);
	console.log(`  📁 Processing demo: ${demoName}`);

	// Update HTML file
	const htmlPath = path.join(demoPath, "index.html");
	if (fs.existsSync(htmlPath)) {
		removeEmojisFromHTML(htmlPath);
	} else {
		console.log(`    ⚠️  Missing index.html`);
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
	console.log("🚀 Removing emojis from live code editors...\n");

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

	console.log(`\n🎉 Emoji removal complete!`);
	console.log(`📊 Processed ${processedCount} modules`);
	console.log(`\n✨ Changes made:`);
	console.log(`   - Removed 📋 emoji from Copy buttons`);
	console.log(`   - Removed ▶️ emoji from Run buttons`);
	console.log(`   - Removed 🔄 emoji from Reset buttons`);
	console.log(`   - Removed 📄 emoji from language icons`);
	console.log(`   - Removed 🚀 emoji from section titles`);
	console.log(
		`\n🚀 The live code editors now have a cleaner, more professional appearance!`
	);
}

// Run the script
if (require.main === module) {
	main();
}

module.exports = { removeEmojisFromHTML, processDemo, processModule };
