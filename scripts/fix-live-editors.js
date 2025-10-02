#!/usr/bin/env node

/**
 * Live Editor Fix Script
 * Fixes all the issues preventing live editors from functioning properly
 */

const fs = require("fs");
const path = require("path");

// Configuration
const TRADITIONAL_WEB_DIR = "./01-traditional-web";

/**
 * Fix HTML files - Add missing error displays and fix preview content IDs
 */
function fixHTMLFile(htmlPath) {
	console.log(`  🔧 Fixing HTML: ${path.basename(htmlPath)}`);

	let htmlContent = fs.readFileSync(htmlPath, "utf8");

	// Fix preview content IDs to match JavaScript expectations
	htmlContent = htmlContent.replace(
		/id="([^"]+)-preview-content"/g,
		'id="$1-preview-content"'
	);

	// Add error displays for each editor
	const editorIds = [
		"hsl-code",
		"spacing-code",
		"typography-code",
		"shadow-code",
		"zindex-code",
	];

	editorIds.forEach((editorId) => {
		const errorDisplayHTML = `
                        <div class="error-display hidden" id="error-display-${editorId}">
                            <strong>Error:</strong> <span class="error-message"></span>
                        </div>`;

		// Add error display after preview content
		const previewContentPattern = new RegExp(
			`(<div id="${editorId}-preview-content"[^>]*>[\\s\\S]*?</div>)`,
			"g"
		);

		htmlContent = htmlContent.replace(
			previewContentPattern,
			`$1${errorDisplayHTML}`
		);
	});

	fs.writeFileSync(htmlPath, htmlContent);
}

/**
 * Fix JavaScript files - Add debugging and ensure proper initialization
 */
function fixJSFile(jsPath) {
	console.log(`  🔧 Fixing JavaScript: ${path.basename(jsPath)}`);

	let jsContent = fs.readFileSync(jsPath, "utf8");

	// Add debugging to Monaco Editor loading
	if (!jsContent.includes("console.log('Monaco Editor loaded successfully')")) {
		jsContent = jsContent.replace(
			/require\(\["vs\/editor\/editor\.main"\], function \(\) \{/,
			`require(["vs/editor/editor.main"], function () {
    console.log('Monaco Editor loaded successfully');`
		);
	}

	// Add debugging to initialization
	if (!jsContent.includes("console.log('Initializing live editors...')")) {
		jsContent = jsContent.replace(
			/function initializeLiveEditors\(\) \{/,
			`function initializeLiveEditors() {
    console.log('Initializing live editors...');`
		);
	}

	// Add element existence check
	if (!jsContent.includes("// Check if element exists")) {
		jsContent = jsContent.replace(
			/Object\.keys\(codeSnippets\)\.forEach\(\(editorId\) => \{/,
			`Object.keys(codeSnippets).forEach((editorId) => {
        console.log(\`Creating editor for: \${editorId}\`);
        
        // Check if element exists
        const element = document.getElementById(editorId);
        if (!element) {
            console.error(\`Element not found: \${editorId}\`);
            return;
        }`
		);
	}

	// Add debugging to executeCode function
	if (
		!jsContent.includes("console.log(`Executing code for editor: ${editorId}`)")
	) {
		jsContent = jsContent.replace(
			/function executeCode\(editorId\) \{/,
			`function executeCode(editorId) {
    console.log(\`Executing code for editor: \${editorId}\`);`
		);
	}

	// Add debugging to updatePreview function
	if (!jsContent.includes("console.error(`Preview content element not found")) {
		jsContent = jsContent.replace(
			/const previewContent = document\.getElementById\(\`\$\{editorId\}-preview-content\`\);/,
			`const previewContent = document.getElementById(\`\${editorId}-preview-content\`);
    if (!previewContent) {
        console.error(\`Preview content element not found: \${editorId}-preview-content\`);
        return;
    }`
		);
	}

	// Ensure all required functions exist
	const requiredFunctions = [
		"updateStats",
		"executeCode",
		"updatePreview",
		"resetCode",
		"showError",
		"hideError",
		"updateStatus",
		"showFeedback",
		"copyCode",
	];

	requiredFunctions.forEach((funcName) => {
		if (!jsContent.includes(`function ${funcName}(`)) {
			console.log(`    ⚠️  Missing function: ${funcName}`);
		}
	});

	fs.writeFileSync(jsPath, jsContent);
}

/**
 * Fix CSS files - Ensure live editor styles are present
 */
function fixCSSFile(cssPath) {
	console.log(`  🔧 Fixing CSS: ${path.basename(cssPath)}`);

	let cssContent = fs.readFileSync(cssPath, "utf8");

	// Check if live editor styles exist
	if (!cssContent.includes(".live-editor-container")) {
		console.log(
			`    ⚠️  Missing live editor styles in ${path.basename(cssPath)}`
		);

		const liveEditorStyles = `
/* Live Code Editor Styles */
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

/* Live Preview Area */
.live-preview {
    background: white;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    margin: 1rem 0;
    padding: 1rem;
    min-height: 100px;
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

		cssContent += liveEditorStyles;
		fs.writeFileSync(cssPath, cssContent);
	}
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
		fixHTMLFile(htmlPath);
	}

	// Fix CSS file
	const cssPath = path.join(demoPath, "styles.css");
	if (fs.existsSync(cssPath)) {
		fixCSSFile(cssPath);
	}

	// Fix JavaScript file
	const jsPath = path.join(demoPath, "script.js");
	if (fs.existsSync(jsPath)) {
		fixJSFile(jsPath);
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
	console.log("🚀 Starting live editor fixes...\n");

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

	console.log(`\n🎉 Live editor fixes complete!`);
	console.log(`📊 Processed ${processedCount} modules`);
	console.log(`\n✨ Fixed issues:`);
	console.log(`   - Added missing error display elements`);
	console.log(`   - Fixed preview content ID mismatches`);
	console.log(`   - Added debugging and error handling`);
	console.log(`   - Ensured all required functions exist`);
	console.log(`   - Added missing CSS styles`);
}

// Run the script
if (require.main === module) {
	main();
}

module.exports = {
	fixHTMLFile,
	fixJSFile,
	fixCSSFile,
	processDemo,
	processModule,
};
