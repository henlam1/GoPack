import { IPackingList, IPackingListForm } from '../../models/PackingListModel';
import { apiRoutes } from '../../routes/apiRoutes';
import apiRequest from './apiRequest';

export async function getPackingListsAPI() {
  const data = await apiRequest(apiRoutes.packingLists.getAll);
  console.log('Packing lists fetched: ', data);
  return data;
}

export async function getActivePackingListsAPI() {
  const data = await apiRequest(apiRoutes.packingLists.getActive);
  console.log('Packing lists (Active) fetched: ', data);
  return data;
}

export async function getTrashedPackingListsAPI() {
  const data = await apiRequest(apiRoutes.packingLists.getTrashed);
  console.log('Packing lists (Trashed) fetched: ', data);
  return data;
}

export async function getArchivedPackingListsAPI() {
  const data = await apiRequest(apiRoutes.packingLists.getArchived);
  console.log('Packing lists (Completed) fetched: ', data);
  return data;
}

export async function getPackingListAPI(id: string) {
  const data = await apiRequest(apiRoutes.packingLists.getById(id));
  console.log('Packing list fetched: ', data);
  return data;
}

export async function createPackingListAPI(packingList: IPackingListForm) {
  const data = await apiRequest(apiRoutes.packingLists.create, {
    method: 'POST',
    body: JSON.stringify(packingList),
  });
  console.log('Packing list created: ', data);
  return data;
}

export async function updatePackingListAPI(params: {
  id: string;
  update: Partial<IPackingList>;
}) {
  const { id, update } = params;
  const data = await apiRequest(apiRoutes.packingLists.update(id), {
    method: 'PATCH',
    body: JSON.stringify(update),
  });
  console.log('Packing list updated: ', data);
  return data;
}

export async function deletePackingListAPI(id: string) {
  const data = await apiRequest(apiRoutes.packingLists.delete(id), {
    method: 'DELETE',
  });
  console.log('Packing list deleted: ', data);
  return data;
}

export async function getPLCategoriesAPI(id: string) {
  const data = await apiRequest(apiRoutes.packingLists.getCategories(id));
  console.log('Packing list categories: ', data);
  return data;
}
