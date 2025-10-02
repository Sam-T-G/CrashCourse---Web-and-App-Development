#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

// Enhanced code examples for CSS Flexbox module
const cssFlexboxExamples = {
	"flexbox-basics": `<!-- CSS Flexbox Basics Demo -->
<div class="flexbox-demo">
    <h2>CSS Flexbox Basics</h2>
    
    <div class="demo-section">
        <h3>Basic Flex Container</h3>
        <div class="basic-flex">
            <div class="flex-item">Item 1</div>
            <div class="flex-item">Item 2</div>
            <div class="flex-item">Item 3</div>
        </div>
    </div>
    
    <div class="demo-section">
        <h3>Flex Direction</h3>
        <div class="direction-showcase">
            <div class="direction-container row">
                <div class="flex-item">Row</div>
                <div class="flex-item">Row</div>
                <div class="flex-item">Row</div>
            </div>
            <div class="direction-container row-reverse">
                <div class="flex-item">Row Reverse</div>
                <div class="flex-item">Row Reverse</div>
                <div class="flex-item">Row Reverse</div>
            </div>
            <div class="direction-container column">
                <div class="flex-item">Column</div>
                <div class="flex-item">Column</div>
                <div class="flex-item">Column</div>
            </div>
            <div class="direction-container column-reverse">
                <div class="flex-item">Column Reverse</div>
                <div class="flex-item">Column Reverse</div>
                <div class="flex-item">Column Reverse</div>
            </div>
        </div>
    </div>
    
    <div class="demo-section">
        <h3>Justify Content</h3>
        <div class="justify-showcase">
            <div class="justify-container start">
                <div class="flex-item">Start</div>
                <div class="flex-item">Start</div>
                <div class="flex-item">Start</div>
            </div>
            <div class="justify-container center">
                <div class="flex-item">Center</div>
                <div class="flex-item">Center</div>
                <div class="flex-item">Center</div>
            </div>
            <div class="justify-container end">
                <div class="flex-item">End</div>
                <div class="flex-item">End</div>
                <div class="flex-item">End</div>
            </div>
            <div class="justify-container between">
                <div class="flex-item">Between</div>
                <div class="flex-item">Between</div>
                <div class="flex-item">Between</div>
            </div>
            <div class="justify-container around">
                <div class="flex-item">Around</div>
                <div class="flex-item">Around</div>
                <div class="flex-item">Around</div>
            </div>
            <div class="justify-container evenly">
                <div class="flex-item">Evenly</div>
                <div class="flex-item">Evenly</div>
                <div class="flex-item">Evenly</div>
            </div>
        </div>
    </div>
    
    <div class="demo-section">
        <h3>Align Items</h3>
        <div class="align-showcase">
            <div class="align-container stretch">
                <div class="flex-item">Stretch</div>
                <div class="flex-item">Stretch</div>
                <div class="flex-item">Stretch</div>
            </div>
            <div class="align-container flex-start">
                <div class="flex-item">Flex Start</div>
                <div class="flex-item">Flex Start</div>
                <div class="flex-item">Flex Start</div>
            </div>
            <div class="align-container center">
                <div class="flex-item">Center</div>
                <div class="flex-item">Center</div>
                <div class="flex-item">Center</div>
            </div>
            <div class="align-container flex-end">
                <div class="flex-item">Flex End</div>
                <div class="flex-item">Flex End</div>
                <div class="flex-item">Flex End</div>
            </div>
            <div class="align-container baseline">
                <div class="flex-item">Baseline</div>
                <div class="flex-item large-text">Baseline</div>
                <div class="flex-item">Baseline</div>
            </div>
        </div>
    </div>
    
    <div class="demo-section">
        <h3>Flex Wrap</h3>
        <div class="wrap-showcase">
            <div class="wrap-container nowrap">
                <div class="flex-item">No Wrap</div>
                <div class="flex-item">No Wrap</div>
                <div class="flex-item">No Wrap</div>
                <div class="flex-item">No Wrap</div>
                <div class="flex-item">No Wrap</div>
            </div>
            <div class="wrap-container wrap">
                <div class="flex-item">Wrap</div>
                <div class="flex-item">Wrap</div>
                <div class="flex-item">Wrap</div>
                <div class="flex-item">Wrap</div>
                <div class="flex-item">Wrap</div>
            </div>
            <div class="wrap-container wrap-reverse">
                <div class="flex-item">Wrap Reverse</div>
                <div class="flex-item">Wrap Reverse</div>
                <div class="flex-item">Wrap Reverse</div>
                <div class="flex-item">Wrap Reverse</div>
                <div class="flex-item">Wrap Reverse</div>
            </div>
        </div>
    </div>
    
    <div class="demo-section">
        <h3>Gap Property</h3>
        <div class="gap-showcase">
            <div class="gap-container small-gap">
                <div class="flex-item">Small Gap</div>
                <div class="flex-item">Small Gap</div>
                <div class="flex-item">Small Gap</div>
            </div>
            <div class="gap-container medium-gap">
                <div class="flex-item">Medium Gap</div>
                <div class="flex-item">Medium Gap</div>
                <div class="flex-item">Medium Gap</div>
            </div>
            <div class="gap-container large-gap">
                <div class="flex-item">Large Gap</div>
                <div class="flex-item">Large Gap</div>
                <div class="flex-item">Large Gap</div>
            </div>
        </div>
    </div>
</div>

<style>
.flexbox-demo {
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

.basic-flex {
    display: flex;
    background: #e0f2fe;
    padding: 1.5rem;
    border-radius: 8px;
    gap: 1rem;
}

.direction-showcase {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1.5rem;
}

.direction-container {
    background: #f0fdf4;
    padding: 1.5rem;
    border-radius: 8px;
    min-height: 150px;
    display: flex;
}

.row { flex-direction: row; }
.row-reverse { flex-direction: row-reverse; }
.column { flex-direction: column; }
.column-reverse { flex-direction: column-reverse; }

.justify-showcase, .align-showcase {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1rem;
}

.justify-container, .align-container {
    background: #fef3c7;
    padding: 1.5rem;
    border-radius: 8px;
    min-height: 120px;
    display: flex;
}

.wrap-showcase {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1.5rem;
}

.wrap-container {
    background: #fce7f3;
    padding: 1.5rem;
    border-radius: 8px;
    display: flex;
    gap: 0.5rem;
    max-width: 400px;
}

.gap-showcase {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1.5rem;
}

.gap-container {
    background: #f3e8ff;
    padding: 1.5rem;
    border-radius: 8px;
    display: flex;
}

.flex-item {
    background: #3b82f6;
    color: white;
    padding: 1rem 1.5rem;
    border-radius: 8px;
    font-weight: bold;
    text-align: center;
    transition: all 0.3s ease;
    min-width: 80px;
}

.flex-item:hover {
    background: #1d4ed8;
    transform: scale(1.05);
    box-shadow: 0 4px 15px rgba(0,0,0,0.2);
}

.large-text {
    font-size: 1.2rem;
    padding: 1.5rem;
}

/* Justify Content */
.start { justify-content: flex-start; }
.center { justify-content: center; }
.end { justify-content: flex-end; }
.between { justify-content: space-between; }
.around { justify-content: space-around; }
.evenly { justify-content: space-evenly; }

/* Align Items */
.stretch { align-items: stretch; }
.flex-start { align-items: flex-start; }
.flex-end { align-items: flex-end; }
.baseline { align-items: baseline; }

/* Flex Wrap */
.nowrap { flex-wrap: nowrap; }
.wrap { flex-wrap: wrap; }
.wrap-reverse { flex-wrap: wrap-reverse; }

/* Gap */
.small-gap { gap: 0.5rem; }
.medium-gap { gap: 1.5rem; }
.large-gap { gap: 3rem; }
</style>`,

	"flexbox-advanced": `<!-- CSS Flexbox Advanced Demo -->
<div class="flexbox-advanced-demo">
    <h2>CSS Flexbox Advanced Properties</h2>
    
    <div class="demo-section">
        <h3>Flex Grow</h3>
        <div class="grow-showcase">
            <div class="grow-container">
                <div class="flex-item grow-0">Grow 0</div>
                <div class="flex-item grow-1">Grow 1</div>
                <div class="flex-item grow-2">Grow 2</div>
                <div class="flex-item grow-3">Grow 3</div>
            </div>
            <div class="grow-container">
                <div class="flex-item grow-1">Grow 1</div>
                <div class="flex-item grow-1">Grow 1</div>
                <div class="flex-item grow-2">Grow 2</div>
            </div>
        </div>
    </div>
    
    <div class="demo-section">
        <h3>Flex Shrink</h3>
        <div class="shrink-showcase">
            <div class="shrink-container">
                <div class="flex-item shrink-0">No Shrink</div>
                <div class="flex-item shrink-1">Shrink 1</div>
                <div class="flex-item shrink-2">Shrink 2</div>
                <div class="flex-item shrink-3">Shrink 3</div>
            </div>
        </div>
    </div>
    
    <div class="demo-section">
        <h3>Flex Basis</h3>
        <div class="basis-showcase">
            <div class="basis-container">
                <div class="flex-item basis-auto">Auto</div>
                <div class="flex-item basis-100">100px</div>
                <div class="flex-item basis-200">200px</div>
                <div class="flex-item basis-300">300px</div>
            </div>
            <div class="basis-container">
                <div class="flex-item basis-25">25%</div>
                <div class="flex-item basis-50">50%</div>
                <div class="flex-item basis-25">25%</div>
            </div>
        </div>
    </div>
    
    <div class="demo-section">
        <h3>Flex Shorthand</h3>
        <div class="shorthand-showcase">
            <div class="shorthand-container">
                <div class="flex-item flex-0">flex: 0</div>
                <div class="flex-item flex-1">flex: 1</div>
                <div class="flex-item flex-2">flex: 2</div>
            </div>
            <div class="shorthand-container">
                <div class="flex-item flex-0-1-200">flex: 0 1 200px</div>
                <div class="flex-item flex-1-1-200">flex: 1 1 200px</div>
                <div class="flex-item flex-2-1-200">flex: 2 1 200px</div>
            </div>
        </div>
    </div>
    
    <div class="demo-section">
        <h3>Align Self</h3>
        <div class="align-self-showcase">
            <div class="align-self-container">
                <div class="flex-item align-self-start">Align Start</div>
                <div class="flex-item align-self-center">Align Center</div>
                <div class="flex-item align-self-end">Align End</div>
                <div class="flex-item align-self-stretch">Align Stretch</div>
                <div class="flex-item align-self-baseline">Align Baseline</div>
            </div>
        </div>
    </div>
    
    <div class="demo-section">
        <h3>Order Property</h3>
        <div class="order-showcase">
            <div class="order-container">
                <div class="flex-item order-1">Order 1</div>
                <div class="flex-item order-3">Order 3</div>
                <div class="flex-item order-2">Order 2</div>
                <div class="flex-item order-4">Order 4</div>
            </div>
            <div class="order-container">
                <div class="flex-item order-4">Order 4</div>
                <div class="flex-item order-1">Order 1</div>
                <div class="flex-item order-3">Order 3</div>
                <div class="flex-item order-2">Order 2</div>
            </div>
        </div>
    </div>
    
    <div class="demo-section">
        <h3>Real-World Layout Examples</h3>
        <div class="layout-examples">
            <div class="card-layout">
                <div class="card">
                    <div class="card-header">Card Header</div>
                    <div class="card-content">This is the card content that can be quite long and will wrap nicely.</div>
                    <div class="card-footer">
                        <button class="btn">Action</button>
                        <button class="btn secondary">Cancel</button>
                    </div>
                </div>
                <div class="card">
                    <div class="card-header">Another Card</div>
                    <div class="card-content">Short content</div>
                    <div class="card-footer">
                        <button class="btn">Action</button>
                        <button class="btn secondary">Cancel</button>
                    </div>
                </div>
            </div>
            
            <div class="navbar-layout">
                <div class="navbar">
                    <div class="navbar-brand">Brand</div>
                    <div class="navbar-nav">
                        <a href="#" class="nav-link">Home</a>
                        <a href="#" class="nav-link">About</a>
                        <a href="#" class="nav-link">Services</a>
                        <a href="#" class="nav-link">Contact</a>
                    </div>
                    <div class="navbar-actions">
                        <button class="btn">Login</button>
                        <button class="btn primary">Sign Up</button>
                    </div>
                </div>
            </div>
            
            <div class="media-layout">
                <div class="media">
                    <div class="media-object">
                        <div class="avatar">A</div>
                    </div>
                    <div class="media-content">
                        <h4>Media Title</h4>
                        <p>This is the media content that can be quite long and will demonstrate how flexbox handles content of different lengths.</p>
                    </div>
                    <div class="media-actions">
                        <button class="btn small">Like</button>
                        <button class="btn small">Share</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<style>
.flexbox-advanced-demo {
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

.grow-showcase, .shrink-showcase, .basis-showcase, .shorthand-showcase, .order-showcase {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1.5rem;
}

.grow-container, .shrink-container, .basis-container, .shorthand-container, .order-container {
    background: #e0f2fe;
    padding: 1.5rem;
    border-radius: 8px;
    display: flex;
    gap: 1rem;
    min-height: 100px;
}

.align-self-showcase {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1.5rem;
}

.align-self-container {
    background: #f0fdf4;
    padding: 1.5rem;
    border-radius: 8px;
    display: flex;
    gap: 1rem;
    min-height: 150px;
    align-items: stretch;
}

.flex-item {
    background: #3b82f6;
    color: white;
    padding: 1rem 1.5rem;
    border-radius: 8px;
    font-weight: bold;
    text-align: center;
    transition: all 0.3s ease;
    min-width: 80px;
}

.flex-item:hover {
    background: #1d4ed8;
    transform: scale(1.05);
    box-shadow: 0 4px 15px rgba(0,0,0,0.2);
}

/* Flex Grow */
.grow-0 { flex-grow: 0; }
.grow-1 { flex-grow: 1; }
.grow-2 { flex-grow: 2; }
.grow-3 { flex-grow: 3; }

/* Flex Shrink */
.shrink-0 { flex-shrink: 0; min-width: 150px; }
.shrink-1 { flex-shrink: 1; min-width: 150px; }
.shrink-2 { flex-shrink: 2; min-width: 150px; }
.shrink-3 { flex-shrink: 3; min-width: 150px; }

/* Flex Basis */
.basis-auto { flex-basis: auto; }
.basis-100 { flex-basis: 100px; }
.basis-200 { flex-basis: 200px; }
.basis-300 { flex-basis: 300px; }
.basis-25 { flex-basis: 25%; }
.basis-50 { flex-basis: 50%; }

/* Flex Shorthand */
.flex-0 { flex: 0; }
.flex-1 { flex: 1; }
.flex-2 { flex: 2; }
.flex-0-1-200 { flex: 0 1 200px; }
.flex-1-1-200 { flex: 1 1 200px; }
.flex-2-1-200 { flex: 2 1 200px; }

/* Align Self */
.align-self-start { align-self: flex-start; }
.align-self-center { align-self: center; }
.align-self-end { align-self: flex-end; }
.align-self-stretch { align-self: stretch; }
.align-self-baseline { align-self: baseline; }

/* Order */
.order-1 { order: 1; }
.order-2 { order: 2; }
.order-3 { order: 3; }
.order-4 { order: 4; }

/* Real-World Layout Examples */
.layout-examples {
    display: grid;
    grid-template-columns: 1fr;
    gap: 2rem;
}

.card-layout {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
}

.card {
    background: white;
    border: 1px solid #e5e7eb;
    border-radius: 12px;
    padding: 1.5rem;
    flex: 1;
    min-width: 250px;
    display: flex;
    flex-direction: column;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.card-header {
    font-weight: bold;
    font-size: 1.2rem;
    margin-bottom: 1rem;
    color: #1f2937;
}

.card-content {
    flex: 1;
    color: #6b7280;
    line-height: 1.6;
    margin-bottom: 1rem;
}

.card-footer {
    display: flex;
    gap: 0.5rem;
    justify-content: flex-end;
}

.navbar-layout {
    background: white;
    border: 1px solid #e5e7eb;
    border-radius: 12px;
    padding: 1rem;
}

.navbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 2rem;
}

.navbar-brand {
    font-weight: bold;
    font-size: 1.5rem;
    color: #3b82f6;
}

.navbar-nav {
    display: flex;
    gap: 1.5rem;
    flex: 1;
    justify-content: center;
}

.nav-link {
    color: #6b7280;
    text-decoration: none;
    padding: 0.5rem 1rem;
    border-radius: 6px;
    transition: all 0.3s ease;
}

.nav-link:hover {
    background: #f3f4f6;
    color: #3b82f6;
}

.navbar-actions {
    display: flex;
    gap: 0.5rem;
}

.media-layout {
    background: white;
    border: 1px solid #e5e7eb;
    border-radius: 12px;
    padding: 1.5rem;
}

.media {
    display: flex;
    align-items: flex-start;
    gap: 1rem;
}

.media-object {
    flex-shrink: 0;
}

.avatar {
    width: 50px;
    height: 50px;
    background: #3b82f6;
    color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    font-size: 1.2rem;
}

.media-content {
    flex: 1;
}

.media-content h4 {
    margin: 0 0 0.5rem 0;
    color: #1f2937;
}

.media-content p {
    margin: 0;
    color: #6b7280;
    line-height: 1.6;
}

.media-actions {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    flex-shrink: 0;
}

.btn {
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 6px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s ease;
}

.btn.small {
    padding: 0.25rem 0.75rem;
    font-size: 0.875rem;
}

.btn.primary {
    background: #3b82f6;
    color: white;
}

.btn.secondary {
    background: #6b7280;
    color: white;
}

.btn:hover {
    transform: translateY(-1px);
    box-shadow: 0 2px 8px rgba(0,0,0,0.15);
}

.btn.primary:hover {
    background: #2563eb;
}

.btn.secondary:hover {
    background: #4b5563;
}
</style>`,
};

