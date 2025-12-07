"use client";

import { JSX } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { logoutAction } from "@/app/login/actions";

interface NavbarProps {
  isLoggedIn: boolean;
  userName?: string | null; 
}

function Navbar({ isLoggedIn, userName }: NavbarProps): JSX.Element {
  const router = useRouter();

  const handleLogout = async () => {
    await logoutAction();
    router.refresh();
    router.push("/login");
  };

  const currentUserName = userName || "Użytkownik"; 
  const firstLetter = currentUserName ? currentUserName[0].toUpperCase() : 'U';

  return (
    <div className="navbar bg-blue-300 shadow-lg border-b border-primary/20 px-4 sm:px-8 py-3">
      <div className="flex-1">
        <Link
          href="/home"
          className="btn bg-blue-300 text-xl text-primary normal-case h-auto py-2 gap-4"
        >
          <Image
            src="/images/logoMC.png"
            alt="Logo"
            width={80}
            height={80}
            className="rounded-md"
          />
          <h1 className="text-xl font-bold text-gray-800 hidden sm:inline">
            | Biuro Rzeczy Znalezionych
          </h1>
        </Link>
      </div>

      <div className="flex-none">
        <ul className="menu menu-horizontal p-0 items-center gap-3 sm:gap-4">

          {isLoggedIn ? (
            <li>
              <Link href="/add" className="btn bg-blue-300 text-gray-800 px-4 sm:px-6 text-base">
                Dodaj Zgubę
              </Link>
            </li>
          ) : null}

          {isLoggedIn ? (
           
            <li className="hidden md:flex items-center"> 
              
             
              <span className="text-sm text-gray-700 mr-2 hidden lg:inline">
                  Jesteś zalogowany jako {currentUserName}
              </span>

              <div className="dropdown dropdown-end"> 
                
              
                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                  <div className="bg-neutral text-neutral-content w-10 rounded-full">
                    <span className="text-xl">
                        {firstLetter} 
                    </span>
                  </div>
                </div>

                
                <ul
                  tabIndex={0}
                  className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-primary rounded-box w-52"
                > 
                  <li onClick={handleLogout}>
                    <a>Wyloguj</a>
                  </li>
                </ul>
              </div>
            </li>
          ) : (
           
            <li>
              <Link href="/login" className="btn btn-primary text-white px-6">
                Zaloguj się
              </Link>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}

export default Navbar;