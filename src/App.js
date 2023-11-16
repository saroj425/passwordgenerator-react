import logo from './logo.svg';
import './App.css';
import React, { useCallback, useEffect, useRef, useState } from "react"

function App() {
  const [length,setLength] = useState(8);
  const [numAllowed,setNumAloowed] = useState(false);
  const [charAllowed,setCharAloowed] = useState(false);
const [password,setPassword] = useState("");

const genPassword = useCallback(()=>{
  let pass = "";
  let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  if(numAllowed) str+= "0123456789";
  if(charAllowed) str+="!#$%&'()*+,-./:;<=>?@[\]^_`{|}~";

  for(let i =1; i<=length;i++){
    let char = Math.floor(Math.random() * str.length + 1);
    pass += str.charAt(char);
  }
  setPassword(pass)

},[length,numAllowed,charAllowed,setPassword])

const copyPasswordtoClipboard = useCallback(()=>{
  window.navigator.clipboard.writeText(password);
  passwordRef.current?.select()
},[password])

 
const passwordRef = useRef(null)

useEffect(()=>{
  genPassword()

},[length,numAllowed,charAllowed,genPassword])


  return (
    <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-orange-500 bg-gray-800'>
      <h1 className="text-4xl text-center">Password Generator</h1>
      <div className='flex shadow rounded-lg overflow-hidden mb-4'>
        <input type="text"
          value={password}
          className='outline-none w-full py-1 px-3'
          placeholder='Password'
          readOnly
          ref={passwordRef}
        />
        <button className='outline-none bg-blue-500 text-yellow-200 px-1 py-0.5 shrink-0' onClick={copyPasswordtoClipboard}>Copy</button>
      </div>
      <div className='flex text-sm gap-x-1'>
        <div className='flex items-center gap-x-1'>
          <input type="range"
          min={6}
          max={100}
          value={length} 
          className='cursor-pointer' onChange={(e)=>{setLength(e.target.value)}}/>
          <label>Length : {length}</label>
        </div>
        <div className='flex items-center gap-x-1'>
          <input type="checkbox"
          defaultChecked = {numAllowed}
          className='cursor-pointer' onChange={()=>{setNumAloowed((prev)=> !prev)}}/>
          <label>Numbers</label>
        </div>
        <div className='flex items-center gap-x-1'>
          <input type="checkbox"
          defaultChecked = {charAllowed}
          className='cursor-pointer' onChange={()=>{setCharAloowed((prev)=> !prev)}}/>
          <label>Charactors</label>
        </div>
      </div>
    </div>
  );
}

export default App;
