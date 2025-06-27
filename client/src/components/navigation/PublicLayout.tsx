import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";

export default function PublicLayout() {
  
  return (
    <div>
      <header>
        {/* Header content goes here */}
        <Navbar />
      </header>
      <main>
        <Outlet />
      </main>
      <footer>{/* Footer content goes here */}</footer>
    </div>
  );
}
