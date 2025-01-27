import { useState, useEffect } from 'react';
import processImage from './Components/processImage';
import FileDropzone from './Components/fileDropzone';
import ImageComparison from './Components/imageComparison';
import Header from './Components/header';
import './App.css';

function App() {
  const [imageURL, setImageURL] = useState("");
  const [sortedImage, setSortedImage] = useState(null);
  const [loading, setLoading] = useState(false);

  /**
   * Handles the file upload event from the dropzone component.
   * 
   * @param {File} image Image file that was uploaded through the dropzone. 
   */
  function handleFileUpload(image) {
    const url = URL.createObjectURL(image);
    setImageURL(url);
  }

  useEffect(() => {
    async function processImageAsync() {
      if (imageURL) {
        try {
          setLoading(true);
          const sorted = await processImage(imageURL);
          setSortedImage(sorted);
          setLoading(false);
        } catch (error) {
          // console.error("Error processing image: ", error);
        }
      }
    };

    processImageAsync();
  }, [imageURL]);

  return (
    <>
      <Header />
      <main className="bg-zinc-100 min-h-screen relative size-full px-4">
        <div className="max-w-screen-lg mx-auto pt-10 sm:pt-16 px-2 pb-16">
          <FileDropzone className="mb-28 sm:w-1/2" onFileUpload={handleFileUpload} />
          <ImageComparison imageURL={imageURL} sortedURL={sortedImage} loading={loading} />
        </div>
      </main>
    </>
  )
}

export default App
