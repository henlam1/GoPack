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
        const choices = items.map( (item, index2) => {
            return (
                <tr key={`${category} ${index2}`}>
                    <td>
                        <input type="checkbox" className="checkbox checkbox-primary size-6"/>
                    </td>
                    <td>
                        <span className="label-text">{item.name}</span>
                    </td>
                    <td>
                        { item.quantity }
                    </td>
                </tr>
            );
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
            <div id={id} key={id} className="carousel-item flex flex-wrap ml-10">
                <h2 className="font-bold text-3xl">{category.name}</h2>
                <table className="table border-collapse">
                    <thead>
                        <tr>
                            <th>Packed</th>
                            <th>Item</th>
                            <th>Qty</th>
                        </tr>
                    </thead>
                    <tbody>
                        { choices }
                        <tr key={"form"}>
                            <td>
                                <svg 
                                xmlns="http://www.w3.org/2000/svg" 
                                fill="none" 
                                viewBox="0 0 24 24" 
                                strokeWidth="1.5" 
                                stroke="currentColor" 
                                className="size-6 cursor-pointer"
                                onClick={() => {handleShowForm(category._id)}}
                                >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                </svg>
                            {popUpForm}
                            {/* <PopupForm
                                categoryId={category._id}
                                categoryName={category.name}
                                ref={popupFormRef} 
                            /> */}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    });

    return (
        <div className="carousel carousel-vertical w-9/12">
            { categoryList }
        </div>
    );
}
