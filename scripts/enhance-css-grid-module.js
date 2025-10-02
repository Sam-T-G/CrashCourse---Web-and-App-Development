#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

// Enhanced code examples for CSS Grid module
const cssGridExamples = {
	"grid-basics": `<!-- CSS Grid Basics Demo -->
<div class="grid-demo">
    <h2>CSS Grid Basics</h2>
    
    <div class="demo-section">
        <h3>Basic Grid Layout</h3>
        <div class="basic-grid">
            <div class="grid-item">1</div>
            <div class="grid-item">2</div>
            <div class="grid-item">3</div>
            <div class="grid-item">4</div>
            <div class="grid-item">5</div>
            <div class="grid-item">6</div>
        </div>
    </div>
    
    <div class="demo-section">
        <h3>Grid with Gaps</h3>
        <div class="grid-with-gaps">
            <div class="grid-item">1</div>
            <div class="grid-item">2</div>
            <div class="grid-item">3</div>
            <div class="grid-item">4</div>
            <div class="grid-item">5</div>
            <div class="grid-item">6</div>
        </div>
    </div>
    
    <div class="demo-section">
        <h3>Grid Template Columns</h3>
        <div class="grid-template-columns">
            <div class="grid-item">Auto</div>
            <div class="grid-item">1fr</div>
            <div class="grid-item">2fr</div>
            <div class="grid-item">100px</div>
        </div>
    </div>
    
    <div class="demo-section">
        <h3>Grid Template Rows</h3>
        <div class="grid-template-rows">
            <div class="grid-item">Row 1 (100px)</div>
            <div class="grid-item">Row 2 (200px)</div>
            <div class="grid-item">Row 3 (150px)</div>
        </div>
    </div>
    
    <div class="demo-section">
        <h3>Grid Item Positioning</h3>
        <div class="grid-positioning">
            <div class="grid-item item-1">Item 1</div>
            <div class="grid-item item-2">Item 2</div>
            <div class="grid-item item-3">Item 3</div>
            <div class="grid-item item-4">Item 4</div>
        </div>
    </div>
    
    <div class="demo-section">
        <h3>Grid Alignment</h3>
        <div class="grid-alignment">
            <div class="grid-item">Start</div>
            <div class="grid-item">Center</div>
            <div class="grid-item">End</div>
            <div class="grid-item">Stretch</div>
        </div>
    </div>
</div>

<style>
.grid-demo {
    max-width: 1000px;
    margin: 0 auto;
    padding: 2rem;
    font-family: Arial, sans-serif;
}

.demo-section {
    margin: 3rem 0;
    padding: 2rem;
    background: #f8fafc;
    border-radius: 12px;
}

.basic-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
    background: #e0f2fe;
    padding: 1rem;
    border-radius: 8px;
}

.grid-with-gaps {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem;
    background: #f0fdf4;
    padding: 1rem;
    border-radius: 8px;
}

.grid-template-columns {
    display: grid;
    grid-template-columns: auto 1fr 2fr 100px;
    gap: 1rem;
    background: #fef3c7;
    padding: 1rem;
    border-radius: 8px;
}

.grid-template-rows {
    display: grid;
    grid-template-rows: 100px 200px 150px;
    gap: 1rem;
    background: #fce7f3;
    padding: 1rem;
    border-radius: 8px;
}

.grid-positioning {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(3, 100px);
    gap: 1rem;
    background: #f3e8ff;
    padding: 1rem;
    border-radius: 8px;
}

.grid-alignment {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1rem;
    background: #ecfdf5;
    padding: 1rem;
    border-radius: 8px;
    height: 200px;
}

.grid-item {
    background: #3b82f6;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    border-radius: 8px;
    transition: all 0.3s ease;
}

.grid-item:hover {
    background: #1d4ed8;
    transform: scale(1.05);
}

/* Grid Item Positioning */
.item-1 {
    grid-column: 1 / 3;
    grid-row: 1 / 2;
    background: #ef4444;
}

.item-2 {
    grid-column: 3 / 5;
    grid-row: 1 / 3;
    background: #10b981;
}

.item-3 {
    grid-column: 1 / 2;
    grid-row: 2 / 4;
    background: #f59e0b;
}

.item-4 {
    grid-column: 2 / 4;
    grid-row: 3 / 4;
    background: #8b5cf6;
}

/* Grid Alignment */
.grid-alignment .grid-item:nth-child(1) {
    justify-self: start;
    align-self: start;
}

.grid-alignment .grid-item:nth-child(2) {
    justify-self: center;
    align-self: center;
}

.grid-alignment .grid-item:nth-child(3) {
    justify-self: end;
    align-self: end;
}

.grid-alignment .grid-item:nth-child(4) {
    justify-self: stretch;
    align-self: stretch;
}
</style>`,

	"grid-areas": `<!-- CSS Grid Areas Demo -->
<div class="grid-areas-demo">
    <h2>CSS Grid Areas</h2>
    
    <div class="demo-section">
        <h3>Named Grid Areas</h3>
        <div class="named-areas">
            <div class="grid-item header">Header</div>
            <div class="grid-item sidebar">Sidebar</div>
            <div class="grid-item main">Main Content</div>
            <div class="grid-item footer">Footer</div>
        </div>
    </div>
    
    <div class="demo-section">
        <h3>Complex Layout</h3>
        <div class="complex-layout">
            <div class="grid-item nav">Navigation</div>
            <div class="grid-item hero">Hero Section</div>
            <div class="grid-item content1">Content 1</div>
            <div class="grid-item content2">Content 2</div>
            <div class="grid-item content3">Content 3</div>
            <div class="grid-item sidebar-left">Left Sidebar</div>
            <div class="grid-item sidebar-right">Right Sidebar</div>
            <div class="grid-item footer-main">Footer</div>
        </div>
    </div>
    
    <div class="demo-section">
        <h3>Responsive Grid Areas</h3>
        <div class="responsive-areas">
            <div class="grid-item header-resp">Header</div>
            <div class="grid-item nav-resp">Navigation</div>
            <div class="grid-item main-resp">Main</div>
            <div class="grid-item aside-resp">Aside</div>
            <div class="grid-item footer-resp">Footer</div>
        </div>
    </div>
    
    <div class="demo-section">
        <h3>Grid Area Spanning</h3>
        <div class="area-spanning">
            <div class="grid-item span-full">Spans Full Width</div>
            <div class="grid-item span-half">Half Width</div>
            <div class="grid-item span-half">Half Width</div>
            <div class="grid-item span-quarter">Quarter</div>
            <div class="grid-item span-quarter">Quarter</div>
            <div class="grid-item span-quarter">Quarter</div>
            <div class="grid-item span-quarter">Quarter</div>
        </div>
    </div>
    
    <div class="demo-section">
        <h3>Grid Template Areas</h3>
        <div class="template-areas">
            <div class="grid-item area-a">Area A</div>
            <div class="grid-item area-b">Area B</div>
            <div class="grid-item area-c">Area C</div>
            <div class="grid-item area-d">Area D</div>
            <div class="grid-item area-e">Area E</div>
        </div>
    </div>
</div>

<style>
.grid-areas-demo {
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem;
    font-family: Arial, sans-serif;
}

.demo-section {
    margin: 3rem 0;
    padding: 2rem;
    background: #f8fafc;
    border-radius: 12px;
}

/* Named Grid Areas */
.named-areas {
    display: grid;
    grid-template-areas:
        "header header header"
        "sidebar main main"
        "footer footer footer";
    grid-template-columns: 200px 1fr 1fr;
    grid-template-rows: 80px 1fr 60px;
    gap: 1rem;
    height: 300px;
    background: #e0f2fe;
    padding: 1rem;
    border-radius: 8px;
}

.header { grid-area: header; background: #3b82f6; }
.sidebar { grid-area: sidebar; background: #10b981; }
.main { grid-area: main; background: #f59e0b; }
.footer { grid-area: footer; background: #ef4444; }

/* Complex Layout */
.complex-layout {
    display: grid;
    grid-template-areas:
        "nav nav nav nav"
        "hero hero hero hero"
        "sidebar-left content1 content2 sidebar-right"
        "sidebar-left content3 content3 sidebar-right"
        "footer-main footer-main footer-main footer-main";
    grid-template-columns: 150px 1fr 1fr 150px;
    grid-template-rows: 60px 200px 1fr 1fr 80px;
    gap: 1rem;
    height: 500px;
    background: #f0fdf4;
    padding: 1rem;
    border-radius: 8px;
}

.nav { grid-area: nav; background: #1e40af; }
.hero { grid-area: hero; background: #7c3aed; }
.content1 { grid-area: content1; background: #059669; }
.content2 { grid-area: content2; background: #dc2626; }
.content3 { grid-area: content3; background: #ea580c; }
.sidebar-left { grid-area: sidebar-left; background: #0891b2; }
.sidebar-right { grid-area: sidebar-right; background: #be185d; }
.footer-main { grid-area: footer-main; background: #374151; }

/* Responsive Grid Areas */
.responsive-areas {
    display: grid;
    grid-template-areas:
        "header header"
        "nav nav"
        "main aside"
        "footer footer";
    grid-template-columns: 2fr 1fr;
    grid-template-rows: 80px 60px 1fr 80px;
    gap: 1rem;
    height: 400px;
    background: #fef3c7;
    padding: 1rem;
    border-radius: 8px;
}

.header-resp { grid-area: header; background: #3b82f6; }
.nav-resp { grid-area: nav; background: #10b981; }
.main-resp { grid-area: main; background: #f59e0b; }
.aside-resp { grid-area: aside; background: #ef4444; }
.footer-resp { grid-area: footer; background: #8b5cf6; }

/* Grid Area Spanning */
.area-spanning {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(3, 100px);
    gap: 1rem;
    background: #fce7f3;
    padding: 1rem;
    border-radius: 8px;
}

.span-full {
    grid-column: 1 / -1;
    background: #3b82f6;
}

.span-half {
    grid-column: span 2;
    background: #10b981;
}

.span-quarter {
    grid-column: span 1;
    background: #f59e0b;
}

/* Grid Template Areas */
.template-areas {
    display: grid;
    grid-template-areas:
        "a a b"
        "a a c"
        "d e e";
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 100px 100px 100px;
    gap: 1rem;
    background: #f3e8ff;
    padding: 1rem;
    border-radius: 8px;
}

.area-a { grid-area: a; background: #3b82f6; }
.area-b { grid-area: b; background: #10b981; }
.area-c { grid-area: c; background: #f59e0b; }
.area-d { grid-area: d; background: #ef4444; }
.area-e { grid-area: e; background: #8b5cf6; }

.grid-item {
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    border-radius: 8px;
    transition: all 0.3s ease;
    text-align: center;
}

.grid-item:hover {
    transform: scale(1.02);
    box-shadow: 0 4px 15px rgba(0,0,0,0.2);
}

/* Responsive adjustments */
@media (max-width: 768px) {
    .responsive-areas {
        grid-template-areas:
            "header"
            "nav"
            "main"
            "aside"
            "footer";
        grid-template-columns: 1fr;
        grid-template-rows: 60px 50px 1fr 100px 60px;
    }
    
    .complex-layout {
        grid-template-areas:
            "nav"
            "hero"
            "content1"
            "content2"
            "content3"
            "sidebar-left"
            "sidebar-right"
            "footer-main";
        grid-template-columns: 1fr;
        grid-template-rows: repeat(8, auto);
    }
}
</style>`,
};

