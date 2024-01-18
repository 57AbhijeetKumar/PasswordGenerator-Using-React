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
    <><div className='w-screen bg-red-500 h-screen'>
      <div className="heading absolute bg-slate-800 w-1/2 h-52 top-48 left-96 rounded-3xl">
        <h1 className='text-5xl text-center text-white'>Password Generator</h1>
        <div>
          <input type="text" ref={passwordRef} value={password} className='w-96 h-12 ml-32 mt-6 rounded-xl text-center' placeholder='Password' />
          <button onClick={copyPasswordToClipBoard} className='ml-4 h-12 bg-blue-900 text-white w-14 rounded-xl'>Copy</button>
        </div>
        <div>
          <input type="range" min={6} max={100} onChange={(e) => { setLength(e.target.value) }} className='cursor-pointer mt-4 ml-36' />
          <label className='text-white ml-4'>Length : {length}</label>
          <input type="checkbox" className='ml-4' defaultChecked={numberAllowed} onChange={(prev) => {
            setNumberAllowed((prev) => !prev)
          }} />
          <label className='text-white ml-2'>Number</label>
          <input type="checkbox" className='ml-4' defaultChecked={characterAllowed} onChange={(prev) => {
            setCharacterAllowed((prev) => !prev)
          }} />
          <label className='text-white ml-2'>Character</label>
        </div>
      </div>
    </div>
    </>
  )
}

export default App;
