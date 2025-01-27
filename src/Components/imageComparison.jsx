import { RiLoader5Fill } from "react-icons/ri";

function ImageComparison({ imageURL, sortedURL, loading }) {
  return (
    <div className="flex-col sm:flex-row flex w-full items-center gap-10">
      {imageURL && (
        <div className="sm:w-1/2">
          <h2 className="uppercase text-zinc-800 font-bold mb-2">Original</h2>
          <img src={imageURL} alt="original image" className="w-full" />
        </div>
      )}
      {loading ? (
        <RiLoader5Fill className="size-12 text-zinc-800 my-auto mr-2 animate-spin rounded-full w-1/2" />
      ) : (
        sortedURL && (
          <div className="sm:w-1/2">
            <h2 className="uppercase text-zinc-800 font-bold mb-2">Sorted</h2>
            <img src={sortedURL} alt="sorted image" className="w-full" />
          </div>
        )
      )}
    </div>
  );
}

export default ImageComparison;