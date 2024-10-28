import AllPackingLists from "../components/AllPackingLists";
import { useNavigate } from 'react-router-dom';

export default function Landing(){
    const navigate = useNavigate();

    return(
        <div className="text-center">
            <div className="card w-96 shadow-xl card-bordered mx-auto">
                <div className="card-body items-center text-center">
                    <div className="card-title">Packing Lists</div>
                    <AllPackingLists />
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