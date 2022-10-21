import React from "react";
import "./App.css";
import AppRouter from "./routers/router";
const getJwtToken = () => {
  if(document.cookie === 'jwt=undefined') {
    return false;
  }
  if(window.localStorage.getItem('jwt')) {
    return window.localStorage.getItem('jwt');
  }
  return document.cookie.split("=")[1];
};
const isLoggedIn = getJwtToken() ? true : false; 

function App() {
  return <div className="App">{AppRouter(isLoggedIn)}</div>;
}

export default App;
