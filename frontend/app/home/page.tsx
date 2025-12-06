"use client";
// HomePage.tsx
import React, { JSX } from 'react'; // Wystarczy import samego Reacta
// Używamy Link, więc potrzebujemy go z routera
import Link from 'next/link'; 

// Najbezpieczniejsza składnia eksportu komponentu w Next.js/React
function HomePage(): JSX.Element { 
    return (
        <div className="min-h-screen bg-gray-50 p-6 sm:p-10">
            {/* Nagłówek i Logo */}
            <header className="bg-white shadow-md rounded-lg p-4 mb-10 flex items-center justify-between">
                <div className="flex items-center">
                    {/* Miejsce na logo Ministerstwa Cyfryzacji */}
                    <div className="h-10 w-10 mr-4 flex-shrink-0">
                        {/* Wstawienie logo (zastąp to faktycznym komponentem/tagiem <img>) */}
                    </div>
                    <h1 className="text-3xl font-extrabold text-gray-800">
                        Biuro Rzeczy Znalezionych
                    </h1>
                </div>
                <span className="badge badge-primary badge-lg hidden sm:inline-flex"><Link href="./login" className="btn btn-outline btn-success text-white border-white hover:bg-white hover:text-primary">Zaloguj się</Link    ></span>
            </header>

            {/* Główna Treść Strony */}
            <main className="container mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    
                    {/* Artykuł Wprowadzający dla Urzędników */}
                    <div className="lg:col-span-2 card bg-white shadow-xl p-6">
                        <div className="card-body p-0">
                            <h2 className="card-title text-2xl text-blue-700 mb-4 border-b pb-2">
                                📢 Witamy w Systemie Biura Rzeczy Znalezionych
                            </h2>
                            <p className="text-gray-700 mb-4">
                                Szanowny Urzędniku Starostwa,
                            </p>
                            <p className="text-gray-700 mb-6 leading-relaxed">
                                Niniejsza platforma została stworzona z inicjatywy **Ministerstwa Cyfryzacji** w celu usprawnienia i centralizacji procesu ewidencjonowania oraz zarządzania przedmiotami zagubionymi, odnalezionymi na terenie Państwa Starostwa. Jej głównym zadaniem jest zapewnienie szybkiej i efektywnej komunikacji z obywatelami poszukującymi swoich własności.
                            </p>
                            <p className="text-gray-700 mb-6 leading-relaxed">
                                Prosimy o regularne korzystanie z poniższego katalogu w celu dodawania wszystkich zgub, które trafiły do Biura Rzeczy Znalezionych w Państwa jednostce.
                            </p>

                            {/* Sekcja Akcji */}
                            <div className="alert alert-info mt-6 shadow-lg">
                                <div>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-current flex-shrink-0 w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                    <span>Kliknij poniżej, aby rozpocząć wprowadzanie nowych przedmiotów do katalogu.</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Panel Szybkiej Akcji (Karta z Linkiem) */}
                    <div className="card bg-primary text-primary-content shadow-xl h-fit">
                        <div className="card-body items-center text-center">
                            <h3 className="card-title text-white text-xl">
                                Dodaj Nowy Przedmiot
                            </h3>
                            <p className="mb-4">
                                Wypełnij formularz danymi o rzeczy zagubionej.
                            </p>
                            
                            {/* LINK ROUTINGOWY */}
                            <Link href="./add" className="btn btn-outline btn-success text-white border-white hover:bg-white hover:text-primary">
                                ➕ Przejdź do formularza dodawania
                            </Link>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
export default HomePage;