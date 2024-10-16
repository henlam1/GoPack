
export default function AllPackingLists({onPackingListClick}){
    const allPackingLists = [
        {
            id: 0,
            name: "Coppenhagen in Winter"
        },
        {
            id: 1,
            name: "Paris In Summer"
        },
        {
            id: 2,
            name: "London In Fall"
        },
    ]
    const listItems = allPackingLists.map( packingList => 
        <PackingListButton packingList={packingList} onPackingListClick={() => onPackingListClick(packingList.id)}/>
    )
    return(
        <>
            {listItems}
        </>
    )
}

function PackingListButton({packingList, onPackingListClick}) {
    return (
        <button key={packingList.id}
        className="btn btn-primary w-80"
        onClick={onPackingListClick}
        >
            {packingList.name}
        </button>
    )
}