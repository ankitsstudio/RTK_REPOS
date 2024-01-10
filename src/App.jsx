import { useCallback, useEffect, useRef } from "react";
import { useState } from "react";

function App() {
  const [password, setPassword] = useState("");
  const [length, setLength] = useState(8);
  const [numbers, setNumbers] = useState(false);
  const [specialChar, setSpecialChar] = useState(false);
  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(()=>{
    let pass = "";
    let str = "QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcbnm";

    if(numbers) str+= "0123456789"
    if(specialChar) str += "!@#$%^&*(){}/?"

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random()*str.length + 1)
      pass += str.charAt(char);
    }
    setPassword(pass);
  },[length,numbers,specialChar,setPassword])

  useEffect(()=>{
    passwordGenerator();
  },[length,numbers,specialChar,setPassword]);

  const copyToClipboard = useCallback(() =>{
    passwordRef.current?.select()
    window.navigator.clipboard.writeText(password);
    // alert("password copied")
  },[password])

  return (
    <div className="bg-gray-700 d-flex text-white text-center rounded width-100 mx-20 my-5">
      <h1 className="text-xl">Password Generator</h1>
      <div className="bg-gray-700 d-flex text-white text-center rounded width-100 m-5">
        <input
          type="email"
          value={password}
          readOnly
          className="m-3 min-w-0 flex-auto rounded-md border-0 bg-white/5 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
          placeholder="Enter your email"
        />
        <button 
        onClick={copyToClipboard}
        className="flex-none rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">
          Copy
        </button>
      </div>
      <div className="bg-gray-700 text-white text-center rounded width-100 mx-20 my-5 d-flex ">
        
          <input
            type="range"
            min={5}
            max={32}
            value={length}
            ref = {passwordRef}
            onChange={(e) => setLength(e.target.value)}
          />
          <label className="text-2xl mr-2"> Length {length} </label>
        
        
          <input
            type="checkbox"
            value={numbers}
            onChange={() => setNumbers((prev)=> prev = !prev)}
          />
          <label className="text-2xl mr-2"> Number </label>
        
        
          <input
            type="checkbox"
            value={specialChar}
            onChange={() => setSpecialChar((prev)=> prev = !prev)}
          />
          <label className="text-2xl mr-2"> Special Char </label>
        
      </div>
    </div>
  );
}

export default App;
