import IItem from "../../models/ItemModel";
import { apiRoutes } from "../../routes/apiRoutes";

export async function getItems() {
  try {
    const response = await fetch(apiRoutes.items.getAll);
    if (!response.ok) {
      throw new Error("Failed to get items");
    }
    const data = await response.json();
    console.log("Data fetched: ", data);
    return data;
  } catch (error) {
    console.error("Fetch error: ", error);
  }
}

export async function getItem(id: string) {
  try {
    const response = await fetch(apiRoutes.items.getById(id));
    if (!response.ok) {
      throw new Error("Failed to get item");
    }
    const data = await response.json();
    console.log("Data fetched: ", data);
    return data;
  } catch (error) {
    console.error("Fetch error: ", error);
  }
}

export async function createItem(item: IItem) {
  try {
    const response = await fetch(apiRoutes.items.create, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item),
    });
    if (!response.ok) {
      throw new Error("Failed to create item");
    }
    const data = await response.json();
    console.log("Data fetched: ", data);
    return data;
  } catch (error) {
    console.error("Fetch error: ", error);
  }
}