#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

// Enhanced code examples for CSS Styling module
const cssStylingExamples = {
	"color-palette": `<!-- CSS Color Properties Demo -->
<div class="color-demo">
    <h2>Color Properties in Action</h2>
    
    <div class="color-grid">
        <div class="color-box primary">Primary Color</div>
        <div class="color-box secondary">Secondary Color</div>
        <div class="color-box accent">Accent Color</div>
        <div class="color-box success">Success Color</div>
        <div class="color-box warning">Warning Color</div>
        <div class="color-box danger">Danger Color</div>
    </div>
    
    <div class="text-examples">
        <p class="text-primary">This is primary text color</p>
        <p class="text-secondary">This is secondary text color</p>
        <p class="text-muted">This is muted text color</p>
    </div>
    
    <div class="border-examples">
        <div class="border-demo solid">Solid Border</div>
        <div class="border-demo dashed">Dashed Border</div>
        <div class="border-demo dotted">Dotted Border</div>
    </div>
</div>

<style>
.color-demo {
    max-width: 800px;
    margin: 0 auto;
    padding: 2rem;
    font-family: Arial, sans-serif;
}

.color-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 1rem;
    margin: 2rem 0;
}

.color-box {
    padding: 1.5rem;
    border-radius: 12px;
    text-align: center;
    font-weight: bold;
    color: white;
    transition: all 0.3s ease;
    cursor: pointer;
}

.color-box:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(0,0,0,0.2);
}

.primary { background: #3b82f6; }
.secondary { background: #6b7280; }
.accent { background: #8b5cf6; }
.success { background: #10b981; }
.warning { background: #f59e0b; }
.danger { background: #ef4444; }

.text-examples {
    margin: 2rem 0;
    padding: 1.5rem;
    background: #f8fafc;
    border-radius: 12px;
}

.text-primary { color: #3b82f6; font-weight: 600; }
.text-secondary { color: #6b7280; font-weight: 500; }
.text-muted { color: #9ca3af; font-style: italic; }

.border-examples {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
    margin: 2rem 0;
}

.border-demo {
    padding: 1rem;
    border-radius: 8px;
    text-align: center;
    font-weight: 500;
    background: white;
}

.solid { border: 3px solid #3b82f6; }
.dashed { border: 3px dashed #10b981; }
.dotted { border: 3px dotted #f59e0b; }
</style>`,

	typography: `<!-- CSS Typography Demo -->
<div class="typography-demo">
    <h1>Typography Fundamentals</h1>
    
    <section class="heading-hierarchy">
        <h1>Heading 1 - Main Title</h1>
        <h2>Heading 2 - Section Title</h2>
        <h3>Heading 3 - Subsection</h3>
        <h4>Heading 4 - Minor Heading</h4>
        <h5>Heading 5 - Small Heading</h5>
        <h6>Heading 6 - Smallest Heading</h6>
    </section>
    
    <section class="text-styles">
        <p class="lead">This is a lead paragraph that stands out from regular text.</p>
        <p>This is a regular paragraph with <strong>bold text</strong>, <em>italic text</em>, and <u>underlined text</u>.</p>
        <p>You can also use <code>inline code</code>, <mark>highlighted text</mark>, and <small>small text</small>.</p>
    </section>
    
    <section class="font-families">
        <div class="font-serif">
            <h3>Serif Font (Georgia)</h3>
            <p>The quick brown fox jumps over the lazy dog.</p>
        </div>
        <div class="font-sans">
            <h3>Sans-serif Font (Arial)</h3>
            <p>The quick brown fox jumps over the lazy dog.</p>
        </div>
        <div class="font-mono">
            <h3>Monospace Font (Courier)</h3>
            <p>The quick brown fox jumps over the lazy dog.</p>
        </div>
    </section>
    
    <section class="text-effects">
        <h3>Text Effects</h3>
        <p class="text-shadow">Text with shadow effect</p>
        <p class="text-gradient">Gradient text effect</p>
        <p class="text-outline">Text with outline</p>
    </section>
</div>

<style>
.typography-demo {
    max-width: 800px;
    margin: 0 auto;
    padding: 2rem;
    font-family: Arial, sans-serif;
    line-height: 1.6;
}

.heading-hierarchy {
    margin: 2rem 0;
    padding: 1.5rem;
    background: #f8fafc;
    border-radius: 12px;
}

.heading-hierarchy h1 { color: #1e293b; font-size: 2.5rem; margin-bottom: 1rem; }
.heading-hierarchy h2 { color: #374151; font-size: 2rem; margin-bottom: 0.75rem; }
.heading-hierarchy h3 { color: #4b5563; font-size: 1.5rem; margin-bottom: 0.5rem; }
.heading-hierarchy h4 { color: #6b7280; font-size: 1.25rem; margin-bottom: 0.5rem; }
.heading-hierarchy h5 { color: #9ca3af; font-size: 1.125rem; margin-bottom: 0.5rem; }
.heading-hierarchy h6 { color: #d1d5db; font-size: 1rem; margin-bottom: 0.5rem; }

.text-styles {
    margin: 2rem 0;
    padding: 1.5rem;
    background: #f0f9ff;
    border-radius: 12px;
}

.lead {
    font-size: 1.25rem;
    font-weight: 300;
    color: #1e40af;
    margin-bottom: 1rem;
}

code {
    background: #e5e7eb;
    padding: 0.25rem 0.5rem;
    border-radius: 4px;
    font-family: 'Courier New', monospace;
}

mark {
    background: #fef08a;
    padding: 0.25rem;
    border-radius: 4px;
}

.font-families {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.5rem;
    margin: 2rem 0;
}

.font-serif { font-family: Georgia, serif; }
.font-sans { font-family: Arial, sans-serif; }
.font-mono { font-family: 'Courier New', monospace; }

.text-effects {
    margin: 2rem 0;
    padding: 1.5rem;
    background: #fef3c7;
    border-radius: 12px;
}

.text-shadow {
    font-size: 2rem;
    font-weight: bold;
    text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
    color: #1e293b;
}

.text-gradient {
    font-size: 2rem;
    font-weight: bold;
    background: linear-gradient(45deg, #3b82f6, #8b5cf6);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
}

.text-outline {
    font-size: 2rem;
    font-weight: bold;
    color: white;
    text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000;
}
</style>`,

	backgrounds: `<!-- CSS Background Properties Demo -->
<div class="background-demo">
    <h2>Background Properties Showcase</h2>
    
    <div class="background-grid">
        <div class="bg-solid">
            <h3>Solid Color</h3>
            <p>background-color: #3b82f6</p>
        </div>
        
        <div class="bg-gradient">
            <h3>Linear Gradient</h3>
            <p>linear-gradient(45deg, #667eea, #764ba2)</p>
        </div>
        
        <div class="bg-radial">
            <h3>Radial Gradient</h3>
            <p>radial-gradient(circle, #f59e0b, #ef4444)</p>
        </div>
        
        <div class="bg-pattern">
            <h3>Pattern Background</h3>
            <p>repeating-linear-gradient pattern</p>
        </div>
        
        <div class="bg-image">
            <h3>Background Image</h3>
            <p>SVG pattern background</p>
        </div>
        
        <div class="bg-multiple">
            <h3>Multiple Backgrounds</h3>
            <p>Gradient + Pattern overlay</p>
        </div>
    </div>
    
    <div class="background-properties">
        <h3>Background Properties</h3>
        <div class="bg-size-demo">
            <div class="bg-cover">background-size: cover</div>
            <div class="bg-contain">background-size: contain</div>
            <div class="bg-custom">background-size: 50px 50px</div>
        </div>
        
        <div class="bg-position-demo">
            <div class="bg-top-left">top left</div>
            <div class="bg-center">center</div>
            <div class="bg-bottom-right">bottom right</div>
        </div>
    </div>
</div>

<style>
.background-demo {
    max-width: 1000px;
    margin: 0 auto;
    padding: 2rem;
    font-family: Arial, sans-serif;
}

.background-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1.5rem;
    margin: 2rem 0;
}

.background-grid > div {
    height: 200px;
    border-radius: 12px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: white;
    text-align: center;
    font-weight: bold;
    box-shadow: 0 4px 15px rgba(0,0,0,0.1);
}

.bg-solid { background-color: #3b82f6; }
.bg-gradient { background: linear-gradient(45deg, #667eea, #764ba2); }
.bg-radial { background: radial-gradient(circle, #f59e0b, #ef4444); }
.bg-pattern { 
    background: repeating-linear-gradient(
        45deg,
        #10b981,
        #10b981 10px,
        #059669 10px,
        #059669 20px
    );
}
.bg-image {
    background-image: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="40" fill="%23f59e0b"/><circle cx="50" cy="50" r="20" fill="%23ef4444"/></svg>');
    background-size: cover;
    background-position: center;
}
.bg-multiple {
    background: 
        repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.1) 10px, rgba(255,255,255,0.1) 20px),
        linear-gradient(135deg, #8b5cf6, #3b82f6);
}

.background-properties {
    margin: 3rem 0;
    padding: 2rem;
    background: #f8fafc;
    border-radius: 12px;
}

.bg-size-demo, .bg-position-demo {
    display: flex;
    gap: 1rem;
    margin: 1rem 0;
    flex-wrap: wrap;
}

.bg-size-demo > div, .bg-position-demo > div {
    flex: 1;
    min-width: 150px;
    height: 100px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-weight: bold;
    background-image: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" fill="%233b82f6"/><circle cx="50" cy="50" r="30" fill="%23f59e0b"/></svg>');
}

.bg-cover { background-size: cover; }
.bg-contain { background-size: contain; }
.bg-custom { background-size: 50px 50px; }

.bg-top-left { background-position: top left; }
.bg-center { background-position: center; }
.bg-bottom-right { background-position: bottom right; }
</style>`,

	borders: `<!-- CSS Border Properties Demo -->
<div class="border-demo">
    <h2>Border Properties Showcase</h2>
    
    <div class="border-types">
        <h3>Border Types</h3>
        <div class="border-grid">
            <div class="border-solid">Solid Border</div>
            <div class="border-dashed">Dashed Border</div>
            <div class="border-dotted">Dotted Border</div>
            <div class="border-double">Double Border</div>
            <div class="border-groove">Groove Border</div>
            <div class="border-ridge">Ridge Border</div>
            <div class="border-inset">Inset Border</div>
            <div class="border-outset">Outset Border</div>
        </div>
    </div>
    
    <div class="border-radius-demo">
        <h3>Border Radius</h3>
        <div class="radius-grid">
            <div class="radius-none">No Radius</div>
            <div class="radius-small">Small Radius</div>
            <div class="radius-medium">Medium Radius</div>
            <div class="radius-large">Large Radius</div>
            <div class="radius-circle">Circle</div>
            <div class="radius-ellipse">Ellipse</div>
        </div>
    </div>
    
    <div class="border-width-demo">
        <h3>Border Width</h3>
        <div class="width-grid">
            <div class="width-thin">Thin (1px)</div>
            <div class="width-medium">Medium (3px)</div>
            <div class="width-thick">Thick (6px)</div>
            <div class="width-very-thick">Very Thick (10px)</div>
        </div>
    </div>
    
    <div class="border-color-demo">
        <h3>Border Colors</h3>
        <div class="color-grid">
            <div class="color-primary">Primary</div>
            <div class="color-secondary">Secondary</div>
            <div class="color-success">Success</div>
            <div class="color-warning">Warning</div>
            <div class="color-danger">Danger</div>
            <div class="color-gradient">Gradient</div>
        </div>
    </div>
</div>

<style>
.border-demo {
    max-width: 1000px;
    margin: 0 auto;
    padding: 2rem;
    font-family: Arial, sans-serif;
}

.border-grid, .radius-grid, .width-grid, .color-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 1rem;
    margin: 1rem 0;
}

.border-grid > div, .radius-grid > div, .width-grid > div, .color-grid > div {
    padding: 1.5rem;
    text-align: center;
    font-weight: bold;
    background: #f8fafc;
    transition: all 0.3s ease;
}

.border-grid > div:hover, .radius-grid > div:hover, .width-grid > div:hover, .color-grid > div:hover {
    transform: translateY(-3px);
    box-shadow: 0 5px 15px rgba(0,0,0,0.1);
}

/* Border Types */
.border-solid { border: 3px solid #3b82f6; }
.border-dashed { border: 3px dashed #10b981; }
.border-dotted { border: 3px dotted #f59e0b; }
.border-double { border: 6px double #ef4444; }
.border-groove { border: 6px groove #8b5cf6; }
.border-ridge { border: 6px ridge #06b6d4; }
.border-inset { border: 6px inset #84cc16; }
.border-outset { border: 6px outset #f97316; }

/* Border Radius */
.radius-none { border: 3px solid #3b82f6; border-radius: 0; }
.radius-small { border: 3px solid #3b82f6; border-radius: 4px; }
.radius-medium { border: 3px solid #3b82f6; border-radius: 12px; }
.radius-large { border: 3px solid #3b82f6; border-radius: 24px; }
.radius-circle { border: 3px solid #3b82f6; border-radius: 50%; width: 80px; height: 80px; display: flex; align-items: center; justify-content: center; }
.radius-ellipse { border: 3px solid #3b82f6; border-radius: 50px 20px; }

/* Border Width */
.width-thin { border: 1px solid #3b82f6; }
.width-medium { border: 3px solid #3b82f6; }
.width-thick { border: 6px solid #3b82f6; }
.width-very-thick { border: 10px solid #3b82f6; }

/* Border Colors */
.color-primary { border: 3px solid #3b82f6; }
.color-secondary { border: 3px solid #6b7280; }
.color-success { border: 3px solid #10b981; }
.color-warning { border: 3px solid #f59e0b; }
.color-danger { border: 3px solid #ef4444; }
.color-gradient { 
    border: 3px solid transparent;
    background: linear-gradient(white, white) padding-box,
                linear-gradient(45deg, #3b82f6, #8b5cf6) border-box;
}
</style>`,
};

