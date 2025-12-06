"use client";
import Image from "next/image";
import {useState} from "react";


export default function Home()
{
  const [counter , setCounter] = useState(0);
  const [inputValue, setInputValue] = useState("");


  
  // const testdata = fetch("http://localhost:3100/route1/test").then(res => res.json()); 
  return (
    <div className="flex min-h-screen   bg-zinc-50 font-sans dark:bg-black flex-col">
      <div className="flex bg-red-500 w-max h-[10vw]">
        <div className="h-[10vw] w-[10vw] bg-yellow-200"></div>
        <div className="w-[80vw] h-[10vw] bg-green-200"></div>
        <div className="w-[10vw] h-[10vw] bg-blue-200"></div>
      </div>
      <div className="flex-grow flex ">
        <div className="h-[20vw] w-[10vw] bg-yellow-500"></div>
        <div className="w-[80vw] h-[20vw] bg-green-500  items-center pt-6 flex flex-col gap-4">
          <button className="btn btn-primary"></button>
        </div>
        <div className="w-[10vw] h-[20vw] bg-blue-500"></div>
      </div>
      <div></div>



    </div>
  );
}
