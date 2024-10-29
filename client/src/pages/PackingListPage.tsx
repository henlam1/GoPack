import { useEffect, useState } from "react"
import { useParams } from 'react-router';
import PackingList from '../components/PackingList';
import { PackingListType } from "../interfaces/PackingList";

export default function PackingListPage() {
    const {id} = useParams();
    const emptyPackingList = {
      name: "placeholder",
      duration: 1,
      categories: [],
    }
    const [packingList, setPackingList] = useState<PackingListType>(emptyPackingList);
    
    console.log(id);
    console.log(packingList)

    // This method fetches the all packing lists from the database.
    useEffect(() => {
      async function getPackingList() {
        const response = await fetch(`http://localhost:5050/packingList/` + id);
        if (!response.ok) {
          const message = `An error occurred: ${response.statusText}`;
          console.error(message);
          return;
        }
        const packingList = await response.json();
        setPackingList(packingList);
      }
      getPackingList();
      return;
    }, [id]);


    return (
        <div>
            <h1 className="font-bold text-6xl mb-10">{packingList.name}</h1>
            <PackingList categories={packingList.categories}/>
        </div>
    );
}