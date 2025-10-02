#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

// Section-specific code examples
const sectionCodeExamples = {
	// HTML Basics sections
	overview: `<!-- HTML Document Structure -->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My First Web Page</title>
</head>
<body>
    <h1>Welcome to My Website</h1>
    <p>This is the basic structure of an HTML document.</p>
    <p>Every HTML page needs these essential elements:</p>
    <ul>
        <li>DOCTYPE declaration</li>
        <li>html element</li>
        <li>head section</li>
        <li>body section</li>
    </ul>
</body>
</html>`,

	headings: `<!-- HTML Headings -->
<h1>Main Title (H1)</h1>
<h2>Section Title (H2)</h2>
<h3>Subsection (H3)</h3>
<h4>Smaller Heading (H4)</h4>
<h5>Even Smaller (H5)</h5>
<h6>Smallest Heading (H6)</h6>

<p>Headings create a hierarchy in your content. H1 is the most important, H6 is the least important.</p>

<style>
body {
    font-family: Arial, sans-serif;
    max-width: 600px;
    margin: 0 auto;
    padding: 2rem;
    line-height: 1.6;
}

h1 { color: #2563eb; }
h2 { color: #7c3aed; }
h3 { color: #059669; }
h4 { color: #dc2626; }
h5 { color: #ea580c; }
h6 { color: #6b7280; }
</style>`,

	text: `<!-- Text Elements -->
<p>This is a regular paragraph with <strong>bold text</strong> and <em>italic text</em>.</p>
<p>You can also use <code>inline code</code> and <mark>highlighted text</mark>.</p>
<p>Here's a <a href="#" onclick="alert('Link clicked!')">clickable link</a>.</p>

<blockquote>
    <p>This is a blockquote. It's used for longer quotes or important text.</p>
</blockquote>

<pre><code>// This is a code block
function hello() {
    console.log("Hello, World!");
}</code></pre>

<style>
body {
    font-family: Arial, sans-serif;
    max-width: 600px;
    margin: 0 auto;
    padding: 2rem;
    line-height: 1.6;
}

blockquote {
    border-left: 4px solid #3b82f6;
    padding-left: 1rem;
    margin: 1rem 0;
    background: #f8fafc;
    padding: 1rem;
    border-radius: 4px;
}

pre {
    background: #1e293b;
    color: #e2e8f0;
    padding: 1rem;
    border-radius: 8px;
    overflow-x: auto;
}

code {
    background: #f1f5f9;
    padding: 0.25rem 0.5rem;
    border-radius: 4px;
    font-family: 'Courier New', monospace;
}

mark {
    background: #fef08a;
    padding: 0.25rem;
}
</style>`,

	lists: `<!-- HTML Lists -->
<h2>Unordered List (Bullets)</h2>
<ul>
    <li>First item</li>
    <li>Second item</li>
    <li>Third item</li>
</ul>

<h2>Ordered List (Numbers)</h2>
<ol>
    <li>First step</li>
    <li>Second step</li>
    <li>Third step</li>
</ol>

<h2>Definition List</h2>
<dl>
    <dt>HTML</dt>
    <dd>HyperText Markup Language</dd>
    <dt>CSS</dt>
    <dd>Cascading Style Sheets</dd>
    <dt>JS</dt>
    <dd>JavaScript</dd>
</dl>

<h2>Nested Lists</h2>
<ul>
    <li>Fruits
        <ul>
            <li>Apples</li>
            <li>Bananas</li>
            <li>Oranges</li>
        </ul>
    </li>
    <li>Vegetables
        <ol>
            <li>Carrots</li>
            <li>Broccoli</li>
            <li>Spinach</li>
        </ol>
    </li>
</ul>

<style>
body {
    font-family: Arial, sans-serif;
    max-width: 600px;
    margin: 0 auto;
    padding: 2rem;
    line-height: 1.6;
}

ul, ol {
    margin: 1rem 0;
}

li {
    margin: 0.5rem 0;
}

dt {
    font-weight: bold;
    color: #2563eb;
}

dd {
    margin-left: 1rem;
    margin-bottom: 0.5rem;
}
</style>`,

	forms: `<!-- HTML Forms -->
<form>
    <h2>Contact Form</h2>
    
    <label for="name">Full Name:</label>
    <input type="text" id="name" name="name" required>
    
    <label for="email">Email:</label>
    <input type="email" id="email" name="email" required>
    
    <label for="age">Age:</label>
    <input type="number" id="age" name="age" min="13" max="120">
    
    <label for="country">Country:</label>
    <select id="country" name="country">
        <option value="">Select Country</option>
        <option value="us">United States</option>
        <option value="uk">United Kingdom</option>
        <option value="ca">Canada</option>
    </select>
    
    <label for="message">Message:</label>
    <textarea id="message" name="message" rows="4"></textarea>
    
    <label>
        <input type="checkbox" name="newsletter"> Subscribe to newsletter
    </label>
    
    <button type="submit">Submit Form</button>
</form>

<style>
body {
    font-family: Arial, sans-serif;
    max-width: 500px;
    margin: 0 auto;
    padding: 2rem;
}

form {
    background: #f8fafc;
    padding: 2rem;
    border-radius: 12px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

label {
    display: block;
    margin-bottom: 0.5rem;
    color: #374151;
    font-weight: 500;
}

input, select, textarea {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid #d1d5db;
    border-radius: 6px;
    margin-bottom: 1rem;
    font-size: 1rem;
}

input:focus, select:focus, textarea:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

button {
    background: #3b82f6;
    color: white;
    border: none;
    padding: 0.75rem 2rem;
    border-radius: 6px;
    font-size: 1rem;
    cursor: pointer;
    width: 100%;
}

button:hover {
    background: #2563eb;
}
</style>`,

	interactive: `<!-- Interactive Elements -->
<div class="interactive-demo">
    <h2>Interactive Elements Demo</h2>
    
    <button onclick="changeColor()">Change Background Color</button>
    <button onclick="showAlert()">Show Alert</button>
    <button onclick="toggleText()">Toggle Text</button>
    
    <div id="demo-text">This text can be toggled!</div>
    
    <div class="hover-demo">
        <p>Hover over this box to see the effect!</p>
    </div>
</div>

<script>
function changeColor() {
    const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    document.body.style.background = randomColor;
}

function showAlert() {
    alert('Hello! This is an interactive alert!');
}

function toggleText() {
    const text = document.getElementById('demo-text');
    if (text.style.display === 'none') {
        text.style.display = 'block';
    } else {
        text.style.display = 'none';
    }
}
</script>

<style>
body {
    font-family: Arial, sans-serif;
    max-width: 600px;
    margin: 0 auto;
    padding: 2rem;
    transition: background 0.3s ease;
}

button {
    background: #3b82f6;
    color: white;
    border: none;
    padding: 0.75rem 1.5rem;
    border-radius: 8px;
    cursor: pointer;
    margin: 0.5rem;
    font-size: 1rem;
    transition: all 0.3s ease;
}

button:hover {
    background: #2563eb;
    transform: translateY(-2px);
}

#demo-text {
    background: #f0f9ff;
    padding: 1rem;
    border-radius: 8px;
    margin: 1rem 0;
    border-left: 4px solid #3b82f6;
}

.hover-demo {
    background: #f8fafc;
    padding: 2rem;
    border-radius: 12px;
    text-align: center;
    transition: all 0.3s ease;
    cursor: pointer;
}

.hover-demo:hover {
    background: #e2e8f0;
    transform: scale(1.05);
    box-shadow: 0 4px 15px rgba(0,0,0,0.1);
}
</style>`,

	// CSS sections
	"color-palette": `/* CSS Color Properties */
.demo-container {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    padding: 2rem;
    border-radius: 12px;
    text-align: center;
}

.color-box {
    background: #3b82f6;
    color: white;
    padding: 1rem;
    margin: 1rem;
    border-radius: 8px;
    display: inline-block;
}

.color-box:hover {
    background: #10b981;
    transform: scale(1.05);
    transition: all 0.3s ease;
}

.text-color {
    color: #f59e0b;
    font-weight: bold;
}

.border-color {
    border: 3px solid #ef4444;
    padding: 1rem;
    border-radius: 8px;
}`,

	"color-theory": `/* Color Theory in CSS */
.primary-colors {
    background: #3b82f6; /* Blue */
    color: white;
    padding: 1rem;
    margin: 0.5rem;
    border-radius: 8px;
}

.secondary-colors {
    background: #10b981; /* Green */
    color: white;
    padding: 1rem;
    margin: 0.5rem;
    border-radius: 8px;
}

.accent-colors {
    background: #f59e0b; /* Orange */
    color: white;
    padding: 1rem;
    margin: 0.5rem;
    border-radius: 8px;
}

.complementary {
    background: #ef4444; /* Red */
    color: white;
    padding: 1rem;
    margin: 0.5rem;
    border-radius: 8px;
}

.container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 1rem;
    padding: 2rem;
}`,

	// JavaScript sections
	"event-handling": `// JavaScript Event Handling
function handleClick() {
    alert('Button clicked!');
}

function handleMouseOver() {
    document.body.style.background = '#f0f9ff';
}

function handleMouseOut() {
    document.body.style.background = '#ffffff';
}

function handleKeyPress(event) {
    if (event.key === 'Enter') {
        alert('Enter key pressed!');
    }
}

// Add event listeners
document.addEventListener('DOMContentLoaded', function() {
    const button = document.getElementById('demo-button');
    if (button) {
        button.addEventListener('click', handleClick);
        button.addEventListener('mouseover', handleMouseOver);
        button.addEventListener('mouseout', handleMouseOut);
    }
    
    document.addEventListener('keypress', handleKeyPress);
});

// HTML for testing
document.body.innerHTML = \`
<div style="text-align: center; padding: 2rem;">
    <button id="demo-button" style="background: #3b82f6; color: white; border: none; padding: 1rem 2rem; border-radius: 8px; cursor: pointer; font-size: 1rem;">
        Click Me!
    </button>
    <p style="margin-top: 1rem;">Try clicking the button, hovering over it, or pressing Enter!</p>
</div>
\`;`,

	"dom-manipulation": `// DOM Manipulation Examples
function createElement() {
    const newDiv = document.createElement('div');
    newDiv.textContent = 'New element created!';
    newDiv.style.background = '#10b981';
    newDiv.style.color = 'white';
    newDiv.style.padding = '1rem';
    newDiv.style.margin = '0.5rem';
    newDiv.style.borderRadius = '8px';
    
    document.body.appendChild(newDiv);
}

function changeText() {
    const element = document.getElementById('demo-text');
    if (element) {
        element.textContent = 'Text changed!';
        element.style.color = '#ef4444';
    }
}

function addClass() {
    const element = document.getElementById('demo-element');
    if (element) {
        element.classList.add('highlight');
    }
}

// Add CSS for highlight class
const style = document.createElement('style');
style.textContent = \`
.highlight {
    background: #fef08a !important;
    border: 2px solid #f59e0b !important;
    transform: scale(1.05) !important;
    transition: all 0.3s ease !important;
}
\`;
document.head.appendChild(style);

// HTML for testing
document.body.innerHTML = \`
<div style="text-align: center; padding: 2rem;">
    <div id="demo-element" style="background: #f8fafc; padding: 1rem; margin: 1rem; border-radius: 8px;">
        <p id="demo-text">Original text</p>
    </div>
    <button onclick="createElement()" style="background: #3b82f6; color: white; border: none; padding: 0.5rem 1rem; margin: 0.5rem; border-radius: 6px; cursor: pointer;">Create Element</button>
    <button onclick="changeText()" style="background: #10b981; color: white; border: none; padding: 0.5rem 1rem; margin: 0.5rem; border-radius: 6px; cursor: pointer;">Change Text</button>
    <button onclick="addClass()" style="background: #f59e0b; color: white; border: none; padding: 0.5rem 1rem; margin: 0.5rem; border-radius: 6px; cursor: pointer;">Add Class</button>
</div>
\`;`,
};

