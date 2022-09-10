import React from "react";
import axios from "axios";
const OAuth2RedirectHandler = (props: any) => {
  //소셜로그인 상태관리는 어떻게? 상위에서 보내줘야 하는데?
  const code = new URL(window.location.href).searchParams.get("code");
  const sendCode = axios.post(`http://localhost:8080/api/auth/kakao`, code, {
    withCredentials: true,
  });
  console.log(code);
  return <div></div>;
};

export default OAuth2RedirectHandler;