function enhanceCSSFlexboxModule() {
	console.log(
		"🔧 Enhancing CSS Flexbox Module with Comprehensive Code Demos...\n"
	);

	const modulePath = path.join(
		__dirname,
		"..",
		"traditional-web-stack",
		"04-css-flexbox"
	);
	const scriptPath = path.join(modulePath, "script.js");

	console.log("  📝 Enhancing CSS Flexbox module...");

	// Read current script
	let scriptContent = fs.readFileSync(scriptPath, "utf8");

	// Find and replace the sectionCodeExamples object
	const examplesRegex = /const sectionCodeExamples = \{[\s\S]*?\};/;
	const newExamples = `const sectionCodeExamples = ${JSON.stringify(
		cssFlexboxExamples,
		null,
		2
	)};`;

	if (examplesRegex.test(scriptContent)) {
		scriptContent = scriptContent.replace(examplesRegex, newExamples);
		fs.writeFileSync(scriptPath, scriptContent);
		console.log("    ✅ CSS Flexbox code examples updated");
	} else {
		console.log(
			"    ❌ Could not find sectionCodeExamples in CSS Flexbox module"
		);
	}

	console.log("🎉 CSS Flexbox module enhanced with comprehensive code demos!");
}

// Run the enhancement
if (require.main === module) {
	enhanceCSSFlexboxModule();
}

module.exports = { enhanceCSSFlexboxModule };
