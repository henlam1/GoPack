import AllPackingLists from "../components/AllPackingLists";

export default function Landing({onCreate}){

    return(
        <div className="text-center">
            <div className="card w-96 shadow-xl card-bordered mx-auto">
                <div className="card-body items-center text-center">
                    <div className="card-title">Landing Page</div>
                    <AllPackingLists />
                    <button 
                        className="btn btn-accent rounded-full w-80" 
                        type="submit" 
                        onClick={onCreate}
                    >
                        Add New
                    </button>
                </div>
            </div>
        </div>
    )
}