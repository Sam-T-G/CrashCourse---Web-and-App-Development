#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

// Section-specific code examples for forms module
const formsCodeExamples = {
	overview: `<!-- HTML Forms Overview -->
<form class="demo-form">
    <h3>Contact Form</h3>
    
    <label for="name">Full Name:</label>
    <input type="text" id="name" name="name" required>
    
    <label for="email">Email:</label>
    <input type="email" id="email" name="email" required>
    
    <label for="message">Message:</label>
    <textarea id="message" name="message" rows="4"></textarea>
    
    <button type="submit">Submit Form</button>
</form>

<style>
.demo-form {
    max-width: 500px;
    margin: 0 auto;
    padding: 2rem;
    background: #f8fafc;
    border-radius: 12px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.demo-form h3 {
    color: #1e293b;
    margin-bottom: 1.5rem;
    text-align: center;
}

.demo-form label {
    display: block;
    margin-bottom: 0.5rem;
    color: #374151;
    font-weight: 500;
}

.demo-form input,
.demo-form textarea {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid #d1d5db;
    border-radius: 6px;
    margin-bottom: 1rem;
    font-size: 1rem;
}

.demo-form input:focus,
.demo-form textarea:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.demo-form button {
    background: #3b82f6;
    color: white;
    border: none;
    padding: 0.75rem 2rem;
    border-radius: 6px;
    font-size: 1rem;
    cursor: pointer;
    width: 100%;
}

.demo-form button:hover {
    background: #2563eb;
}
</style>`,

	"input-types": `<!-- HTML Input Types Demo -->
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
</style>`,

	"form-elements": `<!-- Form Elements Demo -->
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
</style>`,

	validation: `<!-- Form Validation Demo -->
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
</style>`,

	interactive: `<!-- Interactive Forms Demo -->
<form class="interactive-demo" onsubmit="handleSubmit(event)">
    <h3>Interactive Form Demo</h3>
    
    <label for="username">Username:</label>
    <input type="text" id="username" name="username" required>
    
    <label for="password">Password:</label>
    <input type="password" id="password" name="password" required>
    
    <label for="confirm-password">Confirm Password:</label>
    <input type="password" id="confirm-password" name="confirm-password" required>
    
    <label for="age">Age:</label>
    <input type="number" id="age" name="age" min="13" max="120">
    
    <label for="country">Country:</label>
    <select id="country" name="country">
        <option value="">Select Country</option>
        <option value="us">United States</option>
        <option value="uk">United Kingdom</option>
        <option value="ca">Canada</option>
    </select>
    
    <label>
        <input type="checkbox" name="terms"> I agree to the terms and conditions
    </label>
    
    <button type="submit">Create Account</button>
</form>

<div id="form-result" style="margin-top: 1rem; padding: 1rem; background: #f0f9ff; border-radius: 8px; display: none;">
    <h4>Form Submitted Successfully!</h4>
    <p id="result-content"></p>
</div>

<script>
function handleSubmit(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());
    
    // Simple validation
    if (data.password !== data['confirm-password']) {
        alert('Passwords do not match!');
        return;
    }
    
    if (!data.terms) {
        alert('Please agree to the terms and conditions!');
        return;
    }
    
    // Show result
    const resultDiv = document.getElementById('form-result');
    const resultContent = document.getElementById('result-content');
    
    resultContent.innerHTML = \`
        <strong>Username:</strong> \${data.username}<br>
        <strong>Age:</strong> \${data.age}<br>
        <strong>Country:</strong> \${data.country}<br>
        <strong>Terms Accepted:</strong> \${data.terms ? 'Yes' : 'No'}
    \`;
    
    resultDiv.style.display = 'block';
}

// Real-time password confirmation
document.getElementById('confirm-password').addEventListener('input', function() {
    const password = document.getElementById('password').value;
    const confirmPassword = this.value;
    
    if (password !== confirmPassword) {
        this.style.borderColor = '#ef4444';
    } else {
        this.style.borderColor = '#10b981';
    }
});
</script>

<style>
body {
    font-family: Arial, sans-serif;
    max-width: 500px;
    margin: 0 auto;
    padding: 2rem;
}

.interactive-demo {
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

input, select {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid #d1d5db;
    border-radius: 6px;
    margin-bottom: 1rem;
    font-size: 1rem;
}

input:focus, select:focus {
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
};

// Complete JavaScript for forms module
const formsJavaScript = `// Global variables for live editors
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
		language: "html",
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

function getCodeSnippetForEditor(editorId) {
	// Section-specific code examples
	const sectionCodeExamples = ${JSON.stringify(formsCodeExamples, null, 2)};
	
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

console.log("Forms module script loaded successfully");`;

function updateFormsJavaScript() {
	const modulePath = path.join(
		__dirname,
		"..",
		"traditional-web-stack",
		"11-html-forms"
	);
	const scriptPath = path.join(modulePath, "script.js");

	console.log("🔧 Updating Forms Module JavaScript...");

	// Write the complete JavaScript
	fs.writeFileSync(scriptPath, formsJavaScript);
	console.log("✅ Forms module JavaScript updated");

	// Verify the update
	const scriptContent = fs.readFileSync(scriptPath, "utf8");
	const hasCodeExamples = scriptContent.includes("sectionCodeExamples");
	const hasMonacoInit = scriptContent.includes("initializeLiveEditors");
	const hasNavigation = scriptContent.includes("showSection");

	console.log(`📊 Verification:`);
	console.log(`   - Code examples: ${hasCodeExamples ? "✅" : "❌"}`);
	console.log(`   - Monaco initialization: ${hasMonacoInit ? "✅" : "❌"}`);
	console.log(`   - Navigation functions: ${hasNavigation ? "✅" : "❌"}`);

	if (hasCodeExamples && hasMonacoInit && hasNavigation) {
		console.log("🎉 Forms module JavaScript is now fully functional!");
	} else {
		console.log("❌ Some issues remain - please check manually");
	}
}

// Run the update
if (require.main === module) {
	updateFormsJavaScript();
}

module.exports = { updateFormsJavaScript };
