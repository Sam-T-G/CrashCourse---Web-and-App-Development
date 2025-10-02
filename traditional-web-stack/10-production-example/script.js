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
  "dashboard": "<!-- Production Dashboard Example -->\n<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n    <meta charset=\"UTF-8\">\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n    <title>Production Dashboard</title>\n    <style>\n        * {\n            margin: 0;\n            padding: 0;\n            box-sizing: border-box;\n        }\n        \n        body {\n            font-family: 'Arial', sans-serif;\n            background: #f8fafc;\n            color: #1e293b;\n        }\n        \n        .dashboard {\n            display: grid;\n            grid-template-areas: \n                'header header header'\n                'sidebar main main'\n                'footer footer footer';\n            grid-template-columns: 250px 1fr;\n            grid-template-rows: auto 1fr auto;\n            min-height: 100vh;\n        }\n        \n        .header {\n            grid-area: header;\n            background: #1e293b;\n            color: white;\n            padding: 1rem 2rem;\n            display: flex;\n            justify-content: space-between;\n            align-items: center;\n        }\n        \n        .sidebar {\n            grid-area: sidebar;\n            background: white;\n            padding: 2rem;\n            border-right: 1px solid #e5e7eb;\n        }\n        \n        .main {\n            grid-area: main;\n            padding: 2rem;\n        }\n        \n        .stats-grid {\n            display: grid;\n            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));\n            gap: 1rem;\n            margin-bottom: 2rem;\n        }\n        \n        .stat-card {\n            background: white;\n            padding: 1.5rem;\n            border-radius: 8px;\n            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);\n            text-align: center;\n        }\n        \n        .stat-number {\n            font-size: 2rem;\n            font-weight: bold;\n            color: #3b82f6;\n        }\n        \n        .stat-label {\n            color: #6b7280;\n            margin-top: 0.5rem;\n        }\n    </style>\n</head>\n<body>\n    <div class=\"dashboard\">\n        <header class=\"header\">\n            <h1>Production Dashboard</h1>\n            <div>Welcome, User!</div>\n        </header>\n        \n        <aside class=\"sidebar\">\n            <nav>\n                <ul style=\"list-style: none;\">\n                    <li style=\"margin-bottom: 1rem;\"><a href=\"#\" style=\"color: #3b82f6; text-decoration: none;\">Dashboard</a></li>\n                    <li style=\"margin-bottom: 1rem;\"><a href=\"#\" style=\"color: #6b7280; text-decoration: none;\">Analytics</a></li>\n                    <li style=\"margin-bottom: 1rem;\"><a href=\"#\" style=\"color: #6b7280; text-decoration: none;\">Users</a></li>\n                    <li style=\"margin-bottom: 1rem;\"><a href=\"#\" style=\"color: #6b7280; text-decoration: none;\">Settings</a></li>\n                </ul>\n            </nav>\n        </aside>\n        \n        <main class=\"main\">\n            <div class=\"stats-grid\">\n                <div class=\"stat-card\">\n                    <div class=\"stat-number\">1,234</div>\n                    <div class=\"stat-label\">Total Users</div>\n                </div>\n                <div class=\"stat-card\">\n                    <div class=\"stat-number\">$12,345</div>\n                    <div class=\"stat-label\">Revenue</div>\n                </div>\n                <div class=\"stat-card\">\n                    <div class=\"stat-number\">567</div>\n                    <div class=\"stat-label\">Orders</div>\n                </div>\n                <div class=\"stat-card\">\n                    <div class=\"stat-number\">89%</div>\n                    <div class=\"stat-label\">Satisfaction</div>\n                </div>\n            </div>\n        </main>\n        \n        <footer style=\"grid-area: footer; background: #f1f5f9; padding: 1rem 2rem; text-align: center; color: #6b7280;\">\n            © 2024 Production Dashboard. All rights reserved.\n        </footer>\n    </div>\n</body>\n</html>"
};
	
	// Extract section name from editor ID
	const sectionName = editorId.replace('-editor', '');
	
	// Return appropriate code example
	return sectionCodeExamples[sectionName] || `/* ${sectionName} example */
/* Your code here */`;
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