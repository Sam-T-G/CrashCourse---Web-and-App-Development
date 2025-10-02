#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

// JavaScript template for multiple editors
const multipleEditorsScript = `// Global variables for live editors
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
	// HTML Basics snippets
	if (editorId.includes('overview')) {
		return \`<!-- HTML Document Structure -->
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
</html>\`;
	}
	
	if (editorId.includes('headings')) {
		return \`<!-- HTML Headings -->
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
</style>\`;
	}
	
	if (editorId.includes('text')) {
		return \`<!-- Text Elements -->
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
</style>\`;
	}
	
	if (editorId.includes('lists')) {
		return \`<!-- HTML Lists -->
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
</style>\`;
	}
	
	if (editorId.includes('forms') && !editorId.includes('input-types') && !editorId.includes('form-elements')) {
		return \`<!-- HTML Forms -->
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
</style>\`;
	}
	
	if (editorId.includes('interactive')) {
		return \`<!-- Interactive Elements -->
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
</style>\`;
	}
	
	// Forms module specific snippets
	if (editorId.includes('input-types')) {
		return \`<!-- Input Types Demo -->
<form class="input-demo">
    <h3>Different Input Types</h3>
    
    <label>Text Input:</label>
    <input type="text" placeholder="Enter text">
    
    <label>Email Input:</label>
    <input type="email" placeholder="Enter email">
    
    <label>Password Input:</label>
    <input type="password" placeholder="Enter password">
    
    <label>Number Input:</label>
    <input type="number" placeholder="Enter number" min="1" max="100">
    
    <label>Date Input:</label>
    <input type="date">
    
    <label>Time Input:</label>
    <input type="time">
    
    <label>Color Input:</label>
    <input type="color" value="#3b82f6">
    
    <label>Range Input:</label>
    <input type="range" min="0" max="100" value="50">
    
    <label>File Input:</label>
    <input type="file">
</form>

<style>
body {
    font-family: Arial, sans-serif;
    max-width: 500px;
    margin: 0 auto;
    padding: 2rem;
}

.input-demo {
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

input {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid #d1d5db;
    border-radius: 6px;
    margin-bottom: 1rem;
    font-size: 1rem;
}

input:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}
</style>\`;
	}
	
	if (editorId.includes('form-elements')) {
		return \`<!-- Form Elements Demo -->
<form class="elements-demo">
    <h3>Form Elements</h3>
    
    <label>Select Dropdown:</label>
    <select>
        <option>Choose an option</option>
        <option>Option 1</option>
        <option>Option 2</option>
        <option>Option 3</option>
    </select>
    
    <label>Textarea:</label>
    <textarea rows="3" placeholder="Enter your message"></textarea>
    
    <fieldset>
        <legend>Checkboxes:</legend>
        <label><input type="checkbox"> Option 1</label>
        <label><input type="checkbox"> Option 2</label>
        <label><input type="checkbox"> Option 3</label>
    </fieldset>
    
    <fieldset>
        <legend>Radio Buttons:</legend>
        <label><input type="radio" name="choice"> Choice A</label>
        <label><input type="radio" name="choice"> Choice B</label>
        <label><input type="radio" name="choice"> Choice C</label>
    </fieldset>
    
    <button type="submit">Submit Form</button>
</form>

<style>
body {
    font-family: Arial, sans-serif;
    max-width: 500px;
    margin: 0 auto;
    padding: 2rem;
}

.elements-demo {
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

select, textarea {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid #d1d5db;
    border-radius: 6px;
    margin-bottom: 1rem;
    font-size: 1rem;
}

fieldset {
    border: 1px solid #d1d5db;
    border-radius: 6px;
    margin-bottom: 1rem;
    padding: 1rem;
}

legend {
    font-weight: 600;
    color: #374151;
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
</style>\`;
	}
	
	if (editorId.includes('validation')) {
		return \`<!-- Form Validation Demo -->
<form class="validation-demo">
    <h3>Form Validation</h3>
    
    <label>Required Field:</label>
    <input type="text" required placeholder="This field is required">
    
    <label>Email with Pattern:</label>
    <input type="email" required placeholder="Enter valid email">
    
    <label>Min Length (5 chars):</label>
    <input type="text" minlength="5" placeholder="Minimum 5 characters">
    
    <label>Number Range (1-100):</label>
    <input type="number" min="1" max="100" placeholder="Enter number 1-100">
    
    <label>Pattern Match (letters only):</label>
    <input type="text" pattern="[A-Za-z]+" placeholder="Letters only">
    
    <button type="submit">Submit Form</button>
</form>

<style>
body {
    font-family: Arial, sans-serif;
    max-width: 500px;
    margin: 0 auto;
    padding: 2rem;
}

.validation-demo {
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

input {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid #d1d5db;
    border-radius: 6px;
    margin-bottom: 1rem;
    font-size: 1rem;
}

input:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

input:invalid {
    border-color: #ef4444;
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
</style>\`;
	}
	
	// Default CSS snippet for CSS modules
	if (editorId.includes('css') || editorId.includes('styling') || editorId.includes('layout') || 
		editorId.includes('flexbox') || editorId.includes('grid') || editorId.includes('animations') || 
		editorId.includes('variables')) {
		return \`/* Live CSS Editor - Edit and see changes in real-time */
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
	}
	
	// Default JavaScript snippet for JS modules
	if (editorId.includes('javascript') || editorId.includes('events') || editorId.includes('dom')) {
		return \`// Live JavaScript Editor - Edit and see changes in real-time
function greetUser(name) {
    return \`Hello, \${name}! Welcome to our website.\`;
}

function changeBackground() {
    const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    document.body.style.background = randomColor;
}

function showAlert() {
    alert('Hello! This is a JavaScript alert!');
}

// Example usage
console.log(greetUser('Developer'));

// Add event listeners
document.addEventListener('DOMContentLoaded', function() {
    console.log('Page loaded successfully!');
});\`;
	}
	
	// Default HTML snippet
	return \`<!-- Live HTML Editor - Edit and see changes in real-time -->
<div class="demo-container">
    <h1>Hello World!</h1>
    <p>This is a paragraph with <strong>bold text</strong> and <em>italic text</em>.</p>
    <ul>
        <li>First item</li>
        <li>Second item</li>
        <li>Third item</li>
    </ul>
    <button onclick="alert('Hello!')">Click Me!</button>
</div>

<style>
.demo-container {
    max-width: 600px;
    margin: 0 auto;
    padding: 2rem;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border-radius: 12px;
    text-align: center;
    box-shadow: 0 10px 30px rgba(0,0,0,0.3);
}

.demo-container h1 {
    font-size: 2.5rem;
    margin-bottom: 1rem;
    text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
}

.demo-container p {
    font-size: 1.2rem;
    margin-bottom: 1.5rem;
    line-height: 1.6;
}

.demo-container ul {
    list-style: none;
    padding: 0;
    margin: 1.5rem 0;
}

.demo-container li {
    background: rgba(255,255,255,0.2);
    margin: 0.5rem 0;
    padding: 0.75rem;
    border-radius: 8px;
    backdrop-filter: blur(10px);
}

.demo-container button {
    background: #ff6b6b;
    color: white;
    border: none;
    padding: 1rem 2rem;
    font-size: 1.1rem;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 4px 15px rgba(255,107,107,0.3);
}

.demo-container button:hover {
    background: #ff5252;
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(255,107,107,0.4);
}
</style>\`;
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

function updatePreview(editorId) {
	// Auto-execute code when typing (debounced)
	clearTimeout(window[\`\${editorId}Timeout\`]);
	window[\`\${editorId}Timeout\`] = setTimeout(() => {
		executeCode(editorId);
	}, 1000);
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

function hideError(editorId) {
	const errorElement = document.getElementById(\`error-display-\${editorId}\`);
	if (errorElement) {
		errorElement.classList.add("hidden");
	}
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

function showFeedback(element, message, color) {
	const originalText = element.textContent;
	element.textContent = message;
	element.style.background = color;

	setTimeout(() => {
		element.textContent = originalText;
		element.style.background = "";
	}, 2000);
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

// Navigation functions (for modules that need them)
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

// Demo result functions (for modules that need them)
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

console.log("Multiple editors script loaded successfully");`;

// Function to update a module's JavaScript
function updateModuleJavaScript(modulePath) {
	const scriptPath = path.join(modulePath, "script.js");

	if (!fs.existsSync(scriptPath)) {
		console.log(`No script.js found in ${modulePath}`);
		return;
	}

	console.log(`Updating JavaScript for ${path.basename(modulePath)}...`);

	// Write the new JavaScript content
	fs.writeFileSync(scriptPath, multipleEditorsScript);
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

	console.log(`Found ${modules.length} modules to update:`);
	modules.forEach((module) => console.log(`  - ${module}`));
	console.log();

	modules.forEach((module) => {
		const modulePath = path.join(traditionalWebStackPath, module);
		updateModuleJavaScript(modulePath);
	});

	console.log("\n✅ All JavaScript files updated!");
}

if (require.main === module) {
	main();
}

module.exports = { updateModuleJavaScript };
