import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Diary from "pages/diary/diaryPage";
import Mypage from "pages/mypage/mypagePage";
import Header from "components/header";
import NotFound from "pages/404";

export const LoggedInRouter = () => {
    return (
        <Router>
            <Header isLogin={true}/>
            <Routes>
                <Route path="/" element={<Diary />} />
                <Route path="/mypage" element={<Mypage />} />
                <Route path="/*" element={<NotFound />} />
            </Routes>
        </Router>
    );
};