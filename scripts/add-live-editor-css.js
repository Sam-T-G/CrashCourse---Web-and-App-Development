#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

// Live code editor CSS styles
const liveEditorCSS = `
/* Live Code Editor Styles */
.live-editor-container {
	background: #1e293b;
	border-radius: 12px;
	margin: 1rem 0;
	overflow: hidden;
	box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
	border: 2px solid #334155;
}

.live-editor-header {
	background: linear-gradient(135deg, #334155, #475569);
	padding: 0.75rem 1rem;
	display: flex;
	justify-content: space-between;
	align-items: center;
	border-bottom: 1px solid #475569;
}

.live-editor-title {
	color: #e2e8f0;
	font-size: 0.875rem;
	font-weight: 500;
	display: flex;
	align-items: center;
	gap: 0.5rem;
}

.language-icon {
	padding: 0.25rem 0.5rem;
	border-radius: 4px;
	font-size: 0.75rem;
	font-weight: 600;
	text-transform: uppercase;
}

.language-icon.html {
	background: #e34f26;
	color: white;
}

.language-icon.css {
	background: #1572b6;
	color: white;
}

.language-icon.javascript {
	background: #f7df1e;
	color: #000;
}

.live-editor-actions {
	display: flex;
	gap: 0.5rem;
}

.live-editor-btn {
	background: #475569;
	color: #e2e8f0;
	border: none;
	padding: 0.25rem 0.75rem;
	border-radius: 4px;
	font-size: 0.75rem;
	cursor: pointer;
	transition: all 0.2s ease;
	display: flex;
	align-items: center;
	gap: 0.25rem;
}

.live-editor-btn:hover {
	background: #64748b;
	transform: translateY(-1px);
}

.live-editor-btn.primary {
	background: #3b82f6;
	color: white;
}

.live-editor-btn.primary:hover {
	background: #2563eb;
}

.live-editor-btn.success {
	background: #10b981;
	color: white;
}

.live-editor-btn.success:hover {
	background: #059669;
}

.live-editor-footer {
	background: #334155;
	padding: 0.5rem 1rem;
	color: #94a3b8;
	font-size: 0.75rem;
	border-top: 1px solid #475569;
	display: flex;
	justify-content: space-between;
	align-items: center;
}

.live-editor-stats {
	display: flex;
	gap: 1rem;
}

.live-editor-status {
	display: flex;
	align-items: center;
	gap: 0.25rem;
}

.status-indicator {
	width: 8px;
	height: 8px;
	border-radius: 50%;
	background: #10b981;
	animation: pulse 2s infinite;
}

.status-indicator.error {
	background: #ef4444;
}

.status-indicator.warning {
	background: #f59e0b;
}

.status-indicator.info {
	background: #3b82f6;
}

@keyframes pulse {
	0%,
	100% {
		opacity: 1;
	}
	50% {
		opacity: 0.5;
	}
}

/* Monaco Editor Styles - Large Size */
.monaco-editor {
	height: 500px !important;
	border: none !important;
	font-family: "Monaco", "Menlo", "Ubuntu Mono", monospace !important;
	border-radius: 8px;
	overflow: hidden;
}

/* Live Preview Styles */
.live-preview {
	background: #f8fafc;
	border: 2px solid #e2e8f0;
	border-radius: 12px;
	margin: 1rem 0;
	overflow: hidden;
}

.live-preview-header {
	background: linear-gradient(135deg, #f1f5f9, #e2e8f0);
	padding: 0.75rem 1rem;
	border-bottom: 1px solid #cbd5e1;
}

.live-preview-title {
	color: #475569;
	font-size: 0.875rem;
	font-weight: 600;
}

.live-preview-content {
	padding: 1rem;
	min-height: 200px;
}

/* Error Display */
.error-display {
	background: #fef2f2;
	border: 1px solid #fecaca;
	color: #dc2626;
	padding: 0.75rem 1rem;
	margin: 1rem;
	border-radius: 8px;
	font-size: 0.875rem;
}

.error-display.hidden {
	display: none;
}

/* Live Editor Section */
.live-editor-section {
	margin: 2rem 0;
}

.live-editor-section h3 {
	color: #fbbf24;
	font-size: 1.5rem;
	margin-bottom: 1rem;
	text-align: center;
}

/* Demo Card Styles */
.demo-card {
	background: rgba(255, 255, 255, 0.05);
	border: 1px solid rgba(255, 255, 255, 0.1);
	border-radius: 12px;
	padding: 1.5rem;
	margin: 2rem 0;
}

.demo-title {
	color: #fbbf24;
	font-size: 1.2rem;
	font-weight: 600;
	margin-bottom: 1rem;
	text-align: center;
}

.section {
	margin: 3rem 0;
}

.section h2 {
	color: #f8fafc;
	font-size: 2rem;
	margin-bottom: 1rem;
	text-align: center;
}

.section p {
	color: #94a3b8;
	text-align: center;
	margin-bottom: 2rem;
}`;

// Function to add CSS to a module
function addLiveEditorCSS(modulePath) {
	const cssPath = path.join(modulePath, "styles.css");

	if (!fs.existsSync(cssPath)) {
		console.log(`No styles.css found in ${modulePath}`);
		return;
	}

	console.log(`Adding live editor CSS to ${path.basename(modulePath)}...`);

	// Read existing CSS
	let cssContent = fs.readFileSync(cssPath, "utf8");

	// Check if live editor CSS already exists
	if (cssContent.includes("/* Live Code Editor Styles */")) {
		console.log(
			`  Live editor CSS already exists in ${path.basename(modulePath)}`
		);
		return;
	}

	// Add the live editor CSS at the end
	cssContent += liveEditorCSS;

	// Write updated CSS
	fs.writeFileSync(cssPath, cssContent);
	console.log(`  Updated ${cssPath}`);
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

	console.log(`Found ${modules.length} modules to update:`);
	modules.forEach((module) => console.log(`  - ${module}`));
	console.log();

	modules.forEach((module) => {
		const modulePath = path.join(traditionalWebStackPath, module);
		addLiveEditorCSS(modulePath);
	});

	console.log("\n✅ All CSS files updated!");
}

if (require.main === module) {
	main();
}

module.exports = { addLiveEditorCSS };
