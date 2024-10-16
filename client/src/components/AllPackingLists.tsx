
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
        // className="rounded-lg bg-purple-200 
        // hover:border-1 hover:border-purple-300 
        // w-80 h-7
        // cursor-pointer 
        // mx-auto"
        className="btn btn-primary rounded-full w-80 mx-auto"
        >
            {packingList.name}
        </button>
    )
}