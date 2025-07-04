import { Outlet } from "react-router-dom";
import SideBar from "./Sidebar";
import Navbar from "./Navbar";

export default function PrivateLayout() {
  return (
    <div>
      <header>
        {/* Header content goes here */}
        <Navbar privacy="private"/>
      </header>
      <div className="flex flex-row">
        <aside>
          {/* Header content goes here */}
          <SideBar />
        </aside>
        <main className="w-full">
          <Outlet />
        </main>
        <footer>{/* Footer content goes here */}</footer>
      </div>
    </div>

  );
}
