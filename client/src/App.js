import React from "react";
import { Route, Routes } from "react-router-dom";
import './App.css';
import  Homepage from './components/Homepage';
import Navbar from "./components/Navbar";
import Profile from "./components/Profile";
import Login from "./components/Login";
import Inbox from "./components/Inbox";
import Sighnup from "./components/Sighnup";
import Posts from "./components/Posts";
import Friends from "./components/Friends";


function App() {
  return (
    <>
      <Navbar/>
      <Routes>
        <Route exact path="/" element={<Homepage />} />
        <Route path="/post/:id" element={<Posts />} />
        <Route path="/sighnup" element={<Sighnup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/inbox" element={<Inbox />} />
        <Route path="/friends" element={<Friends />} />
      </Routes>
    </>
  );
}

export default App;