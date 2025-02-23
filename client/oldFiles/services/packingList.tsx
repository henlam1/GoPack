import { PackingListType } from "../interfaces/PackingList";
import { PackingListFormType } from "../interfaces/PackingListForm";

const BASE_URL = "http://localhost:5050/packingList";

export async function getPackingLists() {
  try {
    const response = await fetch(`${BASE_URL}/`, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response;
  } catch (error) {
    console.error("A problem occured with retrieving packing lists", error);
  }
}

export async function getPackingList(id: string) {
  try {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response;
  } catch (error) {
    console.error(
      "A problem occured with retrieving packing list " + id,
      error
    );
  }
}

export async function getPackingListCategories(id: string) {
  try {
    const response = await fetch(`${BASE_URL}/${id}/get-categories`, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response;
  } catch (error) {
    console.error(
      "A problem occured with retrieving packing list categories" + id,
      error
    );
  }
}

export async function postPackingList(packingList: PackingListFormType) {
  try {
    const response = await fetch(`${BASE_URL}/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(packingList),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response;
  } catch (error) {
    console.error("A problem occured with creating packing list", error);
  }
}

export async function addToPackingList(
  packingListId: string,
  categoryListId: string
) {
  try {
    const response = await fetch(`${BASE_URL}/${packingListId}/add-category`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ categoryListId }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response;
  } catch (error) {
    console.error(
      `A problem occured with adding category ${categoryListId} to packing list ${packingListId}`,
      error
    );
  }
}

export async function patchPackingList(
  id: string,
  packingList: PackingListType
) {
  try {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: "PATCH",
      body: JSON.stringify(packingList),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response;
  } catch (error) {
    console.error("A problem occured with updating packing list " + id, error);
  }
}

export async function deletePackingList(id: string) {
  try {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response;
  } catch (error) {
    console.error("A problem occured with deleting packing list " + id, error);
  }
}

// req.body in POST/PUT
// req.params attached to url
// req.query for searching, filtering
