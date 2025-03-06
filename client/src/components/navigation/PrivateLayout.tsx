import { Outlet } from "react-router-dom";
import SideBar from "../Sidebar";

export default function PrivateLayout() {
  return (
    <div className="flex flex-row">
      <aside>
        {/* Header content goes here */}
        <SideBar />
      </aside>
      <main>
        <Outlet />
      </main>
      <footer>{/* Footer content goes here */}</footer>
    </div>
  );
}
