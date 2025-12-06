"use client";
import React, { useState, FormEvent, JSX } from 'react';
import { useRouter } from 'next/navigation';
// Adres Twojego API
const API_URL = 'http://localhost:3100/authorize/login';

// Interfejsy TypeScript dla lepszej kontroli typu
interface MessageState {
    type: 'success' | 'error' | 'warning';
    text: string;
}

function LoginForm(): JSX.Element { // Typowanie zwracanego elementu React
    const router = useRouter();
    const [login, setLogin] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [message, setMessage] = useState<MessageState | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    // Funkcja pomocnicza do określania klasy alertu daisyUI
    const getAlertClass = (type: MessageState['type']): string => {
        switch (type) {
            case 'success':
                return 'alert-success';
            case 'error':
            case 'warning':
                return 'alert-error'; // Dla logowania najczęściej używamy 'alert-error' dla obu przypadków
            default:
                return '';
        }
    };

    // Obsługa wysłania formularza
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        // Podstawowa walidacja (tylko na pusty ciąg, reszta załatwiona przez required HTML5)
        if (!login || !password) {
            setMessage({ type: 'warning', text: "Wypełnij oba pola: login/email i hasło." });
            return;
        }

        setMessage(null);
        setIsLoading(true);

        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    login: login,
                    password: password, // Wysyłamy czyste hasło (wymaga HTTPS!)
                }),
            });

            // Obsługa odpowiedzi serwera
            if (response.ok) {
                // Przykładowo: Serwer zwraca token lub dane usera
                setMessage({ type: 'success', text: `Zalogowano pomyślnie! Przekierowanie...` });
                setTimeout(() => {
                    router.push('./home'); 
                }, 1000);
            } else if (response.status === 401) {
                // Błąd autoryzacji
                setMessage({ type: 'error', text: 'Nieprawidłowy login lub hasło. Spróbuj ponownie.' });
            } else {
                // Inne błędy serwera
                setMessage({ type: 'error', text: 'Wystąpił nieznany błąd serwera.' });
            }

        } catch (error) {
            console.error('Błąd połączenia:', error);
            setMessage({ type: 'error', text: 'Nie udało się połączyć z serwerem logowania. Sprawdź połączenie internetowe.' });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            {/* Użycie klas daisyUI: card, shadow, input, btn */}
            <div className="card w-96 bg-white shadow-2xl p-8">
                <h2 className="text-3xl font-bold mb-6 text-center text-primary">Logowanie</h2>
                
                <form onSubmit={handleSubmit}>
                    
                    {/* Pole Login */}
                    <div className="form-control mb-4">
                        <label className="label">
                            <span className="label-text">Login/Email:</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Wpisz login"
                            className="input input-bordered w-full"
                            value={login}
                            onChange={(e) => setLogin(e.target.value)}
                            required
                            minLength={3}
                            maxLength={50}
                        />
                    </div>

                    {/* Pole Hasło */}
                    <div className="form-control mb-6">
                        <label className="label">
                            <span className="label-text">Hasło:</span>
                        </label>
                        <input
                            type="password"
                            placeholder="Wpisz hasło"
                            className="input input-bordered w-full"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            minLength={6} // Minimalna rozsądna długość hasła
                            maxLength={100}
                        />
                    </div>
                    
                    {/* Przycisk Logowania */}
                    <button
                        type="submit"
                        className={`btn btn-primary w-full ${isLoading ? 'btn-loading' : ''}`}
                        disabled={isLoading}
                    >
                        {isLoading ? 'Ładowanie...' : 'Zaloguj się'}
                    </button>
                    
                </form>

                {/* Sekcja Komunikatów (Alert daisyUI) */}
                {message && (
                    <div role="alert" className={`alert ${getAlertClass(message.type)} mt-6`}>
                        {/* Ikony w daisyUI: Przykład użycia SVG dla wizualnego feedbacku */}
                        {message.type === 'success' ? (
                            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        )}
                        
                        <span>{message.text}</span>
                    </div>
                )}
            </div>
        </div>
    );
}

export default LoginForm;