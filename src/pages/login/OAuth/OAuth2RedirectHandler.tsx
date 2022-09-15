import React, { useEffect } from "react";
import axios from "axios";
const OAuth2RedirectHandler = (props: any) => {
  //소셜로그인 상태관리는 어떻게? 상위에서 보내줘야 하는데?
  //리다이렉트창 노출될 수 있으니 로딩창 만들어서 넣기
  //카카오인지 구글인지 알수 있어야 한다.
  
  const oauthPath = new URL(window.location.href).pathname.split("/");
  //자기호출도 안됨. 여기를 로그인쪽에서 하거나 백엔드로 옮기기
  async function handle() {
    if (oauthPath.includes("kakao")) {
      //함수 안에 든걸 빼면? 유즈이펙트 때문에 2번 호출되는 거 같다.
      try {
        const code = new URL(window.location.href).searchParams.get("code");
        const sendCode = await axios.get(
          `http://localhost:8080/api/auth/kakao?code=${code}`,
          {
            withCredentials: true,
          }
        );
      } catch (error) {
        return error;
      }
    }

    //구글꺼 해야함
    if (oauthPath.includes("google")) {
      const parsedHash = new URLSearchParams(window.location.hash.substring(1));
      const accessToken = parsedHash.get("access_token");
      const sendCode = await axios.post(
        `http://localhost:8080/api/auth/google`,
        {accessToken},
        {
          withCredentials: true,
        }
      );
    }
  }
  useEffect(() => {
    handle();
  }, []);

  return <div></div>;
};

export default OAuth2RedirectHandler;
