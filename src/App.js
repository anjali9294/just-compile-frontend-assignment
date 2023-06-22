import React, { useState, useEffect } from "react";
import Home from "./components/Home.js";
import { Route, Routes } from "react-router-dom";
import Login from "./components/Login.js";
import Register from "./components/Register.js";
import Todos from "./components/Todos.js";
const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/todos" element={<Todos />} />
      </Routes>
    </div>
  );
};

export default App;
