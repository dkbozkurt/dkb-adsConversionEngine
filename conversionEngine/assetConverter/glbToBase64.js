const fs = require('fs');
const path = require('path');

// Paths to input and output directories
const inputDir = path.join(__dirname, 'input');
const outputDir = path.join(__dirname, 'output');

// Ensure the output directory exists
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true }); // Create the output directory if it does not exist
}

// Read the contents of the input directory
fs.readdir(inputDir, (err, files) => {
    if (err) {
        console.error('Error reading input directory:', err);
        return;
    }

    // Filter for .glb files
    const glbFiles = files.filter(file => path.extname(file) === '.glb');

    glbFiles.forEach(file => {
        const inputFilePath = path.join(inputDir, file);
        const outputFilePath = path.join(outputDir, `${path.basename(file, '.glb')}.txt`);

        // Read the .glb file
        fs.readFile(inputFilePath, (err, data) => {
            if (err) {
                console.error(`Error reading .glb file ${file}:`, err);
                return;
            }

            // Convert to base64
            const base64 = data.toString('base64');

            // Write the base64 string to a file
            fs.writeFile(outputFilePath, base64, (err) => {
                if (err) {
                    console.error(`Error writing base64 file ${outputFilePath}:`, err);
                    return;
                }
                console.log(`Converted ${file} to base64 and saved to: ${outputFilePath}`);
            });
        });
    });
});
