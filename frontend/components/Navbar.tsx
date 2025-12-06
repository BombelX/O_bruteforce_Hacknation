"use client";

import { JSX } from "react/jsx-dev-runtime";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

function Navbar(): JSX.Element {
  const router = useRouter();

  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [userName, setUserName] = useState("Starosta_JanK");

  const handleLogout = () => {
    setIsLoggedIn(false);
    router.push("/login");
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
    setUserName("Urzednik_XYZ");
    router.push("/");
  };

  return (
    <div className="navbar bg-blue-300 shadow-lg border-b border-primary/20 px-4 sm:px-8 py-3 " >
      <div className="flex-1 flex ">
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
          <span className="text-xl font-bold text-gray-800 hidden sm:inline">
            | Biuro Rzeczy Znalezionych
          </span>
        </Link>
      </div>

      <div className="flex-none">
        <ul className="menu menu-horizontal p-0 items-center gap-3 sm:gap-4">
          <li>
            <Link href="/add" className="btn bg-blue-300 text-gray-800 px-4 sm:px-6 text-base hover:scale-105 hover:bg-gray-800  hover:text-blue-300 transition duration-300">
              Dodaj Zgubę
            </Link>
          </li>

          {isLoggedIn ? (
            <>
              <li className="hidden md:flex">
                <div className="avatar avatar-placeholder">
                  <div className="bg-neutral text-neutral-content w-12 rounded-full">
                    <span className="text-3xl">D</span>
                  </div>
                </div>
              </li>

              <li>
                <button onClick={handleLogout} className="btn btn-error text-white px-6 hover:scale-105 hover:bg-red-700 transition duration-300">
                  Wyloguj
                </button>
              </li>
            </>
          ) : (
            <li>
              <button onClick={handleLogin} className="btn btn-primary text-white px-6">
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
