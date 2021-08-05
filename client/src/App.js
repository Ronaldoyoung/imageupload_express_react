import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MainPage from "./pages/MainPage";
import RegisterPage from './pages/RegisterPage';
import LoginPage from "./pages/LoginPage";
import { Switch, Route } from "react-router-dom";

const App = () => {
  
  return (
    <div style={{ maxWidth: 600, margin: "auto" }}>      
      <ToastContainer />   
      <Switch>        
        <Route path="/auth/register" exect component={RegisterPage} />
        <Route path="/auth/login" exect component={LoginPage} />
        <Route path="/" component={MainPage}/>
      </Switch>      
    </div>
  );
}

export default App;
