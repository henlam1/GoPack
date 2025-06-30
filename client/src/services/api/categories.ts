import ICategory from "../../models/CategoryModel";
import { apiRoutes } from "../../routes/apiRoutes";
import apiRequest from "./apiRequest";

export async function getCategoriesAPI() {
  const data = await apiRequest(apiRoutes.categories.getAll);
  console.log("Categories fetched: ", data);
  return data;
}

export async function getCategoryAPI(id: string) {
  const data = await apiRequest(apiRoutes.categories.getById(id));
  console.log("Category fetched: ", data);
  return data;
}

export async function createCategoryAPI(category: Omit<ICategory, "_id">) {
  const data = await apiRequest(apiRoutes.categories.create, {
    method: "POST",
    body: JSON.stringify(category),
  });
  console.log("Category fetched: ", data);
  return data;
}

export async function updateCategoryAPI(params: {
  id: string;
  update: Partial<ICategory>;
}) {
  const { id, update } = params;

  const data = await apiRequest(apiRoutes.categories.update(id), {
    method: "PATCH",
    body: JSON.stringify(update),
  });
  console.log("Category updated: ", data);
  return data;
}

export async function deleteCategoryAPI(id: string) {
  const data = await apiRequest(apiRoutes.categories.delete(id), {
    method: "DELETE",
  });
  console.log("Category deleted: ", data);
  return data;
}
