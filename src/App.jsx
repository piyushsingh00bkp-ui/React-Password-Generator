import { useCallback, useState, useEffect, useRef } from "react";

function App() {
  const [length, setLen] = useState(8);
  const [numAll, setNumAll] = useState(false);
  const [charAll, setCharAll] = useState(false);
  const [password, setPassword] = useState("");
  let passwordRef = useRef(null);
  const passwordGen = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    //use ref hook

    if (numAll) str += "1234567890";
    if (charAll) str += "!@#$%^&*()_+-=[]{}|";

    for (let i = 1; i <= length; i++) {
      const char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [length, numAll, charAll]);
  useEffect(() => {
    passwordGen();
  }, [length, numAll, charAll, passwordGen]);
  const copyToCLip = useCallback(() => {
    passwordRef.current?.select();
    // passwordRef.current?.setSelectionRange(2, 5); for selecting in a range
    window.navigator.clipboard.writeText(password);
  }, [password]);

  return (
    <>
      <div className=" w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-orange-300 bg-blue-500">
        <h1 className=" text-center my-3 mx-3"> Password Generator</h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4 text-blue-500 ">
          <input
            type="text"
            value={password}
            className="outline-none w-full py-1 px-3 bg-white text-black"
            placeholder="password"
            readOnly
            ref={passwordRef}
          />
          <button
            className="bg-orange-400 text-white px-3 py-1 shrink-0 cursor-pointer hover:bg-black"
            onClick={copyToCLip}
          >
            copy
          </button>
        </div>
        <div className="flex text-sm gap-x-2">
          <div className="flex item-center gap-x-1">
            <input
              type="range"
              min={6}
              max={100}
              value={length}
              className="cursor-pointer"
              onChange={(e) => setLen(Number(e.target.value))}
            />
            <label>Length : {length}</label>
          </div>
          <div className="flex item-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={numAll}
              id="numberInp"
              onChange={(e) => {
                setNumAll((prev) => !prev);
              }}
            />
            <label htmlFor="numberInp">Numbers</label>
            <input
              type="checkbox"
              defaultChecked={charAll}
              id="charInp"
              onChange={(e) => {
                setCharAll((prev) => !prev);
              }}
            />
            <label htmlFor="charInp">Characters</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
