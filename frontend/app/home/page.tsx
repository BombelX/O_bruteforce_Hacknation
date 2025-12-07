import { cookies } from "next/headers";
import React, { JSX } from 'react'; 

import Link from 'next/link'; 

async function HomePage(): Promise<JSX.Element> { 
    const cookieStore = await cookies();
    const token = cookieStore.get("token");
    const isLoggedIn = !!token;
    return (
        <div className="min-h-screen bg-blue-100 p-6 sm:p-10  ">
            
            
       
            <main className="container mx-auto mt-5  ">
                <div className="flex flex-col-reverse sm:grid sm:grid-cols-1 lg:grid-rows-2 gap-8  ">
             
                    <div className="lg:col-span-2 card bg-white shadow-2xl p-6 hover:scale-102 hover:shadow-3xl transition  duration-500">
                        <div className="card-body p-0">
                            <h2 className="card-title text-2xl text-blue-700 mb-4 border-b pb-2 font-bold">
                                Witamy w Systemie Biura Rzeczy Znalezionych
                            </h2>
                            <p className="text-gray-700 mb-4 text-xl font-semibold">
                                Szanowny Urzędniku Starostwa,
                            </p>
                            <p className="text-gray-700 mb-6 text-xl font-semibold">
                                Niniejsza platforma została stworzona z inicjatywy Ministerstwa Cyfryzacji w celu usprawnienia i centralizacji procesu ewidencjonowania oraz zarządzania przedmiotami zagubionymi, odnalezionymi na terenie Państwa Starostwa. Jej głównym zadaniem jest zapewnienie szybkiej i efektywnej komunikacji z obywatelami poszukującymi swoich własności.
                            </p>
                            <p className="text-gray-700 mb-6 text-xl font-semibold">
                               Obecnie, rejestry rzeczy znalezionych prowadzone przez poszczególne samorządy są rozproszone i znajdują się głównie w Biuletynach Informacji Publicznej (BIP), co utrudnia szybkie odnalezienie poszukiwanych przedmiotów przez obywateli.
                            </p>
                            <p className="text-gray-700 mb-6 text-xl font-semibold">
                                W odpowiedzi na to wyzwanie , głównym celem projektu jest stworzenie mechanizmu w portalu dane.gov.pl, który ułatwi samorządom szybkie wgrywanie i zgromadzenie danych dotyczących rzeczy znalezionych w jednym miejscu.
                                </p>
                            
                        </div>
                    </div>

                    {isLoggedIn?(
                        <>
                        <div className="card bg-primary  text-primary-content shadow-xl h-fit hover:scale-102 hover:shadow-3xl transition  duration-500">
                            <div className="card-body items-center text-center ">
                                <h3 className="card-title text-white text-3xl font-semibold">
                                    Dodaj Nowy Przedmiot
                                </h3>
                                <p className="mb-4 text-xl font-semibold">
                                    Wypełnij formularz danymi o rzeczy zagubionej.
                                </p>
                                
                            
                                <Link href="./add" className="btn btn-outline btn-success text-primary bg-white border-white md:text-2xl sm:text-xl font-semibold lg:text-3xl hover:bg-white hover:text-primary">
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