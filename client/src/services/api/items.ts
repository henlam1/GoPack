import IItem from "../../models/ItemModel";
import { apiRoutes } from "../../routes/apiRoutes";

export async function getItems() {
  try {
    const response = await fetch(apiRoutes.items.getAll);
    
    if (!response.ok) {
      throw new Error("Failed to get items");
    }
    
    const data = await response.json();
    console.log("Items fetched: ", data);
    return data;
  } catch (error) {
    console.error("A problem occured with retrieving items", error);
  }
}

export async function getItem(id: string) {
  try {
    const response = await fetch(apiRoutes.items.getById(id));
    
    if (!response.ok) {
      throw new Error("Failed to get item");
    }
    
    const data = await response.json();
    console.log("Item fetched: ", data);
    return data;
  } catch (error) {
    console.error("A problem occured with retrieving item " + id, error);
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
    console.log("Item created: ", data);
    return data;
  } catch (error) {
    console.error("A problem occured with creating item " + item, error);
  }
}

// TODO: DECIDE HOW TO UPDATE
export async function updateItem(id: string) {
  try {
    const response = await fetch(apiRoutes.items.update(id), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(id),
    });
    
    if (!response.ok) {
      throw new Error("Failed to update item");
    }
    
    const data = await response.json();
    console.log("Item updated: ", data);
    return data;
  } catch (error) {
    console.error("A problem occured with updating item " + id, error);
  }
}

export async function deleteItem(id: string) {
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
    console.error("A problem occured with deleting item " + id, error);
  }
}
