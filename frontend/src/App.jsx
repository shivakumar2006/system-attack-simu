import React from 'react';
import "./App.css";
import { Routes, Route } from "react-router-dom";

const App = () => {
    return (
        <Routes>
            <Route path="/" element={Home} />
            <Route path="/signup" element={Signup} />
            <Route path="/login" element={Login} />
        </Routes>
    )
}

export default App;