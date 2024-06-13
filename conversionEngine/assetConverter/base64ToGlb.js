const fs = require('fs');
const path = require('path');

// Paths to input and output directories
const inputDir = path.join(__dirname, 'input_base64');
const outputDir = path.join(__dirname, 'output_glb');

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

    // Filter for .txt files
    const txtFiles = files.filter(file => path.extname(file) === '.txt');

    txtFiles.forEach(file => {
        const inputFilePath = path.join(inputDir, file);
        const outputFilePath = path.join(outputDir, `${path.basename(file, '.txt')}.glb`);

        // Read the base64 file
        fs.readFile(inputFilePath, 'utf8', (err, data) => {
            if (err) {
                console.error(`Error reading base64 file ${file}:`, err);
                return;
            }

            // Convert base64 to binary
            const buffer = Buffer.from(data, 'base64');

            // Write the binary data to a .glb file
            fs.writeFile(outputFilePath, buffer, (err) => {
                if (err) {
                    console.error(`Error writing .glb file ${outputFilePath}:`, err);
                    return;
                }
                console.log(`Converted ${file} to .glb and saved to: ${outputFilePath}`);
            });
        });
    });
});
