import './App.css';
import Home from "./components/UserView/Home"
import Details from "./components/UserView/Details"
import Form from "./components/AdmidView/Form"
import Car from "./components/UserView/Car"
import Landing from "./components/Presentational/LandingPage"
import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import EditUser from './components/UserView/EditUser';
//import Order from './components/UserView/Order';


function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route exact path="/" element={<Landing/>} />
        <Route exact path="/Home" element={<Home/>} />
        <Route exact path="/Details/:id" element={<Details/>}/>
        <Route exact path="/Create" element={<Form/>}/>
        <Route exact path="/Car" element={<Car/>}/>
        <Route exact path="/editUser" element={<EditUser/>}/>
      </Routes>
    </BrowserRouter>
  )

}

export default App;