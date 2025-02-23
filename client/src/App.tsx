import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "../oldFiles/layout/Layout";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
        </Route>
      </Routes>
    </Router>
  );
}
