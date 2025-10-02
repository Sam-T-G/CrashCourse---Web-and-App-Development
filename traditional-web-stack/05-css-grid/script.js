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
	const sectionCodeExamples = {
  "grid-basics": "<!-- CSS Grid Basics Demo -->\n<div class=\"grid-demo\">\n    <h2>CSS Grid Basics</h2>\n    \n    <div class=\"demo-section\">\n        <h3>Basic Grid Layout</h3>\n        <div class=\"basic-grid\">\n            <div class=\"grid-item\">1</div>\n            <div class=\"grid-item\">2</div>\n            <div class=\"grid-item\">3</div>\n            <div class=\"grid-item\">4</div>\n            <div class=\"grid-item\">5</div>\n            <div class=\"grid-item\">6</div>\n        </div>\n    </div>\n    \n    <div class=\"demo-section\">\n        <h3>Grid with Gaps</h3>\n        <div class=\"grid-with-gaps\">\n            <div class=\"grid-item\">1</div>\n            <div class=\"grid-item\">2</div>\n            <div class=\"grid-item\">3</div>\n            <div class=\"grid-item\">4</div>\n            <div class=\"grid-item\">5</div>\n            <div class=\"grid-item\">6</div>\n        </div>\n    </div>\n    \n    <div class=\"demo-section\">\n        <h3>Grid Template Columns</h3>\n        <div class=\"grid-template-columns\">\n            <div class=\"grid-item\">Auto</div>\n            <div class=\"grid-item\">1fr</div>\n            <div class=\"grid-item\">2fr</div>\n            <div class=\"grid-item\">100px</div>\n        </div>\n    </div>\n    \n    <div class=\"demo-section\">\n        <h3>Grid Template Rows</h3>\n        <div class=\"grid-template-rows\">\n            <div class=\"grid-item\">Row 1 (100px)</div>\n            <div class=\"grid-item\">Row 2 (200px)</div>\n            <div class=\"grid-item\">Row 3 (150px)</div>\n        </div>\n    </div>\n    \n    <div class=\"demo-section\">\n        <h3>Grid Item Positioning</h3>\n        <div class=\"grid-positioning\">\n            <div class=\"grid-item item-1\">Item 1</div>\n            <div class=\"grid-item item-2\">Item 2</div>\n            <div class=\"grid-item item-3\">Item 3</div>\n            <div class=\"grid-item item-4\">Item 4</div>\n        </div>\n    </div>\n    \n    <div class=\"demo-section\">\n        <h3>Grid Alignment</h3>\n        <div class=\"grid-alignment\">\n            <div class=\"grid-item\">Start</div>\n            <div class=\"grid-item\">Center</div>\n            <div class=\"grid-item\">End</div>\n            <div class=\"grid-item\">Stretch</div>\n        </div>\n    </div>\n</div>\n\n<style>\n.grid-demo {\n    max-width: 1000px;\n    margin: 0 auto;\n    padding: 2rem;\n    font-family: Arial, sans-serif;\n}\n\n.demo-section {\n    margin: 3rem 0;\n    padding: 2rem;\n    background: #f8fafc;\n    border-radius: 12px;\n}\n\n.basic-grid {\n    display: grid;\n    grid-template-columns: repeat(3, 1fr);\n    gap: 1rem;\n    background: #e0f2fe;\n    padding: 1rem;\n    border-radius: 8px;\n}\n\n.grid-with-gaps {\n    display: grid;\n    grid-template-columns: repeat(3, 1fr);\n    gap: 2rem;\n    background: #f0fdf4;\n    padding: 1rem;\n    border-radius: 8px;\n}\n\n.grid-template-columns {\n    display: grid;\n    grid-template-columns: auto 1fr 2fr 100px;\n    gap: 1rem;\n    background: #fef3c7;\n    padding: 1rem;\n    border-radius: 8px;\n}\n\n.grid-template-rows {\n    display: grid;\n    grid-template-rows: 100px 200px 150px;\n    gap: 1rem;\n    background: #fce7f3;\n    padding: 1rem;\n    border-radius: 8px;\n}\n\n.grid-positioning {\n    display: grid;\n    grid-template-columns: repeat(4, 1fr);\n    grid-template-rows: repeat(3, 100px);\n    gap: 1rem;\n    background: #f3e8ff;\n    padding: 1rem;\n    border-radius: 8px;\n}\n\n.grid-alignment {\n    display: grid;\n    grid-template-columns: repeat(4, 1fr);\n    gap: 1rem;\n    background: #ecfdf5;\n    padding: 1rem;\n    border-radius: 8px;\n    height: 200px;\n}\n\n.grid-item {\n    background: #3b82f6;\n    color: white;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    font-weight: bold;\n    border-radius: 8px;\n    transition: all 0.3s ease;\n}\n\n.grid-item:hover {\n    background: #1d4ed8;\n    transform: scale(1.05);\n}\n\n/* Grid Item Positioning */\n.item-1 {\n    grid-column: 1 / 3;\n    grid-row: 1 / 2;\n    background: #ef4444;\n}\n\n.item-2 {\n    grid-column: 3 / 5;\n    grid-row: 1 / 3;\n    background: #10b981;\n}\n\n.item-3 {\n    grid-column: 1 / 2;\n    grid-row: 2 / 4;\n    background: #f59e0b;\n}\n\n.item-4 {\n    grid-column: 2 / 4;\n    grid-row: 3 / 4;\n    background: #8b5cf6;\n}\n\n/* Grid Alignment */\n.grid-alignment .grid-item:nth-child(1) {\n    justify-self: start;\n    align-self: start;\n}\n\n.grid-alignment .grid-item:nth-child(2) {\n    justify-self: center;\n    align-self: center;\n}\n\n.grid-alignment .grid-item:nth-child(3) {\n    justify-self: end;\n    align-self: end;\n}\n\n.grid-alignment .grid-item:nth-child(4) {\n    justify-self: stretch;\n    align-self: stretch;\n}\n</style>",
  "grid-areas": "<!-- CSS Grid Areas Demo -->\n<div class=\"grid-areas-demo\">\n    <h2>CSS Grid Areas</h2>\n    \n    <div class=\"demo-section\">\n        <h3>Named Grid Areas</h3>\n        <div class=\"named-areas\">\n            <div class=\"grid-item header\">Header</div>\n            <div class=\"grid-item sidebar\">Sidebar</div>\n            <div class=\"grid-item main\">Main Content</div>\n            <div class=\"grid-item footer\">Footer</div>\n        </div>\n    </div>\n    \n    <div class=\"demo-section\">\n        <h3>Complex Layout</h3>\n        <div class=\"complex-layout\">\n            <div class=\"grid-item nav\">Navigation</div>\n            <div class=\"grid-item hero\">Hero Section</div>\n            <div class=\"grid-item content1\">Content 1</div>\n            <div class=\"grid-item content2\">Content 2</div>\n            <div class=\"grid-item content3\">Content 3</div>\n            <div class=\"grid-item sidebar-left\">Left Sidebar</div>\n            <div class=\"grid-item sidebar-right\">Right Sidebar</div>\n            <div class=\"grid-item footer-main\">Footer</div>\n        </div>\n    </div>\n    \n    <div class=\"demo-section\">\n        <h3>Responsive Grid Areas</h3>\n        <div class=\"responsive-areas\">\n            <div class=\"grid-item header-resp\">Header</div>\n            <div class=\"grid-item nav-resp\">Navigation</div>\n            <div class=\"grid-item main-resp\">Main</div>\n            <div class=\"grid-item aside-resp\">Aside</div>\n            <div class=\"grid-item footer-resp\">Footer</div>\n        </div>\n    </div>\n    \n    <div class=\"demo-section\">\n        <h3>Grid Area Spanning</h3>\n        <div class=\"area-spanning\">\n            <div class=\"grid-item span-full\">Spans Full Width</div>\n            <div class=\"grid-item span-half\">Half Width</div>\n            <div class=\"grid-item span-half\">Half Width</div>\n            <div class=\"grid-item span-quarter\">Quarter</div>\n            <div class=\"grid-item span-quarter\">Quarter</div>\n            <div class=\"grid-item span-quarter\">Quarter</div>\n            <div class=\"grid-item span-quarter\">Quarter</div>\n        </div>\n    </div>\n    \n    <div class=\"demo-section\">\n        <h3>Grid Template Areas</h3>\n        <div class=\"template-areas\">\n            <div class=\"grid-item area-a\">Area A</div>\n            <div class=\"grid-item area-b\">Area B</div>\n            <div class=\"grid-item area-c\">Area C</div>\n            <div class=\"grid-item area-d\">Area D</div>\n            <div class=\"grid-item area-e\">Area E</div>\n        </div>\n    </div>\n</div>\n\n<style>\n.grid-areas-demo {\n    max-width: 1200px;\n    margin: 0 auto;\n    padding: 2rem;\n    font-family: Arial, sans-serif;\n}\n\n.demo-section {\n    margin: 3rem 0;\n    padding: 2rem;\n    background: #f8fafc;\n    border-radius: 12px;\n}\n\n/* Named Grid Areas */\n.named-areas {\n    display: grid;\n    grid-template-areas:\n        \"header header header\"\n        \"sidebar main main\"\n        \"footer footer footer\";\n    grid-template-columns: 200px 1fr 1fr;\n    grid-template-rows: 80px 1fr 60px;\n    gap: 1rem;\n    height: 300px;\n    background: #e0f2fe;\n    padding: 1rem;\n    border-radius: 8px;\n}\n\n.header { grid-area: header; background: #3b82f6; }\n.sidebar { grid-area: sidebar; background: #10b981; }\n.main { grid-area: main; background: #f59e0b; }\n.footer { grid-area: footer; background: #ef4444; }\n\n/* Complex Layout */\n.complex-layout {\n    display: grid;\n    grid-template-areas:\n        \"nav nav nav nav\"\n        \"hero hero hero hero\"\n        \"sidebar-left content1 content2 sidebar-right\"\n        \"sidebar-left content3 content3 sidebar-right\"\n        \"footer-main footer-main footer-main footer-main\";\n    grid-template-columns: 150px 1fr 1fr 150px;\n    grid-template-rows: 60px 200px 1fr 1fr 80px;\n    gap: 1rem;\n    height: 500px;\n    background: #f0fdf4;\n    padding: 1rem;\n    border-radius: 8px;\n}\n\n.nav { grid-area: nav; background: #1e40af; }\n.hero { grid-area: hero; background: #7c3aed; }\n.content1 { grid-area: content1; background: #059669; }\n.content2 { grid-area: content2; background: #dc2626; }\n.content3 { grid-area: content3; background: #ea580c; }\n.sidebar-left { grid-area: sidebar-left; background: #0891b2; }\n.sidebar-right { grid-area: sidebar-right; background: #be185d; }\n.footer-main { grid-area: footer-main; background: #374151; }\n\n/* Responsive Grid Areas */\n.responsive-areas {\n    display: grid;\n    grid-template-areas:\n        \"header header\"\n        \"nav nav\"\n        \"main aside\"\n        \"footer footer\";\n    grid-template-columns: 2fr 1fr;\n    grid-template-rows: 80px 60px 1fr 80px;\n    gap: 1rem;\n    height: 400px;\n    background: #fef3c7;\n    padding: 1rem;\n    border-radius: 8px;\n}\n\n.header-resp { grid-area: header; background: #3b82f6; }\n.nav-resp { grid-area: nav; background: #10b981; }\n.main-resp { grid-area: main; background: #f59e0b; }\n.aside-resp { grid-area: aside; background: #ef4444; }\n.footer-resp { grid-area: footer; background: #8b5cf6; }\n\n/* Grid Area Spanning */\n.area-spanning {\n    display: grid;\n    grid-template-columns: repeat(4, 1fr);\n    grid-template-rows: repeat(3, 100px);\n    gap: 1rem;\n    background: #fce7f3;\n    padding: 1rem;\n    border-radius: 8px;\n}\n\n.span-full {\n    grid-column: 1 / -1;\n    background: #3b82f6;\n}\n\n.span-half {\n    grid-column: span 2;\n    background: #10b981;\n}\n\n.span-quarter {\n    grid-column: span 1;\n    background: #f59e0b;\n}\n\n/* Grid Template Areas */\n.template-areas {\n    display: grid;\n    grid-template-areas:\n        \"a a b\"\n        \"a a c\"\n        \"d e e\";\n    grid-template-columns: 1fr 1fr 1fr;\n    grid-template-rows: 100px 100px 100px;\n    gap: 1rem;\n    background: #f3e8ff;\n    padding: 1rem;\n    border-radius: 8px;\n}\n\n.area-a { grid-area: a; background: #3b82f6; }\n.area-b { grid-area: b; background: #10b981; }\n.area-c { grid-area: c; background: #f59e0b; }\n.area-d { grid-area: d; background: #ef4444; }\n.area-e { grid-area: e; background: #8b5cf6; }\n\n.grid-item {\n    color: white;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    font-weight: bold;\n    border-radius: 8px;\n    transition: all 0.3s ease;\n    text-align: center;\n}\n\n.grid-item:hover {\n    transform: scale(1.02);\n    box-shadow: 0 4px 15px rgba(0,0,0,0.2);\n}\n\n/* Responsive adjustments */\n@media (max-width: 768px) {\n    .responsive-areas {\n        grid-template-areas:\n            \"header\"\n            \"nav\"\n            \"main\"\n            \"aside\"\n            \"footer\";\n        grid-template-columns: 1fr;\n        grid-template-rows: 60px 50px 1fr 100px 60px;\n    }\n    \n    .complex-layout {\n        grid-template-areas:\n            \"nav\"\n            \"hero\"\n            \"content1\"\n            \"content2\"\n            \"content3\"\n            \"sidebar-left\"\n            \"sidebar-right\"\n            \"footer-main\";\n        grid-template-columns: 1fr;\n        grid-template-rows: repeat(8, auto);\n    }\n}\n</style>"
};
	
	// Extract section name from editor ID
	const sectionName = editorId.replace('-editor', '');
	
	// Return appropriate code example
	return sectionCodeExamples[sectionName] || `<!-- ${sectionName} example -->
<div>Your code here</div>`;
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
	const statusElement = document.querySelector(`#${editorId} .live-editor-status span`);
	const indicatorElement = document.querySelector(`#${editorId} .status-indicator`);

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