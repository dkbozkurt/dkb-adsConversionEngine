const fs = require('fs');
const path = require('path');

// Paths to input and output files
const inputFilePath = path.join(__dirname, '..', 'feMerge', 'output', 'model_base64.txt');
const outputFilePath = path.join(__dirname, '..', 'feMerge', 'output', 'model.glb');

// Read the base64 file
fs.readFile(inputFilePath, 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading base64 file:', err);
        return;
    }

    // Convert base64 to binary
    const buffer = Buffer.from(data, 'base64');

    // Write the binary data to a .glb file
    fs.writeFile(outputFilePath, buffer, (err) => {
        if (err) {
            console.error('Error writing .glb file:', err);
            return;
        }
        console.log('Converted base64 to .glb and saved to:', outputFilePath);
    });
});
