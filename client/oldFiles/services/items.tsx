import { ItemType } from "../interfaces/Items";

const BASE_URL = "http://localhost:5050/items";

export async function getItems() {
  try {
    const response = await fetch(`${BASE_URL}/`, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response;
  } catch (error) {
    console.error("A problem occured with retrieving Items", error);
  }
}

export async function getItem(id: string) {
  try {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response;
  } catch (error) {
    console.error("A problem occured with retrieving Item " + id, error);
  }
}

export async function postItem(items: ItemType) {
  try {
    const response = await fetch(`${BASE_URL}/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(items),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response;
  } catch (error) {
    console.error("A problem occured with creating Item", error);
  }
}

export async function patchItem(id: string, items: ItemType) {
  try {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: "PATCH",
      body: JSON.stringify(items),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response;
  } catch (error) {
    console.error("A problem occured with updating Item " + id, error);
  }
}

export async function deleteItem(id: string) {
  try {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response;
  } catch (error) {
    console.error("A problem occured with deleting Item " + id, error);
  }
}

// req.body in POST/PUT
// req.params attached to url
// req.query for searching, filtering
