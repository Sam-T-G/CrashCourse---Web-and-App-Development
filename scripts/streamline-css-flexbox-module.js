#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

// Streamlined code examples for CSS Flexbox module
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
            </div>
            <div class="direction-container column">
                <div class="flex-item">Column</div>
                <div class="flex-item">Column</div>
            </div>
        </div>
    </div>
    
    <div class="demo-section">
        <h3>Justify Content</h3>
        <div class="justify-showcase">
            <div class="justify-container start">
                <div class="flex-item">Start</div>
                <div class="flex-item">Start</div>
            </div>
            <div class="justify-container center">
                <div class="flex-item">Center</div>
                <div class="flex-item">Center</div>
            </div>
            <div class="justify-container between">
                <div class="flex-item">Between</div>
                <div class="flex-item">Between</div>
            </div>
        </div>
    </div>
    
    <div class="demo-section">
        <h3>Align Items</h3>
        <div class="align-showcase">
            <div class="align-container stretch">
                <div class="flex-item">Stretch</div>
                <div class="flex-item">Stretch</div>
            </div>
            <div class="align-container center">
                <div class="flex-item">Center</div>
                <div class="flex-item">Center</div>
            </div>
        </div>
    </div>
</div>

<style>
.flexbox-demo {
    max-width: 800px;
    margin: 0 auto;
    padding: 1.5rem;
    font-family: Arial, sans-serif;
}

.demo-section {
    margin: 2rem 0;
    padding: 1.5rem;
    background: #f8fafc;
    border-radius: 8px;
}

.basic-flex {
    display: flex;
    background: #e0f2fe;
    padding: 1rem;
    border-radius: 6px;
    gap: 0.5rem;
}

.direction-showcase {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
}

.direction-container {
    background: #f0fdf4;
    padding: 1rem;
    border-radius: 6px;
    min-height: 100px;
    display: flex;
}

.row { flex-direction: row; }
.column { flex-direction: column; }

.justify-showcase, .align-showcase {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1rem;
}

.justify-container, .align-container {
    background: #fef3c7;
    padding: 1rem;
    border-radius: 6px;
    min-height: 80px;
    display: flex;
}

.flex-item {
    background: #3b82f6;
    color: white;
    padding: 0.75rem 1rem;
    border-radius: 4px;
    font-weight: bold;
    text-align: center;
    transition: all 0.3s ease;
    min-width: 60px;
}

.flex-item:hover {
    background: #1d4ed8;
    transform: scale(1.05);
}

/* Justify Content */
.start { justify-content: flex-start; }
.center { justify-content: center; }
.between { justify-content: space-between; }

/* Align Items */
.stretch { align-items: stretch; }
</style>`,

	"flexbox-advanced": `<!-- CSS Flexbox Advanced Demo -->
<div class="flexbox-advanced-demo">
    <h2>CSS Flexbox Advanced Properties</h2>
    
    <div class="demo-section">
        <h3>Flex Grow & Shrink</h3>
        <div class="grow-shrink-showcase">
            <div class="flex-container">
                <div class="flex-item grow-1">Grow 1</div>
                <div class="flex-item grow-2">Grow 2</div>
                <div class="flex-item grow-1">Grow 1</div>
            </div>
            <div class="flex-container">
                <div class="flex-item shrink-0">No Shrink</div>
                <div class="flex-item shrink-1">Shrink 1</div>
                <div class="flex-item shrink-1">Shrink 1</div>
            </div>
        </div>
    </div>
    
    <div class="demo-section">
        <h3>Flex Basis</h3>
        <div class="basis-showcase">
            <div class="flex-container">
                <div class="flex-item basis-100">100px</div>
                <div class="flex-item basis-200">200px</div>
                <div class="flex-item basis-100">100px</div>
            </div>
        </div>
    </div>
    
    <div class="demo-section">
        <h3>Flex Shorthand</h3>
        <div class="shorthand-showcase">
            <div class="flex-container">
                <div class="flex-item flex-1">flex: 1</div>
                <div class="flex-item flex-2">flex: 2</div>
                <div class="flex-item flex-1">flex: 1</div>
            </div>
        </div>
    </div>
    
    <div class="demo-section">
        <h3>Real-World Example: Card Layout</h3>
        <div class="card-layout">
            <div class="card">
                <div class="card-header">Card Title</div>
                <div class="card-content">This is the card content that demonstrates flexbox in action.</div>
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
    </div>
