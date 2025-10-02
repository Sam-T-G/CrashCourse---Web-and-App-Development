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
  "flexbox-basics": "<!-- CSS Flexbox Basics Demo -->\n<div class=\"flexbox-demo\">\n    <h2>CSS Flexbox Basics</h2>\n    \n    <div class=\"demo-section\">\n        <h3>Basic Flex Container</h3>\n        <div class=\"basic-flex\">\n            <div class=\"flex-item\">Item 1</div>\n            <div class=\"flex-item\">Item 2</div>\n            <div class=\"flex-item\">Item 3</div>\n        </div>\n    </div>\n    \n    <div class=\"demo-section\">\n        <h3>Flex Direction</h3>\n        <div class=\"direction-showcase\">\n            <div class=\"direction-container row\">\n                <div class=\"flex-item\">Row</div>\n                <div class=\"flex-item\">Row</div>\n            </div>\n            <div class=\"direction-container column\">\n                <div class=\"flex-item\">Column</div>\n                <div class=\"flex-item\">Column</div>\n            </div>\n        </div>\n    </div>\n    \n    <div class=\"demo-section\">\n        <h3>Justify Content</h3>\n        <div class=\"justify-showcase\">\n            <div class=\"justify-container start\">\n                <div class=\"flex-item\">Start</div>\n                <div class=\"flex-item\">Start</div>\n            </div>\n            <div class=\"justify-container center\">\n                <div class=\"flex-item\">Center</div>\n                <div class=\"flex-item\">Center</div>\n            </div>\n            <div class=\"justify-container between\">\n                <div class=\"flex-item\">Between</div>\n                <div class=\"flex-item\">Between</div>\n            </div>\n        </div>\n    </div>\n    \n    <div class=\"demo-section\">\n        <h3>Align Items</h3>\n        <div class=\"align-showcase\">\n            <div class=\"align-container stretch\">\n                <div class=\"flex-item\">Stretch</div>\n                <div class=\"flex-item\">Stretch</div>\n            </div>\n            <div class=\"align-container center\">\n                <div class=\"flex-item\">Center</div>\n                <div class=\"flex-item\">Center</div>\n            </div>\n        </div>\n    </div>\n</div>\n\n<style>\n.flexbox-demo {\n    max-width: 800px;\n    margin: 0 auto;\n    padding: 1.5rem;\n    font-family: Arial, sans-serif;\n}\n\n.demo-section {\n    margin: 2rem 0;\n    padding: 1.5rem;\n    background: #f8fafc;\n    border-radius: 8px;\n}\n\n.basic-flex {\n    display: flex;\n    background: #e0f2fe;\n    padding: 1rem;\n    border-radius: 6px;\n    gap: 0.5rem;\n}\n\n.direction-showcase {\n    display: grid;\n    grid-template-columns: 1fr 1fr;\n    gap: 1rem;\n}\n\n.direction-container {\n    background: #f0fdf4;\n    padding: 1rem;\n    border-radius: 6px;\n    min-height: 100px;\n    display: flex;\n}\n\n.row { flex-direction: row; }\n.column { flex-direction: column; }\n\n.justify-showcase, .align-showcase {\n    display: grid;\n    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));\n    gap: 1rem;\n}\n\n.justify-container, .align-container {\n    background: #fef3c7;\n    padding: 1rem;\n    border-radius: 6px;\n    min-height: 80px;\n    display: flex;\n}\n\n.flex-item {\n    background: #3b82f6;\n    color: white;\n    padding: 0.75rem 1rem;\n    border-radius: 4px;\n    font-weight: bold;\n    text-align: center;\n    transition: all 0.3s ease;\n    min-width: 60px;\n}\n\n.flex-item:hover {\n    background: #1d4ed8;\n    transform: scale(1.05);\n}\n\n/* Justify Content */\n.start { justify-content: flex-start; }\n.center { justify-content: center; }\n.between { justify-content: space-between; }\n\n/* Align Items */\n.stretch { align-items: stretch; }\n</style>",
  "flexbox-advanced": "<!-- CSS Flexbox Advanced Demo -->\n<div class=\"flexbox-advanced-demo\">\n    <h2>CSS Flexbox Advanced Properties</h2>\n    \n    <div class=\"demo-section\">\n        <h3>Flex Grow & Shrink</h3>\n        <div class=\"grow-shrink-showcase\">\n            <div class=\"flex-container\">\n                <div class=\"flex-item grow-1\">Grow 1</div>\n                <div class=\"flex-item grow-2\">Grow 2</div>\n                <div class=\"flex-item grow-1\">Grow 1</div>\n            </div>\n            <div class=\"flex-container\">\n                <div class=\"flex-item shrink-0\">No Shrink</div>\n                <div class=\"flex-item shrink-1\">Shrink 1</div>\n                <div class=\"flex-item shrink-1\">Shrink 1</div>\n            </div>\n        </div>\n    </div>\n    \n    <div class=\"demo-section\">\n        <h3>Flex Basis</h3>\n        <div class=\"basis-showcase\">\n            <div class=\"flex-container\">\n                <div class=\"flex-item basis-100\">100px</div>\n                <div class=\"flex-item basis-200\">200px</div>\n                <div class=\"flex-item basis-100\">100px</div>\n            </div>\n        </div>\n    </div>\n    \n    <div class=\"demo-section\">\n        <h3>Flex Shorthand</h3>\n        <div class=\"shorthand-showcase\">\n            <div class=\"flex-container\">\n                <div class=\"flex-item flex-1\">flex: 1</div>\n                <div class=\"flex-item flex-2\">flex: 2</div>\n                <div class=\"flex-item flex-1\">flex: 1</div>\n            </div>\n        </div>\n    </div>\n    \n    <div class=\"demo-section\">\n        <h3>Real-World Example: Card Layout</h3>\n        <div class=\"card-layout\">\n            <div class=\"card\">\n                <div class=\"card-header\">Card Title</div>\n                <div class=\"card-content\">This is the card content that demonstrates flexbox in action.</div>\n                <div class=\"card-footer\">\n                    <button class=\"btn\">Action</button>\n                    <button class=\"btn secondary\">Cancel</button>\n                </div>\n            </div>\n            <div class=\"card\">\n                <div class=\"card-header\">Another Card</div>\n                <div class=\"card-content\">Short content</div>\n                <div class=\"card-footer\">\n                    <button class=\"btn\">Action</button>\n                    <button class=\"btn secondary\">Cancel</button>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>\n\n<style>\n.flexbox-advanced-demo {\n    max-width: 800px;\n    margin: 0 auto;\n    padding: 1.5rem;\n    font-family: Arial, sans-serif;\n}\n\n.demo-section {\n    margin: 2rem 0;\n    padding: 1.5rem;\n    background: #f8fafc;\n    border-radius: 8px;\n}\n\n.grow-shrink-showcase, .basis-showcase, .shorthand-showcase {\n    display: grid;\n    grid-template-columns: 1fr;\n    gap: 1rem;\n}\n\n.flex-container {\n    background: #e0f2fe;\n    padding: 1rem;\n    border-radius: 6px;\n    display: flex;\n    gap: 0.5rem;\n    min-height: 80px;\n}\n\n.flex-item {\n    background: #3b82f6;\n    color: white;\n    padding: 0.75rem 1rem;\n    border-radius: 4px;\n    font-weight: bold;\n    text-align: center;\n    transition: all 0.3s ease;\n    min-width: 60px;\n}\n\n.flex-item:hover {\n    background: #1d4ed8;\n    transform: scale(1.05);\n}\n\n/* Flex Grow */\n.grow-1 { flex-grow: 1; }\n.grow-2 { flex-grow: 2; }\n\n/* Flex Shrink */\n.shrink-0 { flex-shrink: 0; min-width: 120px; }\n.shrink-1 { flex-shrink: 1; min-width: 120px; }\n\n/* Flex Basis */\n.basis-100 { flex-basis: 100px; }\n.basis-200 { flex-basis: 200px; }\n\n/* Flex Shorthand */\n.flex-1 { flex: 1; }\n.flex-2 { flex: 2; }\n\n/* Real-World Example */\n.card-layout {\n    display: flex;\n    gap: 1rem;\n    flex-wrap: wrap;\n}\n\n.card {\n    background: white;\n    border: 1px solid #e5e7eb;\n    border-radius: 8px;\n    padding: 1rem;\n    flex: 1;\n    min-width: 200px;\n    display: flex;\n    flex-direction: column;\n    box-shadow: 0 2px 4px rgba(0,0,0,0.1);\n}\n\n.card-header {\n    font-weight: bold;\n    font-size: 1.1rem;\n    margin-bottom: 0.5rem;\n    color: #1f2937;\n}\n\n.card-content {\n    flex: 1;\n    color: #6b7280;\n    line-height: 1.5;\n    margin-bottom: 1rem;\n}\n\n.card-footer {\n    display: flex;\n    gap: 0.5rem;\n    justify-content: flex-end;\n}\n\n.btn {\n    padding: 0.5rem 1rem;\n    border: none;\n    border-radius: 4px;\n    font-weight: 500;\n    cursor: pointer;\n    transition: all 0.3s ease;\n    font-size: 0.875rem;\n}\n\n.btn.secondary {\n    background: #6b7280;\n    color: white;\n}\n\n.btn:hover {\n    transform: translateY(-1px);\n    box-shadow: 0 2px 4px rgba(0,0,0,0.15);\n}\n\n.btn.secondary:hover {\n    background: #4b5563;\n}\n</style>"
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
