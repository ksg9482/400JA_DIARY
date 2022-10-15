import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import OauthErrorModal from "./OauthErrorModal";
import config from "config";

const OAuth2RedirectHandler = (props: any) => {
  const [onModal, setOnModal] = useState(false);
  const {oauthLoginIsTrue} = props;
  const navigate = useNavigate();
  const oauthPath = new URL(window.location.href).pathname.split("/");

  const PROTOCOL = config.SERVER_PROTOCOL;
  const HOST = config.SERVER_HOST;
  const PORT = config.SERVER_PORT;

  async function handle() {
    const oAuthNav = () => {
      oauthLoginIsTrue()
      navigate("/",{replace:true, state:{isLoginTrue:true}});
    }
    if (oauthPath.includes("kakao")) {
      //함수 안에 든걸 빼면? 유즈이펙트 때문에 2번 호출되는 거 같다.
      try {
        const code = new URL(window.location.href).searchParams.get("code");
        const sendCode = await axios.get(
          `${PROTOCOL}://${HOST}:${PORT}/api/auth/kakao?code=${code}`,
          {
            withCredentials: true,
          }
        );
        
        
        return oAuthNav();
      } catch (error) {
        return error;
      }
    }

    if (oauthPath.includes("google")) {
      try {
        const parsedHash = new URLSearchParams(
          window.location.hash.substring(1)
        );
        const accessToken = parsedHash.get("access_token");
        const sendCode = await axios.post(
          `${PROTOCOL}://${HOST}:${PORT}/api/auth/google`,
          { accessToken },
          {
            withCredentials: true,
          }
        );
       
        return oAuthNav();
      } catch (error:any) {
        return setOnModal(true);
        // const errorMessage = error.response.data.error.message;
        // const OauthErrorMessage = [
        //   'Kakao Oauth fail', 
        //   'Google Oauth fail'
        // ];
        // if(OauthErrorMessage.includes(errorMessage)) {
        //   return setOnModal(true);
        // }
        // return error;
      }
    }
  }
  useEffect(() => {
    handle();
  }, []);

  return <div>
    {onModal ? <OauthErrorModal /> : null}
  </div>;
};

export default OAuth2RedirectHandler;
