"use client";

import React, { JSX } from 'react'; 
import { useState } from 'react';
import Link from 'next/link'; 

function HomePage(): JSX.Element { 
    const [isLoggedIn, setIsLoggedIn] = useState(true); 
    return (
        <div className="min-h-screen bg-gray-50 p-6 sm:p-10">
      
            
       
            <main className="container mx-auto">
                <div className="grid grid-cols-1 lg:grid-rows-2 gap-8">
             
                    <div className="lg:col-span-2 card bg-white shadow-2xl p-6 hover:scale-102 hover:shadow-3xl transition  duration-500">
                        <div className="card-body p-0">
                            <h2 className="card-title text-2xl text-blue-700 mb-4 border-b pb-2">
                                Witamy w Systemie Biura Rzeczy Znalezionych
                            </h2>
                            <p className="text-gray-700 mb-4">
                                Szanowny Urzędniku Starostwa,
                            </p>
                            <p className="text-gray-700 mb-6 leading-relaxed">
                                Niniejsza platforma została stworzona z inicjatywy Ministerstwa Cyfryzacji w celu usprawnienia i centralizacji procesu ewidencjonowania oraz zarządzania przedmiotami zagubionymi, odnalezionymi na terenie Państwa Starostwa. Jej głównym zadaniem jest zapewnienie szybkiej i efektywnej komunikacji z obywatelami poszukującymi swoich własności.
                            </p>
                            <p className="text-gray-700 mb-6 leading-relaxed">
                                Prosimy o regularne korzystanie z poniższego katalogu w celu dodawania wszystkich zgub, które trafiły do Biura Rzeczy Znalezionych w Państwa jednostce.
                            </p>

                            
                        </div>
                    </div>

                    {isLoggedIn?(
                        <>
                        <div className="card bg-primary  text-primary-content shadow-xl h-fit hover:scale-102 hover:shadow-3xl transition  duration-500">
                            <div className="card-body items-center text-center ">
                                <h3 className="card-title text-white text-xl">
                                    Dodaj Nowy Przedmiot
                                </h3>
                                <p className="mb-4">
                                    Wypełnij formularz danymi o rzeczy zagubionej.
                                </p>
                                
                            
                                <Link href="./add" className="btn btn-outline btn-success text-white border-white hover:bg-white hover:text-primary">
                                    Przejdź do formularza dodawania
                                </Link>
                            </div>
                        </div>
                        </>):(<></>
                    )}
                </div>
            </main>
        </div>
    );
}
export default HomePage;