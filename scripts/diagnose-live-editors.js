#!/usr/bin/env node

/**
 * Live Editor Diagnostic Script
 * Identifies and fixes all issues preventing live editors from functioning
 */

const fs = require("fs");
const path = require("path");

// Configuration
const TRADITIONAL_WEB_DIR = "./01-traditional-web";

/**
 * Check if Monaco Editor script is properly loaded
 */
function checkMonacoScript(htmlPath) {
	const htmlContent = fs.readFileSync(htmlPath, "utf8");

	if (!htmlContent.includes("monaco-editor")) {
		return { status: "missing", issue: "Monaco Editor script not found" };
	}

	if (
		!htmlContent.includes(
			"https://unpkg.com/monaco-editor@0.44.0/min/vs/loader.js"
		)
	) {
		return { status: "incorrect", issue: "Monaco Editor script URL incorrect" };
	}

	return { status: "ok", issue: null };
}

/**
 * Check if live editor HTML structure is correct
 */
function checkHTMLStructure(htmlPath) {
	const htmlContent = fs.readFileSync(htmlPath, "utf8");
	const issues = [];

	if (!htmlContent.includes("live-editor-container")) {
		issues.push("Missing live-editor-container");
	}

	if (!htmlContent.includes("monaco-editor")) {
		issues.push("Missing monaco-editor div");
	}

	if (!htmlContent.includes("live-code-preview-content")) {
		issues.push("Missing preview content div");
	}

	if (!htmlContent.includes("error-display")) {
		issues.push("Missing error display div");
	}

	// Check for proper editor ID
	if (!htmlContent.includes('id="live-code"')) {
		issues.push("Missing live-code editor ID");
	}

	return issues.length === 0
		? { status: "ok", issues: [] }
		: { status: "issues", issues };
}

/**
 * Check if JavaScript has proper initialization
 */
function checkJSInitialization(jsPath) {
	const jsContent = fs.readFileSync(jsPath, "utf8");
	const issues = [];

	if (!jsContent.includes("require.config")) {
		issues.push("Missing require.config");
	}

	if (!jsContent.includes("window.liveEditors")) {
		issues.push("Missing window.liveEditors global variable");
	}

	if (!jsContent.includes("initializeLiveEditors")) {
		issues.push("Missing initializeLiveEditors function");
	}

	if (!jsContent.includes("monaco.editor.create")) {
		issues.push("Missing Monaco Editor creation code");
	}

	if (!jsContent.includes("executeCode")) {
		issues.push("Missing executeCode function");
	}

	if (!jsContent.includes("updatePreview")) {
		issues.push("Missing updatePreview function");
	}

	return issues.length === 0
		? { status: "ok", issues: [] }
		: { status: "issues", issues };
}

/**
 * Check if CSS has live editor styles
 */
function checkCSSStyles(cssPath) {
	const cssContent = fs.readFileSync(cssPath, "utf8");
	const issues = [];

	if (!cssContent.includes(".live-editor-container")) {
		issues.push("Missing .live-editor-container styles");
	}

	if (!cssContent.includes(".monaco-editor")) {
		issues.push("Missing .monaco-editor styles");
	}

	if (!cssContent.includes(".live-preview")) {
		issues.push("Missing .live-preview styles");
	}

	return issues.length === 0
		? { status: "ok", issues: [] }
		: { status: "issues", issues };
}

/**
 * Create a working live editor implementation
 */
