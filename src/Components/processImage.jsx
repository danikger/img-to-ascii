export const processImage = async (imageFile, charCount, invert) => {
  const loadImageToCanvas = async (file) => {
    if (!(file instanceof File)) {
      throw new Error("Provided input is not a valid file.");
    }

    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = () => reject(new Error("Failed to load image."));
      img.src = URL.createObjectURL(file);
    });
  };

  try {
    const img = await loadImageToCanvas(imageFile);

    // const width = 100; // Adjust ASCII art width here
    const width = charCount; // Adjust ASCII art width here
    const aspectRatio = img.height / img.width;
    const height = Math.round(width * aspectRatio);

    // Create a small canvas to get pixel data
    const smallCanvas = document.createElement("canvas");
    const smallContext = smallCanvas.getContext("2d");
    smallCanvas.width = width;
    smallCanvas.height = height;

    smallContext.drawImage(img, 0, 0, width, height);
    const imageData = smallContext.getImageData(0, 0, width, height);

    const asciiChars = invert === true ? " .:-=+*#%@" : "@%#*+=-:. "

    // Build SVG content
    const characterWidth = 6; // Approximate monospace character width
    const characterHeight = 10; // Approximate monospace character height
    const adjustedHeight = characterHeight * 0.6; // Adjust for aspect ratio (2:1)
    const svgWidth = width * characterWidth;
    const svgHeight = height * adjustedHeight;

    let svgContent = `<svg xmlns="http://www.w3.org/2000/svg" width="${svgWidth}" height="${svgHeight}" style="background-color: black;">`;

    svgContent += `<style>
      text {
        font-family: monospace;
        font-size: 10px;
        fill: white;
      }
    </style>`;

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const index = (y * width + x) * 4;
        const r = imageData.data[index];
        const g = imageData.data[index + 1];
        const b = imageData.data[index + 2];

        // Convert to grayscale
        const gray = Math.round((r + g + b) / 3);

        // Map grayscale to ASCII characters
        const charIndex = Math.floor((gray / 255) * (asciiChars.length - 1));
        const asciiChar = asciiChars[charIndex];

        // Add a <text> element to the SVG
        svgContent += `<text x="${x * characterWidth}" y="${y * adjustedHeight}">${asciiChar}</text>`;
      }
    }

    svgContent += `</svg>`;

    // Convert the SVG content to a data URL
    const svgBlob = new Blob([svgContent], { type: "image/svg+xml" });
    const svgUrl = URL.createObjectURL(svgBlob);

    return svgUrl; // Return the SVG as a URL
  } catch (error) {
    console.error("Error processing image:", error.message);
    throw error; // Propagate the error to the calling code
  }
};

export default processImage;
