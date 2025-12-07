"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { logoutAction } from "@/app/login/actions";

export default function SuccessPage() {
  const router = useRouter();
  return (
    <div className="flex flex-col items-center justify-center min-h-screen  bg-blue-100 p-4 font-sans">
      <div className="rounded-full bg-blue-200 p-4 mb-6 animate-bounce">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-16 w-16 text-primary"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      </div>

      <h1 className="text-3xl font-bold text-primary mb-2 text-center">
        Dziękujemy za zgłoszenie!
      </h1>
      <p className="text-primary mb-8 text-center max-w-md">
        Zgłoszenie zostało pomyślnie przesłane i zapisane w bazie danych.
      </p>
      <div className="flex flex-col w-full max-w-xs gap-3">
        <Link href="/add" className="btn btn-primary w-full shadow-md ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
          </svg>
          Dodaj kolejny przedmiot
        </Link>
        <Link
          href="/home"
          className="btn btn-outline  w-full bg-white dark:bg-transparent text-primary border-primary"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
            />
          </svg>
          Strona główna
        </Link>

        <button
          onClick={logoutAction}
          className="btn btn-ghost text-white border-primary bg-primary hover:text-white w-full"
        >
          Wyloguj
        </button>
      </div>
    </div>
  );
}
