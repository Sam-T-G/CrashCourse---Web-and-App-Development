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
  "positioning": "<!-- CSS Positioning Demo -->\n<div class=\"positioning-demo\">\n    <h2>CSS Positioning Properties</h2>\n    \n    <div class=\"position-container\">\n        <h3>Static Positioning (Default)</h3>\n        <div class=\"position-box static\">Static</div>\n        <div class=\"position-box static\">Static</div>\n        <div class=\"position-box static\">Static</div>\n    </div>\n    \n    <div class=\"position-container\">\n        <h3>Relative Positioning</h3>\n        <div class=\"position-box relative\">Relative</div>\n        <div class=\"position-box relative offset\">Relative + Offset</div>\n        <div class=\"position-box relative\">Relative</div>\n    </div>\n    \n    <div class=\"position-container\">\n        <h3>Absolute Positioning</h3>\n        <div class=\"position-box absolute top-left\">Top Left</div>\n        <div class=\"position-box absolute top-right\">Top Right</div>\n        <div class=\"position-box absolute bottom-left\">Bottom Left</div>\n        <div class=\"position-box absolute bottom-right\">Bottom Right</div>\n    </div>\n    \n    <div class=\"position-container\">\n        <h3>Fixed Positioning</h3>\n        <div class=\"position-box fixed\">Fixed to Viewport</div>\n    </div>\n    \n    <div class=\"position-container\">\n        <h3>Sticky Positioning</h3>\n        <div class=\"sticky-demo\">\n            <div class=\"position-box sticky\">Sticky Element</div>\n            <div class=\"content\">Scroll to see sticky behavior</div>\n            <div class=\"content\">More content here</div>\n            <div class=\"content\">Keep scrolling</div>\n            <div class=\"content\">Almost there</div>\n            <div class=\"content\">Last content</div>\n        </div>\n    </div>\n</div>\n\n<style>\n.positioning-demo {\n    max-width: 1000px;\n    margin: 0 auto;\n    padding: 2rem;\n    font-family: Arial, sans-serif;\n}\n\n.position-container {\n    margin: 3rem 0;\n    padding: 2rem;\n    background: #f8fafc;\n    border-radius: 12px;\n    position: relative;\n    min-height: 200px;\n}\n\n.position-box {\n    width: 100px;\n    height: 60px;\n    background: #3b82f6;\n    color: white;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    font-weight: bold;\n    border-radius: 8px;\n    margin: 0.5rem;\n}\n\n.static { position: static; }\n.relative { position: relative; }\n.absolute { position: absolute; }\n.fixed { position: fixed; top: 20px; right: 20px; z-index: 1000; }\n.sticky { position: sticky; top: 20px; }\n\n.offset { top: 20px; left: 50px; }\n.top-left { top: 20px; left: 20px; }\n.top-right { top: 20px; right: 20px; }\n.bottom-left { bottom: 20px; left: 20px; }\n.bottom-right { bottom: 20px; right: 20px; }\n\n.sticky-demo {\n    height: 300px;\n    overflow-y: auto;\n    border: 2px solid #e5e7eb;\n    border-radius: 8px;\n    padding: 1rem;\n}\n\n.content {\n    height: 100px;\n    background: #e5e7eb;\n    margin: 1rem 0;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    border-radius: 8px;\n}\n</style>",
  "box-model": "<!-- CSS Box Model Demo -->\n<div class=\"box-model-demo\">\n    <h2>CSS Box Model</h2>\n    \n    <div class=\"box-model-container\">\n        <h3>Content Box (Default)</h3>\n        <div class=\"box content-box\">\n            <div class=\"inner-content\">Content</div>\n        </div>\n        <p>Total width: 200px + 40px padding + 20px border = 260px</p>\n    </div>\n    \n    <div class=\"box-model-container\">\n        <h3>Border Box</h3>\n        <div class=\"box border-box\">\n            <div class=\"inner-content\">Content</div>\n        </div>\n        <p>Total width: 200px (includes padding and border)</p>\n    </div>\n    \n    <div class=\"margin-demo\">\n        <h3>Margin Collapse</h3>\n        <div class=\"margin-box\">Box 1</div>\n        <div class=\"margin-box\">Box 2</div>\n        <div class=\"margin-box\">Box 3</div>\n    </div>\n    \n    <div class=\"padding-demo\">\n        <h3>Padding Examples</h3>\n        <div class=\"padding-grid\">\n            <div class=\"padding-box small\">Small Padding</div>\n            <div class=\"padding-box medium\">Medium Padding</div>\n            <div class=\"padding-box large\">Large Padding</div>\n        </div>\n    </div>\n</div>\n\n<style>\n.box-model-demo {\n    max-width: 1000px;\n    margin: 0 auto;\n    padding: 2rem;\n    font-family: Arial, sans-serif;\n}\n\n.box-model-container {\n    margin: 2rem 0;\n    padding: 2rem;\n    background: #f8fafc;\n    border-radius: 12px;\n}\n\n.box {\n    width: 200px;\n    height: 100px;\n    background: #3b82f6;\n    color: white;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    font-weight: bold;\n    border-radius: 8px;\n    margin: 1rem 0;\n}\n\n.content-box {\n    box-sizing: content-box;\n    padding: 20px;\n    border: 10px solid #10b981;\n}\n\n.border-box {\n    box-sizing: border-box;\n    padding: 20px;\n    border: 10px solid #f59e0b;\n}\n\n.inner-content {\n    background: rgba(255,255,255,0.2);\n    padding: 0.5rem;\n    border-radius: 4px;\n}\n\n.margin-demo {\n    margin: 2rem 0;\n    padding: 2rem;\n    background: #f0f9ff;\n    border-radius: 12px;\n}\n\n.margin-box {\n    background: #8b5cf6;\n    color: white;\n    padding: 1rem;\n    margin: 20px 0;\n    border-radius: 8px;\n    text-align: center;\n    font-weight: bold;\n}\n\n.padding-demo {\n    margin: 2rem 0;\n    padding: 2rem;\n    background: #fef3c7;\n    border-radius: 12px;\n}\n\n.padding-grid {\n    display: grid;\n    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));\n    gap: 1rem;\n}\n\n.padding-box {\n    background: #ef4444;\n    color: white;\n    text-align: center;\n    font-weight: bold;\n    border-radius: 8px;\n}\n\n.small { padding: 0.5rem; }\n.medium { padding: 1.5rem; }\n.large { padding: 3rem; }\n</style>",
  "centering": "<!-- CSS Centering Techniques Demo -->\n<div class=\"centering-demo\">\n    <h2>CSS Centering Techniques</h2>\n    \n    <div class=\"centering-section\">\n        <h3>Text Centering</h3>\n        <div class=\"text-center\">\n            <p>This text is centered using text-align: center</p>\n        </div>\n    </div>\n    \n    <div class=\"centering-section\">\n        <h3>Flexbox Centering</h3>\n        <div class=\"flex-center\">\n            <div class=\"centered-box\">Centered with Flexbox</div>\n        </div>\n    </div>\n    \n    <div class=\"centering-section\">\n        <h3>Grid Centering</h3>\n        <div class=\"grid-center\">\n            <div class=\"centered-box\">Centered with Grid</div>\n        </div>\n    </div>\n    \n    <div class=\"centering-section\">\n        <h3>Absolute Positioning Centering</h3>\n        <div class=\"absolute-center-container\">\n            <div class=\"absolute-center\">Centered with Absolute</div>\n        </div>\n    </div>\n    \n    <div class=\"centering-section\">\n        <h3>Transform Centering</h3>\n        <div class=\"transform-center-container\">\n            <div class=\"transform-center\">Centered with Transform</div>\n        </div>\n    </div>\n    \n    <div class=\"centering-section\">\n        <h3>Multiple Elements Centering</h3>\n        <div class=\"multiple-center\">\n            <div class=\"centered-item\">Item 1</div>\n            <div class=\"centered-item\">Item 2</div>\n            <div class=\"centered-item\">Item 3</div>\n        </div>\n    </div>\n</div>\n\n<style>\n.centering-demo {\n    max-width: 1000px;\n    margin: 0 auto;\n    padding: 2rem;\n    font-family: Arial, sans-serif;\n}\n\n.centering-section {\n    margin: 2rem 0;\n    padding: 2rem;\n    background: #f8fafc;\n    border-radius: 12px;\n}\n\n.text-center {\n    text-align: center;\n    padding: 2rem;\n    background: #e0f2fe;\n    border-radius: 8px;\n}\n\n.flex-center {\n    height: 200px;\n    background: #f0fdf4;\n    border-radius: 8px;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n}\n\n.grid-center {\n    height: 200px;\n    background: #fef3c7;\n    border-radius: 8px;\n    display: grid;\n    place-items: center;\n}\n\n.absolute-center-container {\n    height: 200px;\n    background: #fce7f3;\n    border-radius: 8px;\n    position: relative;\n}\n\n.absolute-center {\n    position: absolute;\n    top: 50%;\n    left: 50%;\n    transform: translate(-50%, -50%);\n    background: #3b82f6;\n    color: white;\n    padding: 1rem 2rem;\n    border-radius: 8px;\n    font-weight: bold;\n}\n\n.transform-center-container {\n    height: 200px;\n    background: #f3e8ff;\n    border-radius: 8px;\n    position: relative;\n}\n\n.transform-center {\n    position: absolute;\n    top: 50%;\n    left: 50%;\n    transform: translate(-50%, -50%);\n    background: #8b5cf6;\n    color: white;\n    padding: 1rem 2rem;\n    border-radius: 8px;\n    font-weight: bold;\n}\n\n.multiple-center {\n    height: 200px;\n    background: #ecfdf5;\n    border-radius: 8px;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    gap: 1rem;\n    flex-wrap: wrap;\n}\n\n.centered-box, .centered-item {\n    background: #10b981;\n    color: white;\n    padding: 1rem 2rem;\n    border-radius: 8px;\n    font-weight: bold;\n    text-align: center;\n}\n</style>"
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
