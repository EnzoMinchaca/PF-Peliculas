
import './App.css';
import Home from "./components/AdmidView/Home"
import Details from "./components/AdmidView/Details"
import Form from "./components/AdmidView/Form"
import Car from "./components/UserView/Car"
import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom"


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/Home" element={<Home/>} />
        <Route exact path="/Details" element={<Details/>}/>
        <Route exact path="/Form" element={<Form/>}/>
        <Route exact path="/Car" element={<Car/>}/>
      </Routes>
    </BrowserRouter>
  )

}

export default App;
