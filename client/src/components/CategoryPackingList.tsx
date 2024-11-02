import { CategoryListType } from "../interfaces/CategoryList";
import ItemPopupForm, { ItemPopupFormHandles } from "./ItemPopupForm";
import { useDynamicRefs } from "../customHooks/useDynamicRefs";

interface CategoryPackingListProps {
    categories: CategoryListType[],
}

/**
 * hmm we're definitely going to need to save the category choices and the 
"packed" or not packed sort of data per list
 */

export default function CategoryPackingList({ categories }: CategoryPackingListProps) {
    const getRef = useDynamicRefs<ItemPopupFormHandles>();

    const handleShowForm = (id: string) => {
        getRef(id).current?.showForm();
    };

    // let itemMap = new Map();
    const items = [{name: "apple", quantity: 0, packed: false}];

    const categoryList = categories.map( (category, index) => {
        // Fetch items first
        const id = `item${index+1}`;
        const choices = items.map( (item) => {
            return(
                <div className="flex flex-row items-center">
                    <div className="basis-2/12">
                        <input type="checkbox" className="checkbox checkbox-primary size-6"/>
                    </div>
                    <div className="label-text basis-6/12" contentEditable="true">{item.name}</div>
                    <div className="flex flex-row basis-2/12 justify-between">
                       <button className="btn btn-xs btn-square">-</button>
                       <div className="size-6 text-center"contentEditable="true">{ item.quantity }</div>
                       <button className="btn btn-xs btn-square">+</button>
                    </div>
                    <div className="basis-2/12">
                        <div className="dropdown dropdown-left">
                            <div tabIndex={0} role="button" className="btn btn-xs btn-square">...</div>
                            <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                                <li><button className="btn btn-ghost">Edit Item</button></li>
                                <li><button className="btn btn-secondary">Delete Item</button></li>
                            </ul>
                        </div>
                    </div>
                </div>
            )
        });
        console.log(category.name);
        const itemPopUpForm = (
            <ItemPopupForm
            categoryId={category._id}
            categoryName={category.name}
            ref={getRef(category._id)} 
            />
        );
        return (
            <div id={id} key={id} className="carousel-item flex flex-col flex-wrap ml-10">
                <div className="basis-full text-left">
                    <h2 className="font-bold text-3xl">{category.name}</h2>
                </div>
                <div className="flex flex-row">
                    <div className="font-bold text-l basis-2/12">Packed</div>
                    <div className="font-bold text-l basis-6/12">Item</div>
                    <div className="font-bold text-l basis-2/12">Quantity</div>
                    <div className="font-bold text-l basis-2/12">Edits</div>
                </div>
                { choices }
                <div className="flex flex-row">
                    <div className="basis-2/12 justify-left">
                        <button 
                            className="btn btn-sm btn-accent"
                            onClick={() => {handleShowForm(category._id)}}
                        >Add Item</button>
                        {itemPopUpForm}
                    </div>
                </div>
            </div>
        );
    });

    return (
        <div className="carousel carousel-vertical w-7/12">
            { categoryList }
        </div>
    );
}
