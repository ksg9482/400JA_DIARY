import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import OauthErrorModal from "./OauthErrorModal";
import config from "config";

const OAuth2RedirectHandler = (props: any) => {
  const PROTOCOL = config.SERVER_PROTOCOL;
  const HOST = config.SERVER_HOST;
  const PORT = config.SERVER_PORT;

  const {oauthLoginIsTrue} = props;
  const [onModal, setOnModal] = useState(false);

  const navigate = useNavigate();
  const oauthPath = new URL(window.location.href).pathname.split("/");

  
  async function handle() {
    const oAuthNav = () => {
      oauthLoginIsTrue()
      navigate("/",{replace:true, state:{isLoginTrue:true}});
    }
    if (oauthPath.includes("kakao")) {
      try {
        const code = new URL(window.location.href).searchParams.get("code");
        const sendCode = await axios.get(
          `${PROTOCOL}://${HOST}:${PORT}/api/auth/kakao?code=${code}`,
          { withCredentials: true }
        );
        return oAuthNav();
      } catch (error) {
        return error;
      }
    }

    if (oauthPath.includes("google")) {
      try {
        const getGoogleAccessToken = () => {
          const parsedHash = new URLSearchParams(
            window.location.hash.substring(1)
          );
          const accessToken = parsedHash.get("access_token");
          return accessToken;
        }
       
        const sendCode = await axios.post(
          `${PROTOCOL}://${HOST}:${PORT}/api/auth/google`,
          { accessToken: getGoogleAccessToken() },
          { withCredentials: true }
        );
       
        return oAuthNav();
      } catch (error:any) {
        return setOnModal(true);
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
