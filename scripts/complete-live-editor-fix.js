#!/usr/bin/env node

/**
 * Complete Live Editor Fix Script
 * Comprehensive fix for all live editor issues
 */

const fs = require("fs");
const path = require("path");

// Configuration
const TRADITIONAL_WEB_DIR = "./01-traditional-web";

/**
 * Fix HTML file completely
 */
function fixHTMLFile(htmlPath) {
	console.log(`  🔧 Completely fixing HTML: ${path.basename(htmlPath)}`);

	let htmlContent = fs.readFileSync(htmlPath, "utf8");

	// Add Monaco Editor script if missing
	if (!htmlContent.includes("monaco-editor")) {
		htmlContent = htmlContent.replace(
			"<head>",
			`<head>
    <script src="https://unpkg.com/monaco-editor@0.44.0/min/vs/loader.js"></script>`
		);
	}

	// Add live editor structure if missing
	if (!htmlContent.includes("live-editor-container")) {
		// Find a good place to insert (before the closing div of container)
		const insertPoint = htmlContent.lastIndexOf("</div>");
		if (insertPoint !== -1) {
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

			htmlContent =
				htmlContent.slice(0, insertPoint) +
				liveEditorHTML +
				htmlContent.slice(insertPoint);
		}
	}

	fs.writeFileSync(htmlPath, htmlContent);
	console.log(`    ✅ HTML completely fixed`);
}

/**
 * Fix JavaScript file completely
 */
function fixJSFile(jsPath) {
	console.log(`  🔧 Completely fixing JavaScript: ${path.basename(jsPath)}`);

	let jsContent = fs.readFileSync(jsPath, "utf8");

	// Add global variables if missing
	if (!jsContent.includes("window.liveEditors")) {
		jsContent =
			`// Global variables for live editors
window.liveEditors = {};
window.originalCode = {};

` + jsContent;
	}

	// Add Monaco Editor initialization if missing
	if (!jsContent.includes("require.config")) {
		const monacoInit = `
// Initialize Monaco Editor
require.config({
    paths: { vs: "https://unpkg.com/monaco-editor@0.44.0/min/vs" },
});

require(["vs/editor/editor.main"], function () {
    console.log('Monaco Editor loaded successfully');
    // Initialize live editors
    initializeLiveEditors();
});

function initializeLiveEditors() {
    console.log('Initializing live editors...');
    
    // Code snippets for each editor
    const codeSnippets = {
        "live-code": \`/* Live CSS Editor - Edit and see changes in real-time */
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
}\`,
    };

    // Initialize live editors
    Object.keys(codeSnippets).forEach((editorId) => {
        console.log(\`Creating editor for: \${editorId}\`);
        
        // Check if element exists
        const element = document.getElementById(editorId);
        if (!element) {
            console.error(\`Element not found: \${editorId}\`);
            return;
        }
        
        // Store original code
        window.originalCode[editorId] = codeSnippets[editorId];

        // Create editor
        const editor = monaco.editor.create(element, {
            value: codeSnippets[editorId],
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
            readOnly: false, // Make it editable
            wordWrap: "on",
            folding: true,
        });

        // Store editor reference
        window.liveEditors[editorId] = editor;
        
        // Update stats
        updateStats(editorId, editor);
        
        // Listen for changes
        editor.onDidChangeModelContent(() => {
            updateStats(editorId, editor);
            executeCode(editorId);
        });
        
        // Initial execution
        executeCode(editorId);
    });
});

`;
		jsContent = monacoInit + jsContent;
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

	const missingFunctions = requiredFunctions.filter(
		(func) => !jsContent.includes(`function ${func}(`)
	);

	if (missingFunctions.length > 0) {
		const functionCode = `
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
    console.log(\`Code to execute:\`, code);
    
    try {
        // Remove existing live styles for this editor
        const existingStyle = document.getElementById(\`live-styles-\${editorId}\`);
        if (existingStyle) {
            existingStyle.remove();
            console.log(\`Removed existing style for \${editorId}\`);
        }

        // Create new style element
        const style = document.createElement('style');
        style.id = \`live-styles-\${editorId}\`;
        style.textContent = code;
        document.head.appendChild(style);
        console.log(\`Added new style for \${editorId}\`);

        // Update preview content
        updatePreview(editorId);
        console.log(\`Updated preview for \${editorId}\`);
        
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

    // Default preview for any editor
    previewContent.innerHTML = \`
        <div class="demo-box">
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
		jsContent += functionCode;
	}

	fs.writeFileSync(jsPath, jsContent);
	console.log(`    ✅ JavaScript completely fixed`);
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
	console.log("🚀 Complete live editor fix...\n");

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

	console.log(`\n🎉 Complete live editor fix finished!`);
	console.log(`📊 Processed ${processedCount} modules`);
	console.log(`\n✨ Fixed all issues:`);
	console.log(`   - Added Monaco Editor script tags`);
	console.log(`   - Added complete live editor HTML structure`);
	console.log(`   - Added all required JavaScript functions`);
	console.log(`   - Added proper initialization code`);
	console.log(`   - Added error handling and debugging`);
}

// Run the script
if (require.main === module) {
	main();
}

module.exports = { fixHTMLFile, fixJSFile, processDemo, processModule };
