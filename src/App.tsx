import React from 'react';
import logo from './logo.svg';
import './App.css';
import AppRouter from './routers/router'
import { LoggedInRouter } from './routers/rogged-in-router'
import { LoggedOutRouter } from './routers/rogged-out-router'
//헬멧 적용해야 함
const isLoggedIn = false; //로컬에 저장된 토큰으로 판단
function App() {
  return (
    <div className="App">
      <header className="App-header">
        {AppRouter(isLoggedIn)}
      </header>
    </div>
  );
}

export default App;
