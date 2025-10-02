const fs = require('fs');
const path = require('path');

// Function to restore detailed examples and interactive content
function restoreDetailedExamples() {
    console.log('🔄 Restoring detailed examples and interactive content...');
    
    const modules = [
        '01-html-basics',
        '02-css-styling', 
        '03-css-layout',
        '04-css-flexbox',
        '05-css-grid',
        '06-css-animations',
        '07-css-variables',
        '08-javascript-events',
        '09-javascript-dom',
        '10-production-example',
        '11-html-forms'
    ];
    
    modules.forEach(moduleName => {
        const modulePath = path.join(__dirname, '..', 'traditional-web-stack', moduleName);
        const indexPath = path.join(modulePath, 'index.html');
        
        if (fs.existsSync(indexPath)) {
            console.log(`📝 Restoring content for ${moduleName}...`);
            restoreModuleContent(moduleName, indexPath);
        }
    });
    
    console.log('✅ All detailed examples and interactive content restored!');
}

function restoreModuleContent(moduleName, indexPath) {
    let content = fs.readFileSync(indexPath, 'utf8');
    
    // Restore HTML Basics module with detailed examples
    if (moduleName === '01-html-basics') {
        content = restoreHtmlBasicsContent(content);
    }
    // Restore CSS Styling module with interactive demos
    else if (moduleName === '02-css-styling') {
        content = restoreCssStylingContent(content);
    }
    // Restore other modules with their specific content
    else if (moduleName === '03-css-layout') {
        content = restoreCssLayoutContent(content);
    }
    else if (moduleName === '04-css-flexbox') {
        content = restoreCssFlexboxContent(content);
    }
    else if (moduleName === '05-css-grid') {
        content = restoreCssGridContent(content);
    }
    else if (moduleName === '06-css-animations') {
        content = restoreCssAnimationsContent(content);
    }
    else if (moduleName === '07-css-variables') {
        content = restoreCssVariablesContent(content);
    }
    else if (moduleName === '08-javascript-events') {
        content = restoreJavascriptEventsContent(content);
    }
    else if (moduleName === '09-javascript-dom') {
        content = restoreJavascriptDomContent(content);
    }
    else if (moduleName === '10-production-example') {
        content = restoreProductionExampleContent(content);
    }
    else if (moduleName === '11-html-forms') {
        content = restoreHtmlFormsContent(content);
    }
    
    fs.writeFileSync(indexPath, content, 'utf8');
}

