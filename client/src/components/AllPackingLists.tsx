import { useEffect, useState } from "react"
import { useNavigate } from 'react-router-dom';

export default function AllPackingLists(){
    const [allPackingLists, setAllPackingLists] = useState([]);

    // This method fetches the all packing lists from the database.
    useEffect(() => {
      async function getAllPackingLists() {
        const response = await fetch(`http://localhost:5050/packingList/`);
        if (!response.ok) {
          const message = `An error occurred: ${response.statusText}`;
          console.error(message);
          return;
        }
        const packingLists = await response.json();
        setAllPackingLists(packingLists);
      }
      getAllPackingLists();
      return;
    }, [allPackingLists.length]);

    
    const listItems = allPackingLists.map( packingList => 
        <PackingListButton packingList={packingList}/>
    )
    return(
        <>
            {listItems}
        </>
    )
}

function PackingListButton({packingList}) {
    const navigate = useNavigate();
    return (
        <button key={packingList.id}
        className="btn btn-primary w-80"
        onClick={() => navigate("/packing-list/" + packingList._id)}
        >
            {packingList.name}
        </button>
    )
}