function enhanceCSSGridModule() {
	console.log(
		"🔧 Enhancing CSS Grid Module with Comprehensive Code Demos...\n"
	);

	const modulePath = path.join(
		__dirname,
		"..",
		"traditional-web-stack",
		"05-css-grid"
	);
	const scriptPath = path.join(modulePath, "script.js");

	console.log("  📝 Enhancing CSS Grid module...");

	// Read current script
	let scriptContent = fs.readFileSync(scriptPath, "utf8");

	// Find and replace the sectionCodeExamples object
	const examplesRegex = /const sectionCodeExamples = \{[\s\S]*?\};/;
	const newExamples = `const sectionCodeExamples = ${JSON.stringify(
		cssGridExamples,
		null,
		2
	)};`;

	if (examplesRegex.test(scriptContent)) {
		scriptContent = scriptContent.replace(examplesRegex, newExamples);
		fs.writeFileSync(scriptPath, scriptContent);
		console.log("    ✅ CSS Grid code examples updated");
	} else {
		console.log("    ❌ Could not find sectionCodeExamples in CSS Grid module");
	}

	console.log("🎉 CSS Grid module enhanced with comprehensive code demos!");
}

// Run the enhancement
if (require.main === module) {
	enhanceCSSGridModule();
}

module.exports = { enhanceCSSGridModule };
