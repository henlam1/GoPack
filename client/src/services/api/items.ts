import IItem from '../../models/ItemModel';
import { apiRoutes } from '../../routes/apiRoutes';
import apiRequest from './apiRequest';

export async function getItemsAPI() {
  const data = await apiRequest(apiRoutes.items.getAll);
  console.log('Items fetched: ', data);
  return data;
}

export async function getItemAPI(id: string) {
  const data = await apiRequest(apiRoutes.items.getById(id));
  console.log('Item fetched: ', data);
  return data;
}

export async function createItemAPI(item: Omit<IItem, '_id'>) {
  const data = await apiRequest(apiRoutes.items.create, {
    method: 'POST',
    body: JSON.stringify(item),
  });
  console.log('Item fetched: ', data);
  return data;
}

export async function updateItemAPI(params: {
  id: string;
  update: Partial<IItem>;
}) {
  const { id, update } = params;

  const data = await apiRequest(apiRoutes.items.update(id), {
    method: 'PATCH',
    body: JSON.stringify(update),
  });
  console.log('Item updated: ', data);
  return data;
}

export async function deleteItemAPI(id: string) {
  const data = await apiRequest(apiRoutes.items.delete(id), {
    method: 'DELETE',
  });
  console.log('Item deleted: ', data);
  return data;
}