</div>

<style>
.flexbox-advanced-demo {
    max-width: 800px;
    margin: 0 auto;
    padding: 1.5rem;
    font-family: Arial, sans-serif;
}

.demo-section {
    margin: 2rem 0;
    padding: 1.5rem;
    background: #f8fafc;
    border-radius: 8px;
}

.grow-shrink-showcase, .basis-showcase, .shorthand-showcase {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1rem;
}

.flex-container {
    background: #e0f2fe;
    padding: 1rem;
    border-radius: 6px;
    display: flex;
    gap: 0.5rem;
    min-height: 80px;
}

.flex-item {
    background: #3b82f6;
    color: white;
    padding: 0.75rem 1rem;
    border-radius: 4px;
    font-weight: bold;
    text-align: center;
    transition: all 0.3s ease;
    min-width: 60px;
}

.flex-item:hover {
    background: #1d4ed8;
    transform: scale(1.05);
}

/* Flex Grow */
.grow-1 { flex-grow: 1; }
.grow-2 { flex-grow: 2; }

/* Flex Shrink */
.shrink-0 { flex-shrink: 0; min-width: 120px; }
.shrink-1 { flex-shrink: 1; min-width: 120px; }

/* Flex Basis */
.basis-100 { flex-basis: 100px; }
.basis-200 { flex-basis: 200px; }

/* Flex Shorthand */
.flex-1 { flex: 1; }
.flex-2 { flex: 2; }

/* Real-World Example */
.card-layout {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
}

.card {
    background: white;
    border: 1px solid #e5e7eb;
    border-radius: 8px;
    padding: 1rem;
    flex: 1;
    min-width: 200px;
    display: flex;
    flex-direction: column;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.card-header {
    font-weight: bold;
    font-size: 1.1rem;
    margin-bottom: 0.5rem;
    color: #1f2937;
}

.card-content {
    flex: 1;
    color: #6b7280;
    line-height: 1.5;
    margin-bottom: 1rem;
}

.card-footer {
    display: flex;
    gap: 0.5rem;
    justify-content: flex-end;
}

.btn {
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 4px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s ease;
    font-size: 0.875rem;
}

.btn.secondary {
    background: #6b7280;
    color: white;
}

.btn:hover {
    transform: translateY(-1px);
    box-shadow: 0 2px 4px rgba(0,0,0,0.15);
}

.btn.secondary:hover {
    background: #4b5563;
}
</style>`
};

function streamlineCSSFlexboxModule() {
    console.log("🔧 Streamlining CSS Flexbox Module for Better Viewport Fit...\n");
    
    const modulePath = path.join(__dirname, "..", "traditional-web-stack", "04-css-flexbox");
    const scriptPath = path.join(modulePath, "script.js");
    
    console.log("  📝 Streamlining CSS Flexbox module...");
    
    // Read current script
    let scriptContent = fs.readFileSync(scriptPath, "utf8");
    
    // Find and replace the sectionCodeExamples object
    const examplesRegex = /const sectionCodeExamples = \{[\s\S]*?\};/;
    const newExamples = `const sectionCodeExamples = ${JSON.stringify(cssFlexboxExamples, null, 2)};`;
    
    if (examplesRegex.test(scriptContent)) {
        scriptContent = scriptContent.replace(examplesRegex, newExamples);
        fs.writeFileSync(scriptPath, scriptContent);
        console.log("    ✅ CSS Flexbox code examples streamlined");
    } else {
        console.log("    ❌ Could not find sectionCodeExamples in CSS Flexbox module");
    }
    
    console.log("🎉 CSS Flexbox module streamlined for better viewport fit!");
}

// Run the streamlining
if (require.main === module) {
    streamlineCSSFlexboxModule();
}

module.exports = { streamlineCSSFlexboxModule };
