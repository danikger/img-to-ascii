import { useEffect, useState } from 'react';

// Function to process and sort pixels by color and luminosity
const sortPixelsByColor = async (img) => {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  canvas.width = img.width;
  canvas.height = img.height;

  ctx.drawImage(img, 0, 0);
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const pixels = [];

  // Convert pixels to an array of objects with color information
  for (let i = 0; i < imageData.data.length; i += 4) {
    const r = imageData.data[i];
    const g = imageData.data[i + 1];
    const b = imageData.data[i + 2];
    const a = imageData.data[i + 3];

    // Calculate luminosity
    const luminosity = (r + g + b) / 3;

    // Determine color group
    let colorGroup;
    const threshold = 3;
    if (Math.abs(r - g) < 10 && Math.abs(g - b) < 10 && Math.abs(r - b) < 10) {
      colorGroup = 0; // grayscale
    } else if (r > g * threshold && r > b * threshold) {
      colorGroup = 1; // red
    } else if (g > r * threshold && g > b * threshold) {
      colorGroup = 2; // green
    } else if (b > r * threshold && b > g * threshold) {
      colorGroup = 3; // blue
    } else if (r > b && g > b) {
      colorGroup = 4; // yellow
    } else if (r > g && b > g) {
      colorGroup = 5; // magenta
    } else if (g > r && b > r) {
      colorGroup = 6; // cyan
    } else {
      colorGroup = 7; // mixed colors
    }

    pixels.push({
      r, g, b, a, colorGroup, luminosity
    });
  }

  // Sort pixels by color group first, then by luminosity
  pixels.sort((a, b) => {
    if (a.colorGroup !== b.colorGroup) {
      return a.colorGroup - b.colorGroup;
    }
    return b.luminosity - a.luminosity;
  });

  // Put sorted pixels back into imageData
  for (let i = 0; i < pixels.length; i++) {
    const pixel = pixels[i];
    imageData.data[i * 4] = pixel.r;
    imageData.data[i * 4 + 1] = pixel.g;
    imageData.data[i * 4 + 2] = pixel.b;
    imageData.data[i * 4 + 3] = pixel.a;
  }

  ctx.putImageData(imageData, 0, 0);
  return canvas.toDataURL();
};

const processImage = async (imageURL) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = imageURL;

    img.onload = async () => {
      try {
        const sortedDataUrl = await sortPixelsByColor(img);
        resolve(sortedDataUrl);
      } catch (err) {
        reject("Error processing the image.");
      }
    };

    img.onerror = () => {
      reject("Failed to load the image.");
    };
  });
};

export default processImage;
