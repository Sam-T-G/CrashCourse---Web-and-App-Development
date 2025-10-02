#!/usr/bin/env node

/**
 * Fix HTML Structure Script
 * Properly converts HTML files to use live editor structure
 */

const fs = require("fs");
const path = require("path");

// Configuration
const TRADITIONAL_WEB_DIR = "./01-traditional-web";

/**
 * Fix HTML file structure to use live editors
 */
function fixHTMLStructure(htmlPath) {
	console.log(`  🔧 Fixing HTML structure: ${path.basename(htmlPath)}`);

	let htmlContent = fs.readFileSync(htmlPath, "utf8");

	// Check if already has live editor containers
	if (htmlContent.includes("live-editor-container")) {
		console.log(`    ✅ Already has live editor structure`);
		return;
	}

	// Find all code editor containers and replace them
	const codeEditorPattern =
		/<div class="code-editor-container">[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/g;

	htmlContent = htmlContent.replace(codeEditorPattern, (match) => {
		// Extract editor ID from the match
		const idMatch = match.match(/id="([^"]+)"/);
		if (!idMatch) return match;

		const editorId = idMatch[1];
		const language = editorId.includes("css")
			? "css"
			: editorId.includes("js") || editorId.includes("javascript")
			? "javascript"
			: editorId.includes("html")
			? "html"
			: "css";

		return `
                <div class="demo-card">
                    <div class="demo-title">Live Code Editor</div>
                    <div class="live-editor-container">
                        <div class="live-editor-header">
                            <div class="live-editor-title">
                                <div class="language-icon ${language}">${language.toUpperCase()}</div>
                                <span>${editorId}.${language}</span>
                            </div>
                            <div class="live-editor-actions">
                                <button class="live-editor-btn" onclick="copyCode('${editorId}')">📋 Copy</button>
                                <button class="live-editor-btn primary" onclick="executeCode('${editorId}')">▶️ Run</button>
                                <button class="live-editor-btn success" onclick="resetCode('${editorId}')">🔄 Reset</button>
                            </div>
                        </div>
                        <div id="${editorId}" class="monaco-editor"></div>
                        <div class="live-editor-footer">
                            <div class="live-editor-stats">
                                <span id="${editorId}-lines">0 lines</span>
                                <span id="${editorId}-chars">0 characters</span>
                            </div>
                            <div class="live-editor-status">
                                <div class="status-indicator"></div>
                                <span>Live Editor Ready</span>
                            </div>
                        </div>
                    </div>
                    <div class="live-preview" id="${editorId}-preview">
                        <div class="live-preview-header">
                            <div class="live-preview-title">Live Preview</div>
                        </div>
                        <div id="${editorId}-preview-content">
                            <!-- Live preview content will be inserted here -->
                        </div>
                        <div class="error-display hidden" id="error-display-${editorId}">
                            <strong>Error:</strong> <span class="error-message"></span>
                        </div>
                    </div>
                </div>`;
	});

	// If no code editor containers found, add a basic live editor structure
	if (!htmlContent.includes("live-editor-container")) {
		console.log(`    ➕ Adding basic live editor structure`);

		// Find a good place to insert the live editor (after demo-grid or demo-card)
		const insertPattern =
			/(<div class="demo-grid">[\s\S]*?<\/div>\s*<\/div>\s*<\/section>)/;
		const basicLiveEditor = `
            <div class="demo-card">
                <div class="demo-title">Live Code Editor</div>
                <div class="live-editor-container">
                    <div class="live-editor-header">
                        <div class="live-editor-title">
                            <div class="language-icon css">CSS</div>
                            <span>live-code.css</span>
                        </div>
                        <div class="live-editor-actions">
                            <button class="live-editor-btn" onclick="copyCode('live-code')">📋 Copy</button>
                            <button class="live-editor-btn primary" onclick="executeCode('live-code')">▶️ Run</button>
                            <button class="live-editor-btn success" onclick="resetCode('live-code')">🔄 Reset</button>
                        </div>
                    </div>
                    <div id="live-code" class="monaco-editor"></div>
                    <div class="live-editor-footer">
                        <div class="live-editor-stats">
                            <span id="live-code-lines">0 lines</span>
                            <span id="live-code-chars">0 characters</span>
                        </div>
                        <div class="live-editor-status">
                            <div class="status-indicator"></div>
                            <span>Live Editor Ready</span>
                        </div>
                    </div>
                </div>
                <div class="live-preview" id="live-code-preview">
                    <div class="live-preview-header">
                        <div class="live-preview-title">Live Preview</div>
                    </div>
                    <div id="live-code-preview-content">
                        <!-- Live preview content will be inserted here -->
                    </div>
                    <div class="error-display hidden" id="error-display-live-code">
                        <strong>Error:</strong> <span class="error-message"></span>
                    </div>
                </div>
            </div>`;

		htmlContent = htmlContent.replace(insertPattern, `$1${basicLiveEditor}`);
	}

	fs.writeFileSync(htmlPath, htmlContent);
	console.log(`    ✅ HTML structure updated`);
}

/**
 * Process a single demo directory
 */
function processDemo(demoPath) {
	const demoName = path.basename(demoPath);
	console.log(`  📁 Processing demo: ${demoName}`);

	// Fix HTML file
	const htmlPath = path.join(demoPath, "index.html");
	if (fs.existsSync(htmlPath)) {
		fixHTMLStructure(htmlPath);
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
	console.log("🚀 Fixing HTML structure for live editors...\n");

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

	console.log(`\n🎉 HTML structure fixes complete!`);
	console.log(`📊 Processed ${processedCount} modules`);
	console.log(`\n✨ Fixed issues:`);
	console.log(`   - Converted code-editor-container to live-editor-container`);
	console.log(`   - Added live editor headers with language icons`);
	console.log(`   - Added live editor actions (copy, run, reset)`);
	console.log(`   - Added live editor footer with stats and status`);
	console.log(`   - Added live preview areas`);
	console.log(`   - Added error display elements`);
}

// Run the script
if (require.main === module) {
	main();
}

module.exports = { fixHTMLStructure, processDemo, processModule };
