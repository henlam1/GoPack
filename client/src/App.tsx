import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/navigation/Layout";
import PublicHomePage from "./pages/public/HomePage";
import LoginPage from "./pages/public/LoginPage";
import RegisterPage from "./pages/public/RegisterPage";
import PrivateHomePage from "./pages/private/HomePage"

export default function App() {
  return (
    <Router>
      <Routes>
        {/* TODO: Separate layout of public and private routes */}
        {/* TODO: Rename public/private home pages to proper names */}
        <Route element={<Layout />}>
          {/* PUBLIC ROUTES */}
          <Route path="/" element={<PublicHomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* PRIVATE ROUTES */}
          <Route path="/home" element={<PrivateHomePage />} />

        </Route>
      </Routes>
    </Router>
  );
}
