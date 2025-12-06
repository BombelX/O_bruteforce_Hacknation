"use client";
import Image from "next/image";
import {useState} from "react";


export default function Home()
{
  const [counter , setCounter] = useState(0);
  const [inputValue, setInputValue] = useState("");


  
  // const testdata = fetch("http://localhost:3100/route1/test").then(res => res.json()); 
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black flex-col">
      <div className="w-screen h-[20vw] bg-blue-900 justify-center flex items-center text-3xl">
        <input value={inputValue} onChange={e => setInputValue(e.target.value)} placeholder="Type here" className="input" />
      </div>
      <div className="w-screen h-[5vw] bg-gray-400 flex items-center justify-center text-white text-2xl flex-row gap-4 ">
        <button className="btn btn-primary">Dodaj Rekord do bazy danych </button>
        <button className="btn btn-secondary">Wyswietl Rekordy z bazy danych</button>
      </div>



    </div>
  );
}
