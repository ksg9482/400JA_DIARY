import React from "react";
import axios from "axios";
const OAuth2RedirectHandler = (props: any) => {
  //소셜로그인 상태관리는 어떻게? 상위에서 보내줘야 하는데?
  //리다이렉트창 노출될 수 있으니 로딩창 만들어서 넣기
  //카카오인지 구글인지 알수 있어야 한다.
  const code = new URL(window.location.href).searchParams.get("code");
  const sendCode = axios.get(`http://localhost:8080/api/auth/kakao?code=${code}`, {
    withCredentials: true,
  });
  console.log(code);
  return <div></div>;
};

export default OAuth2RedirectHandler;
