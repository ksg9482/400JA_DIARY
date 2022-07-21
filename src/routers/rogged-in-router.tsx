import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Diary from "pages/dairy/diaryPage";
import Mypage from "pages/mypage/mypagePage";

export const LoggedInRouter = () => {
    //로그인 해야 가능한 라우터
    //다이어리가 기본 페이지
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Diary />} />
                <Route path="/mypage" element={<Mypage />} />
            </Routes>
        </Router>
    )
}