function Settings({onCharChange, onInvertChange, charCount, invert}) {
  return (
    <div className="bg-zinc-200 p-4 sm:w-1/2 rounded-lg mx-auto mb-16">
      <h3 className="font-bold text-zinc-900 mb-4 text-lg">Settings</h3>
      <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8">
        <div className="flex flex-row items-center w-full sm:w-2/3">
          <label htmlFor="characters-input" className="text-sm font-medium text-zinc-800 mr-3">Characters</label>
          <div className="flex items-center gap-2">
            <input id="characters-input" type="range" min="20" max="200" className="w-full h-2 bg-zinc-100 rounded-lg appearance-none cursor-pointer range-sm" onChange={(e) => onCharChange(e.target.value)} />
            <span className="text-zinc-800 text-sm w-8">{charCount}</span>
          </div>
        </div>

        <label className="inline-flex items-center cursor-pointer w-full sm:w-1/3">
          <span className="mr-3 text-sm font-medium text-zinc-800">Invert</span>
          <input type="checkbox" value={invert} className="sr-only peer" onChange={(e) => onInvertChange(e.target.value)} />
          <div className="relative w-11 h-6 bg-zinc-400 peer-focus:outline-none rounded-full 
                peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] 
                after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 
                after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"
          ></div>
        </label>
      </div>
    </div>
  );
}

export default Settings;