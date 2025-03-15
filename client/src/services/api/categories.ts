import ICategory from "../../models/CategoryModel";
import { apiRoutes } from "../../routes/apiRoutes";

export async function getCategories() {
  try {
    const response = await fetch(apiRoutes.categories.getAll);
    if (!response.ok) {
      throw new Error("Failed to get categories");
    }
    const data = await response.json();
    console.log("Data fetched: ", data);
    return data;
  } catch (error) {
    console.error("Fetch error: ", error);
  }
}

export async function getCategory(id: string) {
  try {
    const response = await fetch(apiRoutes.categories.getById(id));
    if (!response.ok) {
      throw new Error("Failed to get category");
    }
    const data = await response.json();
    console.log("Data fetched: ", data);
    return data;
  } catch (error) {
    console.error("Fetch error: ", error);
  }
}

export async function createCategory(category: ICategory) {
  try {
    const response = await fetch(apiRoutes.categories.create, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(category),
    });
    if (!response.ok) {
      throw new Error("Failed to create category");
    }
    const data = await response.json();
    console.log("Data fetched: ", data);
    return data;
  } catch (error) {
    console.error("Fetch error: ", error);
  }
}