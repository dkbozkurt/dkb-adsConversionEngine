const fs = require('fs');
const path = require('path');
const { minify } = require('html-minifier');
const readline = require('readline');

// Paths to input and output directories
const inputDir = path.join(__dirname, 'input');
const outputDir = path.join(__dirname, 'output');
const outputFile = path.join(outputDir, 'index.html');

// Ensure the output directory exists
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true }); // Create the output directory if it does not exist
}

// Read input files
const html = fs.readFileSync(path.join(inputDir, 'index.html'), 'utf8');
const css = fs.readFileSync(path.join(inputDir, 'styles.css'), 'utf8');
const js = fs.readFileSync(path.join(inputDir, 'script.js'), 'utf8');

// Merge HTML, CSS, and JS into a single file
const cssInline = `<style>${css}</style>`;
const jsInline = `<script>${js}</script>`;
let mergedHtml = html
    .replace('</head>', `${cssInline}</head>`)
    .replace('</body>', `${jsInline}</body>`);

// Function to handle the user input
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Do you want to inline and minify the final HTML? (y/n): ', (answer) => {
    if (answer.toLowerCase() === 'y') {
        // Minify the merged HTML content
        mergedHtml = minify(mergedHtml, {
            collapseWhitespace: true,
            removeComments: true,
            removeRedundantAttributes: true,
            useShortDoctype: true,
            minifyCSS: true,
            minifyJS: true
        });
    }

    // Write the (possibly minified) content to the output file
    fs.writeFileSync(outputFile, mergedHtml, 'utf8');
    console.log('Merged file created at:', outputFile);

    rl.close();
});
