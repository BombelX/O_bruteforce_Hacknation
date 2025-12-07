"use client";

import { JSX } from "react"; // Poprawiony import dla React 19/Next 15
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { logoutAction } from "@/app/login/actions";

interface NavbarProps {
  isLoggedIn: boolean;
}

function Navbar({ isLoggedIn }: NavbarProps): JSX.Element {
  const router = useRouter();

  const handleLogout = async () => {
    // 1. Wywołaj akcję serwerową, aby usunąć ciasteczka
    await logoutAction();
    // 2. Odśwież router, aby Layout ponownie sprawdził ciasteczka i przekazał false
    router.refresh();
    // 3. Opcjonalnie przekieruj na login
    router.push("/login");
  };

  return (
    <div className="navbar bg-blue-300 shadow-lg border-b border-primary/20 px-4 sm:px-8 py-3">
      <div className="flex-1">
        <Link
          href="/home"
          className="btn bg-blue-300 text-xl text-primary normal-case h-auto py-2 gap-4"
        >
          {/* Upewnij się, że masz ten obrazek w public/images/ */}
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
            <Link href="/add" className="btn bg-blue-300 text-gray-800 px-4 sm:px-6 text-base">
              Dodaj Zgubę
            </Link>
          </li>

          {isLoggedIn ? (
            <>
              <li>
                <button onClick={handleLogout} className="btn btn-error text-white px-6">
                  Wyloguj
                </button>
              </li>
              <li className="hidden md:flex">
                <div className="avatar avatar-placeholder cursor-default hover:bg-blue-300">
                  <div className="bg-neutral text-neutral-content w-12 rounded-full">
                    <span className="text-3xl">U</span>
                  </div>
                </div>
              </li>
            </>
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
