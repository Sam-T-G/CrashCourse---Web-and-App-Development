#!/usr/bin/env node

/**
 * Complete Emoji Removal Script
 * Removes ALL emojis from live code editors comprehensively
 */

const fs = require("fs");
const path = require("path");

// Configuration
const TRADITIONAL_WEB_DIR = "./01-traditional-web";

/**
 * Remove all emojis from HTML file
 */
function removeAllEmojis(htmlPath) {
	console.log(`  🔧 Removing all emojis from: ${path.basename(htmlPath)}`);

	let htmlContent = fs.readFileSync(htmlPath, "utf8");

	// Comprehensive emoji removal patterns
	const emojiReplacements = [
		// Button emojis
		{ pattern: /📋 Copy/g, replacement: "Copy" },
		{ pattern: /▶️ Run/g, replacement: "Run" },
		{ pattern: /🔄 Reset/g, replacement: "Reset" },
		{ pattern: /📋/g, replacement: "" },
		{ pattern: /▶️/g, replacement: "" },
		{ pattern: /🔄/g, replacement: "" },

		// Language and icon emojis
		{ pattern: /<span>📄<\/span>/g, replacement: "<span></span>" },
		{ pattern: /<span>🎨<\/span>/g, replacement: "<span></span>" },
		{ pattern: /<span>⚡<\/span>/g, replacement: "<span></span>" },
		{ pattern: /<span>🚀<\/span>/g, replacement: "<span></span>" },
		{ pattern: /📄/g, replacement: "" },
		{ pattern: /🎨/g, replacement: "" },
		{ pattern: /⚡/g, replacement: "" },
		{ pattern: /🚀/g, replacement: "" },

		// Section title emojis
		{
			pattern: /<h2>🚀 Live Code Editor<\/h2>/g,
			replacement: "<h2>Live Code Editor</h2>",
		},
		{
			pattern: /<h2>🎨 Live Code Editor<\/h2>/g,
			replacement: "<h2>Live Code Editor</h2>",
		},
		{
			pattern: /<h2>⚡ Live Code Editor<\/h2>/g,
			replacement: "<h2>Live Code Editor</h2>",
		},

		// Other common emojis that might appear
		{ pattern: /💻/g, replacement: "" },
		{ pattern: /🔧/g, replacement: "" },
		{ pattern: /✨/g, replacement: "" },
		{ pattern: /🎯/g, replacement: "" },
		{ pattern: /📝/g, replacement: "" },
		{ pattern: /🔍/g, replacement: "" },
		{ pattern: /📊/g, replacement: "" },
		{ pattern: /🎉/g, replacement: "" },
		{ pattern: /⚠️/g, replacement: "" },
		{ pattern: /❌/g, replacement: "" },
		{ pattern: /✅/g, replacement: "" },
		{ pattern: /🔄/g, replacement: "" },
		{ pattern: /📋/g, replacement: "" },
		{ pattern: /▶️/g, replacement: "" },
		{ pattern: /📄/g, replacement: "" },
		{ pattern: /🎨/g, replacement: "" },
		{ pattern: /⚡/g, replacement: "" },
		{ pattern: /🚀/g, replacement: "" },
	];

	// Apply all replacements
	emojiReplacements.forEach(({ pattern, replacement }) => {
		htmlContent = htmlContent.replace(pattern, replacement);
	});

	// Clean up any remaining emoji characters using Unicode ranges
	// This catches any emojis we might have missed
	htmlContent = htmlContent.replace(/[\u{1F600}-\u{1F64F}]/gu, ""); // Emoticons
	htmlContent = htmlContent.replace(/[\u{1F300}-\u{1F5FF}]/gu, ""); // Misc Symbols
	htmlContent = htmlContent.replace(/[\u{1F680}-\u{1F6FF}]/gu, ""); // Transport
	htmlContent = htmlContent.replace(/[\u{1F1E0}-\u{1F1FF}]/gu, ""); // Regional indicators
	htmlContent = htmlContent.replace(/[\u{2600}-\u{26FF}]/gu, ""); // Misc symbols
	htmlContent = htmlContent.replace(/[\u{2700}-\u{27BF}]/gu, ""); // Dingbats

	fs.writeFileSync(htmlPath, htmlContent);
	console.log(`    ✅ Removed all emojis from HTML`);
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
		removeAllEmojis(htmlPath);
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
	console.log(
		"🚀 Performing complete emoji removal from live code editors...\n"
	);

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

	console.log(`\n🎉 Complete emoji removal finished!`);
	console.log(`📊 Processed ${processedCount} modules`);
	console.log(`\n✨ Changes made:`);
	console.log(`   - Removed ALL emojis from button text`);
	console.log(`   - Removed ALL emojis from language icons`);
	console.log(`   - Removed ALL emojis from section titles`);
	console.log(`   - Applied comprehensive Unicode emoji removal`);
	console.log(`   - Cleaned up any remaining emoji characters`);
	console.log(
		`\n🚀 The live code editors now have a completely clean, professional appearance!`
	);
}

// Run the script
if (require.main === module) {
	main();
}

module.exports = { removeAllEmojis, processDemo, processModule };