// Enhanced code examples for CSS Layout module
const cssLayoutExamples = {
	positioning: `<!-- CSS Positioning Demo -->
<div class="positioning-demo">
    <h2>CSS Positioning Properties</h2>
    
    <div class="position-container">
        <h3>Static Positioning (Default)</h3>
        <div class="position-box static">Static</div>
        <div class="position-box static">Static</div>
        <div class="position-box static">Static</div>
    </div>
    
    <div class="position-container">
        <h3>Relative Positioning</h3>
        <div class="position-box relative">Relative</div>
        <div class="position-box relative offset">Relative + Offset</div>
        <div class="position-box relative">Relative</div>
    </div>
    
    <div class="position-container">
        <h3>Absolute Positioning</h3>
        <div class="position-box absolute top-left">Top Left</div>
        <div class="position-box absolute top-right">Top Right</div>
        <div class="position-box absolute bottom-left">Bottom Left</div>
        <div class="position-box absolute bottom-right">Bottom Right</div>
    </div>
    
    <div class="position-container">
        <h3>Fixed Positioning</h3>
        <div class="position-box fixed">Fixed to Viewport</div>
    </div>
    
    <div class="position-container">
        <h3>Sticky Positioning</h3>
        <div class="sticky-demo">
            <div class="position-box sticky">Sticky Element</div>
            <div class="content">Scroll to see sticky behavior</div>
            <div class="content">More content here</div>
            <div class="content">Keep scrolling</div>
            <div class="content">Almost there</div>
            <div class="content">Last content</div>
        </div>
    </div>
</div>

<style>
.positioning-demo {
    max-width: 1000px;
    margin: 0 auto;
    padding: 2rem;
    font-family: Arial, sans-serif;
}

.position-container {
    margin: 3rem 0;
    padding: 2rem;
    background: #f8fafc;
    border-radius: 12px;
    position: relative;
    min-height: 200px;
}

.position-box {
    width: 100px;
    height: 60px;
    background: #3b82f6;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    border-radius: 8px;
    margin: 0.5rem;
}

.static { position: static; }
.relative { position: relative; }
.absolute { position: absolute; }
.fixed { position: fixed; top: 20px; right: 20px; z-index: 1000; }
.sticky { position: sticky; top: 20px; }

.offset { top: 20px; left: 50px; }
.top-left { top: 20px; left: 20px; }
.top-right { top: 20px; right: 20px; }
.bottom-left { bottom: 20px; left: 20px; }
.bottom-right { bottom: 20px; right: 20px; }

.sticky-demo {
    height: 300px;
    overflow-y: auto;
    border: 2px solid #e5e7eb;
    border-radius: 8px;
    padding: 1rem;
}

.content {
    height: 100px;
    background: #e5e7eb;
    margin: 1rem 0;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 8px;
}
</style>`,

	"box-model": `<!-- CSS Box Model Demo -->
<div class="box-model-demo">
    <h2>CSS Box Model</h2>
    
    <div class="box-model-container">
        <h3>Content Box (Default)</h3>
        <div class="box content-box">
            <div class="inner-content">Content</div>
        </div>
        <p>Total width: 200px + 40px padding + 20px border = 260px</p>
    </div>
    
    <div class="box-model-container">
        <h3>Border Box</h3>
        <div class="box border-box">
            <div class="inner-content">Content</div>
        </div>
        <p>Total width: 200px (includes padding and border)</p>
    </div>
    
    <div class="margin-demo">
        <h3>Margin Collapse</h3>
        <div class="margin-box">Box 1</div>
        <div class="margin-box">Box 2</div>
        <div class="margin-box">Box 3</div>
    </div>
    
    <div class="padding-demo">
        <h3>Padding Examples</h3>
        <div class="padding-grid">
            <div class="padding-box small">Small Padding</div>
            <div class="padding-box medium">Medium Padding</div>
            <div class="padding-box large">Large Padding</div>
        </div>
    </div>
</div>

<style>
.box-model-demo {
    max-width: 1000px;
    margin: 0 auto;
    padding: 2rem;
    font-family: Arial, sans-serif;
}

.box-model-container {
    margin: 2rem 0;
    padding: 2rem;
    background: #f8fafc;
    border-radius: 12px;
}

.box {
    width: 200px;
    height: 100px;
    background: #3b82f6;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    border-radius: 8px;
    margin: 1rem 0;
}

.content-box {
    box-sizing: content-box;
    padding: 20px;
    border: 10px solid #10b981;
}

.border-box {
    box-sizing: border-box;
    padding: 20px;
    border: 10px solid #f59e0b;
}

.inner-content {
    background: rgba(255,255,255,0.2);
    padding: 0.5rem;
    border-radius: 4px;
}

.margin-demo {
    margin: 2rem 0;
    padding: 2rem;
    background: #f0f9ff;
    border-radius: 12px;
}

.margin-box {
    background: #8b5cf6;
    color: white;
    padding: 1rem;
    margin: 20px 0;
    border-radius: 8px;
    text-align: center;
    font-weight: bold;
}

.padding-demo {
    margin: 2rem 0;
    padding: 2rem;
    background: #fef3c7;
    border-radius: 12px;
}

.padding-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1rem;
}

.padding-box {
    background: #ef4444;
    color: white;
    text-align: center;
    font-weight: bold;
    border-radius: 8px;
}

.small { padding: 0.5rem; }
.medium { padding: 1.5rem; }
.large { padding: 3rem; }
</style>`,

	centering: `<!-- CSS Centering Techniques Demo -->
<div class="centering-demo">
    <h2>CSS Centering Techniques</h2>
    
    <div class="centering-section">
        <h3>Text Centering</h3>
        <div class="text-center">
            <p>This text is centered using text-align: center</p>
        </div>
    </div>
    
    <div class="centering-section">
        <h3>Flexbox Centering</h3>
        <div class="flex-center">
            <div class="centered-box">Centered with Flexbox</div>
        </div>
    </div>
    
    <div class="centering-section">
        <h3>Grid Centering</h3>
        <div class="grid-center">
            <div class="centered-box">Centered with Grid</div>
        </div>
    </div>
    
    <div class="centering-section">
        <h3>Absolute Positioning Centering</h3>
        <div class="absolute-center-container">
            <div class="absolute-center">Centered with Absolute</div>
        </div>
    </div>
    
    <div class="centering-section">
        <h3>Transform Centering</h3>
        <div class="transform-center-container">
            <div class="transform-center">Centered with Transform</div>
        </div>
    </div>
    
    <div class="centering-section">
        <h3>Multiple Elements Centering</h3>
        <div class="multiple-center">
            <div class="centered-item">Item 1</div>
            <div class="centered-item">Item 2</div>
            <div class="centered-item">Item 3</div>
        </div>
    </div>
</div>

<style>
.centering-demo {
    max-width: 1000px;
    margin: 0 auto;
    padding: 2rem;
    font-family: Arial, sans-serif;
}

.centering-section {
    margin: 2rem 0;
    padding: 2rem;
    background: #f8fafc;
    border-radius: 12px;
}

.text-center {
    text-align: center;
    padding: 2rem;
    background: #e0f2fe;
    border-radius: 8px;
}

.flex-center {
    height: 200px;
    background: #f0fdf4;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.grid-center {
    height: 200px;
    background: #fef3c7;
    border-radius: 8px;
    display: grid;
    place-items: center;
}

.absolute-center-container {
    height: 200px;
    background: #fce7f3;
    border-radius: 8px;
    position: relative;
}

.absolute-center {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: #3b82f6;
    color: white;
    padding: 1rem 2rem;
    border-radius: 8px;
    font-weight: bold;
}

.transform-center-container {
    height: 200px;
    background: #f3e8ff;
    border-radius: 8px;
    position: relative;
}

.transform-center {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: #8b5cf6;
    color: white;
    padding: 1rem 2rem;
    border-radius: 8px;
    font-weight: bold;
}

.multiple-center {
    height: 200px;
    background: #ecfdf5;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    flex-wrap: wrap;
}

.centered-box, .centered-item {
    background: #10b981;
    color: white;
    padding: 1rem 2rem;
    border-radius: 8px;
    font-weight: bold;
    text-align: center;
}
</style>`,
};

