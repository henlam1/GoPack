
export default function AllPackingLists(){
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
            id: 3,
            name: "London In Fall"
        },
    ]
    const listItems = allPackingLists.map( packingList => 
        <PackingListButton packingList={packingList} />
    )
    return(
        <>
            {listItems}
        </>
    )
}

function PackingListButton({packingList}) {
    return (
        <button key={packingList.id}
        className="btn btn-primary w-80"
        >
            {packingList.name}
        </button>
    )
}