// Live editor template
const liveEditorTemplate = (sectionId, codeExample) => `
            <!-- Live Code Editor -->
            <div class="live-editor-section">
                <h3>🎮 Live Code Editor</h3>
                <div class="live-editor-container">
                    <div class="live-editor-header">
                        <div class="live-editor-title">
                            <div class="language-icon html">HTML</div>
                            <span>${sectionId}.html</span>
                        </div>
                        <div class="live-editor-actions">
                            <button class="live-editor-btn" onclick="copyCode('${sectionId}-editor')">Copy</button>
                            <button class="live-editor-btn primary" onclick="executeCode('${sectionId}-editor')">Run</button>
                            <button class="live-editor-btn success" onclick="resetCode('${sectionId}-editor')">Reset</button>
                        </div>
                    </div>
                    <div id="${sectionId}-editor" class="monaco-editor"></div>
                    <div class="live-editor-footer">
                        <div class="live-editor-stats">
                            <span id="${sectionId}-editor-lines">0 lines</span>
                            <span id="${sectionId}-editor-chars">0 characters</span>
                        </div>
                        <div class="live-editor-status">
                            <div class="status-indicator"></div>
                            <span>Live Editor Ready</span>
                        </div>
                    </div>
                </div>
                <div class="live-preview" id="${sectionId}-editor-preview">
                    <div class="live-preview-header">
                        <div class="live-preview-title">Live Preview</div>
                    </div>
                    <div id="${sectionId}-editor-preview-content">
                        <!-- Live preview content will be inserted here -->
                    </div>
                    <div class="error-display hidden" id="error-display-${sectionId}-editor">
                        <strong>Error:</strong> <span class="error-message"></span>
                    </div>
                </div>
            </div>`;

