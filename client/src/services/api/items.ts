import IItem from "../../models/ItemModel";
import { apiRoutes } from "../../routes/apiRoutes";

export async function getItemsAPI() {
  try {
    const response = await fetch(apiRoutes.items.getAll);
    
    if (!response.ok) {
      throw new Error("Failed to get items");
    }
    
    const data = await response.json();
    console.log("Items fetched: ", data);
    return data;
  } catch (error) {
    console.error("A problem occurred with retrieving items", error);
  }
}

export async function getItemAPI(id: string) {
  try {
    const response = await fetch(apiRoutes.items.getById(id));
    
    if (!response.ok) {
      throw new Error("Failed to get item");
    }
    
    const data = await response.json();
    console.log("Item fetched: ", data);
    return data;
  } catch (error) {
    console.error("A problem occurred with retrieving item " + id, error);
  }
}

export async function createItemAPI(item: Omit<IItem, "_id">) {
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
    console.log("Item created: ", data);
    return data;
  } catch (error) {
    console.error("A problem occurred with creating item " + item, error);
  }
}

export async function updateItemAPI(data: {id: string, update: Partial<IItem>}) {
  const { id, update } = data;
  try {
    const response = await fetch(apiRoutes.items.update(id), {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(update),
    });
    
    if (!response.ok) {
      throw new Error("Failed to update item");
    }
    
    const data = await response.json();
    console.log("Item updated: ", data);
    return data;
  } catch (error) {
    console.error("A problem occurred with updating item " + id, error);
  }
}

export async function deleteItemAPI(id: string) {
  try {
    const response = await fetch(apiRoutes.items.delete(id), {
      method: "DELETE",
    });
    
    if (!response.ok) {
      throw new Error("Failed to create item");
    }
    
    const data = await response.json();
    console.log("Item deleted: ", data);
    return data;
  } catch (error) {
    console.error("A problem occurred with deleting item " + id, error);
  }
}
