import { useEffect, useState } from "react"
import { useParams } from 'react-router';
import PackingList from '../components/PackingList';

export default function PackingListPage() {
    const {id} = useParams();
    console.log(id);
    const emptyPackignList = {
        name: "placeholder"
    }
    const [packingList, setPackingList] = useState(emptyPackignList);

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
    }, [packingList, id]);


    return (
        <div className="prose mx-auto">
            <h1>{packingList.name}</h1>
            <PackingList/ >
        </div>
    );
}