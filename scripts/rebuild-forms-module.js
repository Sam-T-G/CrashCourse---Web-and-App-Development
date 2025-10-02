#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

// Complete forms module HTML
const formsHTML = `<!DOCTYPE html>
<html lang="en">
<head>
    <script src="https://unpkg.com/monaco-editor@0.44.0/min/vs/loader.js"></script>
    <link rel="stylesheet" href="styles.css">
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>HTML Forms - Interactive Demo</title>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>📝 HTML Forms</h1>
            <p>Learn how to create interactive forms that collect user input and data</p>
        </div>

        <div class="navigation">
            <button class="nav-button active" onclick="showSection('overview')">Overview</button>
            <button class="nav-button" onclick="showSection('input-types')">Input Types</button>
            <button class="nav-button" onclick="showSection('form-elements')">Form Elements</button>
            <button class="nav-button" onclick="showSection('validation')">Validation</button>
            <button class="nav-button" onclick="showSection('interactive')">Interactive Demo</button>
        </div>

        <!-- Overview Section -->
        <div id="overview" class="content-section active">
            <h2 class="section-title">📋 Forms Overview</h2>
            <p>Forms are essential for user interaction on websites. They allow users to submit data, make selections, and interact with your application.</p>

            <div class="element-demo">
                <div class="element-label">Basic Form Structure</div>
                <div class="structure-visual">
&lt;<span class="tag">form</span> <span class="attribute">action</span>=<span class="value">"/submit"</span> <span class="attribute">method</span>=<span class="value">"POST"</span>&gt;<br>
&nbsp;&nbsp;&lt;<span class="tag">label</span>&gt;<span class="content">Name:</span>&lt;/<span class="tag">label</span>&gt;<br>
&nbsp;&nbsp;&lt;<span class="tag">input</span> <span class="attribute">type</span>=<span class="value">"text"</span> <span class="attribute">name</span>=<span class="value">"name"</span>&gt;<br>
&nbsp;&nbsp;&lt;<span class="tag">button</span> <span class="attribute">type</span>=<span class="value">"submit"</span>&gt;<span class="content">Submit</span>&lt;/<span class="tag">button</span>&gt;<br>
&lt;/<span class="tag">form</span>&gt;
                </div>
                <div class="element-comment">Forms collect and submit user data</div>
            </div>

            <div class="interactive-demo">
                <h3>🎯 Try This</h3>
                <p>Click the buttons above to explore different form elements and see how they work!</p>
                <button class="demo-button" onclick="showDemoResult('overview')">Show Form Structure</button>
                <div id="overviewResult" class="demo-result">
                    <p>Forms are the bridge between users and your application - they collect data and send it to your server!</p>
                </div>
            </div>

            <!-- Live Code Editor -->
            <div class="live-editor-section">
                <h3>🎮 Live Code Editor - Forms Overview</h3>
                <div class="live-editor-container">
                    <div class="live-editor-header">
                        <div class="live-editor-title">
                            <div class="language-icon html">HTML</div>
                            <span>overview.html</span>
                        </div>
                        <div class="live-editor-actions">
                            <button class="live-editor-btn" onclick="copyCode('overview-editor')">Copy</button>
                            <button class="live-editor-btn primary" onclick="executeCode('overview-editor')">Run</button>
                            <button class="live-editor-btn success" onclick="resetCode('overview-editor')">Reset</button>
                        </div>
                    </div>
                    <div id="overview-editor" class="monaco-editor"></div>
                    <div class="live-editor-footer">
                        <div class="live-editor-stats">
                            <span id="overview-editor-lines">0 lines</span>
                            <span id="overview-editor-chars">0 characters</span>
                        </div>
                        <div class="live-editor-status">
                            <div class="status-indicator"></div>
                            <span>Live Editor Ready</span>
                        </div>
                    </div>
                </div>
                <div class="live-preview" id="overview-editor-preview">
                    <div class="live-preview-header">
                        <div class="live-preview-title">Live Preview</div>
                    </div>
                    <div id="overview-editor-preview-content">
                        <!-- Live preview content will be inserted here -->
                    </div>
                    <div class="error-display hidden" id="error-display-overview-editor">
                        <strong>Error:</strong> <span class="error-message"></span>
                    </div>
                </div>
            </div>
        </div>

        <!-- Input Types Section -->
        <div id="input-types" class="content-section">
            <h2 class="section-title">🔤 Input Types</h2>
            <p>HTML provides many different input types for collecting various kinds of data from users.</p>

            <div class="element-demo">
                <div class="element-label">Common Input Types</div>
                <div class="structure-visual">
&lt;<span class="tag">input</span> <span class="attribute">type</span>=<span class="value">"text"</span> <span class="attribute">placeholder</span>=<span class="value">"Text input"</span>&gt;<br>
&lt;<span class="tag">input</span> <span class="attribute">type</span>=<span class="value">"email"</span> <span class="attribute">placeholder</span>=<span class="value">"Email input"</span>&gt;<br>
&lt;<span class="tag">input</span> <span class="attribute">type</span>=<span class="value">"password"</span> <span class="attribute">placeholder</span>=<span class="value">"Password input"</span>&gt;<br>
&lt;<span class="tag">input</span> <span class="attribute">type</span>=<span class="value">"number"</span> <span class="attribute">placeholder</span>=<span class="value">"Number input"</span>&gt;<br>
&lt;<span class="tag">input</span> <span class="attribute">type</span>=<span class="value">"date"</span>&gt;<br>
&lt;<span class="tag">input</span> <span class="attribute">type</span>=<span class="value">"checkbox"</span>&gt;<br>
&lt;<span class="tag">input</span> <span class="attribute">type</span>=<span class="value">"radio"</span>&gt;
                </div>
                <div class="element-comment">Different input types provide different user interfaces</div>
            </div>

            <div class="interactive-demo">
                <h3>Input Types Demo</h3>
                <p>Click to see different input types in action:</p>
                <button class="demo-button" onclick="showDemoResult('input-types')">Show Input Types</button>
                <div id="input-typesResult" class="demo-result">
                    <div style="text-align: left;">
                        <input type="text" placeholder="Text input" style="width: 100%; padding: 0.5rem; margin: 0.5rem 0; border-radius: 4px; border: 1px solid #ccc;">
                        <input type="email" placeholder="Email input" style="width: 100%; padding: 0.5rem; margin: 0.5rem 0; border-radius: 4px; border: 1px solid #ccc;">
                        <input type="password" placeholder="Password input" style="width: 100%; padding: 0.5rem; margin: 0.5rem 0; border-radius: 4px; border: 1px solid #ccc;">
                        <input type="number" placeholder="Number input" style="width: 100%; padding: 0.5rem; margin: 0.5rem 0; border-radius: 4px; border: 1px solid #ccc;">
                        <input type="date" style="width: 100%; padding: 0.5rem; margin: 0.5rem 0; border-radius: 4px; border: 1px solid #ccc;">
                    </div>
                </div>
            </div>

            <!-- Live Code Editor -->
            <div class="live-editor-section">
                <h3>🎮 Live Code Editor - Input Types</h3>
                <div class="live-editor-container">
                    <div class="live-editor-header">
                        <div class="live-editor-title">
                            <div class="language-icon html">HTML</div>
                            <span>input-types.html</span>
                        </div>
                        <div class="live-editor-actions">
                            <button class="live-editor-btn" onclick="copyCode('input-types-editor')">Copy</button>
                            <button class="live-editor-btn primary" onclick="executeCode('input-types-editor')">Run</button>
                            <button class="live-editor-btn success" onclick="resetCode('input-types-editor')">Reset</button>
                        </div>
                    </div>
                    <div id="input-types-editor" class="monaco-editor"></div>
                    <div class="live-editor-footer">
                        <div class="live-editor-stats">
                            <span id="input-types-editor-lines">0 lines</span>
                            <span id="input-types-editor-chars">0 characters</span>
                        </div>
                        <div class="live-editor-status">
                            <div class="status-indicator"></div>
                            <span>Live Editor Ready</span>
                        </div>
                    </div>
                </div>
                <div class="live-preview" id="input-types-editor-preview">
                    <div class="live-preview-header">
                        <div class="live-preview-title">Live Preview</div>
                    </div>
                    <div id="input-types-editor-preview-content">
                        <!-- Live preview content will be inserted here -->
                    </div>
                    <div class="error-display hidden" id="error-display-input-types-editor">
                        <strong>Error:</strong> <span class="error-message"></span>
                    </div>
                </div>
            </div>
        </div>

        <!-- Form Elements Section -->
        <div id="form-elements" class="content-section">
            <h2 class="section-title">📝 Form Elements</h2>
            <p>Forms contain various elements like labels, selects, textareas, and buttons to create complete user interfaces.</p>

            <div class="element-demo">
                <div class="element-label">Form Elements</div>
                <div class="structure-visual">
&lt;<span class="tag">label</span> <span class="attribute">for</span>=<span class="value">"name"</span>&gt;<span class="content">Name:</span>&lt;/<span class="tag">label</span>&gt;<br>
&lt;<span class="tag">select</span> <span class="attribute">id</span>=<span class="value">"country"</span>&gt;<br>
&nbsp;&nbsp;&lt;<span class="tag">option</span>&gt;<span class="content">Choose...</span>&lt;/<span class="tag">option</span>&gt;<br>
&nbsp;&nbsp;&lt;<span class="tag">option</span>&gt;<span class="content">Option 1</span>&lt;/<span class="tag">option</span>&gt;<br>
&lt;/<span class="tag">select</span>&gt;<br>
&lt;<span class="tag">textarea</span> <span class="attribute">rows</span>=<span class="value">"4"</span>&gt;<span class="content">Enter text...</span>&lt;/<span class="tag">textarea</span>&gt;
                </div>
                <div class="element-comment">Form elements work together to create user interfaces</div>
            </div>

            <div class="interactive-demo">
                <h3>Form Elements Demo</h3>
                <p>Click to see form elements in action:</p>
                <button class="demo-button" onclick="showDemoResult('form-elements')">Show Form Elements</button>
                <div id="form-elementsResult" class="demo-result">
                    <div style="text-align: left;">
                        <label style="display: block; margin-bottom: 0.5rem; color: white;">Country:</label>
                        <select style="width: 100%; padding: 0.5rem; margin-bottom: 1rem; border-radius: 4px; border: 1px solid #ccc;">
                            <option>Choose a country</option>
                            <option>United States</option>
                            <option>Canada</option>
                            <option>United Kingdom</option>
                        </select>
                        <label style="display: block; margin-bottom: 0.5rem; color: white;">Message:</label>
                        <textarea rows="3" placeholder="Enter your message" style="width: 100%; padding: 0.5rem; border-radius: 4px; border: 1px solid #ccc;"></textarea>
                    </div>
                </div>
            </div>

            <!-- Live Code Editor -->
            <div class="live-editor-section">
                <h3>🎮 Live Code Editor - Form Elements</h3>
                <div class="live-editor-container">
                    <div class="live-editor-header">
                        <div class="live-editor-title">
                            <div class="language-icon html">HTML</div>
                            <span>form-elements.html</span>
                        </div>
                        <div class="live-editor-actions">
                            <button class="live-editor-btn" onclick="copyCode('form-elements-editor')">Copy</button>
                            <button class="live-editor-btn primary" onclick="executeCode('form-elements-editor')">Run</button>
                            <button class="live-editor-btn success" onclick="resetCode('form-elements-editor')">Reset</button>
                        </div>
                    </div>
                    <div id="form-elements-editor" class="monaco-editor"></div>
                    <div class="live-editor-footer">
                        <div class="live-editor-stats">
                            <span id="form-elements-editor-lines">0 lines</span>
                            <span id="form-elements-editor-chars">0 characters</span>
                        </div>
                        <div class="live-editor-status">
                            <div class="status-indicator"></div>
                            <span>Live Editor Ready</span>
                        </div>
                    </div>
                </div>
                <div class="live-preview" id="form-elements-editor-preview">
                    <div class="live-preview-header">
                        <div class="live-preview-title">Live Preview</div>
                    </div>
                    <div id="form-elements-editor-preview-content">
                        <!-- Live preview content will be inserted here -->
                    </div>
                    <div class="error-display hidden" id="error-display-form-elements-editor">
                        <strong>Error:</strong> <span class="error-message"></span>
                    </div>
                </div>
            </div>
        </div>

        <!-- Validation Section -->
        <div id="validation" class="content-section">
            <h2 class="section-title">✅ Form Validation</h2>
            <p>HTML5 provides built-in validation attributes to ensure users enter correct data.</p>

            <div class="element-demo">
                <div class="element-label">Validation Attributes</div>
                <div class="structure-visual">
&lt;<span class="tag">input</span> <span class="attribute">type</span>=<span class="value">"email"</span> <span class="attribute">required</span>&gt;<br>
&lt;<span class="tag">input</span> <span class="attribute">type</span>=<span class="value">"text"</span> <span class="attribute">minlength</span>=<span class="value">"3"</span>&gt;<br>
&lt;<span class="tag">input</span> <span class="attribute">type</span>=<span class="value">"number"</span> <span class="attribute">min</span>=<span class="value">"1"</span> <span class="attribute">max</span>=<span class="value">"100"</span>&gt;<br>
&lt;<span class="tag">input</span> <span class="attribute">type</span>=<span class="value">"text"</span> <span class="attribute">pattern</span>=<span class="value">"[A-Za-z]+"</span>&gt;
                </div>
                <div class="element-comment">Validation attributes help ensure data quality</div>
            </div>

            <div class="interactive-demo">
                <h3>Validation Demo</h3>
                <p>Click to see form validation in action:</p>
                <button class="demo-button" onclick="showDemoResult('validation')">Show Validation</button>
                <div id="validationResult" class="demo-result">
                    <div style="text-align: left;">
                        <form style="background: rgba(255,255,255,0.1); padding: 1rem; border-radius: 8px;">
                            <label style="display: block; margin-bottom: 0.5rem; color: white;">Email (required):</label>
                            <input type="email" required placeholder="Enter valid email" style="width: 100%; padding: 0.5rem; margin-bottom: 1rem; border-radius: 4px; border: 1px solid #ccc;">
                            
                            <label style="display: block; margin-bottom: 0.5rem; color: white;">Age (1-100):</label>
                            <input type="number" min="1" max="100" placeholder="Enter age" style="width: 100%; padding: 0.5rem; margin-bottom: 1rem; border-radius: 4px; border: 1px solid #ccc;">
                            
                            <button type="submit" style="background: #3b82f6; color: white; border: none; padding: 0.5rem 1rem; border-radius: 4px; cursor: pointer;">Submit</button>
                        </form>
                    </div>
                </div>
            </div>

            <!-- Live Code Editor -->
            <div class="live-editor-section">
                <h3>🎮 Live Code Editor - Form Validation</h3>
                <div class="live-editor-container">
                    <div class="live-editor-header">
                        <div class="live-editor-title">
                            <div class="language-icon html">HTML</div>
                            <span>validation.html</span>
                        </div>
                        <div class="live-editor-actions">
                            <button class="live-editor-btn" onclick="copyCode('validation-editor')">Copy</button>
                            <button class="live-editor-btn primary" onclick="executeCode('validation-editor')">Run</button>
                            <button class="live-editor-btn success" onclick="resetCode('validation-editor')">Reset</button>
                        </div>
                    </div>
                    <div id="validation-editor" class="monaco-editor"></div>
                    <div class="live-editor-footer">
                        <div class="live-editor-stats">
                            <span id="validation-editor-lines">0 lines</span>
                            <span id="validation-editor-chars">0 characters</span>
                        </div>
                        <div class="live-editor-status">
                            <div class="status-indicator"></div>
                            <span>Live Editor Ready</span>
                        </div>
                    </div>
                </div>
                <div class="live-preview" id="validation-editor-preview">
                    <div class="live-preview-header">
                        <div class="live-preview-title">Live Preview</div>
                    </div>
                    <div id="validation-editor-preview-content">
                        <!-- Live preview content will be inserted here -->
                    </div>
                    <div class="error-display hidden" id="error-display-validation-editor">
                        <strong>Error:</strong> <span class="error-message"></span>
                    </div>
                </div>
            </div>
        </div>

        <!-- Interactive Section -->
        <div id="interactive" class="content-section">
            <h2 class="section-title">🎮 Interactive Demo</h2>
            <p>Try out a complete interactive form with JavaScript validation and real-time feedback.</p>

            <div class="element-demo">
                <div class="element-label">Interactive Form Features</div>
                <div class="structure-visual">
&lt;<span class="tag">form</span> <span class="attribute">onsubmit</span>=<span class="value">"handleSubmit(event)"</span>&gt;<br>
&nbsp;&nbsp;&lt;<span class="tag">input</span> <span class="attribute">onchange</span>=<span class="value">"validateField(this)"</span>&gt;<br>
&nbsp;&nbsp;&lt;<span class="tag">button</span> <span class="attribute">type</span>=<span class="value">"submit"</span>&gt;<span class="content">Submit</span>&lt;/<span class="tag">button</span>&gt;<br>
&lt;/<span class="tag">form</span>&gt;
                </div>
                <div class="element-comment">JavaScript makes forms truly interactive</div>
            </div>

            <div class="interactive-demo">
                <h3>Interactive Form Demo</h3>
                <p>Click to see an interactive form in action:</p>
                <button class="demo-button" onclick="showDemoResult('interactive')">Show Interactive Form</button>
                <div id="interactiveResult" class="demo-result">
                    <div style="text-align: left;">
                        <form style="background: rgba(255,255,255,0.1); padding: 1rem; border-radius: 8px;">
                            <label style="display: block; margin-bottom: 0.5rem; color: white;">Username:</label>
                            <input type="text" placeholder="Enter username" style="width: 100%; padding: 0.5rem; margin-bottom: 1rem; border-radius: 4px; border: 1px solid #ccc;">
                            
                            <label style="display: block; margin-bottom: 0.5rem; color: white;">Password:</label>
                            <input type="password" placeholder="Enter password" style="width: 100%; padding: 0.5rem; margin-bottom: 1rem; border-radius: 4px; border: 1px solid #ccc;">
                            
                            <label style="display: block; margin-bottom: 0.5rem; color: white;">
                                <input type="checkbox" style="margin-right: 0.5rem;"> I agree to the terms
                            </label>
                            
                            <button type="button" style="background: #3b82f6; color: white; border: none; padding: 0.5rem 1rem; border-radius: 4px; cursor: pointer;">Create Account</button>
                        </form>
                    </div>
                </div>
            </div>

            <!-- Live Code Editor -->
            <div class="live-editor-section">
                <h3>🎮 Live Code Editor - Interactive Demo</h3>
                <div class="live-editor-container">
                    <div class="live-editor-header">
                        <div class="live-editor-title">
                            <div class="language-icon html">HTML</div>
                            <span>interactive.html</span>
                        </div>
                        <div class="live-editor-actions">
                            <button class="live-editor-btn" onclick="copyCode('interactive-editor')">Copy</button>
                            <button class="live-editor-btn primary" onclick="executeCode('interactive-editor')">Run</button>
                            <button class="live-editor-btn success" onclick="resetCode('interactive-editor')">Reset</button>
                        </div>
                    </div>
                    <div id="interactive-editor" class="monaco-editor"></div>
                    <div class="live-editor-footer">
                        <div class="live-editor-stats">
                            <span id="interactive-editor-lines">0 lines</span>
                            <span id="interactive-editor-chars">0 characters</span>
                        </div>
                        <div class="live-editor-status">
                            <div class="status-indicator"></div>
                            <span>Live Editor Ready</span>
                        </div>
                    </div>
                </div>
                <div class="live-preview" id="interactive-editor-preview">
                    <div class="live-preview-header">
                        <div class="live-preview-title">Live Preview</div>
                    </div>
                    <div id="interactive-editor-preview-content">
                        <!-- Live preview content will be inserted here -->
                    </div>
                    <div class="error-display hidden" id="error-display-interactive-editor">
                        <strong>Error:</strong> <span class="error-message"></span>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <script src="script.js"></script>
</body>
</html>`;

