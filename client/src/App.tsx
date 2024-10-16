// import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Creation from "./pages/Creation";
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PackingList from './pages/PackingList';
import Layout from "./components/Layout";


export default function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Landing />} />
          <Route path="/create" element={<Creation />} />
          <Route path="/packing-list/:id" element={<PackingList />} />
        </Route>
      </Routes>
    </Router>
  )
}
