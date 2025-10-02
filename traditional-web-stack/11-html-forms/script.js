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

	console.log(`Live editor ${editorId} initialized successfully`);
}

function getCodeSnippetForEditor(editorId) {
	// Section-specific code examples
	const sectionCodeExamples = {
  "overview": "<!-- HTML Forms Overview -->\n<form class=\"demo-form\">\n    <h3>Contact Form</h3>\n    \n    <label for=\"name\">Full Name:</label>\n    <input type=\"text\" id=\"name\" name=\"name\" required>\n    \n    <label for=\"email\">Email:</label>\n    <input type=\"email\" id=\"email\" name=\"email\" required>\n    \n    <label for=\"message\">Message:</label>\n    <textarea id=\"message\" name=\"message\" rows=\"4\"></textarea>\n    \n    <button type=\"submit\">Submit Form</button>\n</form>\n\n<style>\n.demo-form {\n    max-width: 500px;\n    margin: 0 auto;\n    padding: 2rem;\n    background: #f8fafc;\n    border-radius: 12px;\n    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);\n}\n\n.demo-form h3 {\n    color: #1e293b;\n    margin-bottom: 1.5rem;\n    text-align: center;\n}\n\n.demo-form label {\n    display: block;\n    margin-bottom: 0.5rem;\n    color: #374151;\n    font-weight: 500;\n}\n\n.demo-form input,\n.demo-form textarea {\n    width: 100%;\n    padding: 0.75rem;\n    border: 1px solid #d1d5db;\n    border-radius: 6px;\n    margin-bottom: 1rem;\n    font-size: 1rem;\n}\n\n.demo-form input:focus,\n.demo-form textarea:focus {\n    outline: none;\n    border-color: #3b82f6;\n    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);\n}\n\n.demo-form button {\n    background: #3b82f6;\n    color: white;\n    border: none;\n    padding: 0.75rem 2rem;\n    border-radius: 6px;\n    font-size: 1rem;\n    cursor: pointer;\n    width: 100%;\n}\n\n.demo-form button:hover {\n    background: #2563eb;\n}\n</style>",
  "input-types": "<!-- HTML Input Types Demo -->\n<form class=\"input-demo\">\n    <h3>Different Input Types</h3>\n    \n    <label>Text Input:</label>\n    <input type=\"text\" placeholder=\"Enter text\">\n    \n    <label>Email Input:</label>\n    <input type=\"email\" placeholder=\"Enter email\">\n    \n    <label>Password Input:</label>\n    <input type=\"password\" placeholder=\"Enter password\">\n    \n    <label>Number Input:</label>\n    <input type=\"number\" placeholder=\"Enter number\" min=\"1\" max=\"100\">\n    \n    <label>Date Input:</label>\n    <input type=\"date\">\n    \n    <label>Time Input:</label>\n    <input type=\"time\">\n    \n    <label>Color Input:</label>\n    <input type=\"color\" value=\"#3b82f6\">\n    \n    <label>Range Input:</label>\n    <input type=\"range\" min=\"0\" max=\"100\" value=\"50\">\n    \n    <label>File Input:</label>\n    <input type=\"file\">\n</form>\n\n<style>\nbody {\n    font-family: Arial, sans-serif;\n    max-width: 500px;\n    margin: 0 auto;\n    padding: 2rem;\n}\n\n.input-demo {\n    background: #f8fafc;\n    padding: 2rem;\n    border-radius: 12px;\n    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);\n}\n\nlabel {\n    display: block;\n    margin-bottom: 0.5rem;\n    color: #374151;\n    font-weight: 500;\n}\n\ninput {\n    width: 100%;\n    padding: 0.75rem;\n    border: 1px solid #d1d5db;\n    border-radius: 6px;\n    margin-bottom: 1rem;\n    font-size: 1rem;\n}\n\ninput:focus {\n    outline: none;\n    border-color: #3b82f6;\n    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);\n}\n</style>",
  "form-elements": "<!-- Form Elements Demo -->\n<form class=\"elements-demo\">\n    <h3>Form Elements</h3>\n    \n    <label>Select Dropdown:</label>\n    <select>\n        <option>Choose an option</option>\n        <option>Option 1</option>\n        <option>Option 2</option>\n        <option>Option 3</option>\n    </select>\n    \n    <label>Textarea:</label>\n    <textarea rows=\"3\" placeholder=\"Enter your message\"></textarea>\n    \n    <fieldset>\n        <legend>Checkboxes:</legend>\n        <label><input type=\"checkbox\"> Option 1</label>\n        <label><input type=\"checkbox\"> Option 2</label>\n        <label><input type=\"checkbox\"> Option 3</label>\n    </fieldset>\n    \n    <fieldset>\n        <legend>Radio Buttons:</legend>\n        <label><input type=\"radio\" name=\"choice\"> Choice A</label>\n        <label><input type=\"radio\" name=\"choice\"> Choice B</label>\n        <label><input type=\"radio\" name=\"choice\"> Choice C</label>\n    </fieldset>\n    \n    <button type=\"submit\">Submit Form</button>\n</form>\n\n<style>\nbody {\n    font-family: Arial, sans-serif;\n    max-width: 500px;\n    margin: 0 auto;\n    padding: 2rem;\n}\n\n.elements-demo {\n    background: #f8fafc;\n    padding: 2rem;\n    border-radius: 12px;\n    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);\n}\n\nlabel {\n    display: block;\n    margin-bottom: 0.5rem;\n    color: #374151;\n    font-weight: 500;\n}\n\nselect, textarea {\n    width: 100%;\n    padding: 0.75rem;\n    border: 1px solid #d1d5db;\n    border-radius: 6px;\n    margin-bottom: 1rem;\n    font-size: 1rem;\n}\n\nfieldset {\n    border: 1px solid #d1d5db;\n    border-radius: 6px;\n    margin-bottom: 1rem;\n    padding: 1rem;\n}\n\nlegend {\n    font-weight: 600;\n    color: #374151;\n}\n\nbutton {\n    background: #3b82f6;\n    color: white;\n    border: none;\n    padding: 0.75rem 2rem;\n    border-radius: 6px;\n    font-size: 1rem;\n    cursor: pointer;\n    width: 100%;\n}\n\nbutton:hover {\n    background: #2563eb;\n}\n</style>",
  "validation": "<!-- Form Validation Demo -->\n<form class=\"validation-demo\">\n    <h3>Form Validation</h3>\n    \n    <label>Required Field:</label>\n    <input type=\"text\" required placeholder=\"This field is required\">\n    \n    <label>Email with Pattern:</label>\n    <input type=\"email\" required placeholder=\"Enter valid email\">\n    \n    <label>Min Length (5 chars):</label>\n    <input type=\"text\" minlength=\"5\" placeholder=\"Minimum 5 characters\">\n    \n    <label>Number Range (1-100):</label>\n    <input type=\"number\" min=\"1\" max=\"100\" placeholder=\"Enter number 1-100\">\n    \n    <label>Pattern Match (letters only):</label>\n    <input type=\"text\" pattern=\"[A-Za-z]+\" placeholder=\"Letters only\">\n    \n    <button type=\"submit\">Submit Form</button>\n</form>\n\n<style>\nbody {\n    font-family: Arial, sans-serif;\n    max-width: 500px;\n    margin: 0 auto;\n    padding: 2rem;\n}\n\n.validation-demo {\n    background: #f8fafc;\n    padding: 2rem;\n    border-radius: 12px;\n    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);\n}\n\nlabel {\n    display: block;\n    margin-bottom: 0.5rem;\n    color: #374151;\n    font-weight: 500;\n}\n\ninput {\n    width: 100%;\n    padding: 0.75rem;\n    border: 1px solid #d1d5db;\n    border-radius: 6px;\n    margin-bottom: 1rem;\n    font-size: 1rem;\n}\n\ninput:focus {\n    outline: none;\n    border-color: #3b82f6;\n    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);\n}\n\ninput:invalid {\n    border-color: #ef4444;\n}\n\nbutton {\n    background: #3b82f6;\n    color: white;\n    border: none;\n    padding: 0.75rem 2rem;\n    border-radius: 6px;\n    font-size: 1rem;\n    cursor: pointer;\n    width: 100%;\n}\n\nbutton:hover {\n    background: #2563eb;\n}\n</style>",
  "interactive": "<!-- Interactive Forms Demo -->\n<form class=\"interactive-demo\" onsubmit=\"handleSubmit(event)\">\n    <h3>Interactive Form Demo</h3>\n    \n    <label for=\"username\">Username:</label>\n    <input type=\"text\" id=\"username\" name=\"username\" required>\n    \n    <label for=\"password\">Password:</label>\n    <input type=\"password\" id=\"password\" name=\"password\" required>\n    \n    <label for=\"confirm-password\">Confirm Password:</label>\n    <input type=\"password\" id=\"confirm-password\" name=\"confirm-password\" required>\n    \n    <label for=\"age\">Age:</label>\n    <input type=\"number\" id=\"age\" name=\"age\" min=\"13\" max=\"120\">\n    \n    <label for=\"country\">Country:</label>\n    <select id=\"country\" name=\"country\">\n        <option value=\"\">Select Country</option>\n        <option value=\"us\">United States</option>\n        <option value=\"uk\">United Kingdom</option>\n        <option value=\"ca\">Canada</option>\n    </select>\n    \n    <label>\n        <input type=\"checkbox\" name=\"terms\"> I agree to the terms and conditions\n    </label>\n    \n    <button type=\"submit\">Create Account</button>\n</form>\n\n<div id=\"form-result\" style=\"margin-top: 1rem; padding: 1rem; background: #f0f9ff; border-radius: 8px; display: none;\">\n    <h4>Form Submitted Successfully!</h4>\n    <p id=\"result-content\"></p>\n</div>\n\n<script>\nfunction handleSubmit(event) {\n    event.preventDefault();\n    \n    const formData = new FormData(event.target);\n    const data = Object.fromEntries(formData.entries());\n    \n    // Simple validation\n    if (data.password !== data['confirm-password']) {\n        alert('Passwords do not match!');\n        return;\n    }\n    \n    if (!data.terms) {\n        alert('Please agree to the terms and conditions!');\n        return;\n    }\n    \n    // Show result\n    const resultDiv = document.getElementById('form-result');\n    const resultContent = document.getElementById('result-content');\n    \n    resultContent.innerHTML = `\n        <strong>Username:</strong> ${data.username}<br>\n        <strong>Age:</strong> ${data.age}<br>\n        <strong>Country:</strong> ${data.country}<br>\n        <strong>Terms Accepted:</strong> ${data.terms ? 'Yes' : 'No'}\n    `;\n    \n    resultDiv.style.display = 'block';\n}\n\n// Real-time password confirmation\ndocument.getElementById('confirm-password').addEventListener('input', function() {\n    const password = document.getElementById('password').value;\n    const confirmPassword = this.value;\n    \n    if (password !== confirmPassword) {\n        this.style.borderColor = '#ef4444';\n    } else {\n        this.style.borderColor = '#10b981';\n    }\n});\n</script>\n\n<style>\nbody {\n    font-family: Arial, sans-serif;\n    max-width: 500px;\n    margin: 0 auto;\n    padding: 2rem;\n}\n\n.interactive-demo {\n    background: #f8fafc;\n    padding: 2rem;\n    border-radius: 12px;\n    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);\n}\n\nlabel {\n    display: block;\n    margin-bottom: 0.5rem;\n    color: #374151;\n    font-weight: 500;\n}\n\ninput, select {\n    width: 100%;\n    padding: 0.75rem;\n    border: 1px solid #d1d5db;\n    border-radius: 6px;\n    margin-bottom: 1rem;\n    font-size: 1rem;\n}\n\ninput:focus, select:focus {\n    outline: none;\n    border-color: #3b82f6;\n    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);\n}\n\nbutton {\n    background: #3b82f6;\n    color: white;\n    border: none;\n    padding: 0.75rem 2rem;\n    border-radius: 6px;\n    font-size: 1rem;\n    cursor: pointer;\n    width: 100%;\n}\n\nbutton:hover {\n    background: #2563eb;\n}\n</style>"
};
	
	// Extract section name from editor ID
	const sectionName = editorId.replace('-editor', '');
	
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

console.log("Forms module script loaded successfully");