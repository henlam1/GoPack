import AllPackingLists from "../components/AllPackingLists";
import Navbar from "../components/Navbar"
// import { useState } from 'react';

export default function Landing({onCreate}){
    // const [packingListNames, setPackingListNames] = useState([]);

    return(
        <div>
            <Navbar/>
            <div className="container
            bg-gray-300
            grid grid-cols-1 gap-1">
                <p className="break-after-auto">Landing Page</p>
                <AllPackingLists />
                <button 
                    className="btn btn-secondary rounded-full w-80 mx-auto" 
                    type="submit" 
                    onClick={onCreate}
                >
                    Add New
                </button>
            </div>
        </div>
    )
}