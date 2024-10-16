import { useNavigate } from "react-router-dom"

export default function Creation() {
    const navigate = useNavigate();
    return(
        <div className="card w-96 shadow-xl card-bordered mx-auto">
            <div className="card-body items-center text-center">
                <div className="card-title">Creation Page</div>
                <label className="form-control w-full max-w-xs">
                <div className="label">
                    <span className="label-text">Packing List Name</span>
                </div>
                <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
                <div className="label">
                    <span className="label-text">Trip Duration</span>
                </div>
                <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
                </label>
                <div className="card-actions justify-end">
                    <button className="btn btn-primary" onClick={() => navigate("/")}>Ok</button>
                    <button className="btn btn-secondary" onClick={() => navigate("/")}>Cancel</button>
                </div>
            </div>
        </div>
    )
}