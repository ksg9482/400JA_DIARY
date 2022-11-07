import React from "react";
import "./App.css";
import AppRouter from "./routers/router";

const getJwtToken = () => {
  if(localStorage.getItem('accessToken') === 'undefined') {
    return false;
  }
  return localStorage.getItem('accessToken')!;
};
const isLoggedIn = getJwtToken() ? true : false; 

function App() {
  return <div className="App">{AppRouter(isLoggedIn)}</div>;
}

export default App;
