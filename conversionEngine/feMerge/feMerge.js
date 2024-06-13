const fs = require('fs');
const path = require('path');

// Paths to input and output directories
const inputDir = path.join(__dirname, 'input');
const outputDir = path.join(__dirname, 'output');
const outputFile = path.join(outputDir, 'index.html');

// Ensure the output directory exists
if (!fs.existsSync(outputDir)){
    fs.mkdirSync(outputDir, { recursive: true }); // Create the output directory if it does not exist
}

// Read input files
const html = fs.readFileSync(path.join(inputDir, 'index.html'), 'utf8');
const css = fs.readFileSync(path.join(inputDir, 'styles.css'), 'utf8');
const js = fs.readFileSync(path.join(inputDir, 'script.js'), 'utf8');

// Merge HTML, CSS, and JS into a single file
const mergedHtml = html.replace('</head>', `<style>${css}</style></head>`).replace('</body>', `<script>${js}</script></body>`);

// Write the merged content to the output file
fs.writeFileSync(outputFile, mergedHtml, 'utf8');

console.log('Merged file created at:', outputFile);
