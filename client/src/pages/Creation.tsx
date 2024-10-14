import Navbar from "../components/Navbar";

export default function Creation({onFinish}) {
    return(
        <div>
            <Navbar/>
            Creation Page
            <button class="bg-indigo-300" type="submit" onClick={onFinish}>CLICK ME</button>
        </div>
    )
}