"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

interface AddItemPayload {
  category: string;
  subCategory: string;
  description: string;
  location: string;
  date: string;
}

interface ActionResponse {
  success: boolean;
  message?: string;
}

export async function addItemAction(data: AddItemPayload): Promise<ActionResponse> {
  const API_URL = "http://localhost:3100/items";
  const cookieStore = await cookies();

  const token = cookieStore.get("token")?.value;

  if (!token) {
    return { success: false, message: "Brak autoryzacji. Zaloguj się ponownie." };
  }

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return {
        success: false,
        message: errorData.message || `Błąd serwera: ${response.status}`,
      };
    }

    return { success: true };
  } catch (error) {
    console.error("Add item error:", error);
    return { success: false, message: "Nie udało się połączyć z serwerem." };
  }
}
