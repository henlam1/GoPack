import { useCallback, useEffect, useState } from "react";
import CategoryPackingList from "../categories/CategoryPackingList";
import { getCategoryList } from "../../services/categoryList";
import { CategoryListType } from "../../interfaces/CategoryList";
import CategoryPopupForm from "../categories/CategoryPopupForm";
import { getPackingListCategories } from "../../services/packingList";

interface PackingListProps {
    packingListId: string,
    packingListName: string,
    categoryIds: string[],
}

export default function PackingList(props: PackingListProps) {
    const [categoryIds, setCategoryIds] = useState<string[]>(props.categoryIds);
    const [categoryData, setCategoryData] = useState<CategoryListType[]>([]);
    const [loading, setLoading] = useState(true);
    const [idsFetched, setIdsFetched] = useState(false);
    const [openForm ,setOpenForm] = useState(false);

    const getCategoryIds = useCallback(async () => {
        try {
            setIdsFetched(false);
            const response = await getPackingListCategories(props.packingListId);
            const data: string[] = await response?.json();
            setCategoryIds(data);
            setIdsFetched(true);
        }
        catch (error){
            console.error("Error fetching category packing list:", error);
        }
    }, [props.packingListId]);

    const getCategoryData = useCallback(async () => {
        try {
            const responses = await Promise.all(categoryIds.map((itemId: string) => getCategoryList(itemId)));
            const data: CategoryListType[] = await Promise.all(responses.map(response => response?.json()));
            setCategoryData(data);
        }
        catch (error){
            console.error("Error fetching all category lists:", error);
        }
    }, [categoryIds]);

    useEffect(() => {
        getCategoryIds();
    }, [getCategoryIds])

    useEffect(() => {
        if (idsFetched){
            getCategoryData();
            setLoading(false);
        }
    }, [getCategoryData, idsFetched])
    

    const handleShowForm = () => {
        setOpenForm(true);
    };
    const handleCloseForm = () => {
        setOpenForm(false);
    }

    // Return a spinner if data is still loading
    if (loading) {
        return <span className="loading loading-spinner loading-lg"></span>;
    }

    const categoryList = categoryData.map( (category, index) => {
        const link = `#item${index+1}`
        return <li key={index}><a href={link}>{category.name}</a></li>
    })

    const categoryPackingLists = categoryIds.map( (id, index) => {
        return <CategoryPackingList key={index} categoryId={id}></CategoryPackingList>
    })

    const categoryPopupForm = (
        <CategoryPopupForm
        packingListId={props.packingListId}
        packingListName={props.packingListName}
        onCategoryCreated={getCategoryIds}
        onClose={handleCloseForm}
        />
    );

    return (
        <div className="">
            <ul className="menu bg-base-200 rounded-box sticky top-0 float-left w-3/12">
                <li key="title" className="menu-title uppercase">Categories</li>
                { categoryList }
                <li key={"addCategory"}>
                    <button 
                        className = "btn btn-accent"
                        onClick={() => {handleShowForm()}}
                    >Add category
                    </button>
                </li>
            </ul>
            {openForm && (
                categoryPopupForm
            )}
            <div className="carousel carousel-vertical w-7/12">
                { categoryPackingLists }
            </div>
        </div>
    );
}