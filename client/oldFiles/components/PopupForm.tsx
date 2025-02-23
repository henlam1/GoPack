import React, { useState } from "react";
import { Dictionary } from "../interfaces/Dictionary";


interface FormArrObj {
    label: string,
    name: string,
    type: string,
}

interface PopupFormProps {
    title: string,
    formArr: Array<FormArrObj>, 
    onSubmit: (
        form: Dictionary, 
        callback: () => void
    ) => void,
    submitBtn: string,
    onClose: () => void,
}

const prepareForm = (formArr: Array<FormArrObj>): Dictionary => {
    return formArr.reduce((r, v) => ({ ...r, [v.name]: ""}), {});
}

function PopupForm({title, formArr, onSubmit, submitBtn, onClose}: PopupFormProps) {
    const initForm = prepareForm(formArr);
    const [form, setForm] = useState(initForm);

    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => { 
        setForm((p) => ({ ...p, [e.target.name]: e.target.value}))
    };
    const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => { 
        e.preventDefault(); // Prevent page from refreshing when submitting
        console.log("cunt");
        onSubmit(form, () => setForm(initForm))
    };

    return(
        <>
            <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-40">
                <div className="bg-white p-6 rounded shadow-lg">
                    <h2 className="text-xl mb-4">{title}</h2>
                    <form onSubmit={onSubmitHandler}>
                        {formArr.map(({ label, name, type}, index) => {
                            return(
                            <div key={index}>
                                <div className="label">
                                    <span className="label-text">{label}</span>
                                </div>
                                <input
                                    id={name}
                                    name={name}
                                    type={type}
                                    value={form[name]}
                                    minLength={1}
                                    className="border p-2 mb-4 w-full"
                                    required
                                    onChange={(e) => {onChangeHandler(e)}}
                                ></input>
                            </div>
                            )
                        })}
                        <div className="card-actions justify-between">
                            <button className="btn btn-primary" type="submit">{submitBtn}</button>
                            <button className="btn btn-secondary" type="button" onClick={onClose}>Cancel</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default PopupForm;