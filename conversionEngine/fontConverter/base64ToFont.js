const fs = require('fs');
const path = require('path');

// Paths to input and output directories
const inputDir = path.join(__dirname, 'input_base64');
const outputDir = path.join(__dirname, 'output_fonts');

// Ensure the output directory exists
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true }); // Create the output directory if it does not exist
}

// Helper function to generate a unique file name
const generateUniqueFileName = (baseName, extension) => {
    let outputFilePath = path.join(outputDir, `${baseName}${extension}`);
    let counter = 1;
    while (fs.existsSync(outputFilePath)) {
        outputFilePath = path.join(outputDir, `${baseName}(${counter})${extension}`);
        counter++;
    }
    return outputFilePath;
};

// Read the contents of the input directory
fs.readdir(inputDir, (err, files) => {
    if (err) {
        console.error('Error reading input directory:', err);
        return;
    }

    // Filter for .txt files
    const txtFiles = files.filter(file => path.extname(file).toLowerCase() === '.txt');

    txtFiles.forEach(file => {
        const inputFilePath = path.join(inputDir, file);
        const baseNameWithPrefix = path.basename(file, path.extname(file));
        let extension = '';
        let baseName = '';

        // Determine file extension and base name based on prefix
        if (baseNameWithPrefix.startsWith('o_')) {
            extension = '.otf';
            baseName = baseNameWithPrefix.slice(2); // Remove the prefix 'o_'
        } else if (baseNameWithPrefix.startsWith('j_')) {
            extension = '.json';
            baseName = baseNameWithPrefix.slice(2); // Remove the prefix 'j_'
        } else {
            console.warn(`Skipping file ${file} due to unrecognized prefix`);
            return;
        }

        const outputFilePath = generateUniqueFileName(baseName, extension);

        // Read the base64 file
        fs.readFile(inputFilePath, 'utf8', (err, data) => {
            if (err) {
                console.error(`Error reading base64 file ${file}:`, err);
                return;
            }

            // Convert base64 to binary
            const buffer = Buffer.from(data, 'base64');

            // Write the binary data to a font file
            fs.writeFile(outputFilePath, buffer, (err) => {
                if (err) {
                    console.error(`Error writing font file ${outputFilePath}:`, err);
                    return;
                }
                console.log(`Converted ${file} to ${extension} and saved to: ${outputFilePath}`);
            });
        });
    });
});
