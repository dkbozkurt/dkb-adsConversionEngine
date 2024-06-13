const fs = require('fs');
const path = require('path');

// Paths to input and output directories
const inputDir = path.join(__dirname, 'input_texture');
const outputDir = path.join(__dirname, 'output_base64');

// Ensure the output directory exists
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true }); // Create the output directory if it does not exist
}

// Helper function to generate a unique file name
const generateUniqueFileName = (baseName, prefix, extension) => {
    let outputFilePath = path.join(outputDir, `${prefix}${baseName}${extension}`);
    let counter = 1;
    while (fs.existsSync(outputFilePath)) {
        outputFilePath = path.join(outputDir, `${prefix}${baseName}(${counter})${extension}`);
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

    // Filter for image files
    const imageFiles = files.filter(file => ['.png', '.jpg', '.jpeg'].includes(path.extname(file).toLowerCase()));

    imageFiles.forEach(file => {
        const inputFilePath = path.join(inputDir, file);
        const baseName = path.basename(file, path.extname(file));
        const extension = path.extname(file).toLowerCase();
        let prefix = '';

        // Determine prefix based on file extension
        if (extension === '.png') {
            prefix = 'p_';
        } else if (extension === '.jpg' || extension === '.jpeg') {
            prefix = 'j_';
        }

        const outputFilePath = generateUniqueFileName(baseName, prefix, '.txt');

        // Read the image file
        fs.readFile(inputFilePath, (err, data) => {
            if (err) {
                console.error(`Error reading image file ${file}:`, err);
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
