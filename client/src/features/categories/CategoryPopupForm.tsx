import React, { useState, useImperativeHandle, forwardRef } from "react";
import { postCategoryList } from "../../services/categoryList";
import { addToPackingList } from "../../services/packingList";


export interface CategoryPopupFormHandles {
    showForm: () => void;
    hideForm: () => void;
    isVisible: boolean;
}

interface CategoryPopupFormProps {
    packingListId: string,
    packingListName: string,
    onCategoryCreated: (packingListId: string) => Promise<void>,
}

function CategoryPopupForm({ packingListId, packingListName, onCategoryCreated}: CategoryPopupFormProps, ref: React.Ref<CategoryPopupFormHandles>) {
    const [name, setName] = useState("");
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

    const title = `Add Category for ${packingListName}`;

    async function handleSubmit(e: React.FormEvent){
        e.preventDefault(); // Prevent page from refreshing when submitting
        console.log("Form submitted, creating new item for packing list: ", packingListId);
        // TODO: Connect API call to create a category
        try {
            const response = await postCategoryList({
                name: name,
                items: [],
            });
            const newCategory = await response?.json();
            console.log("new category", newCategory)
            await addToPackingList(packingListId, newCategory._id);
            await onCategoryCreated(packingListId);
        } catch (error) {
            console.error("A problem occured with category creation", error);
        } finally {
            setName("");
            hideForm();
        }
    }
    return(
        <>
            {isVisible && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-40">
                    <div className="bg-white p-6 rounded shadow-lg">
                        <h2 className="text-xl mb-4">{title}</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="label">
                                <span className="label-text">Category Name</span>
                            </div>
                            <input 
                                type="text"
                                placeholder="Enter here"
                                minLength={1}
                                className="border p-2 mb-4 w-full"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
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

// We are exporting CategoryPopupForm wrapped in forwardRef because
// we want to use the CategoryPopupForm component as well as the 
// internal state/functions we're referencing
export default forwardRef(CategoryPopupForm);