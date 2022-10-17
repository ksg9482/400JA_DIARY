import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { HelmetProvider } from "react-helmet-async";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  // product 환경이 아니면 코드가 의도한대로 동작하지 않음. 
  //<React.StrictMode>
  <HelmetProvider>
    <App />
  </HelmetProvider>
  //</React.StrictMode>
);
reportWebVitals();
