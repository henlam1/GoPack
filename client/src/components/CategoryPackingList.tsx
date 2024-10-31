import { CategoryListType } from "../interfaces/CategoryList";
import PopupForm, { PopupFormHandles } from "./PopupForm";
import { useDynamicRefs } from "../customHooks/useDynamicRefs";

interface CategoryPackingListProps {
    categories: CategoryListType[],
}

/**
 * hmm we're definitely going to need to save the category choices and the 
"packed" or not packed sort of data per list
 */
const items = [
    {
        "name": "Remember me 1",
        "quantity": 3
    },
    {
        "name": "Remember me 2",
        "quantity": 14
    },
    {
        "name": "Remember me 3",
        "quantity": 12
    },
    {
        "name": "Remember me 4",
        "quantity": 7
    },
]

export default function CategoryPackingList({ categories }: CategoryPackingListProps) {
    // const popupFormRef = useRef<PopupFormHandles>(null);
    // const handleShowForm = () => {
    //     popupFormRef.current?.showForm();
    // }

    // const [lists, setLists] = useState([]); // List contains objects of format {id: number}
    const getRef = useDynamicRefs<PopupFormHandles>();

    const handleShowForm = (id: string) => {
        getRef(id).current?.showForm();
    };

    // const addList = () => {
    //     const newList = {id: lists.length + 1};
    //     setLists([...lists, newList]);
    // };

    // const removeList = (id: number) => {
    //     const newLists = lists.filter((list) => list.id !== id);
    //     setLists(newLists);
    // };

    const categoryList = categories.map( (category, index) => {
        const id = `item${index+1}`;
        const choices = items.map( (item) => {
            return(
                <div className="flex flex-row">
                    <div className="basis-1/6">
                        <input type="checkbox" className="checkbox checkbox-primary size-6"/>
                    </div>
                    <div className="label-text basis-4/6" contentEditable="true">{item.name}</div>
                    <div className="flex flex-row basis-1/6 justify-between">
                       <button className="btn btn-xs btn-square">-</button>
                       <div className="size-6 text-center"contentEditable="true">{ item.quantity }</div>
                       <button className="btn btn-xs btn-square">+</button>
                    </div>
                </div>
            )
        });
        console.log(category.name);
        const popUpForm = (
            <PopupForm
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
                    <h3 className="font-bold text-xl basis-1/6">Packed</h3>
                    <h3 className="font-bold text-xl basis-4/6">Item</h3>
                    <h3 className="font-bold text-xl basis-1/6">Quantity</h3>
                </div>
                { choices }
                <div className="flex flex-row basis-full justify-center">
                    <button 
                        className="btn btn-xs btn-square btn-accent"
                        onClick={() => {handleShowForm(category._id)}}
                    >+</button>
                    {popUpForm}
                </div>
            </div>
        );
    });

    return (
        <div className="carousel carousel-vertical w-9/12">
            { categoryList }
        </div>
    );
}