// Function to clean and rebuild HTML structure
function fixModuleHTML(modulePath) {
	const indexPath = path.join(modulePath, "index.html");

	if (!fs.existsSync(indexPath)) {
		console.log(`No index.html found in ${modulePath}`);
		return;
	}

	console.log(`Fixing ${path.basename(modulePath)}...`);

	// Read the original HTML
	let htmlContent = fs.readFileSync(indexPath, "utf8");

	// Remove all existing live editor sections to start clean
	htmlContent = htmlContent.replace(
		/<!-- Live Code Editor -->[\s\S]*?<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>/g,
		""
	);

	// Find all content sections and add appropriate live editors
	const contentSectionMatches = htmlContent.match(
		/id="([^"]+)" class="content-section"/g
	);

	if (contentSectionMatches) {
		contentSectionMatches.forEach((match) => {
			const sectionId = match.match(/id="([^"]+)"/)[1];
			console.log(`  Adding live editor to section: ${sectionId}`);

			// Get the appropriate code example
			const codeExample =
				sectionCodeExamples[sectionId] || sectionCodeExamples.overview;

			// Find the end of this section and add the live editor
			const sectionEndPattern = new RegExp(
				`(\\s*</div>\\s*<!-- [^>]*${sectionId}[^>]*-->|\\s*</div>\\s*</div>\\s*<!-- [^>]*${sectionId}[^>]*-->)`,
				"i"
			);
			const sectionEndMatch = htmlContent.match(sectionEndPattern);

			if (sectionEndMatch) {
				const liveEditorHtml = liveEditorTemplate(sectionId, codeExample);
				const insertPosition = sectionEndMatch.index;
				htmlContent =
					htmlContent.slice(0, insertPosition) +
					liveEditorHtml +
					htmlContent.slice(insertPosition);
			}
		});
	}

	// Write the fixed HTML
	fs.writeFileSync(indexPath, htmlContent);
	console.log(`  Fixed ${indexPath}`);
}

