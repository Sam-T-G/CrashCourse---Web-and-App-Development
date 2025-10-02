#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

// Live code editor HTML template
const liveEditorTemplate = `
            <!-- Live Code Editor -->
            <div class="live-editor-section">
                <h3>🎮 Live Code Editor</h3>
                <div class="live-editor-container">
                    <div class="live-editor-header">
                        <div class="live-editor-title">
                            <div class="language-icon html">HTML</div>
                            <span>live-code.html</span>
                        </div>
                        <div class="live-editor-actions">
                            <button class="live-editor-btn" onclick="copyCode('SECTION_ID-editor')">Copy</button>
                            <button class="live-editor-btn primary" onclick="executeCode('SECTION_ID-editor')">Run</button>
                            <button class="live-editor-btn success" onclick="resetCode('SECTION_ID-editor')">Reset</button>
                        </div>
                    </div>
                    <div id="SECTION_ID-editor" class="monaco-editor"></div>
                    <div class="live-editor-footer">
                        <div class="live-editor-stats">
                            <span id="SECTION_ID-editor-lines">0 lines</span>
                            <span id="SECTION_ID-editor-chars">0 characters</span>
                        </div>
                        <div class="live-editor-status">
                            <div class="status-indicator"></div>
                            <span>Live Editor Ready</span>
                        </div>
                    </div>
                </div>
                <div class="live-preview" id="SECTION_ID-editor-preview">
                    <div class="live-preview-header">
                        <div class="live-preview-title">Live Preview</div>
                    </div>
                    <div id="SECTION_ID-editor-preview-content">
                        <!-- Live preview content will be inserted here -->
                    </div>
                    <div class="error-display hidden" id="error-display-SECTION_ID-editor">
                        <strong>Error:</strong> <span class="error-message"></span>
                    </div>
                </div>
            </div>`;

// Code snippets for different module types
const codeSnippets = {
	"html-basics": {
		overview: `<!-- HTML Document Structure -->
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
</html>`,
		headings: `<!-- HTML Headings -->
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
</style>`,
		text: `<!-- Text Elements -->
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
</style>`,
		lists: `<!-- HTML Lists -->
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
</style>`,
		forms: `<!-- HTML Forms -->
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
</style>`,
		interactive: `<!-- Interactive Elements -->
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
</style>`,
	},
};

// Function to add live editor to a section
function addLiveEditorToSection(htmlContent, sectionId, moduleType) {
	// Check if live editor already exists
	if (htmlContent.includes(`id="${sectionId}-editor"`)) {
		return htmlContent;
	}

	// Find the end of the section (before the closing div)
	const sectionEndPattern = new RegExp(
		`(\\s*</div>\\s*<!-- End of ${sectionId} section -->|\\s*</div>\\s*<!-- ${sectionId} section end|\\s*</div>\\s*</div>\\s*<!-- [^>]*${sectionId}[^>]*-->|\\s*</div>\\s*</div>\\s*$)`,
		"i"
	);

	// Try to find the section end
	let sectionEndMatch = htmlContent.match(sectionEndPattern);

	if (!sectionEndMatch) {
		// Fallback: look for the closing div of the content-section
		const contentSectionPattern = new RegExp(
			`(\\s*</div>\\s*<!-- [^>]*${sectionId}[^>]*-->|\\s*</div>\\s*</div>\\s*<!-- [^>]*${sectionId}[^>]*-->)`,
			"i"
		);
		sectionEndMatch = htmlContent.match(contentSectionPattern);
	}

	if (sectionEndMatch) {
		const liveEditorHtml = liveEditorTemplate.replace(/SECTION_ID/g, sectionId);
		const insertPosition = sectionEndMatch.index;
		return (
			htmlContent.slice(0, insertPosition) +
			liveEditorHtml +
			htmlContent.slice(insertPosition)
		);
	}

	return htmlContent;
}

// Function to process a module
function processModule(modulePath) {
	const indexPath = path.join(modulePath, "index.html");
	const scriptPath = path.join(modulePath, "script.js");

	if (!fs.existsSync(indexPath)) {
		console.log(`No index.html found in ${modulePath}`);
		return;
	}

	console.log(`Processing ${path.basename(modulePath)}...`);

	// Read HTML content
	let htmlContent = fs.readFileSync(indexPath, "utf8");

	// Determine module type
	const moduleName = path.basename(modulePath);
	let moduleType = "html-basics";

	if (moduleName.includes("css")) {
		moduleType = "css";
	} else if (moduleName.includes("javascript") || moduleName.includes("js")) {
		moduleType = "javascript";
	} else if (moduleName.includes("forms")) {
		moduleType = "forms";
	}

	// Find all sections in the HTML
	const sectionMatches = htmlContent.match(
		/id="([^"]+)" class="content-section"/g
	);

	if (sectionMatches) {
		sectionMatches.forEach((match) => {
			const sectionId = match.match(/id="([^"]+)"/)[1];
			console.log(`  Adding live editor to section: ${sectionId}`);
			htmlContent = addLiveEditorToSection(htmlContent, sectionId, moduleType);
		});
	}

	// Write updated HTML
	fs.writeFileSync(indexPath, htmlContent);
	console.log(`  Updated ${indexPath}`);
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

	console.log(`Found ${modules.length} modules to process:`);
	modules.forEach((module) => console.log(`  - ${module}`));
	console.log();

	modules.forEach((module) => {
		const modulePath = path.join(traditionalWebStackPath, module);
		processModule(modulePath);
	});

	console.log("\n✅ All modules processed!");
}

if (require.main === module) {
	main();
}

module.exports = { processModule, addLiveEditorToSection };
