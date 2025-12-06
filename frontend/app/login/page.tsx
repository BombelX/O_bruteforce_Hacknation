"use client";
import React, { useState, FormEvent, JSX } from "react";
import { useRouter } from "next/navigation";

const API_URL = "http://localhost:3100/authorize/login";

interface MessageState {
  type: "success" | "error" | "warning";
  text: string;
}

function LoginForm(): JSX.Element {
  const router = useRouter();
  const [login, setLogin] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [message, setMessage] = useState<MessageState | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getAlertClass = (type: MessageState["type"]): string => {
    switch (type) {
      case "success":
        return "alert-success";
      case "error":
      case "warning":
        return "alert-error";
      default:
        return "";
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!login || !password) {
      setMessage({ type: "warning", text: "Wypełnij oba pola: login/email i hasło." });
      return;
    }

    setMessage(null);
    setIsLoading(true);

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          login: login,
          password: password,
        }),
      });
      if (response.ok) {
        setMessage({ type: "success", text: `Zalogowano pomyślnie! Przekierowanie...` });
        setTimeout(() => {
          router.push("./home");
        }, 1000);
      } else if (response.status === 401) {
        setMessage({ type: "error", text: "Nieprawidłowy login lub hasło. Spróbuj ponownie." });
      } else {
        setMessage({ type: "error", text: "Wystąpił nieznany błąd serwera." });
      }
    } catch (error) {
      console.error("Błąd połączenia:", error);
      setMessage({
        type: "error",
        text: "Nie udało się połączyć z serwerem logowania. Sprawdź połączenie internetowe.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="card w-96 bg-white shadow-2xl p-8">
        <h2 className="text-3xl font-bold mb-6 text-center text-primary">Logowanie</h2>

        <form onSubmit={handleSubmit}>
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
              minLength={6}
              maxLength={100}
            />
          </div>

          <button
            type="submit"
            className={`btn btn-primary w-full ${isLoading ? "btn-loading" : ""}`}
            disabled={isLoading}
          >
            {isLoading ? "Ładowanie..." : "Zaloguj się"}
          </button>
        </form>

        {message && (
          <div role="alert" className={`alert ${getAlertClass(message.type)} mt-6`}>
            {message.type === "success" ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="stroke-current shrink-0 h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="stroke-current shrink-0 h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            )}

            <span>{message.text}</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default LoginForm;
