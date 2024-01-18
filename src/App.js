import { useCallback, useEffect, useRef, useState } from 'react';
import './App.css';

function App() {
  const [length, setLength] = useState(6)
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [characterAllowed, setCharacterAllowed] = useState(false);
  const [password, setPassword] = useState("");

  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTWXYZabcdefghijklmnopqrstuvwxyz"



    if (numberAllowed) str += "123456789";
    if (characterAllowed) str += "~`!@#$%^&*()_+-=[]{}";

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char)
    }

    setPassword(pass)

  }, [length, numberAllowed, characterAllowed, setPassword])

  const copyPasswordToClipBoard = useCallback(() => {
    passwordRef.current?.select()
    window.navigator.clipboard.writeText(password);
  })

  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, characterAllowed, passwordGenerator])

  return (
    <div className=' bg-red-500 w-full h-screen'>
      <div className="absolute bg-slate-800 w-1/2 m-auto top-1/2 py-8 left-96 rounded-3xl">
        <h1 className='text-5xl text-center text-white'>Password Generator</h1>
        <div className='text-center mt-4'>
          <input type="text" ref={passwordRef} value={password} className='w-96 h-12 rounded-xl text-center' placeholder='Password' />
          <button onClick={copyPasswordToClipBoard} className='ml-4 h-12 bg-blue-900 text-white w-14 rounded-xl'>Copy</button>
        </div>
        <div className='text-center space-x-2 text-white'>
          <input type="range" min={6} max={100} onChange={(e) => { setLength(e.target.value) }} className='cursor-pointer mt-4' />
          <label>Length : {length}</label>
          <input type="checkbox" className='' defaultChecked={numberAllowed} onChange={(prev) => {
            setNumberAllowed((prev) => !prev)
          }} />
          <label>Number</label>
          <input type="checkbox" className='' defaultChecked={characterAllowed} onChange={(prev) => {
            setCharacterAllowed((prev) => !prev)
          }} />
          <label>Character</label>
        </div>
      </div>
    </div>
  )
}

export default App;
