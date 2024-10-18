import React, { useState } from "react";
import { useNavigate } from "react-router-dom"

export default function Creation() {
    const navigate = useNavigate();
    const [listName, setListName] = useState("");
    const [duration, setDuration] = useState(1);
    const [selected, setSelected] = useState<string[]>([]);
    const categories = [
        "Clothes", "Personal Items","Toiletries",
        "Tourism", "Hiking", "Swimming",
    ];

    const items = categories.map((item, id) => {
        return(
            <div key={id} className="form-control">
                <label className="label cursor-pointer">
                    <span className="label-text">{item}</span>
                    <input 
                        id={item}
                        type="checkbox" 
                        className="checkbox checkbox-primary" 
                        onChange={(e) => handleCheck(e)}
                    />
                </label>
            </div>
        )
    })

    function handleCheck(e: React.ChangeEvent<HTMLInputElement>){
        const category = e.target.id;
        if (e.target.checked) {
            const newSelection: string[] = [...selected, category]
            setSelected(newSelection);
        }
        else {
            const categoryIndex = selected.indexOf(category);
            if (categoryIndex == -1) return;
            const newSelection: string[] = [...selected];
            newSelection.splice(categoryIndex);
            setSelected(newSelection);
        }
    }

    return(
        <div className="card w-96 shadow-xl card-bordered mx-auto">
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
                        value={listName}
                        onChange={(e) => setListName(e.target.value)}
                    />
                    <div className="label">
                        <span className="label-text">Trip Duration</span>
                    </div>
                    <input 
                        type="number" 
                        placeholder="Type here" 
                        min="1"
                        className="input input-bordered w-full max-w-xs" 
                        value={duration}
                        onChange={(e) => setDuration(e.target.valueAsNumber)}
                    />
                </label>
                <label className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="label-text">Categories</span>
                    </div>
                    {items}
                </label>
                <div className="card-actions justify-end">
                    <button className="btn btn-primary" onClick={() => navigate("/")}>Ok</button>
                    <button className="btn btn-secondary" onClick={() => navigate("/")}>Cancel</button>
                </div>
            </div>
        </div>
    )
}