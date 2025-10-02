#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

function testStreamlinedFlexbox() {
    console.log("🧪 Testing Streamlined CSS Flexbox Module...\n");
    
    const modulePath = path.join(__dirname, "..", "traditional-web-stack", "04-css-flexbox");
    const scriptPath = path.join(modulePath, "script.js");
    
    console.log("📝 Testing streamlined CSS Flexbox module...");
    
    // Read the script content
    const scriptContent = fs.readFileSync(scriptPath, "utf8");
    
    // Check if code examples exist
    const hasCodeExamples = scriptContent.includes("sectionCodeExamples");
    console.log(`   ${hasCodeExamples ? "✅" : "❌"} Code examples: ${hasCodeExamples ? "FOUND" : "MISSING"}`);
    
    // Check for specific sections
    const expectedSections = ["flexbox-basics", "flexbox-advanced"];
    expectedSections.forEach(section => {
        const hasSection = scriptContent.includes(`"${section}"`);
        console.log(`   ${hasSection ? "✅" : "❌"} ${section} example: ${hasSection ? "FOUND" : "MISSING"}`);
    });
    
    // Check for HTML content in examples
    const hasHTMLContent = scriptContent.includes("<!-- ");
    console.log(`   ${hasHTMLContent ? "✅" : "❌"} HTML content: ${hasHTMLContent ? "FOUND" : "MISSING"}`);
    
    // Check for CSS styles in examples
    const hasCSSContent = scriptContent.includes("<style>");
    console.log(`   ${hasCSSContent ? "✅" : "❌"} CSS styles: ${hasHTMLContent ? "FOUND" : "MISSING"}`);
    
    // Check for essential flexbox properties
    const essentialProperties = [
        "display: flex",
        "flex-direction",
        "justify-content",
        "align-items",
        "flex-grow",
        "flex-shrink",
        "flex-basis"
    ];
    
    console.log("\n📊 Essential Flexbox Properties Found:");
    essentialProperties.forEach(property => {
        const hasProperty = scriptContent.includes(property);
        console.log(`   ${hasProperty ? "✅" : "❌"} ${property}: ${hasProperty ? "FOUND" : "MISSING"}`);
    });
    
    // Check for streamlined content (should have fewer examples)
    const streamlinedChecks = [
        "Basic Flex Container",
        "Flex Direction",
        "Justify Content", 
        "Align Items",
        "Flex Grow & Shrink",
        "Flex Basis",
        "Flex Shorthand",
        "Real-World Example"
    ];
    
    console.log("\n🎯 Streamlined Content Found:");
    streamlinedChecks.forEach(check => {
        const hasCheck = scriptContent.includes(check);
        console.log(`   ${hasCheck ? "✅" : "❌"} ${check}: ${hasCheck ? "FOUND" : "MISSING"}`);
    });
    
    // Check for removed content (should not have these)
    const removedContent = [
        "Flex Wrap",
        "Gap Property",
        "Align Self",
        "Order Property",
        "Navbar Layout",
        "Media Layout"
    ];
    
    console.log("\n❌ Removed Content (should be missing):");
    removedContent.forEach(content => {
        const hasContent = scriptContent.includes(content);
        console.log(`   ${hasContent ? "❌" : "✅"} ${content}: ${hasContent ? "STILL PRESENT" : "REMOVED"}`);
    });
    
    // Count total lines of code
    const totalLines = scriptContent.split('\n').length;
    console.log(`\n📈 Total script lines: ${totalLines}`);
    
    // Count code example lines
    const exampleLines = (scriptContent.match(/\n/g) || []).length;
    console.log(`📈 Estimated code example lines: ${Math.floor(exampleLines * 0.3)}`);
    
    console.log("\n🎉 Streamlined CSS Flexbox module testing complete!");
    
    // Summary
    const essentialChecks = [
        hasCodeExamples,
        scriptContent.includes('"flexbox-basics"'),
        scriptContent.includes('"flexbox-advanced"'),
        hasHTMLContent,
        hasCSSContent,
        scriptContent.includes("display: flex"),
        scriptContent.includes("flex-direction"),
        scriptContent.includes("justify-content"),
        scriptContent.includes("align-items"),
        scriptContent.includes("flex-grow"),
        scriptContent.includes("flex-shrink"),
        scriptContent.includes("flex-basis"),
        scriptContent.includes("Basic Flex Container"),
        scriptContent.includes("Real-World Example")
    ];
    
    const passedChecks = essentialChecks.filter(check => check).length;
    const totalChecks = essentialChecks.length;
    
    console.log(`\n📊 Summary: ${passedChecks}/${totalChecks} essential checks passed`);
    
    if (passedChecks === totalChecks) {
        console.log("🎉 CSS Flexbox module is successfully streamlined and ready for use!");
    } else {
        console.log("⚠️  Some essential content may be missing");
    }
}

// Run the test
if (require.main === module) {
    testStreamlinedFlexbox();
}

module.exports = { testStreamlinedFlexbox };
