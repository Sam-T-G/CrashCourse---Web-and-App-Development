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

// Function to add live editor to a .section div
function addLiveEditorToSectionDiv(htmlContent, sectionIndex, moduleType) {
	const sectionId = `section-${sectionIndex}`;

	// Check if live editor already exists
	if (htmlContent.includes(`id="${sectionId}-editor"`)) {
		return htmlContent;
	}

	// Find the section div and add live editor before its closing tag
	const sectionPattern = new RegExp(
		`(<div class="section"[^>]*>.*?</div>\\s*</div>)`,
		"gs"
	);
	const sections = htmlContent.match(sectionPattern);

	if (sections && sections[sectionIndex]) {
		const sectionHtml = sections[sectionIndex];
		const liveEditorHtml = liveEditorTemplate.replace(/SECTION_ID/g, sectionId);

		// Insert live editor before the closing div of the section
		const updatedSectionHtml = sectionHtml.replace(
			/(\s*<\/div>\s*<\/div>)$/,
			liveEditorHtml + "$1"
		);

		// Replace the original section with the updated one
		htmlContent = htmlContent.replace(sectionHtml, updatedSectionHtml);
	}

	return htmlContent;
}

// Function to process a module
function processModule(modulePath) {
	const indexPath = path.join(modulePath, "index.html");

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

	// Find all content-section divs
	const contentSectionMatches = htmlContent.match(
		/id="([^"]+)" class="content-section"/g
	);

	if (contentSectionMatches) {
		contentSectionMatches.forEach((match) => {
			const sectionId = match.match(/id="([^"]+)"/)[1];
			console.log(`  Adding live editor to content-section: ${sectionId}`);
			htmlContent = addLiveEditorToSection(htmlContent, sectionId, moduleType);
		});
	}

	// Find all .section divs (for CSS modules)
	const sectionMatches = htmlContent.match(/<div class="section"/g);

	if (sectionMatches) {
		console.log(`  Found ${sectionMatches.length} .section divs`);
		for (let i = 0; i < sectionMatches.length; i++) {
			console.log(`  Adding live editor to section ${i + 1}`);
			htmlContent = addLiveEditorToSectionDiv(htmlContent, i, moduleType);
		}
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

module.exports = {
	processModule,
	addLiveEditorToSection,
	addLiveEditorToSectionDiv,
};
