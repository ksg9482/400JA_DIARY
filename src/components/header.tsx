import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";
type headerProps = {
  isLogin: boolean;
};
const Header = (props: headerProps) => {
  console.log("헤더 호출");
  //헤더. 컴포넌트로 옮기는게 좋을지도?
  //로고
  //홈버튼, 일기페이지, 마이페이지, 로그아웃
  const logOutHandle = async () => {
    const userLogout = await axios.get(
      `http://localhost:8080/api/user/logout`,
      { withCredentials: true }
      );
      location.reload()
    return;
  };
  const pageLink = () => {
    return (
      <div className="border w-3/6 flex justify-between">
        <Link to="/">
          <span className="text-xs"> Diary Link</span>
        </Link>
        <Link to="/mypage">
          <span className="text-xs"> Mypage Link</span>
        </Link>
        <span className="text-xs" onClick={logOutHandle}>Log Out</span>
      </div>
    );
  };
  // 최소 640px로 제한하는게 좋을듯?
  return (
    <header className="border fixed w-full bg-white flex items-center justify-center px-5 ">
      <div className="border flex items-center justify-between w-full lg:max-w-screen-lg">
        <Link to="/">
          <span className="border">logo Img.</span>
        </Link>
        {props.isLogin ? pageLink() : <div></div>}
      </div>
    </header>
  );
};

export default Header;
