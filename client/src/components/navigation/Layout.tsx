import Navbar from "../atomic/Navbar";
import { Outlet } from 'react-router-dom';

export default function Layout() {
    return(
        <div className="mt-12">
            <header>
            {/* Header content goes here */}
                <Navbar/>
            </header>
            <main>
                <Outlet/>
            </main>
            <footer>
            {/* Footer content goes here */}
            </footer>
        </div>
    )
}