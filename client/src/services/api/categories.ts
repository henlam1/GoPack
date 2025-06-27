import ICategory from "../../models/CategoryModel";
import { apiRoutes } from "../../routes/apiRoutes";

export async function getCategoriesAPI() {
  try {
    const response = await fetch(apiRoutes.categories.getAll);
    
    if (!response.ok) {
      throw new Error("Failed to get categories");
    }
    
    const data = await response.json();
    console.log("Categories fetched: ", data);
    return data;
  } catch (error) {
    console.error("A problem occurred with retrieving categories", error);
  }
}

export async function getCategoryAPI(id: string) {
  try {
    const response = await fetch(apiRoutes.categories.getById(id));
    
    if (!response.ok) {
      throw new Error("Failed to get category");
    }
    
    const data = await response.json();
    console.log("Category fetched: ", data);
    return data;
  } catch (error) {
    console.error("A problem occurred with retrieving category " + id, error);
  }
}

export async function createCategoryAPI(category: Omit<ICategory, "_id">) {
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
    console.log("Category created: ", data);
    return data;
  } catch (error) {
    console.error("A problem occurred with creating category", error);
  }
}

// TODO: DECIDE HOW TO UPDATE
export async function updateCategoryAPI(data: {id: string, update: Partial<ICategory>}) {
  const { id, update } = data;
  try {
    const response = await fetch(apiRoutes.categories.create, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(update),
    });
    
    if (!response.ok) {
      throw new Error("Failed to update category");
    }
    
    const data = await response.json();
    console.log("Category created: ", data);
    return data;
  } catch (error) {
    console.error("A problem occurred with updating category " + id, error);
  }
}

export async function deleteCategoryAPI(id: string) {
  try {
    const response = await fetch(apiRoutes.categories.delete(id), {
      method: "DELETE",
    });
    
    if (!response.ok) {
      throw new Error("Failed to delete category");
    }
    
    const data = await response.json();
    console.log("Category deleted: ", data);
    return data;
  } catch (error) {
    console.error("A problem occurred with deleting category " + id, error);
  }
}