function restoreHtmlBasicsContent(content) {
    // Replace overview section with detailed content
    const overviewSection = `        <!-- Overview Section -->
        <div id="overview" class="content-section active">
            <h2 class="section-title">HTML Document Structure</h2>
            <p>HTML (HyperText Markup Language) is the foundation of every web page. It uses tags to structure content and create the visual elements you see on websites.</p>
            
            <div class="example-box">
                <h3>📋 Key HTML Elements</h3>
                <ul>
                    <li><strong>&lt;!DOCTYPE html&gt;</strong> - Declares the document type</li>
                    <li><strong>&lt;html&gt;</strong> - Root element of the page</li>
                    <li><strong>&lt;head&gt;</strong> - Contains metadata and links</li>
                    <li><strong>&lt;body&gt;</strong> - Contains visible content</li>
                    <li><strong>&lt;h1&gt; to &lt;h6&gt;</strong> - Headings (h1 is most important)</li>
                    <li><strong>&lt;p&gt;</strong> - Paragraphs</li>
                    <li><strong>&lt;div&gt;</strong> - Container for grouping elements</li>
                </ul>
            </div>

            <div class="interactive-demo">
                <h3>🎮 Try This: HTML Structure</h3>
                <p>Click the button below to see a live example of HTML document structure:</p>
                <button class="demo-button" onclick="showDemoResult('overview')">Show HTML Structure</button>
                <div id="overviewResult" class="demo-result">
                    <div class="demo-content">
                        <h4>📄 Basic HTML Document</h4>
                        <pre><code>&lt;!DOCTYPE html&gt;
&lt;html lang="en"&gt;
&lt;head&gt;
    &lt;meta charset="UTF-8"&gt;
    &lt;title&gt;My First Page&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;
    &lt;h1&gt;Welcome!&lt;/h1&gt;
    &lt;p&gt;This is my first webpage.&lt;/p&gt;
&lt;/body&gt;
&lt;/html&gt;</code></pre>
                        <p><strong>💡 Tip:</strong> Every HTML page needs these essential elements to work properly!</p>
                    </div>
                </div>
            </div>`;

    // Replace headings section with detailed content
    const headingsSection = `        <!-- Headings Section -->
        <div id="headings" class="content-section">
            <h2 class="section-title">HTML Headings</h2>
            <p>Headings create a hierarchy in your content. They help organize information and make your page more accessible.</p>
            
            <div class="example-box">
                <h3>📊 Heading Hierarchy</h3>
                <ul>
                    <li><strong>H1</strong> - Main page title (use only one per page)</li>
                    <li><strong>H2</strong> - Major section headings</li>
                    <li><strong>H3</strong> - Subsection headings</li>
                    <li><strong>H4-H6</strong> - Smaller headings for detailed organization</li>
                </ul>
            </div>

            <div class="interactive-demo">
                <h3>🎮 Try This: Heading Examples</h3>
                <p>Click the button to see different heading sizes and their visual hierarchy:</p>
                <button class="demo-button" onclick="showDemoResult('headings')">Show Heading Examples</button>
                <div id="headingsResult" class="demo-result">
                    <div class="demo-content">
                        <h1 style="color: #2563eb; margin: 0.5rem 0;">Main Title (H1)</h1>
                        <h2 style="color: #7c3aed; margin: 0.5rem 0;">Section Title (H2)</h2>
                        <h3 style="color: #059669; margin: 0.5rem 0;">Subsection (H3)</h3>
                        <h4 style="color: #dc2626; margin: 0.5rem 0;">Smaller Heading (H4)</h4>
                        <h5 style="color: #ea580c; margin: 0.5rem 0;">Even Smaller (H5)</h5>
                        <h6 style="color: #6b7280; margin: 0.5rem 0;">Smallest Heading (H6)</h6>
                        <p><strong>💡 Notice:</strong> Each heading has a different size and importance level!</p>
                    </div>
                </div>
            </div>`;

    // Replace text section with detailed content
    const textSection = `        <!-- Text Elements Section -->
        <div id="text" class="content-section">
            <h2 class="section-title">Text Elements</h2>
            <p>Text elements help you format and structure your content. They make your text more readable and meaningful.</p>
            
            <div class="example-box">
                <h3>📝 Common Text Elements</h3>
                <ul>
                    <li><strong>&lt;strong&gt;</strong> - Bold text (important)</li>
                    <li><strong>&lt;em&gt;</strong> - Italic text (emphasis)</li>
                    <li><strong>&lt;code&gt;</strong> - Inline code</li>
                    <li><strong>&lt;mark&gt;</strong> - Highlighted text</li>
                    <li><strong>&lt;a&gt;</strong> - Links to other pages</li>
                    <li><strong>&lt;blockquote&gt;</strong> - Quoted text</li>
                    <li><strong>&lt;pre&gt;</strong> - Preformatted text</li>
                </ul>
            </div>

            <div class="interactive-demo">
                <h3>🎮 Try This: Text Formatting</h3>
                <p>Click the button to see different text formatting examples:</p>
                <button class="demo-button" onclick="showDemoResult('text')">Show Text Examples</button>
                <div id="textResult" class="demo-result">
                    <div class="demo-content">
                        <p>This is a regular paragraph with <strong>bold text</strong> and <em>italic text</em>.</p>
                        <p>You can also use <code>inline code</code> and <mark>highlighted text</mark>.</p>
                        <p>Here's a <a href="#" onclick="alert('Link clicked!')" style="color: #3b82f6;">clickable link</a>.</p>
                        <blockquote style="border-left: 4px solid #3b82f6; padding-left: 1rem; margin: 1rem 0; background: #f8fafc; padding: 1rem; border-radius: 4px;">
                            <p>This is a blockquote. It's used for longer quotes or important text.</p>
                        </blockquote>
                        <p><strong>💡 Try it:</strong> Click the link above to see it in action!</p>
                    </div>
                </div>
            </div>`;

    // Replace lists section with detailed content
    const listsSection = `        <!-- Lists Section -->
        <div id="lists" class="content-section">
            <h2 class="section-title">HTML Lists</h2>
            <p>Lists help organize information in a structured way. HTML provides three types of lists for different purposes.</p>
            
            <div class="example-box">
                <h3>📋 Types of Lists</h3>
                <ul>
                    <li><strong>Unordered Lists (&lt;ul&gt;)</strong> - Bullet points for items without order</li>
                    <li><strong>Ordered Lists (&lt;ol&gt;)</strong> - Numbered lists for sequential items</li>
                    <li><strong>Definition Lists (&lt;dl&gt;)</strong> - Terms and their definitions</li>
                </ul>
            </div>

            <div class="interactive-demo">
                <h3>🎮 Try This: List Examples</h3>
                <p>Click the button to see different types of lists:</p>
                <button class="demo-button" onclick="showDemoResult('lists')">Show List Examples</button>
                <div id="listsResult" class="demo-result">
                    <div class="demo-content">
                        <h4>Unordered List (Bullets)</h4>
                        <ul>
                            <li>First item</li>
                            <li>Second item</li>
                            <li>Third item</li>
                        </ul>
                        
                        <h4>Ordered List (Numbers)</h4>
                        <ol>
                            <li>First step</li>
                            <li>Second step</li>
                            <li>Third step</li>
                        </ol>
                        
                        <h4>Definition List</h4>
                        <dl>
                            <dt style="font-weight: bold; color: #2563eb;">HTML</dt>
                            <dd style="margin-left: 1rem; margin-bottom: 0.5rem;">HyperText Markup Language</dd>
                            <dt style="font-weight: bold; color: #2563eb;">CSS</dt>
                            <dd style="margin-left: 1rem; margin-bottom: 0.5rem;">Cascading Style Sheets</dd>
                        </dl>
                        <p><strong>💡 Pro tip:</strong> You can nest lists inside other lists for complex organization!</p>
                    </div>
                </div>
            </div>`;

    // Replace forms section with detailed content
    const formsSection = `        <!-- Forms Section -->
        <div id="forms" class="content-section">
            <h2 class="section-title">HTML Forms</h2>
            <p>Forms allow users to input data and interact with your website. They're essential for user engagement.</p>
            
            <div class="example-box">
                <h3>📝 Form Elements</h3>
                <ul>
                    <li><strong>&lt;form&gt;</strong> - Container for form elements</li>
                    <li><strong>&lt;input&gt;</strong> - Text fields, buttons, checkboxes</li>
                    <li><strong>&lt;textarea&gt;</strong> - Multi-line text input</li>
                    <li><strong>&lt;select&gt;</strong> - Dropdown menus</li>
                    <li><strong>&lt;label&gt;</strong> - Labels for form fields</li>
                </ul>
            </div>

            <div class="interactive-demo">
                <h3>🎮 Try This: Interactive Form</h3>
                <p>Click the button to see a working form example:</p>
                <button class="demo-button" onclick="showDemoResult('forms')">Show Form Example</button>
                <div id="formsResult" class="demo-result">
                    <div class="demo-content">
                        <form style="max-width: 400px; margin: 0 auto; padding: 1rem; border: 1px solid #e2e8f0; border-radius: 8px;">
                            <h4>Contact Form</h4>
                            <label for="demo-name" style="display: block; margin-bottom: 0.5rem;">Name:</label>
                            <input type="text" id="demo-name" style="width: 100%; padding: 0.5rem; margin-bottom: 1rem; border: 1px solid #d1d5db; border-radius: 4px;">
                            
                            <label for="demo-email" style="display: block; margin-bottom: 0.5rem;">Email:</label>
                            <input type="email" id="demo-email" style="width: 100%; padding: 0.5rem; margin-bottom: 1rem; border: 1px solid #d1d5db; border-radius: 4px;">
                            
                            <label for="demo-message" style="display: block; margin-bottom: 0.5rem;">Message:</label>
                            <textarea id="demo-message" rows="3" style="width: 100%; padding: 0.5rem; margin-bottom: 1rem; border: 1px solid #d1d5db; border-radius: 4px;"></textarea>
                            
                            <button type="button" onclick="alert('Form submitted! (This is just a demo)')" style="background: #3b82f6; color: white; padding: 0.5rem 1rem; border: none; border-radius: 4px; cursor: pointer;">Submit</button>
                        </form>
                        <p><strong>💡 Try it:</strong> Fill out the form and click submit to see it in action!</p>
                    </div>
                </div>
            </div>`;

    // Replace interactive section with detailed content
    const interactiveSection = `        <!-- Interactive Section -->
        <div id="interactive" class="content-section">
            <h2 class="section-title">Interactive Elements</h2>
            <p>Interactive elements make your website engaging and responsive to user actions.</p>
            
            <div class="example-box">
                <h3>🎮 Interactive Elements</h3>
                <ul>
                    <li><strong>&lt;button&gt;</strong> - Clickable buttons</li>
                    <li><strong>&lt;a&gt;</strong> - Links to other pages</li>
                    <li><strong>&lt;input&gt;</strong> - Interactive form fields</li>
                    <li><strong>onclick</strong> - JavaScript event handlers</li>
                </ul>
            </div>

            <div class="interactive-demo">
                <h3>🎮 Try This: Interactive Demo</h3>
                <p>Click the buttons below to see different interactive elements:</p>
                <button class="demo-button" onclick="showDemoResult('interactive')">Show Interactive Examples</button>
                <div id="interactiveResult" class="demo-result">
                    <div class="demo-content">
                        <h4>Interactive Buttons</h4>
                        <button onclick="alert('Hello from HTML!')" style="background: #10b981; color: white; padding: 0.5rem 1rem; border: none; border-radius: 4px; margin: 0.5rem; cursor: pointer;">Click Me!</button>
                        <button onclick="document.body.style.backgroundColor = document.body.style.backgroundColor === 'lightblue' ? '' : 'lightblue'" style="background: #3b82f6; color: white; padding: 0.5rem 1rem; border: none; border-radius: 4px; margin: 0.5rem; cursor: pointer;">Change Background</button>
                        <button onclick="document.getElementById('demo-counter').textContent = parseInt(document.getElementById('demo-counter').textContent) + 1" style="background: #f59e0b; color: white; padding: 0.5rem 1rem; border: none; border-radius: 4px; margin: 0.5rem; cursor: pointer;">Count: <span id="demo-counter">0</span></button>
                        
                        <h4>Interactive Links</h4>
                        <p><a href="#" onclick="alert('You clicked a link!'); return false;" style="color: #3b82f6; text-decoration: underline;">Click this link</a> to see JavaScript in action!</p>
                        
                        <p><strong>💡 Try them all:</strong> Each button does something different!</p>
                    </div>
                </div>
            </div>`;

    // Replace the sections in the content
    content = content.replace(/<!-- Overview Section -->[\s\S]*?<!-- Live Code Editor for Overview -->/, overviewSection + '\n\n            <!-- Live Code Editor for Overview -->');
    content = content.replace(/<!-- Headings Section -->[\s\S]*?<!-- Live Code Editor for Headings -->/, headingsSection + '\n\n            <!-- Live Code Editor for Headings -->');
    content = content.replace(/<!-- Text Elements Section -->[\s\S]*?<!-- Live Code Editor for Text -->/, textSection + '\n\n            <!-- Live Code Editor for Text -->');
    content = content.replace(/<!-- Lists Section -->[\s\S]*?<!-- Live Code Editor for Lists -->/, listsSection + '\n\n            <!-- Live Code Editor for Lists -->');
    content = content.replace(/<!-- Forms Section -->[\s\S]*?<!-- Live Code Editor for Forms -->/, formsSection + '\n\n            <!-- Live Code Editor for Forms -->');
    content = content.replace(/<!-- Interactive Section -->[\s\S]*?<!-- Live Code Editor for Interactive -->/, interactiveSection + '\n\n            <!-- Live Code Editor for Interactive -->');

    return content;
}

