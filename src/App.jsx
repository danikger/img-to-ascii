import { useState, useEffect } from 'react';
import processImage from './Components/processImage';
import FileDropzone from './Components/fileDropzone';
import ImageComparison from './Components/imageComparison';
import Header from './Components/header';
import Settings from './Components/settings';
import './App.css';

function App() {
  // Image
  const [imageURL, setImageURL] = useState("");
  const [image, setImage] = useState(null);
  const [sortedImage, setSortedImage] = useState(null);

  // Loading state
  const [loading, setLoading] = useState(false);

  // Settings
  const [charCount, setCharCount] = useState(60);
  const [invert, setInvert] = useState(false);

  useEffect(() => {
    processImageAsync();
  }, [imageURL]);


  useEffect(() => {
    // debounce to prevent spamming the processImage function
    const getData = setTimeout(() => {
      processImageAsync();
    }, 300)

    return () => clearTimeout(getData)
  }, [charCount, invert]);


  /**
   * Processes the image and updates the sorted image state.
   */
  async function processImageAsync() {
    if (image) {
      try {
        setLoading(true);
        const sorted = await processImage(image, charCount, invert);
        setSortedImage(sorted);
        setLoading(false);
      } catch (error) {
        // console.error("Error processing image: ", error);
      }
    }
  };


  /**
   * Handles the file upload event from the dropzone component.
   * 
   * @param {File} image Image file that was uploaded through the dropzone. 
   */
  function handleFileUpload(image) {
    const url = URL.createObjectURL(image);
    setImage(image);
    setImageURL(url);
  }


  /**
   * Handles the invert change event from the settings component.
   * @param {Boolean} value - Boolean value to invert the ASCII art.
   */
  function handleInvertChange(value) {
    setInvert((prevValue) => !prevValue);
  }


  /**
   * Handles the character count change event from the settings component.
   * @param {Number} value - Number of characters to display in the ASCII art.
   */
  function handleCharChange(value) {
    setCharCount(value);
  }

  return (
    <>
      <Header />
      <main className="bg-zinc-100 min-h-screen relative size-full px-2">
        <div className="max-w-screen-lg mx-auto pt-10 sm:pt-16 px-2 pb-16">
          <FileDropzone className="mb-28 sm:w-1/2" onFileUpload={handleFileUpload} />
          {imageURL && <Settings onCharChange={handleCharChange} onInvertChange={handleInvertChange} charCount={charCount} invert={invert} />}
          <ImageComparison imageURL={imageURL} sortedURL={sortedImage} loading={loading} />
        </div>
      </main>
    </>
  )
}

export default App
