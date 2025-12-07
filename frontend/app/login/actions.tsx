"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

interface LoginResult {
  success: boolean;
  message?: string;
}

export async function loginAction(formData: {
  login: string;
  password: string;
}): Promise<LoginResult> {
  const API_URL = "http://localhost:3100/authorize/login";

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: formData.login,
        password: formData.password,
      }),
    });

    if (!response.ok) {
      if (response.status === 401) {
        return { success: false, message: "Nieprawidłowy login lub hasło." };
      }
      return { success: false, message: "Błąd serwera." };
    }

    const data = await response.json();
    const cookieStore = await cookies();

    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict" as const,
      path: "/",
      maxAge: 60 * 60 * 24 * 3, // 3 dni
    };

    cookieStore.set("token", data.jwt_token, cookieOptions);
    cookieStore.set("refresh_token", data.refresh_token, cookieOptions);

    return { success: true };
  } catch (error) {
    console.error("Login action error:", error);
    return { success: false, message: "Błąd połączenia z serwerem." };
  }
}

export async function logoutAction() {
  const API_URL = "http://localhost:3100/authorize/logout";
  const cookieStore = await cookies();

  const refreshToken = cookieStore.get("refresh_token")?.value;

  if (refreshToken) {
    try {
      await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          refresh_token: refreshToken,
        }),
      });
    } catch (error) {
      console.error("Błąd podczas wylogowywania na backendzie:", error);
    }
  }

  cookieStore.delete("token");
  cookieStore.delete("refresh_token");
  revalidatePath("/", "layout");
  redirect("/login");
}
