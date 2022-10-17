import React from "react";
import "./App.css";
import AppRouter from "./routers/router";
//헬멧 적용해야 함
const getJwtToken = () => {
  //jwt가 undefinded로 오는 오류 발생. 발급이 안되도록 해야함. 토큰이 만들어지지 않았는데 jwt이름으로 옴. 정보 잘못되면 거절하는 안전장치 추가 
  if(document.cookie === 'jwt=undefined') {
    return false;
  }
  return document.cookie.split("=")[1];
};
const isLoggedIn = getJwtToken() ? true : false; //로컬에 저장된 토큰으로 판단

function App() {
  return <div className="App">{AppRouter(isLoggedIn)}</div>;
}

export default App;
