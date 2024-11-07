import { ItemType } from "./Items";

export interface CategoryListType {
    _id: string,
    name: string,
    items: ItemType[];
}