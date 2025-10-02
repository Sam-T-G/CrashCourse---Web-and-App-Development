#!/usr/bin/env node

/**
 * Live Code Editor Implementation Script
 * Automatically converts all traditional web modules to use live, editable code editors
 */

const fs = require("fs");
const path = require("path");

// Configuration
const TRADITIONAL_WEB_DIR = "./01-traditional-web";
const MODULES_TO_UPDATE = [
	"01-html-visual-basics",
	"02-css-styling-demo",
	"02b-padding-margins-centering",
	"02c-css-flexbox-deep-dive",
	"02d-css-grid-fundamentals",
	"02e-css-animations-transitions",
	"02f-css-variables-custom-properties",
	"03-javascript-interactions",
	"04-traditional-to-modern-bridge",
	"05-production-example",
];

/**
 * Convert code editor to live editor in HTML
 */
function convertToLiveEditor(htmlContent, editorId, language = "css") {
	// Replace code-editor-container with live-editor-container
	const liveEditorHTML = `
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
                    </div>
                </div>`;

	// Replace the old code editor structure
	const oldEditorPattern = new RegExp(
		`<div class="demo-card">[\\s\\S]*?<div class="code-editor-container">[\\s\\S]*?<div id="${editorId}"[\\s\\S]*?<\\/div>[\\s\\S]*?<\\/div>[\\s\\S]*?<\\/div>`,
		"g"
	);

	return htmlContent.replace(oldEditorPattern, liveEditorHTML);
}

/**
 * Add live editor styles to CSS
 */
function addLiveEditorStyles(cssContent) {
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

	// Check if live editor styles already exist
	if (!cssContent.includes(".live-editor-container")) {
		return cssContent + liveEditorStyles;
	}
	return cssContent;
}

/**
 * Add live editor functionality to JavaScript
 */
function addLiveEditorFunctionality(jsContent) {
	const liveEditorJS = `
// Live Editor Functions
function updateStats(editorId, editor) {
    const model = editor.getModel();
    const lines = model.getLineCount();
    const chars = model.getValueLength();
    
    const linesElement = document.getElementById(\`\${editorId}-lines\`);
    const charsElement = document.getElementById(\`\${editorId}-chars\`);
    
    if (linesElement) linesElement.textContent = \`\${lines} lines\`;
    if (charsElement) charsElement.textContent = \`\${chars} characters\`;
}

function executeCode(editorId) {
    const editor = window.liveEditors[editorId];
    if (!editor) return;

    const code = editor.getValue();
    const language = editor.getModel().getLanguageId();
    
    try {
        if (language === 'css') {
            executeCSS(editorId, code);
        } else if (language === 'javascript') {
            executeJavaScript(editorId, code);
        } else if (language === 'html') {
            executeHTML(editorId, code);
        }
        
        hideError(editorId);
        updateStatus(editorId, 'success', 'Code executed successfully');
    } catch (error) {
        showError(editorId, error.message);
        updateStatus(editorId, 'error', 'Execution failed');
    }
}

function executeCSS(editorId, cssCode) {
    // Remove existing live styles
    const existingStyle = document.getElementById(\`live-styles-\${editorId}\`);
    if (existingStyle) {
        existingStyle.remove();
    }

    // Create new style element
    const style = document.createElement('style');
    style.id = \`live-styles-\${editorId}\`;
    style.textContent = cssCode;
    document.head.appendChild(style);

    // Update preview content
    updatePreview(editorId);
}

function executeJavaScript(editorId, jsCode) {
    try {
        // Use Function constructor for safer execution
        const func = new Function(jsCode);
        func();
    } catch (error) {
        throw new Error(\`JavaScript Error: \${error.message}\`);
    }
}

function executeHTML(editorId, htmlCode) {
    const previewContent = document.getElementById(\`\${editorId}-preview-content\`);
    if (previewContent) {
        previewContent.innerHTML = htmlCode;
    }
}

function updatePreview(editorId) {
    const previewContent = document.getElementById(\`\${editorId}-preview-content\`);
    if (!previewContent) return;

    // Default preview content
    previewContent.innerHTML = \`
        <div class="live-demo-box">
            <h3>Live Code Demo</h3>
            <p>Edit the code above to see changes in real-time!</p>
        </div>
    \`;
}

function resetCode(editorId) {
    const editor = window.liveEditors[editorId];
    if (editor && window.originalCode[editorId]) {
        editor.setValue(window.originalCode[editorId]);
        executeCode(editorId);
        showFeedback(event.target, 'Reset!', '#3b82f6');
    }
}

function showError(editorId, message) {
    const errorDisplay = document.getElementById(\`error-display-\${editorId}\`);
    if (errorDisplay) {
        const errorMessage = errorDisplay.querySelector('.error-message');
        if (errorMessage) {
            errorMessage.textContent = message;
        }
        errorDisplay.classList.remove('hidden');
    }
}

function hideError(editorId) {
    const errorDisplay = document.getElementById(\`error-display-\${editorId}\`);
    if (errorDisplay) {
        errorDisplay.classList.add('hidden');
    }
}

function updateStatus(editorId, type, message) {
    const statusIndicator = document.querySelector(\`#\${editorId} + .live-editor-footer .status-indicator\`);
    const statusText = document.querySelector(\`#\${editorId} + .live-editor-footer .live-editor-status span\`);
    
    if (statusIndicator) {
        statusIndicator.className = \`status-indicator \${type}\`;
    }
    if (statusText) {
        statusText.textContent = message;
    }
}

function showFeedback(element, message, color) {
    const originalText = element.textContent;
    const originalColor = element.style.background;
    
    element.textContent = message;
    element.style.background = color;
    
    setTimeout(() => {
        element.textContent = originalText;
        element.style.background = originalColor;
    }, 2000);
}`;

	// Check if live editor functions already exist
	if (!jsContent.includes("function updateStats")) {
		return jsContent + liveEditorJS;
	}
	return jsContent;
}

