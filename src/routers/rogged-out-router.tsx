import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Signup from '../pages/signup/signupPage';
import Login from '../pages/login/loginPage';
import Header from "components/header";
import OAuth2RedirectHandler from "pages/login/OAuth/OAuth2RedirectHandler";
import NotFound from "pages/404";
import EmailVerify from "pages/verify/emailVerifyPage";
export const LoggedOutRouter = (props: any) => {
    const { oauthLoginIsTrue } = props;

    return (
        <Router>
            <Header isLogin={false} />
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/oauth/callback/*" element={<OAuth2RedirectHandler oauthLoginIsTrue={oauthLoginIsTrue} />} />
                <Route path="/verify/code" element={<EmailVerify />} />
                <Route path="/*" element={<NotFound />} />
            </Routes>
        </Router>
    )
}