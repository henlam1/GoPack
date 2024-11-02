import { CategoryListType } from "../interfaces/CategoryList";
import CategoryPackingList from "./CategoryPackingList";

interface PackingListProps {
    categories: CategoryListType[],
}

export default function PackingList(props: PackingListProps) {
    console.log(props);
    // interface catMap {
    //     id: number
    // }
    // const [catLists, setCatLists] = useState<catMap[]>([]); // List contains objects of format {id: number}
    // const getRef = useDynamicRefs<PopupFormHandles>();

    // const handleShowForm = (id: string) => {
    //     getRef(id).current?.showForm();
    // };

    // const addCatList = () => {
    //     const newList = {id: catLists.length + 1};
    //     setCatLists([...catLists, newList]);
    // };

    // const removeCatList = (id: number) => {
    //     const newLists = catLists.filter((catList) => catList.id !== id);
    //     setCatLists(newLists);
    // };

    const categoryList = props.categories.map( (category, index) => {
        const link = `#item${index+1}`
        return <li key={index}><a href={link}>{category.name}</a></li>
    })
    return (
        <div className="">
            <ul className="menu bg-base-200 rounded-box sticky top-0 float-left w-3/12">
                <li key="title" className="menu-title uppercase">Categories</li>
                {categoryList}
                <li key={"addCategory"}><button className = "btn btn-accent">Add category</button></li>

            </ul>
            {CategoryPackingList(props)}
        </div>
    );
}