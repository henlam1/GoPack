import { postCategoryList } from "../../services/categoryList";
import { addToPackingList } from "../../services/packingList";
import PopupForm from "../../components/PopupForm";
import { Dictionary } from "../../interfaces/Dictionary";


interface CategoryPopupFormProps {
    packingListId: string,
    packingListName: string,
    onCategoryCreated: (packingListId: string) => Promise<void>,
    onClose: () => void;
}

function CategoryPopupForm({ packingListId, packingListName, onCategoryCreated, onClose}: CategoryPopupFormProps) {
    const title = `Add Category for ${packingListName}`;
    const formArr = [
        {
            "label": "Name",
            "name": "name",
            "type": "string",
        },
    ]
    const submitBtn = "Create Category"

    async function onSubmit(form: Dictionary, callback: () => void){
        console.log("Form submitted, creating new item for packing list: ", packingListId);
        console.log(form);
        try {
            // Check form
            if (!form.name) {
                alert("All fields are required");
                return;
            }
            else if (typeof form.name !== "string") {
                alert("Invalid form types");
                return;
            }
            const response = await postCategoryList({
                name: form.name,
                items: [],
            });
            const newCategory = await response?.json();
            console.log("new category", newCategory)
            await addToPackingList(packingListId, newCategory._id);
            await onCategoryCreated(packingListId);
        } catch (error) {
            console.error("A problem occured with category creation", error);
        } finally {
            callback();
            onClose()
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

export default CategoryPopupForm;