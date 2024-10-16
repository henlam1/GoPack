import AllPackingLists from "../components/AllPackingLists";

type LandingProps = {
    onCreate: () => void;
}

export default function Landing(props: LandingProps){

    return(
        <div className="text-center">
            <div className="card w-96 shadow-xl card-bordered mx-auto">
                <div className="card-body items-center text-center">
                    <div className="card-title">Packing Lists</div>
                    <AllPackingLists />
                    <button 
                        className="btn btn-accent w-80" 
                        type="submit" 
                        onClick={props.onCreate}
                    >
                        Add New
                    </button>
                </div>
            </div>
        </div>
    )
}