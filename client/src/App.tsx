// import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Creation from "./pages/Creation";
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PackingListPage from './pages/PackingListPage';
import Layout from "./layout/Layout";


export default function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Landing />} />
          <Route path="/create" element={<Creation />} />
          <Route path="/packing-list/:id" element={<PackingListPage />} />
        </Route>
      </Routes>
    </Router>
  )
}