function createWorkingLiveEditor(htmlPath, jsPath, cssPath) {
	console.log(`  🔧 Creating working live editor implementation...`);

	// Fix HTML
	let htmlContent = fs.readFileSync(htmlPath, "utf8");

	// Ensure Monaco Editor script is present
	if (!htmlContent.includes("monaco-editor")) {
		htmlContent = htmlContent.replace(
			"<head>",
			`<head>
    <script src="https://unpkg.com/monaco-editor@0.44.0/min/vs/loader.js"></script>`
		);
	}

	// Ensure live editor structure exists
	if (!htmlContent.includes("live-editor-container")) {
		const liveEditorHTML = `
        <!-- Live Code Editor Section -->
        <div class="section">
            <h2>🚀 Live Code Editor</h2>
            <p>Edit code in real-time and see the results immediately!</p>
            
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
            </div>
        </div>
`;

		// Insert before the closing container div
		const insertPoint = htmlContent.lastIndexOf("</div>");
		if (insertPoint !== -1) {
			htmlContent =
				htmlContent.slice(0, insertPoint) +
				liveEditorHTML +
				htmlContent.slice(insertPoint);
		}
	}

	fs.writeFileSync(htmlPath, htmlContent);

	// Fix JavaScript
	const workingJS = `// Global variables for live editors
window.liveEditors = {};
window.originalCode = {};

// Initialize Monaco Editor
require.config({
    paths: { vs: "https://unpkg.com/monaco-editor@0.44.0/min/vs" },
});

require(["vs/editor/editor.main"], function () {
    console.log('Monaco Editor loaded successfully');
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeLiveEditors);
    } else {
        initializeLiveEditors();
    }
});

function initializeLiveEditors() {
    console.log('Initializing live editors...');
    
    // Wait a bit to ensure DOM is fully ready
    setTimeout(() => {
        const element = document.getElementById('live-code');
        if (!element) {
            console.error('Live editor element not found');
            return;
        }
        
        // Code snippet for the editor
        const codeSnippet = \`/* Live CSS Editor - Edit and see changes in real-time */
.demo-box {
    background: #3b82f6;
    color: white;
    padding: 1rem;
    border-radius: 8px;
    margin: 1rem 0;
    transition: all 0.3s ease;
}

.demo-box:hover {
    background: #10b981;
    transform: scale(1.05);
}

.demo-text {
    font-size: 1.2rem;
    font-weight: 600;
    text-align: center;
}\`;

        // Store original code
        window.originalCode['live-code'] = codeSnippet;

        // Create editor
        const editor = monaco.editor.create(element, {
            value: codeSnippet,
            language: "css",
            theme: "vs-dark",
            automaticLayout: true,
            minimap: { enabled: false },
            scrollBeyondLastLine: false,
            fontSize: 14,
            lineNumbers: "on",
            roundedSelection: false,
            scrollbar: {
                vertical: "auto",
                horizontal: "auto",
            },
            readOnly: false,
            wordWrap: "on",
            folding: true,
        });

        // Store editor reference
        window.liveEditors['live-code'] = editor;
        
        // Update stats
        updateStats('live-code', editor);
        
        // Listen for changes
        editor.onDidChangeModelContent(() => {
            updateStats('live-code', editor);
            executeCode('live-code');
        });
        
        // Initial execution
        executeCode('live-code');
        
        console.log('Live editor initialized successfully');
    }, 100);
}

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
    console.log(\`Executing code for editor: \${editorId}\`);
    
    const editor = window.liveEditors[editorId];
    if (!editor) {
        console.error(\`Editor not found: \${editorId}\`);
        return;
    }

    const code = editor.getValue();
    
    try {
        // Remove existing live styles for this editor
        const existingStyle = document.getElementById(\`live-styles-\${editorId}\`);
        if (existingStyle) {
            existingStyle.remove();
        }

        // Create new style element
        const style = document.createElement('style');
        style.id = \`live-styles-\${editorId}\`;
        style.textContent = code;
        document.head.appendChild(style);

        // Update preview content
        updatePreview(editorId);
        
        hideError(editorId);
        updateStatus(editorId, 'success', 'Code executed successfully');
    } catch (error) {
        console.error(\`Error executing code for \${editorId}:\`, error);
        showError(editorId, error.message);
        updateStatus(editorId, 'error', 'Execution failed');
    }
}

function updatePreview(editorId) {
    const previewContent = document.getElementById(\`\${editorId}-preview-content\`);
    if (!previewContent) {
        console.error(\`Preview content element not found: \${editorId}-preview-content\`);
        return;
    }

    // Create preview content
    previewContent.innerHTML = \`
        <div class="demo-box">
            <h3>Live Code Demo</h3>
            <p>Edit the CSS above to see changes in real-time!</p>
            <div class="demo-text">This text will change based on your CSS</div>
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
}

function copyCode(editorId) {
    const editor = window.liveEditors[editorId];
    if (editor) {
        navigator.clipboard.writeText(editor.getValue()).then(() => {
            showFeedback(event.target, 'Copied!', '#10b981');
        });
    }
}
`;

	fs.writeFileSync(jsPath, workingJS);

	// Fix CSS
	let cssContent = fs.readFileSync(cssPath, "utf8");

	if (!cssContent.includes(".live-editor-container")) {
		const liveEditorCSS = `
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

/* Monaco Editor Styles */
.monaco-editor {
    height: 300px !important;
    border: none !important;
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

		cssContent += liveEditorCSS;
		fs.writeFileSync(cssPath, cssContent);
	}

	console.log(`    ✅ Working live editor implementation created`);
}

/**
 * Process a single demo directory
 */
function processDemo(demoPath) {
	const demoName = path.basename(demoPath);
	console.log(`  📁 Processing demo: ${demoName}`);

	const htmlPath = path.join(demoPath, "index.html");
	const jsPath = path.join(demoPath, "script.js");
	const cssPath = path.join(demoPath, "styles.css");

	if (
		!fs.existsSync(htmlPath) ||
		!fs.existsSync(jsPath) ||
		!fs.existsSync(cssPath)
	) {
		console.log(`    ⚠️  Missing required files`);
		return;
	}

	// Check Monaco script
	const monacoCheck = checkMonacoScript(htmlPath);
	if (monacoCheck.status !== "ok") {
		console.log(`    ❌ Monaco Script: ${monacoCheck.issue}`);
	} else {
		console.log(`    ✅ Monaco Script: OK`);
	}

	// Check HTML structure
	const htmlCheck = checkHTMLStructure(htmlPath);
	if (htmlCheck.status !== "ok") {
		console.log(`    ❌ HTML Structure: ${htmlCheck.issues.join(", ")}`);
	} else {
		console.log(`    ✅ HTML Structure: OK`);
	}

	// Check JavaScript
	const jsCheck = checkJSInitialization(jsPath);
	if (jsCheck.status !== "ok") {
		console.log(`    ❌ JavaScript: ${jsCheck.issues.join(", ")}`);
	} else {
		console.log(`    ✅ JavaScript: OK`);
	}

	// Check CSS
	const cssCheck = checkCSSStyles(cssPath);
	if (cssCheck.status !== "ok") {
		console.log(`    ❌ CSS Styles: ${cssCheck.issues.join(", ")}`);
	} else {
		console.log(`    ✅ CSS Styles: OK`);
	}

	// If any issues found, create working implementation
	if (
		monacoCheck.status !== "ok" ||
		htmlCheck.status !== "ok" ||
		jsCheck.status !== "ok" ||
		cssCheck.status !== "ok"
	) {
		createWorkingLiveEditor(htmlPath, jsPath, cssPath);
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
	console.log("🔍 Diagnosing live editor issues...\n");

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

	console.log(`\n🎉 Live editor diagnosis complete!`);
	console.log(`📊 Processed ${processedCount} modules`);
	console.log(`\n✨ All live editors should now be working properly.`);
	console.log(`\n🚀 To test:`);
	console.log(`   1. Open any index.html file in a web browser`);
	console.log(`   2. Open browser developer tools (F12)`);
	console.log(`   3. Check console for "Monaco Editor loaded successfully"`);
	console.log(`   4. Try editing code in the Monaco Editor`);
	console.log(`   5. Verify real-time execution and preview updates`);
}

// Run the script
if (require.main === module) {
	main();
}

module.exports = {
	checkMonacoScript,
	checkHTMLStructure,
	checkJSInitialization,
	checkCSSStyles,
	createWorkingLiveEditor,
	processDemo,
	processModule,
};
