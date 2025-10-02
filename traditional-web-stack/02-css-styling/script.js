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
  "color-palette": "<!-- CSS Color Properties Demo -->\n<div class=\"color-demo\">\n    <h2>Color Properties in Action</h2>\n    \n    <div class=\"color-grid\">\n        <div class=\"color-box primary\">Primary Color</div>\n        <div class=\"color-box secondary\">Secondary Color</div>\n        <div class=\"color-box accent\">Accent Color</div>\n        <div class=\"color-box success\">Success Color</div>\n        <div class=\"color-box warning\">Warning Color</div>\n        <div class=\"color-box danger\">Danger Color</div>\n    </div>\n    \n    <div class=\"text-examples\">\n        <p class=\"text-primary\">This is primary text color</p>\n        <p class=\"text-secondary\">This is secondary text color</p>\n        <p class=\"text-muted\">This is muted text color</p>\n    </div>\n    \n    <div class=\"border-examples\">\n        <div class=\"border-demo solid\">Solid Border</div>\n        <div class=\"border-demo dashed\">Dashed Border</div>\n        <div class=\"border-demo dotted\">Dotted Border</div>\n    </div>\n</div>\n\n<style>\n.color-demo {\n    max-width: 800px;\n    margin: 0 auto;\n    padding: 2rem;\n    font-family: Arial, sans-serif;\n}\n\n.color-grid {\n    display: grid;\n    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));\n    gap: 1rem;\n    margin: 2rem 0;\n}\n\n.color-box {\n    padding: 1.5rem;\n    border-radius: 12px;\n    text-align: center;\n    font-weight: bold;\n    color: white;\n    transition: all 0.3s ease;\n    cursor: pointer;\n}\n\n.color-box:hover {\n    transform: translateY(-5px);\n    box-shadow: 0 10px 25px rgba(0,0,0,0.2);\n}\n\n.primary { background: #3b82f6; }\n.secondary { background: #6b7280; }\n.accent { background: #8b5cf6; }\n.success { background: #10b981; }\n.warning { background: #f59e0b; }\n.danger { background: #ef4444; }\n\n.text-examples {\n    margin: 2rem 0;\n    padding: 1.5rem;\n    background: #f8fafc;\n    border-radius: 12px;\n}\n\n.text-primary { color: #3b82f6; font-weight: 600; }\n.text-secondary { color: #6b7280; font-weight: 500; }\n.text-muted { color: #9ca3af; font-style: italic; }\n\n.border-examples {\n    display: flex;\n    gap: 1rem;\n    flex-wrap: wrap;\n    margin: 2rem 0;\n}\n\n.border-demo {\n    padding: 1rem;\n    border-radius: 8px;\n    text-align: center;\n    font-weight: 500;\n    background: white;\n}\n\n.solid { border: 3px solid #3b82f6; }\n.dashed { border: 3px dashed #10b981; }\n.dotted { border: 3px dotted #f59e0b; }\n</style>",
  "typography": "<!-- CSS Typography Demo -->\n<div class=\"typography-demo\">\n    <h1>Typography Fundamentals</h1>\n    \n    <section class=\"heading-hierarchy\">\n        <h1>Heading 1 - Main Title</h1>\n        <h2>Heading 2 - Section Title</h2>\n        <h3>Heading 3 - Subsection</h3>\n        <h4>Heading 4 - Minor Heading</h4>\n        <h5>Heading 5 - Small Heading</h5>\n        <h6>Heading 6 - Smallest Heading</h6>\n    </section>\n    \n    <section class=\"text-styles\">\n        <p class=\"lead\">This is a lead paragraph that stands out from regular text.</p>\n        <p>This is a regular paragraph with <strong>bold text</strong>, <em>italic text</em>, and <u>underlined text</u>.</p>\n        <p>You can also use <code>inline code</code>, <mark>highlighted text</mark>, and <small>small text</small>.</p>\n    </section>\n    \n    <section class=\"font-families\">\n        <div class=\"font-serif\">\n            <h3>Serif Font (Georgia)</h3>\n            <p>The quick brown fox jumps over the lazy dog.</p>\n        </div>\n        <div class=\"font-sans\">\n            <h3>Sans-serif Font (Arial)</h3>\n            <p>The quick brown fox jumps over the lazy dog.</p>\n        </div>\n        <div class=\"font-mono\">\n            <h3>Monospace Font (Courier)</h3>\n            <p>The quick brown fox jumps over the lazy dog.</p>\n        </div>\n    </section>\n    \n    <section class=\"text-effects\">\n        <h3>Text Effects</h3>\n        <p class=\"text-shadow\">Text with shadow effect</p>\n        <p class=\"text-gradient\">Gradient text effect</p>\n        <p class=\"text-outline\">Text with outline</p>\n    </section>\n</div>\n\n<style>\n.typography-demo {\n    max-width: 800px;\n    margin: 0 auto;\n    padding: 2rem;\n    font-family: Arial, sans-serif;\n    line-height: 1.6;\n}\n\n.heading-hierarchy {\n    margin: 2rem 0;\n    padding: 1.5rem;\n    background: #f8fafc;\n    border-radius: 12px;\n}\n\n.heading-hierarchy h1 { color: #1e293b; font-size: 2.5rem; margin-bottom: 1rem; }\n.heading-hierarchy h2 { color: #374151; font-size: 2rem; margin-bottom: 0.75rem; }\n.heading-hierarchy h3 { color: #4b5563; font-size: 1.5rem; margin-bottom: 0.5rem; }\n.heading-hierarchy h4 { color: #6b7280; font-size: 1.25rem; margin-bottom: 0.5rem; }\n.heading-hierarchy h5 { color: #9ca3af; font-size: 1.125rem; margin-bottom: 0.5rem; }\n.heading-hierarchy h6 { color: #d1d5db; font-size: 1rem; margin-bottom: 0.5rem; }\n\n.text-styles {\n    margin: 2rem 0;\n    padding: 1.5rem;\n    background: #f0f9ff;\n    border-radius: 12px;\n}\n\n.lead {\n    font-size: 1.25rem;\n    font-weight: 300;\n    color: #1e40af;\n    margin-bottom: 1rem;\n}\n\ncode {\n    background: #e5e7eb;\n    padding: 0.25rem 0.5rem;\n    border-radius: 4px;\n    font-family: 'Courier New', monospace;\n}\n\nmark {\n    background: #fef08a;\n    padding: 0.25rem;\n    border-radius: 4px;\n}\n\n.font-families {\n    display: grid;\n    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));\n    gap: 1.5rem;\n    margin: 2rem 0;\n}\n\n.font-serif { font-family: Georgia, serif; }\n.font-sans { font-family: Arial, sans-serif; }\n.font-mono { font-family: 'Courier New', monospace; }\n\n.text-effects {\n    margin: 2rem 0;\n    padding: 1.5rem;\n    background: #fef3c7;\n    border-radius: 12px;\n}\n\n.text-shadow {\n    font-size: 2rem;\n    font-weight: bold;\n    text-shadow: 2px 2px 4px rgba(0,0,0,0.3);\n    color: #1e293b;\n}\n\n.text-gradient {\n    font-size: 2rem;\n    font-weight: bold;\n    background: linear-gradient(45deg, #3b82f6, #8b5cf6);\n    -webkit-background-clip: text;\n    -webkit-text-fill-color: transparent;\n    background-clip: text;\n}\n\n.text-outline {\n    font-size: 2rem;\n    font-weight: bold;\n    color: white;\n    text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000;\n}\n</style>",
  "backgrounds": "<!-- CSS Background Properties Demo -->\n<div class=\"background-demo\">\n    <h2>Background Properties Showcase</h2>\n    \n    <div class=\"background-grid\">\n        <div class=\"bg-solid\">\n            <h3>Solid Color</h3>\n            <p>background-color: #3b82f6</p>\n        </div>\n        \n        <div class=\"bg-gradient\">\n            <h3>Linear Gradient</h3>\n            <p>linear-gradient(45deg, #667eea, #764ba2)</p>\n        </div>\n        \n        <div class=\"bg-radial\">\n            <h3>Radial Gradient</h3>\n            <p>radial-gradient(circle, #f59e0b, #ef4444)</p>\n        </div>\n        \n        <div class=\"bg-pattern\">\n            <h3>Pattern Background</h3>\n            <p>repeating-linear-gradient pattern</p>\n        </div>\n        \n        <div class=\"bg-image\">\n            <h3>Background Image</h3>\n            <p>SVG pattern background</p>\n        </div>\n        \n        <div class=\"bg-multiple\">\n            <h3>Multiple Backgrounds</h3>\n            <p>Gradient + Pattern overlay</p>\n        </div>\n    </div>\n    \n    <div class=\"background-properties\">\n        <h3>Background Properties</h3>\n        <div class=\"bg-size-demo\">\n            <div class=\"bg-cover\">background-size: cover</div>\n            <div class=\"bg-contain\">background-size: contain</div>\n            <div class=\"bg-custom\">background-size: 50px 50px</div>\n        </div>\n        \n        <div class=\"bg-position-demo\">\n            <div class=\"bg-top-left\">top left</div>\n            <div class=\"bg-center\">center</div>\n            <div class=\"bg-bottom-right\">bottom right</div>\n        </div>\n    </div>\n</div>\n\n<style>\n.background-demo {\n    max-width: 1000px;\n    margin: 0 auto;\n    padding: 2rem;\n    font-family: Arial, sans-serif;\n}\n\n.background-grid {\n    display: grid;\n    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));\n    gap: 1.5rem;\n    margin: 2rem 0;\n}\n\n.background-grid > div {\n    height: 200px;\n    border-radius: 12px;\n    display: flex;\n    flex-direction: column;\n    justify-content: center;\n    align-items: center;\n    color: white;\n    text-align: center;\n    font-weight: bold;\n    box-shadow: 0 4px 15px rgba(0,0,0,0.1);\n}\n\n.bg-solid { background-color: #3b82f6; }\n.bg-gradient { background: linear-gradient(45deg, #667eea, #764ba2); }\n.bg-radial { background: radial-gradient(circle, #f59e0b, #ef4444); }\n.bg-pattern { \n    background: repeating-linear-gradient(\n        45deg,\n        #10b981,\n        #10b981 10px,\n        #059669 10px,\n        #059669 20px\n    );\n}\n.bg-image {\n    background-image: url('data:image/svg+xml,<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 100 100\"><circle cx=\"50\" cy=\"50\" r=\"40\" fill=\"%23f59e0b\"/><circle cx=\"50\" cy=\"50\" r=\"20\" fill=\"%23ef4444\"/></svg>');\n    background-size: cover;\n    background-position: center;\n}\n.bg-multiple {\n    background: \n        repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.1) 10px, rgba(255,255,255,0.1) 20px),\n        linear-gradient(135deg, #8b5cf6, #3b82f6);\n}\n\n.background-properties {\n    margin: 3rem 0;\n    padding: 2rem;\n    background: #f8fafc;\n    border-radius: 12px;\n}\n\n.bg-size-demo, .bg-position-demo {\n    display: flex;\n    gap: 1rem;\n    margin: 1rem 0;\n    flex-wrap: wrap;\n}\n\n.bg-size-demo > div, .bg-position-demo > div {\n    flex: 1;\n    min-width: 150px;\n    height: 100px;\n    border-radius: 8px;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    color: white;\n    font-weight: bold;\n    background-image: url('data:image/svg+xml,<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 100 100\"><rect width=\"100\" height=\"100\" fill=\"%233b82f6\"/><circle cx=\"50\" cy=\"50\" r=\"30\" fill=\"%23f59e0b\"/></svg>');\n}\n\n.bg-cover { background-size: cover; }\n.bg-contain { background-size: contain; }\n.bg-custom { background-size: 50px 50px; }\n\n.bg-top-left { background-position: top left; }\n.bg-center { background-position: center; }\n.bg-bottom-right { background-position: bottom right; }\n</style>",
  "borders": "<!-- CSS Border Properties Demo -->\n<div class=\"border-demo\">\n    <h2>Border Properties Showcase</h2>\n    \n    <div class=\"border-types\">\n        <h3>Border Types</h3>\n        <div class=\"border-grid\">\n            <div class=\"border-solid\">Solid Border</div>\n            <div class=\"border-dashed\">Dashed Border</div>\n            <div class=\"border-dotted\">Dotted Border</div>\n            <div class=\"border-double\">Double Border</div>\n            <div class=\"border-groove\">Groove Border</div>\n            <div class=\"border-ridge\">Ridge Border</div>\n            <div class=\"border-inset\">Inset Border</div>\n            <div class=\"border-outset\">Outset Border</div>\n        </div>\n    </div>\n    \n    <div class=\"border-radius-demo\">\n        <h3>Border Radius</h3>\n        <div class=\"radius-grid\">\n            <div class=\"radius-none\">No Radius</div>\n            <div class=\"radius-small\">Small Radius</div>\n            <div class=\"radius-medium\">Medium Radius</div>\n            <div class=\"radius-large\">Large Radius</div>\n            <div class=\"radius-circle\">Circle</div>\n            <div class=\"radius-ellipse\">Ellipse</div>\n        </div>\n    </div>\n    \n    <div class=\"border-width-demo\">\n        <h3>Border Width</h3>\n        <div class=\"width-grid\">\n            <div class=\"width-thin\">Thin (1px)</div>\n            <div class=\"width-medium\">Medium (3px)</div>\n            <div class=\"width-thick\">Thick (6px)</div>\n            <div class=\"width-very-thick\">Very Thick (10px)</div>\n        </div>\n    </div>\n    \n    <div class=\"border-color-demo\">\n        <h3>Border Colors</h3>\n        <div class=\"color-grid\">\n            <div class=\"color-primary\">Primary</div>\n            <div class=\"color-secondary\">Secondary</div>\n            <div class=\"color-success\">Success</div>\n            <div class=\"color-warning\">Warning</div>\n            <div class=\"color-danger\">Danger</div>\n            <div class=\"color-gradient\">Gradient</div>\n        </div>\n    </div>\n</div>\n\n<style>\n.border-demo {\n    max-width: 1000px;\n    margin: 0 auto;\n    padding: 2rem;\n    font-family: Arial, sans-serif;\n}\n\n.border-grid, .radius-grid, .width-grid, .color-grid {\n    display: grid;\n    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));\n    gap: 1rem;\n    margin: 1rem 0;\n}\n\n.border-grid > div, .radius-grid > div, .width-grid > div, .color-grid > div {\n    padding: 1.5rem;\n    text-align: center;\n    font-weight: bold;\n    background: #f8fafc;\n    transition: all 0.3s ease;\n}\n\n.border-grid > div:hover, .radius-grid > div:hover, .width-grid > div:hover, .color-grid > div:hover {\n    transform: translateY(-3px);\n    box-shadow: 0 5px 15px rgba(0,0,0,0.1);\n}\n\n/* Border Types */\n.border-solid { border: 3px solid #3b82f6; }\n.border-dashed { border: 3px dashed #10b981; }\n.border-dotted { border: 3px dotted #f59e0b; }\n.border-double { border: 6px double #ef4444; }\n.border-groove { border: 6px groove #8b5cf6; }\n.border-ridge { border: 6px ridge #06b6d4; }\n.border-inset { border: 6px inset #84cc16; }\n.border-outset { border: 6px outset #f97316; }\n\n/* Border Radius */\n.radius-none { border: 3px solid #3b82f6; border-radius: 0; }\n.radius-small { border: 3px solid #3b82f6; border-radius: 4px; }\n.radius-medium { border: 3px solid #3b82f6; border-radius: 12px; }\n.radius-large { border: 3px solid #3b82f6; border-radius: 24px; }\n.radius-circle { border: 3px solid #3b82f6; border-radius: 50%; width: 80px; height: 80px; display: flex; align-items: center; justify-content: center; }\n.radius-ellipse { border: 3px solid #3b82f6; border-radius: 50px 20px; }\n\n/* Border Width */\n.width-thin { border: 1px solid #3b82f6; }\n.width-medium { border: 3px solid #3b82f6; }\n.width-thick { border: 6px solid #3b82f6; }\n.width-very-thick { border: 10px solid #3b82f6; }\n\n/* Border Colors */\n.color-primary { border: 3px solid #3b82f6; }\n.color-secondary { border: 3px solid #6b7280; }\n.color-success { border: 3px solid #10b981; }\n.color-warning { border: 3px solid #f59e0b; }\n.color-danger { border: 3px solid #ef4444; }\n.color-gradient { \n    border: 3px solid transparent;\n    background: linear-gradient(white, white) padding-box,\n                linear-gradient(45deg, #3b82f6, #8b5cf6) border-box;\n}\n</style>"
};

	// Extract section name from editor ID
	const sectionName = editorId.replace("-editor", "");

	// Return appropriate code example
	return (
		sectionCodeExamples[sectionName] ||
		`<!-- ${sectionName} example -->
<div>Your code here</div>`
	);
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
