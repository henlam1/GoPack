// import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from 'react';
import Landing from "./pages/Landing";
import Creation from "./pages/Creation";
import './App.css'
import Layout from './components/Layout';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


export default function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Landing />} />
          <Route path="/create" element={<Creation />} />
          {/* <Route path="/list/:name" element={<Contact />} /> */}
        </Route>
      </Routes>
    </Router>

  )
}
