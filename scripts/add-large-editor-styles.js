#!/usr/bin/env node

/**
 * Add Large Editor Styles Script
 * Adds Monaco Editor styles with larger height to all modules
 */

const fs = require("fs");
const path = require("path");

// Configuration
const TRADITIONAL_WEB_DIR = "./01-traditional-web";

/**
 * Add large Monaco Editor styles to CSS file
 */
function addLargeEditorStyles(cssPath) {
	console.log(`  🔧 Adding large editor styles: ${path.basename(cssPath)}`);

	let cssContent = fs.readFileSync(cssPath, "utf8");

	// Check if Monaco Editor styles already exist
	if (cssContent.includes(".monaco-editor")) {
		// Update existing height
		cssContent = cssContent.replace(
			/\.monaco-editor\s*\{[^}]*\}/g,
			`.monaco-editor {
    height: 500px !important;
    border: none !important;
    font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace !important;
}`
		);
		console.log(`    ✅ Updated existing Monaco Editor height to 500px`);
	} else {
		// Add new Monaco Editor styles
		const monacoEditorCSS = `
/* Monaco Editor Styles - Large Size */
.monaco-editor {
    height: 500px !important;
    border: none !important;
    font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace !important;
    border-radius: 8px;
    overflow: hidden;
}

/* Live Code Editor Container - Enhanced */
.live-editor-container {
    background: #1e293b;
    border-radius: 12px;
    margin: 1rem 0;
    overflow: hidden;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
    border: 2px solid #334155;
}

.live-editor-header {
    background: linear-gradient(135deg, #334155, #475569);
    padding: 0.75rem 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #475569;
}

.live-editor-title {
    color: #e2e8f0;
    font-size: 0.875rem;
    font-weight: 500;
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.language-icon {
    width: 20px;
    height: 20px;
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.75rem;
    font-weight: 600;
}

.language-icon.css {
    background: #1572b6;
    color: white;
}

.language-icon.javascript {
    background: #f7df1e;
    color: #000;
}

.language-icon.html {
    background: #e34f26;
    color: white;
}

.live-editor-actions {
    display: flex;
    gap: 0.5rem;
}

.live-editor-btn {
    background: #475569;
    color: #e2e8f0;
    border: none;
    padding: 0.25rem 0.75rem;
    border-radius: 4px;
    font-size: 0.75rem;
    cursor: pointer;
    transition: all 0.2s ease;
    display: flex;
    align-items: center;
    gap: 0.25rem;
}

.live-editor-btn:hover {
    background: #64748b;
    transform: translateY(-1px);
}

.live-editor-btn.primary {
    background: #3b82f6;
    color: white;
}

.live-editor-btn.primary:hover {
    background: #2563eb;
}

.live-editor-btn.success {
    background: #10b981;
    color: white;
}

.live-editor-btn.success:hover {
    background: #059669;
}

.live-editor-footer {
    background: #334155;
    padding: 0.5rem 1rem;
    color: #94a3b8;
    font-size: 0.75rem;
    border-top: 1px solid #475569;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.live-editor-stats {
    display: flex;
    gap: 1rem;
}

.live-editor-status {
    display: flex;
    align-items: center;
    gap: 0.25rem;
}

.status-indicator {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: #10b981;
    animation: pulse 2s infinite;
}

.status-indicator.error {
    background: #ef4444;
}

.status-indicator.warning {
    background: #f59e0b;
}

/* Live Preview Area - Enhanced */
.live-preview {
    background: white;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    margin: 1rem 0;
    padding: 1rem;
    min-height: 200px;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.live-preview-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
    padding-bottom: 0.5rem;
    border-bottom: 1px solid #e2e8f0;
}

.live-preview-title {
    font-weight: 600;
    color: #1e293b;
}

/* Error Display */
.error-display {
    background: #fef2f2;
    border: 1px solid #fecaca;
    border-radius: 8px;
    padding: 1rem;
    margin: 1rem 0;
    color: #dc2626;
    font-size: 0.875rem;
}

.error-display.hidden {
    display: none;
}

@keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
}`;

		cssContent += monacoEditorCSS;
		console.log(`    ✅ Added large Monaco Editor styles (500px height)`);
	}

	// Ensure live preview has good height
	if (!cssContent.includes("min-height: 200px")) {
		cssContent = cssContent.replace(
			/min-height:\s*100px/g,
			"min-height: 200px"
		);
		console.log(`    ✅ Set live preview min-height to 200px`);
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
		addLargeEditorStyles(cssPath);
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
	console.log("🚀 Adding large editor styles to all modules...\n");

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

	console.log(`\n🎉 Large editor styles added!`);
	console.log(`📊 Processed ${processedCount} modules`);
	console.log(`\n✨ Changes made:`);
	console.log(`   - Monaco Editor height set to 500px (much larger!)`);
	console.log(`   - Live preview min-height set to 200px`);
	console.log(`   - Enhanced styling with better shadows and spacing`);
	console.log(`   - Applied !important to ensure height is respected`);
	console.log(
		`\n🚀 The live code editors should now be much larger and more comfortable to use!`
	);
}

// Run the script
if (require.main === module) {
	main();
}

module.exports = { addLargeEditorStyles, processDemo, processModule };
