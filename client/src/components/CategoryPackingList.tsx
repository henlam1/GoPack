interface CategoryPackingListProps {
    categories: string[],
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
            <label className="cursor-pointer label">
                <span className="label-text">{choice.name}</span>
                <input type="checkbox" className="checkbox checkbox-primary" />
            </label>
        )
        return (
            <div id={id} className="carousel-item h-full w-10/12 card shadow-xl card-bordered mx-auto">
                <h2>{category}</h2>
                { choices }
            </div>
        );
    });

    return (
        <div className="col-span-4 carousel carousel-vertical w-full h-98">
            { categoryList }
        </div>
    );
}
