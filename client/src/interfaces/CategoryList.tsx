import { ItemType } from "./ItemType"

export interface CategoryListType {
    _id?: string,
    category: string
    items: ItemType[]
}