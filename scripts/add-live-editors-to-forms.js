#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

// Live editor template
const liveEditorTemplate = (sectionId) => `
            <!-- Live Code Editor -->
            <div class="live-editor-section">
                <h3>🎮 Live Code Editor - ${
									sectionId.charAt(0).toUpperCase() +
									sectionId.slice(1).replace("-", " ")
								}</h3>
                <div class="live-editor-container">
                    <div class="live-editor-header">
                        <div class="live-editor-title">
                            <div class="language-icon html">HTML</div>
                            <span>${sectionId}.html</span>
                        </div>
                        <div class="live-editor-actions">
                            <button class="live-editor-btn" onclick="copyCode('${sectionId}-editor')">Copy</button>
                            <button class="live-editor-btn primary" onclick="executeCode('${sectionId}-editor')">Run</button>
                            <button class="live-editor-btn success" onclick="resetCode('${sectionId}-editor')">Reset</button>
                        </div>
                    </div>
                    <div id="${sectionId}-editor" class="monaco-editor"></div>
                    <div class="live-editor-footer">
                        <div class="live-editor-stats">
                            <span id="${sectionId}-editor-lines">0 lines</span>
                            <span id="${sectionId}-editor-chars">0 characters</span>
                        </div>
                        <div class="live-editor-status">
                            <div class="status-indicator"></div>
                            <span>Live Editor Ready</span>
                        </div>
                    </div>
                </div>
                <div class="live-preview" id="${sectionId}-editor-preview">
                    <div class="live-preview-header">
                        <div class="live-preview-title">Live Preview</div>
                    </div>
                    <div id="${sectionId}-editor-preview-content">
                        <!-- Live preview content will be inserted here -->
                    </div>
                    <div class="error-display hidden" id="error-display-${sectionId}-editor">
                        <strong>Error:</strong> <span class="error-message"></span>
                    </div>
                </div>
            </div>`;

function addLiveEditorsToForms() {
	const modulePath = path.join(
		__dirname,
		"..",
		"traditional-web-stack",
		"11-html-forms"
	);
	const indexPath = path.join(modulePath, "index.html");

	console.log("🔧 Adding live editors to Forms module...");

	// Read the current HTML
	let htmlContent = fs.readFileSync(indexPath, "utf8");

	// Remove any existing live editor sections
	htmlContent = htmlContent.replace(
		/<!-- Live Code Editor -->[\s\S]*?<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>/g,
		""
	);

	// Add live editors to each section
	const sections = [
		{
			id: "overview",
			pattern:
				/(<div id="overview" class="content-section[^>]*>[\s\S]*?<\/div>\s*<\/div>)/,
		},
		{
			id: "input-types",
			pattern:
				/(<div id="input-types" class="content-section[^>]*>[\s\S]*?<\/div>\s*<\/div>)/,
		},
		{
			id: "form-elements",
			pattern:
				/(<div id="form-elements" class="content-section[^>]*>[\s\S]*?<\/div>\s*<\/div>)/,
		},
		{
			id: "validation",
			pattern:
				/(<div id="validation" class="content-section[^>]*>[\s\S]*?<\/div>\s*<\/div>)/,
		},
		{
			id: "interactive",
			pattern:
				/(<div id="interactive" class="content-section[^>]*>[\s\S]*?<\/div>\s*<\/div>)/,
		},
	];

	sections.forEach((section) => {
		console.log(`  Adding live editor to: ${section.id}`);

		const match = htmlContent.match(section.pattern);
		if (match) {
			const sectionContent = match[1];
			const liveEditorHtml = liveEditorTemplate(section.id);
			const newSectionContent = sectionContent.replace(
				/(<\/div>\s*<\/div>)$/,
				`${liveEditorHtml}$1`
			);
			htmlContent = htmlContent.replace(section.pattern, newSectionContent);
		}
	});

	// Write the updated HTML
	fs.writeFileSync(indexPath, htmlContent);
	console.log("✅ Live editors added to Forms module");

	// Verify
	const updatedHtml = fs.readFileSync(indexPath, "utf8");
	const editorCount = (updatedHtml.match(/class="monaco-editor"/g) || [])
		.length;
	console.log(`📊 Live editors added: ${editorCount}`);
}

// Run the script
if (require.main === module) {
	addLiveEditorsToForms();
}

module.exports = { addLiveEditorsToForms };
