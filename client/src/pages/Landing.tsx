import AllPackingLists from "../components/AllPackingLists";
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function Landing(){
    const navigate = useNavigate();
    const [selectedList, setSelectedList] = useState(0);

    function handlePackingListClick(i) {
        setSelectedList(i);
        navigate("/packing-list/" + i)
    }

    return(
        <div className="text-center">
            <div className="card w-96 shadow-xl card-bordered mx-auto">
                <div className="card-body items-center text-center">
                    <div className="card-title">Packing Lists</div>
                    <AllPackingLists onPackingListClick={handlePackingListClick}/>
                    <button 
                        className="btn btn-accent w-80" 
                        type="submit" 
                        onClick={() => navigate("/create")}
                    >
                        Add New
                    </button>
                </div>
            </div>
        </div>
    )
}