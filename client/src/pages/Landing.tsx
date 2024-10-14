import Navbar from "../components/Navbar"

export default function Landing({onCreate}){
    return(
        <div>
            <Navbar/>
            Landing Page
            <button class="bg-indigo-300" type="submit" onClick={onCreate}>CLICK ME</button>
        </div>
    )
}