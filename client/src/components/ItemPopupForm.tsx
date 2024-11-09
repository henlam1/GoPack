import React, { useState, useImperativeHandle, forwardRef } from "react";
import { ItemFormType } from "../interfaces/ItemForm";
import { postItem } from "../services/items";
import { addToCategoryList } from "../services/categoryList";

export interface ItemPopupFormHandles {
    showForm: () => void;
    hideForm: () => void;
    isVisible: boolean;
}

interface ItemPopupFormProps {
    categoryId: string,
    categoryName: string,
    onItemCreated: (categoryId: string) => Promise<void>;
}

function ItemPopupForm({ categoryId, categoryName, onItemCreated}: ItemPopupFormProps, ref: React.Ref<ItemPopupFormHandles>) {
    const [form, setForm] = useState<ItemFormType>({
        name: "",
        units: 1,
        packed: false,
    })
    const [isVisible, setIsVisible] = useState(false);

    const showForm = () => {
        setIsVisible(true);
    };

    const hideForm = () => {
        setIsVisible(false);
    };

    // The ref gets passed from parent to child
    // The arrow function points to the objects that we want to be exposed to the parent
    useImperativeHandle(ref, () => ({
        showForm,
        hideForm,
        isVisible,
    }));

    const title = `Add Item for ${categoryName}`;

    // Handler for updating form
    function updateForm(value: { name?: string; units?: number; packed?: boolean; }) {
        return setForm((prev) => {
            return {...prev, ...value};
        })
    }

    async function handleSubmit(e: React.FormEvent){
        e.preventDefault(); // Prevent page from refreshing when submitting
        console.log("Form submitted, creating new item for category: ", categoryId);
        // TODO: Connect API call to create an item
        const item = {...form};
        try {
            const response = await postItem(item);
            const newItem = await response?.json();
            await addToCategoryList(categoryId, newItem.insertedId);
            await onItemCreated(categoryId);
        } catch (error) {
            console.error("A problem occured with item creation", error);
        } finally {
            setForm({name: "", units: 1, packed: false});
            hideForm();
        }
    }
    return(
        <>
            {isVisible && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
                    <div className="bg-white p-6 rounded shadow-lg">
                        <h2 className="text-xl mb-4">{title}</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="label">
                                <span className="label-text">Item Name</span>
                            </div>
                            <input 
                                type="text"
                                placeholder="Enter here"
                                minLength={1}
                                className="border p-2 mb-4 w-full"
                                value={form.name}
                                onChange={(e) => updateForm({name: e.target.value})}
                            />
                            <div className="label">
                                <span className="label-text">Quantity</span>
                            </div>
                            <input
                                type="number"
                                placeholder="Enter here"
                                min={1}
                                className="border p-2 mb-4 w-full"
                                value={form.units}
                                onChange={(e) => updateForm({units: Number(e.target.value)})}
                            />
                            <div className="card-actions justify-between">
                                <button className="btn btn-primary" type="submit">Ok</button>
                                <button className="btn btn-secondary" type="button" onClick={hideForm}>Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}

// We are exporting ItemPopupForm wrapped in forwardRef because
// we want to use the ItemPopupForm component as well as the 
// internal state/functions we're referencing
export default forwardRef(ItemPopupForm);