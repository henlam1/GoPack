import { CategoryListType } from "./CategoryList";

export interface PackingListType {
    _id?: string,
    name: string,
    duration: number,
    categories: CategoryListType[],
  }