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
  "dom-basics": "// DOM Manipulation\n// Select elements\nconst element = document.getElementById('myElement');\nconst elements = document.querySelectorAll('.myClass');\nconst firstElement = document.querySelector('.myClass');\n\n// Modify content\nelement.textContent = 'New text content';\nelement.innerHTML = '<strong>Bold text</strong>';\n\n// Modify attributes\nelement.setAttribute('class', 'new-class');\nelement.setAttribute('data-id', '123');\n\n// Get attributes\nconst className = element.getAttribute('class');\nconst dataId = element.getAttribute('data-id');\n\n// Modify styles\nelement.style.backgroundColor = 'red';\nelement.style.color = 'white';\nelement.style.padding = '1rem';\n\n// Add/remove classes\nelement.classList.add('active');\nelement.classList.remove('inactive');\nelement.classList.toggle('visible');\n\n// Check if class exists\nif (element.classList.contains('active')) {\n    console.log('Element has active class');\n}",
  "dom-events": "// DOM Manipulation with Events\n// Create and add elements\nfunction addListItem() {\n    const list = document.getElementById('myList');\n    const newItem = document.createElement('li');\n    newItem.textContent = 'New list item';\n    newItem.className = 'list-item';\n    \n    // Add event listener to new element\n    newItem.addEventListener('click', function() {\n        this.style.background = '#3b82f6';\n        this.style.color = 'white';\n    });\n    \n    list.appendChild(newItem);\n}\n\n// Remove elements\nfunction removeListItem() {\n    const list = document.getElementById('myList');\n    const lastItem = list.lastElementChild;\n    \n    if (lastItem) {\n        list.removeChild(lastItem);\n    }\n}\n\n// Dynamic content updates\nfunction updateContent() {\n    const content = document.getElementById('content');\n    const timestamp = new Date().toLocaleTimeString();\n    \n    content.innerHTML = `\n        <h3>Last updated: ${timestamp}</h3>\n        <p>This content was updated dynamically!</p>\n    `;\n}\n\n// Event delegation\ndocument.addEventListener('click', function(e) {\n    if (e.target.classList.contains('dynamic-button')) {\n        e.target.style.background = '#10b981';\n        e.target.textContent = 'Clicked!';\n    }\n});"
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