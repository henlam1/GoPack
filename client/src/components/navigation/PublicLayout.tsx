import Navbar from "../atomic/Navbar";
import { Outlet } from "react-router-dom";

// TODO: Create public and private layoud
// TODO: Follow Figma design system
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
