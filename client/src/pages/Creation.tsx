import Navbar from "../components/Navbar";

export default function Creation({onFinish}) {
    return(
        <div className="mt-12">
            Creation Page
            <button className="bg-indigo-300" type="submit" onClick={onFinish}>CLICK ME</button>
        </div>
    )
}