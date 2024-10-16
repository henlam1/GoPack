// import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from 'react';
import Landing from "./pages/Landing";
import Creation from "./pages/Creation";
import './App.css'
import Navbar from './components/Navbar';

export default function App() {
  const [creating, setCreating] = useState(false);

  function handleLanding(){
    setCreating(false);
  }
  function handleCreate(){
    setCreating(true);
  }

  return (
    <>
      <Navbar/>
      {(creating)? 
      <Creation onFinish={handleLanding}/> : 
      <Landing onCreate={handleCreate}/>}
    </>
  )
}
