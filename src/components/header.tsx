import axios from "axios";
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faUser, faRightFromBracket, faBookOpen, faSearch } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
type headerProps = {
  isLogin: boolean;
};
const Header = (props: headerProps) => {
  const navigate = useNavigate()
  //const [screenX, setScreenX] = useState(window.innerWidth)
  const logOutHandle = async () => {
    const userLogout = await axios.get(
      `http://localhost:8080/api/user/logout`,
      { withCredentials: true }
    );
    navigate('/', { replace: true })
    location.reload()
    return;
  };
  const pageLink = (/*widthSize:number*/) => {
    return (
      <div className="w-5/12 flex flex-col min-w-min">
        <div className=" flex justify-between gap-3">
          {/* {500 <= widthSize ? null : 
          <button className="border box-border px-1 w-24" >
            <span className="text-base" >
            <FontAwesomeIcon icon={faSearch} size="1x"></FontAwesomeIcon>
              Search
            </span>
          </button>} */}
          <Link className="border box-border px-1 w-24" to="/">
            <span className="text-base  ">
              <FontAwesomeIcon className="mr-1" icon={faPencil} size='1x'></FontAwesomeIcon>
              Diary
            </span>
          </Link>
          <Link className="border box-border px-1 w-24" to="/mypage">
            <span className="text-base ">
              <FontAwesomeIcon className="mr-1" icon={faUser} size='1x'></FontAwesomeIcon>
              Mypage
            </span>
          </Link>
          <button className="border box-border px-1 w-24" onClick={logOutHandle}>
            <span className="text-base" >
              <FontAwesomeIcon className="mr-1" icon={faRightFromBracket} size='1x'></FontAwesomeIcon>
              LogOut
            </span>
          </button>
        </div>
      </div>

    );
  };

  // const screenResize = () => {
  //   setScreenX(window.innerWidth)
  // };

  // const logoHandle = (widthSize:number) => {
  //   return widthSize <= 500 ? null: 
  //   <Link className="border w-32 mr-3" to="/">
  //   <span className="whitespace-nowrap">
  //     <FontAwesomeIcon className="mx-1" icon={faBookOpen} size='1x'></FontAwesomeIcon>
  //     400JA-DIARY
  //   </span>
  // </Link>
  // }
  
  // useEffect(()=>{
  //   window.addEventListener('resize',screenResize)
  // },[])
  
  return (
    <header className="border-b-2 border-b-slate-500 fixed w-full bg-white flex items-center justify-center px-5">
      <div className="flex items-center justify-between w-full lg:max-w-screen-lg">
      <Link className="border w-32 mr-3" to="/">
    <span className="whitespace-nowrap">
      <FontAwesomeIcon className="mx-1" icon={faBookOpen} size='1x'></FontAwesomeIcon>
      400JA-DIARY
    </span>
  </Link>
        {props.isLogin ? pageLink(/*screenX*/) : <div></div>}
      </div>
    </header>
  );
};

export default Header;
