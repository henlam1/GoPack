// import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from 'react';
import Landing from "./pages/Landing";
import Creation from "./pages/Creation";
import './App.css'
import Navbar from './components/Navbar';
import Layout from './components/Layout';

export default function App() {
  const [creating, setCreating] = useState(false);
  let currentPage; 
  if (creating){
    currentPage = <Creation onFinish={handleLanding}/>;
  } else{
    currentPage = <Landing onCreate={handleCreate}/>;
  }

  function handleLanding(){
    setCreating(false);
  }
  function handleCreate(){
    setCreating(true);
  }

  return (
    <>
      <Navbar/>
      <Layout children={currentPage}></Layout>
    </>
  )
}