function rebuildFormsModule() {
	const modulePath = path.join(
		__dirname,
		"..",
		"traditional-web-stack",
		"11-html-forms"
	);
	const indexPath = path.join(modulePath, "index.html");

	console.log("🔧 Rebuilding Forms Module...");

	// Write the complete HTML
	fs.writeFileSync(indexPath, formsHTML);
	console.log("✅ Forms module HTML rebuilt");

	// Verify the rebuild
	const htmlContent = fs.readFileSync(indexPath, "utf8");
	const sections = htmlContent.match(/class="content-section"/g);
	const editors = htmlContent.match(/class="monaco-editor"/g);
	const navButtons = htmlContent.match(/onclick="showSection\('[^']+'\)"/g);

	console.log(`📊 Verification:`);
	console.log(`   - Content sections: ${sections ? sections.length : 0}`);
	console.log(`   - Live editors: ${editors ? editors.length : 0}`);
	console.log(`   - Navigation buttons: ${navButtons ? navButtons.length : 0}`);

	if (
		sections &&
		sections.length === 5 &&
		editors &&
		editors.length === 5 &&
		navButtons &&
		navButtons.length === 5
	) {
		console.log("🎉 Forms module is now fully functional!");
	} else {
		console.log("❌ Some issues remain - please check manually");
	}
}

// Run the rebuild
if (require.main === module) {
	rebuildFormsModule();
}

module.exports = { rebuildFormsModule };
