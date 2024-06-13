const fs = require('fs');
const path = require('path');

// Paths to input and output directories
const inputDir = path.join(__dirname, 'input_base64');
const outputDir = path.join(__dirname, 'output_mp3');

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
        const baseName = path.basename(file, path.extname(file));
        const outputFilePath = generateUniqueFileName(baseName, '.mp3');

        // Read the base64 file
        fs.readFile(inputFilePath, 'utf8', (err, data) => {
            if (err) {
                console.error(`Error reading base64 file ${file}:`, err);
                return;
            }

            // Convert base64 to binary
            const buffer = Buffer.from(data, 'base64');

            // Write the binary data to an .mp3 file
            fs.writeFile(outputFilePath, buffer, (err) => {
                if (err) {
                    console.error(`Error writing .mp3 file ${outputFilePath}:`, err);
                    return;
                }
                console.log(`Converted ${file} to .mp3 and saved to: ${outputFilePath}`);
            });
        });
    });
});
