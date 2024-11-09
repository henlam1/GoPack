import { useEffect, useState } from "react"
import { useNavigate } from 'react-router-dom';
import { getPackingLists } from "../services/packingList";
import { PackingListType } from "../interfaces/PackingList";

export default function AllPackingLists(){
    const [allPackingLists, setAllPackingLists] = useState<PackingListType[]>([]);

    // This method fetches the all packing lists from the database.
    useEffect(() => {
      async function getAllPackingLists() {
        const response = await getPackingLists();
        const packingLists = await response?.json();
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
interface PackingListButtonProps {
    packingList: PackingListType
}
function PackingListButton(props: PackingListButtonProps) {
    const navigate = useNavigate();
    return (
        <button key={props.packingList._id}
        className="btn btn-primary w-80"
        onClick={() => navigate("/packing-list/" + props.packingList._id)}
        >
            {props.packingList.name}
        </button>
    )
}