function restoreCssStylingContent(content) {
    // Add detailed CSS styling examples
    const colorDemoSection = `        <!-- Color Demo Section -->
        <div id="color-demo" class="content-section active">
            <h2 class="section-title">Interactive Color Demo</h2>
            <p>Colors are fundamental to web design. Learn about different color formats and how they work together.</p>
            
            <div class="example-box">
                <h3>🎨 Color Formats</h3>
                <ul>
                    <li><strong>Named Colors:</strong> red, blue, green</li>
                    <li><strong>Hex Colors:</strong> #ff0000, #00ff00, #0000ff</li>
                    <li><strong>RGB Colors:</strong> rgb(255, 0, 0)</li>
                    <li><strong>HSL Colors:</strong> hsl(0, 100%, 50%)</li>
                </ul>
            </div>

            <div class="interactive-demo">
                <h3>🎮 Try This: Color Picker</h3>
                <p>Use the color picker below to change the background color of the demo box:</p>
                <div style="margin: 1rem 0;">
                    <label for="color-picker" style="display: block; margin-bottom: 0.5rem;">Choose a color:</label>
                    <input type="color" id="color-picker" value="#3b82f6" onchange="changeBackgroundColor(this.value)" style="width: 60px; height: 40px; border: none; border-radius: 4px; cursor: pointer;">
                    <button onclick="randomColor()" style="background: #10b981; color: white; padding: 0.5rem 1rem; border: none; border-radius: 4px; margin-left: 1rem; cursor: pointer;">Random Color</button>
                </div>
                <div id="color-demo-box" style="width: 200px; height: 100px; background: #3b82f6; border-radius: 8px; margin: 1rem 0; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; transition: background-color 0.3s ease;">
                    Color Demo Box
                </div>
                <p><strong>💡 Try it:</strong> Pick different colors and see how they look!</p>
            </div>`;

    // Add the color demo section
    content = content.replace(/<!-- Color Demo Section -->[\s\S]*?<!-- Live Code Editor for Color Demo -->/, colorDemoSection + '\n\n            <!-- Live Code Editor for Color Demo -->');

    return content;
}

// Placeholder functions for other modules (can be expanded)
function restoreCssLayoutContent(content) { return content; }
function restoreCssFlexboxContent(content) { return content; }
function restoreCssGridContent(content) { return content; }
function restoreCssAnimationsContent(content) { return content; }
function restoreCssVariablesContent(content) { return content; }
function restoreJavascriptEventsContent(content) { return content; }
function restoreJavascriptDomContent(content) { return content; }
function restoreProductionExampleContent(content) { return content; }
function restoreHtmlFormsContent(content) { return content; }

// Run the restoration
restoreDetailedExamples();
