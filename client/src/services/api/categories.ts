import { ICategory, ICategoryForm } from '../../models/CategoryModel';
import { AISuggestionFormFields } from '../../models/zod/AISuggestionSchema';
import { apiRoutes } from '../../routes/apiRoutes';
import apiRequest from './apiRequest';

export async function getCategoriesAPI() {
  const data = await apiRequest(apiRoutes.categories.getAll);
  console.log('Categories fetched: ', data);
  return data;
}

export async function getCategoryAPI(id: string) {
  const data = await apiRequest(apiRoutes.categories.getById(id));
  console.log('Category fetched: ', data);
  return data;
}

export async function createCategoryAPI(category: ICategoryForm) {
  const data = await apiRequest(apiRoutes.categories.create, {
    method: 'POST',
    body: JSON.stringify(category),
  });
  console.log('Category fetched: ', data);
  return data;
}

export async function updateCategoryAPI(
  id: string,
  update: Partial<ICategory>,
) {
  const data = await apiRequest(apiRoutes.categories.update(id), {
    method: 'PATCH',
    body: JSON.stringify(update),
  });
  console.log('Category updated: ', data);
  return data;
}

export async function deleteCategoryAPI(id: string) {
  const data = await apiRequest(apiRoutes.categories.delete(id), {
    method: 'DELETE',
  });
  console.log('Category deleted: ', data);
  return data;
}

export async function markAllPackedAPI(id: string, packed: boolean) {
  const data = await apiRequest(apiRoutes.categories.markAllPacked(id), {
    method: 'PATCH',
    body: JSON.stringify({ packed: packed }),
  });
  console.log('Category updated: ', data);
  return data;
}

export async function getCategoryItemsAPI(id: string) {
  const data = await apiRequest(apiRoutes.categories.getItems(id));
  console.log('Category items: ', data);
  return data;
}

export async function suggestCategoriesAPI(form: AISuggestionFormFields) {
  const data = await apiRequest(apiRoutes.categories.suggest, {
    method: 'POST',
    body: JSON.stringify(form),
  });
  console.log('Suggested categories: ', data);
  return data;
}
