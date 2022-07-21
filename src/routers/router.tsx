import React from "react";
import { LoggedInRouter } from './rogged-in-router'
import { LoggedOutRouter } from './rogged-out-router'
const Router = (isLoggedIn: boolean) => {
  return isLoggedIn? <LoggedInRouter /> : <LoggedOutRouter />;
}

export default Router;