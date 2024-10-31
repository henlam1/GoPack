import React, { useState, useImperativeHandle, forwardRef } from "react";

export interface PopupFormHandles {
    showForm: () => void;
    hideForm: () => void;
    isVisible: boolean;
}

interface PopupFormProps {
    categoryId: string,
    categoryName: string,
}
function PopupForm({ categoryId, categoryName}: PopupFormProps, ref: React.Ref<PopupFormHandles>) {
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

    async function handleSubmit(e: React.FormEvent){
        e.preventDefault(); // Prevent page from refreshing when submitting
        console.log("Creating new item for category: ", categoryId);
        hideForm();
    }
    return(
        <>
            {isVisible && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
                    <div className="bg-white p-6 rounded shadow-lg">
                        <h2 className="text-xl mb-4">{title}</h2>
                        <form onSubmit={handleSubmit}>
                            <input
                                type="text"
                                placeholder="Item name"
                                minLength={1}
                                className="border p-2 mb-4 w-full"
                            />
                            <input
                                type="number"
                                placeholder="Quantity"
                                min={1}
                                className="border p-2 mb-4 w-full"
                            />
                            <div className="card-actions justify-between">
                                <button className="btn btn-primary" type="submit">Add Item</button>
                                <button className="btn btn-secondary" onClick={hideForm}>Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}

// We are exporting PopupForm wrapped in forwardRef because
// we want to use the PopupForm component as well as the 
// internal state/functions we're referencing
export default forwardRef(PopupForm);