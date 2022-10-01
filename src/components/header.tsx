import axios from "axios";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faUser, faRightFromBracket, faBookOpen } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
type headerProps = {
  isLogin: boolean;
};
const Header = (props: headerProps) => {
  const navigate = useNavigate()
  const logOutHandle = async () => {
    const userLogout = await axios.get(
      `http://localhost:8080/api/user/logout`,
      { withCredentials: true }
    );
    navigate('/', { replace: true })
    location.reload()
    return;
  };
  const pageLink = () => {
    return (
      <div className="border w-3/6 flex justify-between px-2">
        <Link to="/">
          <button className="border px-1">
            <span className="text-sm">
              <FontAwesomeIcon className="mr-1" icon={faPencil} size='1x'></FontAwesomeIcon>
              Diary
            </span>
          </button>
        </Link>
        <Link to="/mypage">
          <button className="border px-1">
            <span className="text-sm">
              <FontAwesomeIcon className="mr-1" icon={faUser} size='1x'></FontAwesomeIcon>
              Mypage
            </span>
          </button>
        </Link>
        <button className="border px-1" onClick={logOutHandle}>
          <span className="text-sm" >
            <FontAwesomeIcon className="mr-1" icon={faRightFromBracket} size='1x'></FontAwesomeIcon>
            LogOut
          </span>
        </button>
      </div>
    );
  };
  // 최소 640px로 제한하는게 좋을듯?
  return (
    <header className="border-b-2 border-b-slate-500 fixed w-full bg-white flex items-center justify-center px-5 ">
      <div className="border flex items-center justify-between w-full lg:max-w-screen-lg">
        <Link to="/">
          <span className="border">
            <FontAwesomeIcon className="mx-1" icon={faBookOpen} size='1x'></FontAwesomeIcon>
            400JA-DIARY
          </span>
        </Link>
        {props.isLogin ? pageLink() : <div></div>}
      </div>
    </header>
  );
};

export default Header;
