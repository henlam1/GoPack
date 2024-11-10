import { CategoryListType } from "../interfaces/CategoryList";
import ItemPopupForm, { ItemPopupFormHandles } from "./ItemPopupForm";
import { useDynamicRefs } from "../customHooks/useDynamicRefs";
import { useCallback, useEffect, useState } from "react";
import { getItem } from "../services/items";
import { ItemType } from "../interfaces/Items";
import { getCategoryList } from "../services/categoryList";

/**
 * hmm we're definitely going to need to save the category choices and the 
"packed" or not packed sort of data per list
 */

interface CategoryPackingListProps {
    categoryId: string
}

const defaultCategoryList: CategoryListType = {
    _id: "-1",
    name: "name",
    items: [],
}

export default function CategoryPackingList({categoryId}: CategoryPackingListProps) {
    const [categoryList, setCategoryList] = useState<CategoryListType>(defaultCategoryList);
    const [items, setItems] = useState<ItemType[]>([]);

    const getCategory = useCallback(async () => {
        try {
            const response = await getCategoryList(categoryId);
            const data: CategoryListType = await response?.json();
            setCategoryList(data);
        }
        catch (error){
            console.error("Error fetching category packing list:", error);
        }
    }, [categoryId]);

    const getItems = useCallback(async () => {
        try {
            const responses = await Promise.all(categoryList.items.map((itemId: string) => getItem(itemId)));
            const data: ItemType[] = await Promise.all(responses.map(response => response?.json()));
            setItems(data);
        }
        catch (error){
            console.error("Error fetching items for category packing list:", error);
        }
    }, [categoryList]);
    
    useEffect(() => {
        const fetchData = async () => {
            await getCategory();
        };
        fetchData();
    }, [getCategory])

    useEffect(() => {
        if (categoryList){
            getItems();
        }
    }, [categoryList, getItems])

    const createItems = () => {
        return (
            <>
                {items.map( (item, index) => {
                    return (<div key={index} className="flex flex-row items-center">
                        <div className="basis-2/12">
                            <input type="checkbox" className="checkbox checkbox-primary size-6"/>
                        </div>
                        <div className="label-text basis-6/12">{item.name}</div>
                        <div className="flex flex-row basis-2/12 justify-between">
                            <button className="btn btn-xs btn-square">-</button>
                            <div className="size-6 text-center">{ item.units }</div>
                            <button className="btn btn-xs btn-square">+</button>
                        </div>
                        <div className="basis-2/12">
                            <div className="dropdown dropdown-left">
                                <div tabIndex={0} role="button" className="btn btn-xs btn-square">...</div>
                                <ul tabIndex={0} className="dropdown-content menu menu-sm bg-base-300 z-[1] w-52 p-0 [&_li>*]:rounded-none">
                                    <li><button className="btn btn-ghost">Edit Item</button></li>
                                    <li><button className="btn btn-ghost">Delete Item</button></li>
                                </ul>
                            </div>
                        </div>
                    </div>)
                })}
            </>
        );
    }

    const getRef = useDynamicRefs<ItemPopupFormHandles>();
    const handleShowForm = (id: string) => {
        getRef(id).current?.showForm();
    };
    const itemPopUpForm = (
        <ItemPopupForm
        categoryId={categoryList._id}
        categoryName={categoryList.name}
        onItemCreated={getCategory}
        ref={getRef(categoryList._id)} 
        />
    );
    return (
        <div id={categoryList._id} key={categoryList._id} className="carousel-item flex flex-col flex-wrap ml-10">
            <div className="basis-full text-left">
                <h2 className="font-bold text-3xl">{categoryList.name}</h2>
            </div>
            <div className="flex flex-row">
                <div className="font-bold text-l basis-2/12">Packed</div>
                <div className="font-bold text-l basis-6/12">Item</div>
                <div className="font-bold text-l basis-2/12">Quantity</div>
                <div className="font-bold text-l basis-2/12">Edits</div>
            </div>
            { createItems() }
            <div className="flex flex-row">
                <div className="basis-2/12 justify-left">
                    <button 
                        className="btn btn-sm btn-accent"
                        onClick={() => {handleShowForm(categoryList._id)}}
                    >Add Item</button>
                    {itemPopUpForm}
                </div>
            </div>
        </div>
    );
}