/**
 * Update editor initialization to be live
 */
function updateEditorInitialization(jsContent) {
	// Replace readOnly: true with readOnly: false
	let updated = jsContent.replace(/readOnly:\s*true/g, "readOnly: false");

	// Add change listener
	updated = updated.replace(
		/readOnly: false,/g,
		`readOnly: false,
            wordWrap: 'on',
            folding: true,`
	);

	// Add change listener after editor creation
	updated = updated.replace(
		/window\.liveEditors\[editorId\] = editor;/g,
		`window.liveEditors[editorId] = editor;
        
        // Update stats
        updateStats(editorId, editor);
        
        // Listen for changes
        editor.onDidChangeModelContent(() => {
            updateStats(editorId, editor);
            executeCode(editorId);
        });
        
        // Initial execution
        executeCode(editorId);`
	);

	return updated;
}

/**
 * Process a single module
 */
function processModule(modulePath) {
	console.log(`\n🔄 Processing module: ${modulePath}`);

	const demoDirs = fs.readdirSync(modulePath).filter((item) => {
		const itemPath = path.join(modulePath, item);
		return fs.statSync(itemPath).isDirectory() && item !== "node_modules";
	});

	for (const demoDir of demoDirs) {
		const demoPath = path.join(modulePath, demoDir);
		console.log(`  📁 Processing demo: ${demoDir}`);

		// Update HTML file
		const htmlPath = path.join(demoPath, "index.html");
		if (fs.existsSync(htmlPath)) {
			let htmlContent = fs.readFileSync(htmlPath, "utf8");

			// Convert code editors to live editors
			htmlContent = htmlContent.replace(
				/<div class="code-editor-container">/g,
				'<div class="live-editor-container">'
			);
			htmlContent = htmlContent.replace(
				/<div class="code-editor-header">/g,
				'<div class="live-editor-header">'
			);
			htmlContent = htmlContent.replace(
				/<div class="code-editor-title">/g,
				'<div class="live-editor-title">'
			);
			htmlContent = htmlContent.replace(
				/<div class="code-editor-actions">/g,
				'<div class="live-editor-actions">'
			);
			htmlContent = htmlContent.replace(
				/<div class="code-editor-footer">/g,
				'<div class="live-editor-footer">'
			);
			htmlContent = htmlContent.replace(
				/class="code-editor-btn"/g,
				'class="live-editor-btn"'
			);

			// Add live preview areas
			htmlContent = htmlContent.replace(
				/<\/div>\s*<\/div>\s*<\/div>\s*<\/div>/g,
				`</div>
                    </div>
                    <div class="live-preview" id="live-preview">
                        <div class="live-preview-header">
                            <div class="live-preview-title">Live Preview</div>
                        </div>
                        <div id="live-preview-content">
                            <!-- Live preview content will be inserted here -->
                        </div>
                    </div>
                </div>`
			);

			fs.writeFileSync(htmlPath, htmlContent);
			console.log(`    ✅ Updated: ${path.relative(process.cwd(), htmlPath)}`);
		}

		// Update CSS file
		const cssPath = path.join(demoPath, "styles.css");
		if (fs.existsSync(cssPath)) {
			let cssContent = fs.readFileSync(cssPath, "utf8");
			cssContent = addLiveEditorStyles(cssContent);
			fs.writeFileSync(cssPath, cssContent);
			console.log(`    ✅ Updated: ${path.relative(process.cwd(), cssPath)}`);
		}

		// Update JavaScript file
		const jsPath = path.join(demoPath, "script.js");
		if (fs.existsSync(jsPath)) {
			let jsContent = fs.readFileSync(jsPath, "utf8");
			jsContent = addLiveEditorFunctionality(jsContent);
			jsContent = updateEditorInitialization(jsContent);
			fs.writeFileSync(jsPath, jsContent);
			console.log(`    ✅ Updated: ${path.relative(process.cwd(), jsPath)}`);
		}
	}
}

/**
 * Main function
 */
function main() {
	console.log("🚀 Starting live editor implementation...\n");

	// Check if traditional web directory exists
	if (!fs.existsSync(TRADITIONAL_WEB_DIR)) {
		console.error(`❌ Directory ${TRADITIONAL_WEB_DIR} not found!`);
		process.exit(1);
	}

	let processedCount = 0;

	// Process each module
	for (const moduleName of MODULES_TO_UPDATE) {
		const modulePath = path.join(TRADITIONAL_WEB_DIR, moduleName);

		if (fs.existsSync(modulePath)) {
			processModule(modulePath);
			processedCount++;
		} else {
			console.log(`⏭️  Skipping ${moduleName} - directory not found`);
		}
	}

	console.log(`\n🎉 Live editor implementation complete!`);
	console.log(`📊 Processed ${processedCount} modules`);
	console.log(`\n✨ All code editors are now live and editable:`);
	console.log(`   - Real-time code execution`);
	console.log(`   - Live preview updates`);
	console.log(`   - Error handling and feedback`);
	console.log(`   - Copy, run, and reset functionality`);
}

// Run the script
if (require.main === module) {
	main();
}

module.exports = {
	convertToLiveEditor,
	addLiveEditorStyles,
	addLiveEditorFunctionality,
	updateEditorInitialization,
};
