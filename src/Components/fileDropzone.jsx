import { useDropzone } from 'react-dropzone'
import { useCallback } from 'react';

export default function FileDropzone({ onFileUpload, className }) {

  const onDrop = useCallback(acceptedFiles => {
    if (acceptedFiles.length > 0) {
      onFileUpload(acceptedFiles[0]);
    }
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'image/png': [], // PNG
      'image/jpeg': [], // JPEG
    },
    maxFiles: 1, // 1 file limit
    onDrop,
  })

  return (
    <div {...getRootProps()} className={`flex flex-col items-center justify-center mx-auto rounded-xl border-2 border-dashed border-zinc-300 p-16 ${isDragActive ? ' bg-zinc-200' : 'bg-zinc-100'} ${className}`}>
      <label htmlFor="file-upload" className="sr-only">Upload your image</label>
      <input id="file-upload" {...getInputProps()} />
      <p className="text-zinc-800 mb-1 font-medium text-center">Drag & drop your image</p>
      <p className="text-zinc-800 text-sm">or</p>
      <button type="button" className="mt-2 flex py-2 px-6 rounded-md text-sm font-medium text-zinc-900 bg-zinc-300 hover:bg-zinc-400">
        Select File
      </button>
    </div>
  );
}