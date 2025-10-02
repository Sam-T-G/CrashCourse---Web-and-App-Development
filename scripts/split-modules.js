#!/usr/bin/env node

/**
 * Module Splitter Script
 * Automatically splits traditional web modules into separate HTML, CSS, and JavaScript files
 */

const fs = require("fs");
const path = require("path");

// Configuration
const TRADITIONAL_WEB_DIR = "./01-traditional-web";
const MODULES_TO_SPLIT = [
	"01-html-visual-basics",
	"02-css-styling-demo",
	"02b-padding-margins-centering",
	"02c-css-flexbox-deep-dive",
	"02d-css-grid-fundamentals",
	"02e-css-animations-transitions",
	"02f-css-variables-custom-properties",
	"03-javascript-interactions",
	"04-traditional-to-modern-bridge",
	"05-production-example",
];

/**
 * Extract CSS from HTML content
 */
function extractCSS(htmlContent) {
	const cssMatch = htmlContent.match(/<style[^>]*>([\s\S]*?)<\/style>/);
	if (cssMatch) {
		return cssMatch[1].trim();
	}
	return "";
}

/**
 * Extract JavaScript from HTML content
 */
function extractJavaScript(htmlContent) {
	const jsMatches = htmlContent.match(/<script[^>]*>([\s\S]*?)<\/script>/g);
	if (jsMatches) {
		return jsMatches
			.map((match) => {
				const content = match.match(/<script[^>]*>([\s\S]*?)<\/script>/);
				return content ? content[1].trim() : "";
			})
			.filter((content) => content && !content.includes("src="))
			.join("\n\n");
	}
	return "";
}

/**
 * Clean HTML content by removing embedded CSS and JS
 */
function cleanHTML(htmlContent) {
	// Remove embedded styles
	let cleaned = htmlContent.replace(/<style[^>]*>[\s\S]*?<\/style>/g, "");

	// Remove embedded scripts (but keep external script tags)
	cleaned = cleaned.replace(/<script[^>]*>[\s\S]*?<\/script>/g, (match) => {
		// Keep external script tags (those with src attribute)
		if (match.includes("src=")) {
			return match;
		}
		return "";
	});

	// Add link to external CSS file
	cleaned = cleaned.replace(
		/<head>/,
		'<head>\n    <link rel="stylesheet" href="styles.css">'
	);

	// Add script tag for external JS file
	cleaned = cleaned.replace(
		/<\/body>/,
		'    <script src="script.js"></script>\n</body>'
	);

	return cleaned;
}

/**
 * Split a single HTML file into separate files
 */
function splitModule(modulePath) {
	console.log(`\n🔄 Processing module: ${modulePath}`);

	const htmlFiles = fs
		.readdirSync(modulePath)
		.filter((file) => file.endsWith(".html") && file !== "index.html");

	for (const htmlFile of htmlFiles) {
		const filePath = path.join(modulePath, htmlFile);
		const baseName = path.basename(htmlFile, ".html");

		console.log(`  📄 Processing: ${htmlFile}`);

		try {
			// Read the original HTML file
			const htmlContent = fs.readFileSync(filePath, "utf8");

			// Extract CSS and JavaScript
			const cssContent = extractCSS(htmlContent);
			const jsContent = extractJavaScript(htmlContent);

			// Create directory for this specific demo
			const demoDir = path.join(modulePath, baseName);
			if (!fs.existsSync(demoDir)) {
				fs.mkdirSync(demoDir, { recursive: true });
			}

			// Write CSS file
			if (cssContent) {
				const cssPath = path.join(demoDir, "styles.css");
				fs.writeFileSync(cssPath, cssContent);
				console.log(`    ✅ Created: ${path.relative(process.cwd(), cssPath)}`);
			}

			// Write JavaScript file
			if (jsContent) {
				const jsPath = path.join(demoDir, "script.js");
				fs.writeFileSync(jsPath, jsContent);
				console.log(`    ✅ Created: ${path.relative(process.cwd(), jsPath)}`);
			}

			// Write cleaned HTML file
			const cleanedHTML = cleanHTML(htmlContent);
			const htmlPath = path.join(demoDir, "index.html");
			fs.writeFileSync(htmlPath, cleanedHTML);
			console.log(`    ✅ Created: ${path.relative(process.cwd(), htmlPath)}`);

			// Create a README for the demo
			const readmeContent = `# ${baseName
				.replace(/-/g, " ")
				.replace(/\b\w/g, (l) => l.toUpperCase())}

This demo has been split into separate files for better organization:

- \`index.html\` - Main HTML structure
- \`styles.css\` - All CSS styles and variables
- \`script.js\` - All JavaScript functionality

## How to Run

1. Open \`index.html\` in a web browser
2. Or serve with a local server: \`python3 -m http.server 8000\`

## File Structure

\`\`\`
${baseName}/
├── index.html      # Main HTML file
├── styles.css      # CSS styles and variables
├── script.js       # JavaScript functionality
└── README.md       # This file
\`\`\`
`;

			const readmePath = path.join(demoDir, "README.md");
			fs.writeFileSync(readmePath, readmeContent);
			console.log(
				`    ✅ Created: ${path.relative(process.cwd(), readmePath)}`
			);
		} catch (error) {
			console.error(`    ❌ Error processing ${htmlFile}:`, error.message);
		}
	}
}

/**
 * Main function to split all modules
 */
function main() {
	console.log("🚀 Starting module splitting process...\n");

	// Check if traditional web directory exists
	if (!fs.existsSync(TRADITIONAL_WEB_DIR)) {
		console.error(`❌ Directory ${TRADITIONAL_WEB_DIR} not found!`);
		process.exit(1);
	}

	let processedCount = 0;
	let totalFiles = 0;

	// Process each module
	for (const moduleName of MODULES_TO_SPLIT) {
		const modulePath = path.join(TRADITIONAL_WEB_DIR, moduleName);

		if (fs.existsSync(modulePath)) {
			const htmlFiles = fs
				.readdirSync(modulePath)
				.filter((file) => file.endsWith(".html") && file !== "index.html");

			if (htmlFiles.length > 0) {
				totalFiles += htmlFiles.length;
				splitModule(modulePath);
				processedCount++;
			} else {
				console.log(`⏭️  Skipping ${moduleName} - no HTML files to split`);
			}
		} else {
			console.log(`⏭️  Skipping ${moduleName} - directory not found`);
		}
	}

	console.log(`\n🎉 Module splitting complete!`);
	console.log(
		`📊 Processed ${processedCount} modules with ${totalFiles} HTML files`
	);
	console.log(`\n📁 Each demo now has its own directory with separate files:`);
	console.log(`   - index.html (main HTML structure)`);
	console.log(`   - styles.css (CSS styles and variables)`);
	console.log(`   - script.js (JavaScript functionality)`);
	console.log(`   - README.md (documentation)`);
}

// Run the script
if (require.main === module) {
	main();
}

module.exports = { splitModule, extractCSS, extractJavaScript, cleanHTML };