// Function to update JavaScript with section-specific code examples
function updateJavaScriptWithExamples(modulePath) {
	const scriptPath = path.join(modulePath, "script.js");

	if (!fs.existsSync(scriptPath)) {
		console.log(`No script.js found in ${modulePath}`);
		return;
	}

	console.log(`Updating JavaScript for ${path.basename(modulePath)}...`);

	// Create JavaScript with section-specific code examples
	const moduleName = path.basename(modulePath);
	let moduleType = "html";

	if (moduleName.includes("css")) {
		moduleType = "css";
	} else if (moduleName.includes("javascript") || moduleName.includes("js")) {
		moduleType = "javascript";
	}

	const javascriptContent = `// Global variables for live editors
window.liveEditors = {};
window.originalCode = {};

// Initialize Monaco Editor
require.config({
	paths: { vs: "https://unpkg.com/monaco-editor@0.44.0/min/vs" },
});

require(["vs/editor/editor.main"], function () {
	console.log("Monaco Editor loaded successfully");
	// Wait for DOM to be ready
	if (document.readyState === "loading") {
		document.addEventListener("DOMContentLoaded", initializeLiveEditors);
	} else {
		initializeLiveEditors();
	}
});

function initializeLiveEditors() {
	console.log("Initializing live editors...");

	// Wait a bit to ensure DOM is fully ready
	setTimeout(() => {
		// Initialize all editors found on the page
		const editorElements = document.querySelectorAll('.monaco-editor');
		editorElements.forEach(element => {
			const editorId = element.id;
			if (editorId && !window.liveEditors[editorId]) {
				initializeSingleEditor(editorId);
			}
		});
	}, 100);
}

function initializeSingleEditor(editorId) {
	const element = document.getElementById(editorId);
	if (!element) {
		console.error(\`Editor element \${editorId} not found\`);
		return;
	}

	// Get code snippet based on editor ID
	const codeSnippet = getCodeSnippetForEditor(editorId);
	
	// Store original code
	window.originalCode[editorId] = codeSnippet;

	// Create Monaco editor
	const editor = monaco.editor.create(element, {
		value: codeSnippet,
		language: getLanguageForEditor(editorId),
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
	});

	// Store editor reference
	window.liveEditors[editorId] = editor;

	// Update stats
	updateStats(editorId, editor);

	// Set up event listeners
	editor.onDidChangeModelContent(() => {
		updateStats(editorId, editor);
	});

	console.log(\`Live editor \${editorId} initialized successfully\`);
}

function getLanguageForEditor(editorId) {
	if (editorId.includes('css') || editorId.includes('styling') || editorId.includes('layout') || 
		editorId.includes('flexbox') || editorId.includes('grid') || editorId.includes('animations') || 
		editorId.includes('variables')) {
		return 'css';
	} else if (editorId.includes('javascript') || editorId.includes('events') || editorId.includes('dom')) {
		return 'javascript';
	} else {
		return 'html';
	}
}

function getCodeSnippetForEditor(editorId) {
	// Section-specific code examples
	const sectionCodeExamples = ${JSON.stringify(sectionCodeExamples, null, 2)};
	
	// Extract section name from editor ID
	const sectionName = editorId.replace('-editor', '');
	
	// Return appropriate code example
	return sectionCodeExamples[sectionName] || sectionCodeExamples.overview;
}

function updateStats(editorId, editor) {
	const model = editor.getModel();
	const lineCount = model.getLineCount();
	const charCount = model.getValueLength();

	const linesElement = document.getElementById(\`\${editorId}-lines\`);
	const charsElement = document.getElementById(\`\${editorId}-chars\`);

	if (linesElement) linesElement.textContent = \`\${lineCount} lines\`;
	if (charsElement) charsElement.textContent = \`\${charCount} characters\`;
}

function executeCode(editorId) {
	const editor = window.liveEditors[editorId];
	if (!editor) {
		console.error(\`Editor \${editorId} not found\`);
		return;
	}

	const code = editor.getValue();
	const previewElement = document.getElementById(\`\${editorId}-preview-content\`);
	const errorElement = document.getElementById(\`error-display-\${editorId}\`);

	if (!previewElement) {
		console.error(\`Preview element for \${editorId} not found\`);
		return;
	}

	try {
		// Clear previous content
		previewElement.innerHTML = "";

		// Hide error display
		if (errorElement) {
			errorElement.classList.add("hidden");
		}

		// Create iframe for safe execution
		const iframe = document.createElement("iframe");
		iframe.style.width = "100%";
		iframe.style.height = "400px";
		iframe.style.border = "none";
		iframe.style.borderRadius = "8px";

		// Write content to iframe
		iframe.onload = function () {
			const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
			iframeDoc.open();
			iframeDoc.write(code);
			iframeDoc.close();
		};

		previewElement.appendChild(iframe);

		// Update status
		updateStatus(editorId, "success", "Code executed successfully");
	} catch (error) {
		console.error("Error executing code:", error);
		showError(editorId, error.message);
	}
}

function resetCode(editorId) {
	const editor = window.liveEditors[editorId];
	if (!editor) {
		console.error(\`Editor \${editorId} not found\`);
		return;
	}

	const originalCode = window.originalCode[editorId];
	if (originalCode) {
		editor.setValue(originalCode);
		updateStats(editorId, editor);
		updateStatus(editorId, "info", "Code reset to original");
	}
}

function showError(editorId, message) {
	const errorElement = document.getElementById(\`error-display-\${editorId}\`);
	if (errorElement) {
		const errorMessage = errorElement.querySelector(".error-message");
		if (errorMessage) {
			errorMessage.textContent = message;
		}
		errorElement.classList.remove("hidden");
	}
	updateStatus(editorId, "error", "Error in code execution");
}

function updateStatus(editorId, type, message) {
	const statusElement = document.querySelector(\`#\${editorId} .live-editor-status span\`);
	const indicatorElement = document.querySelector(\`#\${editorId} .status-indicator\`);

	if (statusElement) {
		statusElement.textContent = message;
	}

	if (indicatorElement) {
		indicatorElement.className = \`status-indicator \${type}\`;
	}
}

function copyCode(editorId) {
	const editor = window.liveEditors[editorId];
	if (!editor) {
		console.error(\`Editor \${editorId} not found\`);
		return;
	}

	const code = editor.getValue();
	navigator.clipboard.writeText(code).then(() => {
		const button = event.target;
		showFeedback(button, "Copied!", "#10b981");
		updateStatus(editorId, "success", "Code copied to clipboard");
	});
}

function showFeedback(element, message, color) {
	const originalText = element.textContent;
	element.textContent = message;
	element.style.background = color;

	setTimeout(() => {
		element.textContent = originalText;
		element.style.background = "";
	}, 2000);
}

// Navigation functions
function showSection(sectionId) {
	// Hide all content sections
	const sections = document.querySelectorAll(".content-section");
	sections.forEach((section) => {
		section.classList.remove("active");
	});

	// Remove active class from all nav buttons
	const navButtons = document.querySelectorAll(".nav-button");
	navButtons.forEach((button) => {
		button.classList.remove("active");
	});

	// Show selected section
	const targetSection = document.getElementById(sectionId);
	if (targetSection) {
		targetSection.classList.add("active");
	}

	// Add active class to clicked button
	const clickedButton = document.querySelector(
		\`[onclick="showSection('\${sectionId}')"]\`
	);
	if (clickedButton) {
		clickedButton.classList.add("active");
	}
}

// Demo result functions
function showDemoResult(section) {
	const resultElement = document.getElementById(\`\${section}Result\`);
	if (resultElement) {
		// Toggle visibility
		if (
			resultElement.style.display === "none" ||
			resultElement.style.display === ""
		) {
			resultElement.style.display = "block";
			resultElement.style.animation = "fadeIn 0.3s ease-in";
		} else {
			resultElement.style.display = "none";
		}
	}
}

function changeBackground() {
	const colors = ["#1e293b", "#7c3aed", "#dc2626", "#059669", "#ea580c"];
	const randomColor = colors[Math.floor(Math.random() * colors.length)];
	document.body.style.background = \`linear-gradient(135deg, \${randomColor}, #0f172a)\`;

	// Show feedback
	const button = event.target;
	const originalText = button.textContent;
	button.textContent = "Background Changed!";
	button.style.background = "#10b981";

	setTimeout(() => {
		button.textContent = originalText;
		button.style.background = "";
	}, 2000);
}

function showAlert() {
	alert(
		"Hello! This is an interactive alert. JavaScript is working correctly!"
	);
}

console.log("Module script loaded successfully");`;

	// Write the updated JavaScript
	fs.writeFileSync(scriptPath, javascriptContent);
	console.log(`  Updated ${scriptPath}`);
}

// Main execution
function main() {
	const traditionalWebStackPath = path.join(
		__dirname,
		"..",
		"traditional-web-stack"
	);

	if (!fs.existsSync(traditionalWebStackPath)) {
		console.error("traditional-web-stack directory not found");
		return;
	}

	const modules = fs
		.readdirSync(traditionalWebStackPath)
		.filter((item) => {
			const itemPath = path.join(traditionalWebStackPath, item);
			return fs.statSync(itemPath).isDirectory() && item.match(/^\d{2}-/);
		})
		.sort();

	console.log(`Found ${modules.length} modules to fix:`);
	modules.forEach((module) => console.log(`  - ${module}`));
	console.log();

	modules.forEach((module) => {
		const modulePath = path.join(traditionalWebStackPath, module);
		fixModuleHTML(modulePath);
		updateJavaScriptWithExamples(modulePath);
	});

	console.log("\n✅ All modules fixed!");
}

if (require.main === module) {
	main();
}

module.exports = { fixModuleHTML, updateJavaScriptWithExamples };
