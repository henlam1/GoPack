import React, { useState } from "react";
import { useNavigate } from "react-router-dom"

interface Form {
    name: string,
    duration: number,
    categories: string[],
}

export default function Creation() {
    const navigate = useNavigate();
    const [form, setForm] = useState<Form>({
        name: "",
        duration: 1,
        categories: [],
    })

    const categories = [
        "Clothes", "Personal Items","Toiletries",
        "Tourism", "Hiking", "Swimming",
    ];

    // Create buttons for each preset category
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

    // Handler for check box clicks
    function handleCheck(e: React.ChangeEvent<HTMLInputElement>){
        const category = e.target.id;
        if (e.target.checked) {
            const newSelection: string[] = [...form.categories, category]
            updateForm({categories: newSelection});
        }
        else {
            const categoryIndex = form.categories.indexOf(category);
            if (categoryIndex == -1) return;
            const newSelection: string[] = [...form.categories];
            newSelection.splice(categoryIndex);
            updateForm({categories: newSelection});
        }
        console.log(form);
    }

    // Handler for updating form
    function updateForm(value: { name?: string; duration?: number; categories?: string[]; }) {
        return setForm((prev) => {
            return {...prev, ...value};
        })
    }

    // Handle the submission to the backend
    async function handleSubmit(e: { preventDefault: () => void; }){
        e.preventDefault();
        console.log("Being pressed");
        
        const packingList = {...form};
        try {
            const response = await fetch("http://localhost:5050/packingList", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(packingList)
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
        } catch (error) {
            console.error("A problem occured with packing list creation", error);
        } finally {
            setForm({ name: "", duration: 1, categories: []});
            navigate("/");
        }
    }

    function handleCancel(e: { preventDefault: () => void; }){
        e.preventDefault();
        navigate("/");
    }

    return(
        <div className="card w-96 shadow-xl card-bordered mx-auto">
            <div className="card-body items-center text-center">
                <div className="card-title">Creation Page</div>
                <form onSubmit={handleSubmit}>
                    <label className="form-control w-full max-w-xs">
                        <div className="label">
                            <span className="label-text">Packing List Name</span>
                        </div>
                        <input 
                            type="text" 
                            placeholder="Type here" 
                            className="input input-bordered w-full max-w-xs" 
                            value={form.name}
                            onChange={(e) => updateForm({name: e.target.value})}
                        />
                        <div className="label">
                            <span className="label-text">Trip Duration</span>
                        </div>
                        <input 
                            type="number" 
                            placeholder="Type here" 
                            min="1"
                            className="input input-bordered w-full max-w-xs" 
                            value={form.duration}
                            onChange={(e) => updateForm({duration: e.target.valueAsNumber})}
                        />
                    </label>
                    <div className="card-title justify-center mt-10">Select Categories</div>
                    <label className="form-control w-full max-w-xs">
                        {items}
                    </label>
                    <div className="card-actions justify-between">
                        <button className="btn btn-primary" type="submit">Create List</button>
                        <button className="btn btn-secondary" onClick={handleCancel}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    )
}