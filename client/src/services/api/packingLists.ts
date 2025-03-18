import IPackingList from "../../models/PackingListModel";
import { apiRoutes } from "../../routes/apiRoutes";

export async function getPackingLists() {
  try {
    const response = await fetch(apiRoutes.packingLists.getAll);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log("Packing lists fetched: ", data);
    return data;
  } catch (error) {
    console.error("A problem occured with retrieving packing lists", error);
  }
}

export async function getPackingList(id: string) {
  try {
    const response = await fetch(apiRoutes.packingLists.getById(id));

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log("Packing lists fetched: ", data);
    return data;
  } catch (error) {
    console.error(
      "A problem occured with retrieving packing list " + id,
      error
    );
  }
}

export async function createPackingList(packingList: Omit<IPackingList, "_id">) {
  try {
    const response = await fetch(apiRoutes.packingLists.create, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(packingList),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log("Packing list created: ", data);
    return data;
  } catch (error) {
    console.error(
      "A problem occured with creating packing list " + packingList,
      error
    );
  }
}

// TODO: DECIDE HOW TO UPDATE
export async function updatePackingList(id: string) {
  try {
    const response = await fetch(apiRoutes.packingLists.update(id), {
      method: "PATCH",
      body: JSON.stringify("placeholder"),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log("Packing list updated: ", data);
    return data;
  } catch (error) {
    console.error("A problem occured with updating packing list " + id, error);
  }
}

export async function deletePackingList(id: string) {
  try {
    const response = await fetch(apiRoutes.packingLists.delete(id), {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log("Packing list deleted: ", data);
    return data;
  } catch (error) {
    console.error("A problem occured with deleting packing list " + id, error);
  }
}
