import { useEffect, useState } from "react";
import CategoryPackingList from "./CategoryPackingList";
import { getCategoryList } from "../services/categoryList";
import { CategoryListType } from "../interfaces/CategoryList";

interface PackingListProps {
    categories: string[],
}

export default function PackingList(props: PackingListProps) {
    const [allCategories, setAllCategories] = useState<CategoryListType[]>([]);
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

    useEffect(() => {
        const fetchData = async () => {
            try {
                const responses = await Promise.all(props.categories.map((itemId: string) => getCategoryList(itemId)));
                const data: CategoryListType[] = await Promise.all(responses.map(response => response?.json()));
                setAllCategories(data);
            }
            catch (error){
                console.error("Error fetching all category lists:", error);
            }
        };
        fetchData();
    }, [props])

    const categoryList = allCategories.map( (category, index) => {
        const link = `#item${index+1}`
        return <li key={index}><a href={link}>{category.name}</a></li>
    })

    const categoryPackingLists = allCategories.map( (category) => {
        return <CategoryPackingList categoryId={category._id}></CategoryPackingList>
    })
    
    return (
        <div className="">
            <ul className="menu bg-base-200 rounded-box sticky top-0 float-left w-3/12">
                <li key="title" className="menu-title uppercase">Categories</li>
                {categoryList}
                <li key={"addCategory"}><button className = "btn btn-accent">Add category</button></li>

            </ul>
            <div className="carousel carousel-vertical w-7/12">
                { categoryPackingLists }
            </div>
        </div>
    );
}