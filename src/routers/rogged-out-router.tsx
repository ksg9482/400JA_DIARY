import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Signup from '../pages/signup/signupPage';
import Login from '../pages/login/loginPage';
import Diary from "pages/diary/diaryPage"; //테스트 끝나면 삭제
import Header from "components/header";
import Mypage from "pages/mypage/mypagePage";
import OAuth2RedirectHandler from "pages/login/OAuth/OAuth2RedirectHandler";
export const LoggedOutRouter = () => {
    //로그인 하지 않은 상태에서 가능한 라우터
    //Header 만들어서 넣어야 함
    //로그인이 기본 페이지. 아니면 인트로페이지 만들고 옆쪽에 로그인 기능 있게??
    return (
        <Router>
            <Header isLogin={true} />{/*테스트 끝나면 false*/}
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/diary" element={<Diary />} /> {/*테스트 끝나면 삭제*/}
                <Route path="/mypage" element={<Mypage />} />
                <Route path="/oauth/callback/kakao" element={<OAuth2RedirectHandler/>}></Route>
            </Routes>
        </Router>
    )
}