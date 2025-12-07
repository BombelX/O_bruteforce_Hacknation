"use client";
import  { useState, FormEvent, JSX } from "react";
import { useRouter } from "next/navigation";
import { loginAction } from "./actions";

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

    const result = await loginAction({ login, password });

    setIsLoading(false);

    if (result.success) {
      setMessage({ type: "success", text: `Zalogowano pomyślnie! Przekierowanie...` });
      setTimeout(() => {
        router.push("/home");
        router.refresh();
      }, 1000);
    } else {
      setMessage({ type: "error", text: result.message || "Wystąpił błąd." });
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-blue-100 ">
      <div className="card w-96 bg-white shadow-2xl p-8">
        <h2 className="text-4xl  mb-6 text-center text-primary font-bold">Logowanie</h2>

        <form onSubmit={handleSubmit}>
          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text text-primary font-bold">Login/Email:</span>
            </label>
            <input
              type="text"
              placeholder="Wpisz login"
              className="input input-bordered w-full bg-white border-black text-primary"
              value={login}
              onChange={(e) => setLogin(e.target.value)}
              required
            />
          </div>

          <div className="form-control mb-6">
            <label className="label">
              <span className="label-text text-primary font-bold">Hasło:</span>
            </label>
            <input
              type="password"
              placeholder="Wpisz hasło"
              className="input input-bordered w-full bg-white border-black text-primary"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
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
            <span>{message.text}</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default LoginForm;
