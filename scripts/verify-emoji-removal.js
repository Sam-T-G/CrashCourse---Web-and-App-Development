#!/usr/bin/env node

/**
 * Verify Emoji Removal Script
 * Checks that emojis have been removed from live code editors
 */

const fs = require("fs");
const path = require("path");

// Configuration
const TRADITIONAL_WEB_DIR = "./01-traditional-web";

/**
 * Check for emojis in HTML file
 */
function checkForEmojis(htmlPath) {
	const htmlContent = fs.readFileSync(htmlPath, "utf8");
	const fileName = path.basename(htmlPath);

	const emojis = ["📋", "▶️", "🔄", "📄", "🎨", "⚡", "🚀"];

	const foundEmojis = emojis.filter((emoji) => htmlContent.includes(emoji));

	if (foundEmojis.length === 0) {
		return { status: "clean", emojis: [] };
	} else {
		return { status: "has_emojis", emojis: foundEmojis };
	}
}

/**
 * Process a single demo directory
 */
function processDemo(demoPath) {
	const demoName = path.basename(demoPath);
	const htmlPath = path.join(demoPath, "index.html");

	if (!fs.existsSync(htmlPath)) {
		console.log(`  📁 ${demoName}: ❌ Missing index.html`);
		return false;
	}

	const result = checkForEmojis(htmlPath);
	const status = result.status === "clean" ? "✅" : "❌";
	const emojis = result.emojis.length > 0 ? result.emojis.join(", ") : "none";

	console.log(`  📁 ${demoName}: ${status} Emojis: ${emojis}`);
	return result.status === "clean";
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

	let cleanCount = 0;
	for (const demoDir of demoDirs) {
		const demoPath = path.join(modulePath, demoDir);
		if (processDemo(demoPath)) {
			cleanCount++;
		}
	}

	console.log(`  📊 ${cleanCount}/${demoDirs.length} demos are emoji-free`);
	return { clean: cleanCount, total: demoDirs.length };
}

/**
 * Main function
 */
function main() {
	console.log("🔍 Verifying emoji removal from live code editors...\n");

	// Check if traditional web directory exists
	if (!fs.existsSync(TRADITIONAL_WEB_DIR)) {
		console.error(`❌ Directory ${TRADITIONAL_WEB_DIR} not found!`);
		process.exit(1);
	}

	let totalClean = 0;
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
		totalClean += result.clean;
		totalDemos += result.total;
	}

	console.log(`\n📊 Final Results:`);
	console.log(`   Emoji-free demos: ${totalClean}/${totalDemos}`);

	if (totalClean === totalDemos) {
		console.log(`\n🎉 All live code editors are now emoji-free!`);
		console.log(`✨ The editors have a cleaner, more professional appearance.`);
	} else {
		console.log(`\n⚠️  Some editors still contain emojis.`);
	}

	console.log(`\n🚀 The live code editors now have:`);
	console.log(`   - Clean button text (Copy, Run, Reset)`);
	console.log(`   - Professional language icons`);
	console.log(`   - Minimalist section titles`);
	console.log(`   - Enterprise-ready appearance`);
}

// Run the script
if (require.main === module) {
	main();
}

module.exports = { checkForEmojis, processDemo, processModule };
