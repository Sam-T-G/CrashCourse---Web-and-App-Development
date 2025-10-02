// Global variables for live editors
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
		const editorElements = document.querySelectorAll(".monaco-editor");
		editorElements.forEach((element) => {
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
		console.error(`Editor element ${editorId} not found`);
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

	console.log(`Live editor ${editorId} initialized successfully`);
}

function getLanguageForEditor(editorId) {
	if (
		editorId.includes("css") ||
		editorId.includes("styling") ||
		editorId.includes("layout") ||
		editorId.includes("flexbox") ||
		editorId.includes("grid") ||
		editorId.includes("animations") ||
		editorId.includes("variables")
	) {
		return "css";
	} else if (
		editorId.includes("javascript") ||
		editorId.includes("events") ||
		editorId.includes("dom")
	) {
		return "javascript";
	} else {
		return "html";
	}
}

function getCodeSnippetForEditor(editorId) {
	// Section-specific code examples
	const sectionCodeExamples = {
		overview:
			'<!-- HTML Document Structure -->\n<!DOCTYPE html>\n<html lang="en">\n<head>\n    <meta charset="UTF-8">\n    <meta name="viewport" content="width=device-width, initial-scale=1.0">\n    <title>My First Web Page</title>\n</head>\n<body>\n    <h1>Welcome to My Website</h1>\n    <p>This is the basic structure of an HTML document.</p>\n    <p>Every HTML page needs these essential elements:</p>\n    <ul>\n        <li>DOCTYPE declaration</li>\n        <li>html element</li>\n        <li>head section</li>\n        <li>body section</li>\n    </ul>\n</body>\n</html>',
		headings:
			"<!-- HTML Headings -->\n<h1>Main Title (H1)</h1>\n<h2>Section Title (H2)</h2>\n<h3>Subsection (H3)</h3>\n<h4>Smaller Heading (H4)</h4>\n<h5>Even Smaller (H5)</h5>\n<h6>Smallest Heading (H6)</h6>\n\n<p>Headings create a hierarchy in your content. H1 is the most important, H6 is the least important.</p>\n\n<style>\nbody {\n    font-family: Arial, sans-serif;\n    max-width: 600px;\n    margin: 0 auto;\n    padding: 2rem;\n    line-height: 1.6;\n}\n\nh1 { color: #2563eb; }\nh2 { color: #7c3aed; }\nh3 { color: #059669; }\nh4 { color: #dc2626; }\nh5 { color: #ea580c; }\nh6 { color: #6b7280; }\n</style>",
		text: "<!-- Text Elements -->\n<p>This is a regular paragraph with <strong>bold text</strong> and <em>italic text</em>.</p>\n<p>You can also use <code>inline code</code> and <mark>highlighted text</mark>.</p>\n<p>Here's a <a href=\"#\" onclick=\"alert('Link clicked!')\">clickable link</a>.</p>\n\n<blockquote>\n    <p>This is a blockquote. It's used for longer quotes or important text.</p>\n</blockquote>\n\n<pre><code>// This is a code block\nfunction hello() {\n    console.log(\"Hello, World!\");\n}</code></pre>\n\n<style>\nbody {\n    font-family: Arial, sans-serif;\n    max-width: 600px;\n    margin: 0 auto;\n    padding: 2rem;\n    line-height: 1.6;\n}\n\nblockquote {\n    border-left: 4px solid #3b82f6;\n    padding-left: 1rem;\n    margin: 1rem 0;\n    background: #f8fafc;\n    padding: 1rem;\n    border-radius: 4px;\n}\n\npre {\n    background: #1e293b;\n    color: #e2e8f0;\n    padding: 1rem;\n    border-radius: 8px;\n    overflow-x: auto;\n}\n\ncode {\n    background: #f1f5f9;\n    padding: 0.25rem 0.5rem;\n    border-radius: 4px;\n    font-family: 'Courier New', monospace;\n}\n\nmark {\n    background: #fef08a;\n    padding: 0.25rem;\n}\n</style>",
		lists:
			"<!-- HTML Lists -->\n<h2>Unordered List (Bullets)</h2>\n<ul>\n    <li>First item</li>\n    <li>Second item</li>\n    <li>Third item</li>\n</ul>\n\n<h2>Ordered List (Numbers)</h2>\n<ol>\n    <li>First step</li>\n    <li>Second step</li>\n    <li>Third step</li>\n</ol>\n\n<h2>Definition List</h2>\n<dl>\n    <dt>HTML</dt>\n    <dd>HyperText Markup Language</dd>\n    <dt>CSS</dt>\n    <dd>Cascading Style Sheets</dd>\n    <dt>JS</dt>\n    <dd>JavaScript</dd>\n</dl>\n\n<h2>Nested Lists</h2>\n<ul>\n    <li>Fruits\n        <ul>\n            <li>Apples</li>\n            <li>Bananas</li>\n            <li>Oranges</li>\n        </ul>\n    </li>\n    <li>Vegetables\n        <ol>\n            <li>Carrots</li>\n            <li>Broccoli</li>\n            <li>Spinach</li>\n        </ol>\n    </li>\n</ul>\n\n<style>\nbody {\n    font-family: Arial, sans-serif;\n    max-width: 600px;\n    margin: 0 auto;\n    padding: 2rem;\n    line-height: 1.6;\n}\n\nul, ol {\n    margin: 1rem 0;\n}\n\nli {\n    margin: 0.5rem 0;\n}\n\ndt {\n    font-weight: bold;\n    color: #2563eb;\n}\n\ndd {\n    margin-left: 1rem;\n    margin-bottom: 0.5rem;\n}\n</style>",
		forms:
			'<!-- HTML Forms -->\n<form>\n    <h2>Contact Form</h2>\n    \n    <label for="name">Full Name:</label>\n    <input type="text" id="name" name="name" required>\n    \n    <label for="email">Email:</label>\n    <input type="email" id="email" name="email" required>\n    \n    <label for="age">Age:</label>\n    <input type="number" id="age" name="age" min="13" max="120">\n    \n    <label for="country">Country:</label>\n    <select id="country" name="country">\n        <option value="">Select Country</option>\n        <option value="us">United States</option>\n        <option value="uk">United Kingdom</option>\n        <option value="ca">Canada</option>\n    </select>\n    \n    <label for="message">Message:</label>\n    <textarea id="message" name="message" rows="4"></textarea>\n    \n    <label>\n        <input type="checkbox" name="newsletter"> Subscribe to newsletter\n    </label>\n    \n    <button type="submit">Submit Form</button>\n</form>\n\n<style>\nbody {\n    font-family: Arial, sans-serif;\n    max-width: 500px;\n    margin: 0 auto;\n    padding: 2rem;\n}\n\nform {\n    background: #f8fafc;\n    padding: 2rem;\n    border-radius: 12px;\n    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);\n}\n\nlabel {\n    display: block;\n    margin-bottom: 0.5rem;\n    color: #374151;\n    font-weight: 500;\n}\n\ninput, select, textarea {\n    width: 100%;\n    padding: 0.75rem;\n    border: 1px solid #d1d5db;\n    border-radius: 6px;\n    margin-bottom: 1rem;\n    font-size: 1rem;\n}\n\ninput:focus, select:focus, textarea:focus {\n    outline: none;\n    border-color: #3b82f6;\n    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);\n}\n\nbutton {\n    background: #3b82f6;\n    color: white;\n    border: none;\n    padding: 0.75rem 2rem;\n    border-radius: 6px;\n    font-size: 1rem;\n    cursor: pointer;\n    width: 100%;\n}\n\nbutton:hover {\n    background: #2563eb;\n}\n</style>',
		interactive:
			"<!-- Interactive Elements -->\n<div class=\"interactive-demo\">\n    <h2>Interactive Elements Demo</h2>\n    \n    <button onclick=\"changeColor()\">Change Background Color</button>\n    <button onclick=\"showAlert()\">Show Alert</button>\n    <button onclick=\"toggleText()\">Toggle Text</button>\n    \n    <div id=\"demo-text\">This text can be toggled!</div>\n    \n    <div class=\"hover-demo\">\n        <p>Hover over this box to see the effect!</p>\n    </div>\n</div>\n\n<script>\nfunction changeColor() {\n    const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57'];\n    const randomColor = colors[Math.floor(Math.random() * colors.length)];\n    document.body.style.background = randomColor;\n}\n\nfunction showAlert() {\n    alert('Hello! This is an interactive alert!');\n}\n\nfunction toggleText() {\n    const text = document.getElementById('demo-text');\n    if (text.style.display === 'none') {\n        text.style.display = 'block';\n    } else {\n        text.style.display = 'none';\n    }\n}\n</script>\n\n<style>\nbody {\n    font-family: Arial, sans-serif;\n    max-width: 600px;\n    margin: 0 auto;\n    padding: 2rem;\n    transition: background 0.3s ease;\n}\n\nbutton {\n    background: #3b82f6;\n    color: white;\n    border: none;\n    padding: 0.75rem 1.5rem;\n    border-radius: 8px;\n    cursor: pointer;\n    margin: 0.5rem;\n    font-size: 1rem;\n    transition: all 0.3s ease;\n}\n\nbutton:hover {\n    background: #2563eb;\n    transform: translateY(-2px);\n}\n\n#demo-text {\n    background: #f0f9ff;\n    padding: 1rem;\n    border-radius: 8px;\n    margin: 1rem 0;\n    border-left: 4px solid #3b82f6;\n}\n\n.hover-demo {\n    background: #f8fafc;\n    padding: 2rem;\n    border-radius: 12px;\n    text-align: center;\n    transition: all 0.3s ease;\n    cursor: pointer;\n}\n\n.hover-demo:hover {\n    background: #e2e8f0;\n    transform: scale(1.05);\n    box-shadow: 0 4px 15px rgba(0,0,0,0.1);\n}\n</style>",
		"color-palette":
			"/* CSS Color Properties */\n.demo-container {\n    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);\n    color: white;\n    padding: 2rem;\n    border-radius: 12px;\n    text-align: center;\n}\n\n.color-box {\n    background: #3b82f6;\n    color: white;\n    padding: 1rem;\n    margin: 1rem;\n    border-radius: 8px;\n    display: inline-block;\n}\n\n.color-box:hover {\n    background: #10b981;\n    transform: scale(1.05);\n    transition: all 0.3s ease;\n}\n\n.text-color {\n    color: #f59e0b;\n    font-weight: bold;\n}\n\n.border-color {\n    border: 3px solid #ef4444;\n    padding: 1rem;\n    border-radius: 8px;\n}",
		"color-theory":
			"/* Color Theory in CSS */\n.primary-colors {\n    background: #3b82f6; /* Blue */\n    color: white;\n    padding: 1rem;\n    margin: 0.5rem;\n    border-radius: 8px;\n}\n\n.secondary-colors {\n    background: #10b981; /* Green */\n    color: white;\n    padding: 1rem;\n    margin: 0.5rem;\n    border-radius: 8px;\n}\n\n.accent-colors {\n    background: #f59e0b; /* Orange */\n    color: white;\n    padding: 1rem;\n    margin: 0.5rem;\n    border-radius: 8px;\n}\n\n.complementary {\n    background: #ef4444; /* Red */\n    color: white;\n    padding: 1rem;\n    margin: 0.5rem;\n    border-radius: 8px;\n}\n\n.container {\n    display: flex;\n    flex-wrap: wrap;\n    justify-content: center;\n    gap: 1rem;\n    padding: 2rem;\n}",
		"event-handling":
			"// JavaScript Event Handling\nfunction handleClick() {\n    alert('Button clicked!');\n}\n\nfunction handleMouseOver() {\n    document.body.style.background = '#f0f9ff';\n}\n\nfunction handleMouseOut() {\n    document.body.style.background = '#ffffff';\n}\n\nfunction handleKeyPress(event) {\n    if (event.key === 'Enter') {\n        alert('Enter key pressed!');\n    }\n}\n\n// Add event listeners\ndocument.addEventListener('DOMContentLoaded', function() {\n    const button = document.getElementById('demo-button');\n    if (button) {\n        button.addEventListener('click', handleClick);\n        button.addEventListener('mouseover', handleMouseOver);\n        button.addEventListener('mouseout', handleMouseOut);\n    }\n    \n    document.addEventListener('keypress', handleKeyPress);\n});\n\n// HTML for testing\ndocument.body.innerHTML = `\n<div style=\"text-align: center; padding: 2rem;\">\n    <button id=\"demo-button\" style=\"background: #3b82f6; color: white; border: none; padding: 1rem 2rem; border-radius: 8px; cursor: pointer; font-size: 1rem;\">\n        Click Me!\n    </button>\n    <p style=\"margin-top: 1rem;\">Try clicking the button, hovering over it, or pressing Enter!</p>\n</div>\n`;",
		"dom-manipulation":
			"// DOM Manipulation Examples\nfunction createElement() {\n    const newDiv = document.createElement('div');\n    newDiv.textContent = 'New element created!';\n    newDiv.style.background = '#10b981';\n    newDiv.style.color = 'white';\n    newDiv.style.padding = '1rem';\n    newDiv.style.margin = '0.5rem';\n    newDiv.style.borderRadius = '8px';\n    \n    document.body.appendChild(newDiv);\n}\n\nfunction changeText() {\n    const element = document.getElementById('demo-text');\n    if (element) {\n        element.textContent = 'Text changed!';\n        element.style.color = '#ef4444';\n    }\n}\n\nfunction addClass() {\n    const element = document.getElementById('demo-element');\n    if (element) {\n        element.classList.add('highlight');\n    }\n}\n\n// Add CSS for highlight class\nconst style = document.createElement('style');\nstyle.textContent = `\n.highlight {\n    background: #fef08a !important;\n    border: 2px solid #f59e0b !important;\n    transform: scale(1.05) !important;\n    transition: all 0.3s ease !important;\n}\n`;\ndocument.head.appendChild(style);\n\n// HTML for testing\ndocument.body.innerHTML = `\n<div style=\"text-align: center; padding: 2rem;\">\n    <div id=\"demo-element\" style=\"background: #f8fafc; padding: 1rem; margin: 1rem; border-radius: 8px;\">\n        <p id=\"demo-text\">Original text</p>\n    </div>\n    <button onclick=\"createElement()\" style=\"background: #3b82f6; color: white; border: none; padding: 0.5rem 1rem; margin: 0.5rem; border-radius: 6px; cursor: pointer;\">Create Element</button>\n    <button onclick=\"changeText()\" style=\"background: #10b981; color: white; border: none; padding: 0.5rem 1rem; margin: 0.5rem; border-radius: 6px; cursor: pointer;\">Change Text</button>\n    <button onclick=\"addClass()\" style=\"background: #f59e0b; color: white; border: none; padding: 0.5rem 1rem; margin: 0.5rem; border-radius: 6px; cursor: pointer;\">Add Class</button>\n</div>\n`;",
	};

	// Extract section name from editor ID
	const sectionName = editorId.replace("-editor", "");

	// Return appropriate code example
	return sectionCodeExamples[sectionName] || sectionCodeExamples.overview;
}

function updateStats(editorId, editor) {
	const model = editor.getModel();
	const lineCount = model.getLineCount();
	const charCount = model.getValueLength();

	const linesElement = document.getElementById(`${editorId}-lines`);
	const charsElement = document.getElementById(`${editorId}-chars`);

	if (linesElement) linesElement.textContent = `${lineCount} lines`;
	if (charsElement) charsElement.textContent = `${charCount} characters`;
}

function executeCode(editorId) {
	const editor = window.liveEditors[editorId];
	if (!editor) {
		console.error(`Editor ${editorId} not found`);
		return;
	}

	const code = editor.getValue();
	const previewElement = document.getElementById(`${editorId}-preview-content`);
	const errorElement = document.getElementById(`error-display-${editorId}`);

	if (!previewElement) {
		console.error(`Preview element for ${editorId} not found`);
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
		console.error(`Editor ${editorId} not found`);
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
	const errorElement = document.getElementById(`error-display-${editorId}`);
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
	const statusElement = document.querySelector(
		`#${editorId} .live-editor-status span`
	);
	const indicatorElement = document.querySelector(
		`#${editorId} .status-indicator`
	);

	if (statusElement) {
		statusElement.textContent = message;
	}

	if (indicatorElement) {
		indicatorElement.className = `status-indicator ${type}`;
	}
}

function copyCode(editorId) {
	const editor = window.liveEditors[editorId];
	if (!editor) {
		console.error(`Editor ${editorId} not found`);
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
		`[onclick="showSection('${sectionId}')"]`
	);
	if (clickedButton) {
		clickedButton.classList.add("active");
	}
}

// Demo result functions
function showDemoResult(section) {
	const resultElement = document.getElementById(`${section}Result`);
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
	document.body.style.background = `linear-gradient(135deg, ${randomColor}, #0f172a)`;

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

console.log("Module script loaded successfully");