// Enhanced code examples for CSS Flexbox module
const cssFlexboxExamples = {
	"flex-basics": `<!-- CSS Flexbox Basics Demo -->
<div class="flexbox-demo">
    <h2>Flexbox Basics</h2>
    
    <div class="flex-section">
        <h3>Flex Container</h3>
        <div class="flex-container">
            <div class="flex-item">Item 1</div>
            <div class="flex-item">Item 2</div>
            <div class="flex-item">Item 3</div>
        </div>
    </div>
    
    <div class="flex-section">
        <h3>Flex Direction</h3>
        <div class="direction-demo">
            <div class="direction-container row">
                <div class="flex-item">Row</div>
                <div class="flex-item">Row</div>
                <div class="flex-item">Row</div>
            </div>
            <div class="direction-container column">
                <div class="flex-item">Column</div>
                <div class="flex-item">Column</div>
                <div class="flex-item">Column</div>
            </div>
        </div>
    </div>
    
    <div class="flex-section">
        <h3>Justify Content</h3>
        <div class="justify-demo">
            <div class="justify-container start">
                <div class="flex-item">Start</div>
                <div class="flex-item">Start</div>
            </div>
            <div class="justify-container center">
                <div class="flex-item">Center</div>
                <div class="flex-item">Center</div>
            </div>
            <div class="justify-container end">
                <div class="flex-item">End</div>
                <div class="flex-item">End</div>
            </div>
            <div class="justify-container between">
                <div class="flex-item">Between</div>
                <div class="flex-item">Between</div>
            </div>
            <div class="justify-container around">
                <div class="flex-item">Around</div>
                <div class="flex-item">Around</div>
            </div>
        </div>
    </div>
    
    <div class="flex-section">
        <h3>Align Items</h3>
        <div class="align-demo">
            <div class="align-container stretch">
                <div class="flex-item">Stretch</div>
                <div class="flex-item">Stretch</div>
            </div>
            <div class="align-container flex-start">
                <div class="flex-item">Flex Start</div>
                <div class="flex-item">Flex Start</div>
            </div>
            <div class="align-container center">
                <div class="flex-item">Center</div>
                <div class="flex-item">Center</div>
            </div>
            <div class="align-container flex-end">
                <div class="flex-item">Flex End</div>
                <div class="flex-item">Flex End</div>
            </div>
        </div>
    </div>
</div>

<style>
.flexbox-demo {
    max-width: 1000px;
    margin: 0 auto;
    padding: 2rem;
    font-family: Arial, sans-serif;
}

.flex-section {
    margin: 2rem 0;
    padding: 2rem;
    background: #f8fafc;
    border-radius: 12px;
}

.flex-container {
    display: flex;
    background: #e0f2fe;
    padding: 1rem;
    border-radius: 8px;
    gap: 1rem;
}

.flex-item {
    background: #3b82f6;
    color: white;
    padding: 1rem 2rem;
    border-radius: 8px;
    font-weight: bold;
    text-align: center;
    flex: 1;
}

.direction-demo {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
}

.direction-container {
    background: #f0fdf4;
    padding: 1rem;
    border-radius: 8px;
    min-height: 150px;
}

.row { display: flex; flex-direction: row; }
.column { display: flex; flex-direction: column; }

.justify-demo, .align-demo {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1rem;
}

.justify-container, .align-container {
    background: #fef3c7;
    padding: 1rem;
    border-radius: 8px;
    min-height: 100px;
    display: flex;
}

.justify-container > .flex-item, .align-container > .flex-item {
    flex: 0 0 auto;
    width: 80px;
}

.start { justify-content: flex-start; }
.center { justify-content: center; }
.end { justify-content: flex-end; }
.between { justify-content: space-between; }
.around { justify-content: space-around; }

.stretch { align-items: stretch; }
.flex-start { align-items: flex-start; }
.flex-end { align-items: flex-end; }
</style>`,

	"flex-properties": `<!-- CSS Flexbox Properties Demo -->
<div class="flex-properties-demo">
    <h2>Flexbox Properties</h2>
    
    <div class="flex-section">
        <h3>Flex Grow</h3>
        <div class="grow-demo">
            <div class="flex-item grow-1">Grow 1</div>
            <div class="flex-item grow-2">Grow 2</div>
            <div class="flex-item grow-3">Grow 3</div>
        </div>
    </div>
    
    <div class="flex-section">
        <h3>Flex Shrink</h3>
        <div class="shrink-demo">
            <div class="flex-item shrink-0">No Shrink</div>
            <div class="flex-item shrink-1">Shrink 1</div>
            <div class="flex-item shrink-2">Shrink 2</div>
        </div>
    </div>
    
    <div class="flex-section">
        <h3>Flex Basis</h3>
        <div class="basis-demo">
            <div class="flex-item basis-100">Basis 100px</div>
            <div class="flex-item basis-200">Basis 200px</div>
            <div class="flex-item basis-300">Basis 300px</div>
        </div>
    </div>
    
    <div class="flex-section">
        <h3>Flex Wrap</h3>
        <div class="wrap-demo">
            <div class="flex-container nowrap">
                <div class="flex-item">No Wrap</div>
                <div class="flex-item">No Wrap</div>
                <div class="flex-item">No Wrap</div>
                <div class="flex-item">No Wrap</div>
                <div class="flex-item">No Wrap</div>
            </div>
            <div class="flex-container wrap">
                <div class="flex-item">Wrap</div>
                <div class="flex-item">Wrap</div>
                <div class="flex-item">Wrap</div>
                <div class="flex-item">Wrap</div>
                <div class="flex-item">Wrap</div>
            </div>
        </div>
    </div>
    
    <div class="flex-section">
        <h3>Align Self</h3>
        <div class="align-self-demo">
            <div class="flex-item align-start">Align Start</div>
            <div class="flex-item align-center">Align Center</div>
            <div class="flex-item align-end">Align End</div>
            <div class="flex-item align-stretch">Align Stretch</div>
        </div>
    </div>
</div>

<style>
.flex-properties-demo {
    max-width: 1000px;
    margin: 0 auto;
    padding: 2rem;
    font-family: Arial, sans-serif;
}

.flex-section {
    margin: 2rem 0;
    padding: 2rem;
    background: #f8fafc;
    border-radius: 12px;
}

.grow-demo, .shrink-demo, .basis-demo, .align-self-demo {
    display: flex;
    background: #e0f2fe;
    padding: 1rem;
    border-radius: 8px;
    gap: 1rem;
    min-height: 100px;
}

.flex-item {
    background: #3b82f6;
    color: white;
    padding: 1rem;
    border-radius: 8px;
    font-weight: bold;
    text-align: center;
    min-width: 80px;
}

.grow-1 { flex-grow: 1; }
.grow-2 { flex-grow: 2; }
.grow-3 { flex-grow: 3; }

.shrink-0 { flex-shrink: 0; min-width: 150px; }
.shrink-1 { flex-shrink: 1; min-width: 150px; }
.shrink-2 { flex-shrink: 2; min-width: 150px; }

.basis-100 { flex-basis: 100px; }
.basis-200 { flex-basis: 200px; }
.basis-300 { flex-basis: 300px; }

.wrap-demo {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
}

.flex-container {
    background: #f0fdf4;
    padding: 1rem;
    border-radius: 8px;
    display: flex;
    gap: 0.5rem;
}

.nowrap { flex-wrap: nowrap; }
.wrap { flex-wrap: wrap; }

.align-start { align-self: flex-start; }
.align-center { align-self: center; }
.align-end { align-self: flex-end; }
.align-stretch { align-self: stretch; }
</style>`,
};

