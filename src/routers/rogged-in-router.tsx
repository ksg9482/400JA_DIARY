import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Diary from "pages/diary/diaryPage";
import Mypage from "pages/mypage/mypagePage";
import Header from "components/header";
import NotFound from "pages/404";

export const LoggedInRouter = () => {
    //로그인 해야 가능한 라우터
    //다이어리가 기본 페이지
    return (
        <Router>
            <Header isLogin={true}/>
            <Routes>
                <Route path="/" element={<Diary />} />
                <Route path="/mypage" element={<Mypage />} />
                <Route path="/*" element={<NotFound />} />
            </Routes>
        </Router>
    )
}