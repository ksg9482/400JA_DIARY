import React from "react";
import "./App.css";
import AppRouter from "./routers/router";

const getJwtToken = () => {
  if(localStorage.getItem('jwt') === 'undefined') {
    return false;
  }
  return localStorage.getItem('jwt')!;
};
const isLoggedIn = getJwtToken() ? true : false; 

function App() {
  return <div className="App">{AppRouter(isLoggedIn)}</div>;
}

export default App;
