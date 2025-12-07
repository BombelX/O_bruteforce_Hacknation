"use server";

import { cookies } from "next/headers";

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
  const API_URL = "http://localhost:3100/formular/submit";
  const cookieStore = await cookies();
  const token = cookieStore.get("token");


  if (!token) {
    return { success: false, message: "Brak autoryzacji. Zaloguj się ponownie." };
  }

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Cookie": `token=${token.value}`
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

interface AddItemPayload {
  category_id: string;
  subcategory_id: string;
  where_found: string;
  found_date: string;
  description: string;
}

interface ActionResponse {
  success: boolean;
  message?: string;
}

interface CategoryFromApi {
  id: number;
  name: string;
}

export async function getCategoriesAction(): Promise<string[]> {
  const API_URL = "http://localhost:3100/formular/categories";
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  try {
    const response = await fetch(API_URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      cache: "no-store",
    });

    if (!response.ok) {
      console.error(`Błąd pobierania kategorii: ${response.status}`);
      return [];
    }

    const data = (await response.json()) as CategoryFromApi[];

    if (Array.isArray(data)) {
      return data.map((item) => item.name);
    }

    return [];
  } catch (error) {
    console.error("Błąd połączenia:", error);
    return [];
  }
}
export async function getSubCategoriesAction(categoryID: number): Promise<string[]> {
  const API_URL = "http://localhost:3100/formular/subcategories/";
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  try {
    const response = await fetch(`${API_URL}${categoryID}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      cache: "no-store",
    });

    if (!response.ok) {
      console.error(`Błąd pobierania kategorii: ${response.status}`);
      return [];
    }

    const data = (await response.json()) as CategoryFromApi[];

    if (Array.isArray(data)) {
      return data.map((item) => item.name);
    }

    return [];
  } catch (error) {
    console.error("Błąd połączenia:", error);
    return [];
  }
}