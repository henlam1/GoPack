import { CategoryListType } from "../interfaces/CategoryList";

interface CategoryPackingListProps {
    categories: CategoryListType[],
}

/**
 * hmm we're definitely going to need to save the category choices and the 
"packed" or not packed sort of data per list
 */
const categoryChoices = [
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

export default function CategoryPackingList(props: CategoryPackingListProps) {
    const categoryList = props.categories.map( (category, index) => {
        const id = `item${index+1}`
        const choices = categoryChoices.map ( choice => 
            <tr>
                <th>
                    <label className="cursor-pointer label">
                        <input type="checkbox" className="checkbox checkbox-primary" />
                    </label>
                </th>
                <td>
                    <span className="label-text">{choice.name}</span>
                </td>
                <th>
                    { choice.quantity }
                </th>
            </tr>

        )
        return (
            <div className="carousel-item">
                <h2 className="font-bold text-3xl">{category.name}</h2>
                <table id={id} className="table border-collapse">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Item</th>
                            <th>Qty</th>
                        </tr>
                    </thead>
                    <tbody>

                    </tbody>
                    { choices }
                </table>
            </div>
        );
    });

    return (
        <div className="col-span-4 carousel carousel-vertical">
            { categoryList }
        </div>
    );
}
