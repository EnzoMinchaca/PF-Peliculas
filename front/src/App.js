import './App.css';
import Home from "./components/UserView/Home"
import Details from "./components/UserView/Details"
import Form from "./components/AdmidView/Form"
import Car from "./components/UserView/Car"
import Landing from "./components/Presentational/LandingPage"
import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import EditUser from './components/UserView/EditUser';
import AdminPanel from './components/AdmidView/AdminPanel';
import Confirm from './components/UserView/Confirm';
import Success from './components/UserView/Success';
import Example from './components/UserView/Example';
import Password from './components/UserView/Password';
import VistaUser from './components/AdmidView/VistaUser';
import AdminModifyMovies from './components/AdmidView/Admin-ModifyMovies';
import ModifyMovies from './components/AdmidView/ModifyMovies';
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
        <Route exact path="/panel" element={<AdminPanel/>}/>
        <Route exact path="/confirm" element={<Confirm/>}/>
        <Route exact path="/success" element={<Success/>} />
        <Route exact path="/example" element={<Example/>} />
        <Route exact path="/password" element={<Password/>} />
        <Route exact path="/vistaUser" element={<VistaUser/>} />
        <Route exact path="/modifyMovies" element={<AdminModifyMovies/>} />
        <Route exact path="/Modify/:id" element={<ModifyMovies/>} />
      </Routes>
    </BrowserRouter>
  )

}

export default App;