#!/usr/bin/env node

/**
 * Add Missing Functions Script
 * Adds all missing live editor functions to JavaScript files
 */

const fs = require("fs");
const path = require("path");

// Configuration
const TRADITIONAL_WEB_DIR = "./01-traditional-web";

/**
 * Add missing functions to JavaScript file
 */
function addMissingFunctions(jsPath) {
	console.log(`  🔧 Adding missing functions to: ${path.basename(jsPath)}`);

	let jsContent = fs.readFileSync(jsPath, "utf8");

	// Check what functions are missing and add them
	const missingFunctions = [];

	if (!jsContent.includes("function copyCode(")) {
		missingFunctions.push(`
// Copy code function
function copyCode(editorId) {
    const editor = window.liveEditors[editorId];
    if (editor) {
        navigator.clipboard.writeText(editor.getValue()).then(() => {
            showFeedback(event.target, 'Copied!', '#10b981');
        });
    }
}`);
	}

	if (!jsContent.includes("function showFeedback(")) {
		missingFunctions.push(`
function showFeedback(element, message, color) {
    const originalText = element.textContent;
    const originalColor = element.style.background;
    
    element.textContent = message;
    element.style.background = color;
    
    setTimeout(() => {
        element.textContent = originalText;
        element.style.background = originalColor;
    }, 2000);
}`);
	}

	if (!jsContent.includes("function updateStats(")) {
		missingFunctions.push(`
function updateStats(editorId, editor) {
    const model = editor.getModel();
    const lines = model.getLineCount();
    const chars = model.getValueLength();
    
    const linesElement = document.getElementById(\`\${editorId}-lines\`);
    const charsElement = document.getElementById(\`\${editorId}-chars\`);
    
    if (linesElement) linesElement.textContent = \`\${lines} lines\`;
    if (charsElement) charsElement.textContent = \`\${chars} characters\`;
}`);
	}

	if (!jsContent.includes("function executeCode(")) {
		missingFunctions.push(`
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
}`);
	}

	if (!jsContent.includes("function updatePreview(")) {
		missingFunctions.push(`
function updatePreview(editorId) {
    const previewContent = document.getElementById(\`\${editorId}-preview-content\`);
    if (!previewContent) {
        console.error(\`Preview content element not found: \${editorId}-preview-content\`);
        return;
    }

    // Default preview for any editor
    previewContent.innerHTML = \`
        <div class="live-demo-box">
            <h3>Live Code Demo</h3>
            <p>Edit the code above to see changes in real-time!</p>
        </div>
    \`;
}`);
	}

	if (!jsContent.includes("function resetCode(")) {
		missingFunctions.push(`
function resetCode(editorId) {
    const editor = window.liveEditors[editorId];
    if (editor && window.originalCode[editorId]) {
        editor.setValue(window.originalCode[editorId]);
        executeCode(editorId);
        showFeedback(event.target, 'Reset!', '#3b82f6');
    }
}`);
	}

	if (!jsContent.includes("function showError(")) {
		missingFunctions.push(`
function showError(editorId, message) {
    const errorDisplay = document.getElementById(\`error-display-\${editorId}\`);
    if (errorDisplay) {
        const errorMessage = errorDisplay.querySelector('.error-message');
        if (errorMessage) {
            errorMessage.textContent = message;
        }
        errorDisplay.classList.remove('hidden');
    }
}`);
	}

	if (!jsContent.includes("function hideError(")) {
		missingFunctions.push(`
function hideError(editorId) {
    const errorDisplay = document.getElementById(\`error-display-\${editorId}\`);
    if (errorDisplay) {
        errorDisplay.classList.add('hidden');
    }
}`);
	}

	if (!jsContent.includes("function updateStatus(")) {
		missingFunctions.push(`
function updateStatus(editorId, type, message) {
    const statusIndicator = document.querySelector(\`#\${editorId} + .live-editor-footer .status-indicator\`);
    const statusText = document.querySelector(\`#\${editorId} + .live-editor-footer .live-editor-status span\`);
    
    if (statusIndicator) {
        statusIndicator.className = \`status-indicator \${type}\`;
    }
    if (statusText) {
        statusText.textContent = message;
    }
}`);
	}

	// Add missing functions to the end of the file
	if (missingFunctions.length > 0) {
		console.log(`    ➕ Adding ${missingFunctions.length} missing functions`);
		jsContent += "\n" + missingFunctions.join("\n");
		fs.writeFileSync(jsPath, jsContent);
	} else {
		console.log(`    ✅ All functions already present`);
	}
}

/**
 * Process a single demo directory
 */
function processDemo(demoPath) {
	const demoName = path.basename(demoPath);
	console.log(`  📁 Processing demo: ${demoName}`);

	// Fix JavaScript file
	const jsPath = path.join(demoPath, "script.js");
	if (fs.existsSync(jsPath)) {
		addMissingFunctions(jsPath);
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
	console.log("🚀 Adding missing live editor functions...\n");

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

	console.log(`\n🎉 Missing functions added!`);
	console.log(`📊 Processed ${processedCount} modules`);
	console.log(`\n✨ Added functions:`);
	console.log(`   - copyCode - Copy code to clipboard`);
	console.log(`   - showFeedback - Show user feedback`);
	console.log(`   - updateStats - Update editor statistics`);
	console.log(`   - executeCode - Execute code in real-time`);
	console.log(`   - updatePreview - Update preview content`);
	console.log(`   - resetCode - Reset to original code`);
	console.log(`   - showError - Display error messages`);
	console.log(`   - hideError - Hide error messages`);
	console.log(`   - updateStatus - Update status indicators`);
}

// Run the script
if (require.main === module) {
	main();
}

module.exports = { addMissingFunctions, processDemo, processModule };
