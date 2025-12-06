"use client";

import { JSX } from "react/jsx-dev-runtime";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import { useState } from "react";
function Navbar(): JSX.Element {
    const router = useRouter(); 
    
    
    const [isLoggedIn, setIsLoggedIn] = useState(true); 
    const [userName, setUserName] = useState("Starosta_JanK"); 

   
    const handleLogout = () => {
        setIsLoggedIn(false);
        router.push('/login'); 
    };

  
    const handleLogin = () => {
        
        setIsLoggedIn(true);
        setUserName("Urzednik_XYZ");
        router.push('/'); 
    }

    return (
        <div className="navbar bg-base-100 shadow-lg border-b border-primary/20">
            <div className="flex-1">
               
                <Link href="/home" className="btn btn-ghost text-xl text-primary normal-case">
                    
                    <h1 className="ml-2 font-bold text-xl">BRZ</h1>
                </Link>
                <span className="text-sm text-gray-500 hidden sm:inline"> | Biuro Rzeczy Znalezionych</span>
            </div>

            <div className="flex-none">
                <ul className="menu menu-horizontal p-0 items-center">
                    
                   
                    
                    <li><Link href="/add" className="btn btn-ghost">Dodaj Zgubę</Link></li>

                 
                    {isLoggedIn ? (
                        <>
                            
                            <li className="hidden md:flex">
                                <span className="text-sm font-semibold text-success mr-4 p-2">
                                    Zalogowano jako: **{userName}**
                                </span>
                            </li>
                            
                            
                            <li>
                                <button onClick={handleLogout} className="btn btn-error text-white">
                                    Wyloguj
                                </button>
                            </li>
                        </>
                    ) : (
                        
                        <li>
                            <button onClick={handleLogin} className="btn btn-primary text-white">
                                Zaloguj się
                            </button>
                        </li>
                    )}
                </ul>
            </div>
        </div>
    );
}
export default Navbar;