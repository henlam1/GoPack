import CategoryPackingList from "./CategoryPackingList";

interface PackingListProps {
    categories: string[],
}

export default function PackingList(props: PackingListProps) {
    console.log(props.categories);

    const categoryList = props.categories.map( (category, index) => {
        const link = `#item${index+1}`
        return <li><a href={link}>{category}</a></li>
    })
    return (
        <div className="grid grid-cols-5">
            <ul className="menu bg-base-200 rounded-box sticky top-0">
                <li className="menu-title uppercase">Categories</li>
                {categoryList}

            </ul>
            {CategoryPackingList(props)}
        </div>
    );
}