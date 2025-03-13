import { apiRoutes } from "../../routes/apiRoutes";

export async function getPackingLists() {
  try {
    const response = await fetch(apiRoutes.packingLists.base, {
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

export async function updatePackingList(
  id: string,
) {
  try {
    const response = await fetch(apiRoutes.packingLists.base, {
      method: "PATCH",
      body: JSON.stringify("placeholder"),
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
    const response = await fetch(apiRoutes.packingLists.base, {
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
