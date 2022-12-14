import './App.css';
import Home from "./components/UserView/Home"
import Details from "./components/UserView/Details"
import Form from "./components/AdmidView/Form"
import Landing from "./components/Presentational/LandingPage"
import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import EditUser from './components/UserView/EditUser';
import AdminPanel from './components/AdmidView/AdminPanel';
import Confirm from './components/UserView/Confirm';
import Success from './components/UserView/Success';
import Example from './components/UserView/Example';
import Password from './components/UserView/Password';
import Questions from "./components/Presentational/Questions.tsx"
import Favorites from "./components/UserView/Favorites/Favorites"
import AdminModifyUser from './components/AdmidView/VistaUser';
import AdminModifyMovies from './components/AdmidView/Admin-ModifyMovies';
import ModifyMovies from './components/AdmidView/ModifyMovies';
import ConfirmPay from './components/UserView/ConfirmPay';
import CancelPay from './components/UserView/CancelPay';
import AboutUs from "./components/Presentational/AboutUs"
import AdminModUser from "./components/AdmidView/AdminModifyUser";
import ViewMovie from './components/UserView/ViewMovie';





function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Landing/>} />
        <Route exact path="/Home" element={<Home/>} />
        <Route exact path="/Details/:id" element={<Details/>}/>
        <Route exact path="/Create" element={<Form/>}/>
        <Route exact path="/editUser" element={<EditUser/>}/>
        <Route exact path="/panel" element={<AdminPanel/>}/>
        <Route exact path="/confirm" element={<Confirm/>}/>
        <Route exact path="/confirmPay" element={<ConfirmPay/>}/>
        <Route exact path="/cancelPay" element={<CancelPay/>}/>
        <Route exact path="/success" element={<Success/>} />
        <Route exact path="/example" element={<Example/>} />
        <Route exact path="/password" element={<Password/>} />
        <Route exact path="/ViewMovies" element={<AdminModifyMovies/>} />
        <Route exact path="/modifyMovies" element={<ModifyMovies/>} />
        <Route exact path="/modifyUsers" element={<AdminModifyUser/>} />
        <Route exact path="/Modify/:id" element={<ModifyMovies/>} />
        <Route exact path="/Favorites" element={<Favorites/>}/>
        <Route exact path="/FreqQuestions" element={<Questions/>}/>
        <Route exact path ="/AboutUs" element={<AboutUs/>}/>
        <Route exact path="/password/:token" element={<Password/>} />
        {/* <Route exact path="/example" element={<Example/>} /> */}
        <Route exact path="/rol" element={<AdminModUser/>} />
        <Route exact path="/viewMovie" element={<ViewMovie/>}  />


      </Routes>
    </BrowserRouter>
  )

}

export default App;