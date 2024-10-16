import { useNavigate } from "react-router-dom"

export default function Creation() {
    const navigate = useNavigate();
    const categories = ["apples", "bananas", "dogs", "fish"];
    const items = categories.map((item) => {
        return(
            <div className="card bg-base-100 w-50 h-50 p-2 shadow-xl">
                <figure>
                    <img
                    src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                    alt="Shoes" />
                </figure>
                <div className="card-body p-0">
                    <p>{item}</p>
                </div>
            </div>
        )
    })
    return(
        <div className="card shadow-xl card-bordered mx-auto">
            <div className="card-body items-center text-center">
                <div className="card-title">Creation Page</div>
                <label className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="label-text">Packing List Name</span>
                    </div>
                    <input 
                        type="text" 
                        placeholder="Type here" 
                        className="input input-bordered w-full max-w-xs" 
                    />
                    <div className="label">
                        <span className="label-text">Trip Duration</span>
                    </div>
                    <input 
                        type="number" 
                        placeholder="Type here" 
                        min="0"
                        className="input input-bordered w-full max-w-xs" 
                    />
                </label>
                <label className="w-full max-w-xs">
                    <div className="label">
                        <span className="label-text">Categories</span>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                        {items}
                    </div>
                </label>
                <div className="card-actions justify-end">
                    <button className="btn btn-primary" onClick={() => navigate("/")}>Ok</button>
                    <button className="btn btn-secondary" onClick={() => navigate("/")}>Cancel</button>
                </div>
            </div>
        </div>
    )
}