function enhanceCSSModules() {
	console.log("🔧 Enhancing CSS Modules with Comprehensive Code Demos...\n");

	// Enhance CSS Styling module
	enhanceModule("02-css-styling", cssStylingExamples);

	// Enhance CSS Layout module
	enhanceModule("03-css-layout", cssLayoutExamples);

	// Enhance CSS Flexbox module
	enhanceModule("04-css-flexbox", cssFlexboxExamples);

	console.log("🎉 All CSS modules enhanced with comprehensive code demos!");
}

function enhanceModule(moduleName, codeExamples) {
	const modulePath = path.join(
		__dirname,
		"..",
		"traditional-web-stack",
		moduleName
	);
	const scriptPath = path.join(modulePath, "script.js");

	console.log(`  📝 Enhancing ${moduleName}...`);

	// Read current script
	let scriptContent = fs.readFileSync(scriptPath, "utf8");

	// Find and replace the sectionCodeExamples object
	const examplesRegex = /const sectionCodeExamples = \{[\s\S]*?\};/;
	const newExamples = `const sectionCodeExamples = ${JSON.stringify(
		codeExamples,
		null,
		2
	)};`;

	if (examplesRegex.test(scriptContent)) {
		scriptContent = scriptContent.replace(examplesRegex, newExamples);
		fs.writeFileSync(scriptPath, scriptContent);
		console.log(`    ✅ ${moduleName} code examples updated`);
	} else {
		console.log(`    ❌ Could not find sectionCodeExamples in ${moduleName}`);
	}
}

// Run the enhancement
if (require.main === module) {
	enhanceCSSModules();
}

module.exports = { enhanceCSSModules };
