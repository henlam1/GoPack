import { postItem } from "../../services/items";
import { addToCategoryList } from "../../services/categoryList";
import PopupForm from "../../components/PopupForm";
import { Dictionary } from "../../interfaces/Dictionary";


interface ItemPopupFormProps {
    categoryId: string,
    categoryName: string,
    onItemCreated: () => Promise<void>;
    onClose: () => void;
}

function ItemPopupForm({ categoryId, categoryName, onItemCreated, onClose}: ItemPopupFormProps) {
    const title = `Add Item for ${categoryName}`;
    const formArr = [
        {
            "label": "Name",
            "name": "name",
            "type": "string",
        },
        {
            "label": "Units",
            "name": "units",
            "type": "number",
        },
    ]
    const submitBtn = "Create Item"

    async function onSubmit(form: Dictionary, callback: () => void){
        console.log("Form submitted, creating new item for category: ", categoryId);
        console.log(form);
        try {
            // Check form
            if (!form.name || !form.units){
                alert("All fields are required");
                return;
            } else if (typeof form.name !== "string" || typeof form.units !== "number") {
                alert("Invalid form types");
                return;
            }
            const item = {
                name: form.name,
                units: form.units,
                packed: false,
            }
            const response = await postItem(item);
            const newItem = await response?.json();
            await addToCategoryList(categoryId, newItem.insertedId);
            await onItemCreated();
        } catch (error) {
            console.error("A problem occured with item creation", error);
        } finally {
            callback();
            onClose();
        }
    }

    return(
        <PopupForm 
        title={title} 
        formArr={formArr} 
        onSubmit={onSubmit} 
        submitBtn={submitBtn} 
        onClose={onClose}        
        />
    );
}

// We are exporting ItemPopupForm wrapped in forwardRef because
// we want to use the ItemPopupForm component as well as the 
// internal state/functions we're referencing
export default ItemPopupForm;