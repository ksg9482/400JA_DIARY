import React from "react";
import "./App.css";
import AppRouter from "./routers/router";
const getJwtToken = () => {
  if(localStorage.getItem('jwt') === 'undefined') {
    return false;
  }
  return localStorage.getItem('jwt')!;
};
const isLoggedIn = getJwtToken() ? true : false; //로컬에 저장된 토큰으로 판단

function App() {
  return <div className="App">{AppRouter(isLoggedIn)}</div>;
}

export default App;
