import { CategoryListType } from "../interfaces/CategoryList";
import CategoryPackingList from "./CategoryPackingList";

interface PackingListProps {
    categories: CategoryListType[],
}

export default function PackingList(props: PackingListProps) {
    console.log(props.categories);

    const categoryList = props.categories.map( (category, index) => {
        const link = `#item${index+1}`
        return <li><a href={link}>{category.name}</a></li>
    })
    return (
        <div className="">
            <ul className="menu bg-base-200 rounded-box sticky top-0 float-left w-3/12">
                <li className="menu-title uppercase">Categories</li>
                {categoryList}

            </ul>
            {CategoryPackingList(props)}
        </div>
    );
}