import axios from "axios";
import { emailPattern } from "components/common";
import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useNavigate } from "react-router-dom";
import config from "../../config";
import FindPasswordModal from "./findPasswordModal";
interface loginInfoState {
  email: string;
  password: string;
}


const HOST = config.SERVER_HOST;


const Login = () => {
  const [loginInfo, setLoginInfo] = useState<loginInfoState>({
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [onModal, setOnModal] = useState(false);
  const navigate = useNavigate();

  const inputHandler = (key: string) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setLoginInfo({ ...loginInfo, [key]: e.target.value });
    };


  const modalHandle = () => {
    setOnModal((onModal) => !onModal);
  };

  const loginSubmitHandler =
    (loginInfo: loginInfoState) =>
      async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        try {
          if (loginInfo.email === "" || loginInfo.password === "") {
            setErrorMessage("이메일과 비밀번호를 입력해주세요");
            return;
          }
          const body = { email: loginInfo.email, password: loginInfo.password };
          const userLogin = await axios.post(
            `${HOST}/api/auth/login`,
            body,
            { withCredentials: true }
          );
          window.localStorage.setItem('jwt', userLogin.data.token);
          const userInfo = userLogin.data.user;
          navigate("/", { replace: true });
          location.reload();
          return userInfo;
        } catch (error: any) {
          if (error.response.status === 404) {
            return setErrorMessage("가입되지 않은 사용자 입니다");
          }
          return error;
        }
      };

  const findPasswordHandle = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    modalHandle();
  };

  const socialLoginHandler =
    (key: string) =>
      async (e: React.MouseEvent<HTMLSpanElement>) => {
        const kakaoOAuth = (config:any) => {
          const kakaoHost = "kauth.kakao.com";
          const kakaoParametor = {
            clientid: config.KAKAO_REST_API_KEY,
            redirect_uri: config.KAKAO_REDIRECT_URI,
          };
          const kakaoOAuthURL =
            `https://${kakaoHost}/oauth/authorize?` +
            `clientid=${kakaoParametor.clientid}` +
            `&redirect_uri=${kakaoParametor.redirect_uri}` +
            `&response_type=code`;

          window.location.href = kakaoOAuthURL;
        };

        const googleOAuth = (config:any) => {
          const googleHost = "accounts.google.com";
          const googleParametor = {
            client_id: config.GOOGLE_CLIENT_ID,
            redirect_uri: config.GOOGLE_REDIRECT_URI,
            scope_email: "https://www.googleapis.com/auth/userinfo.email",
          };
          const googleOAuthURL =
            `https://${googleHost}/o/oauth2/v2/auth?` +
            `client_id=${googleParametor.client_id}&` +
            `redirect_uri=${googleParametor.redirect_uri}&` +
            `response_type=token&` +
            `scope=${googleParametor.scope_email}`;
            window.location.href = googleOAuthURL;
        };

        if (key === "kakao") {
          kakaoOAuth(config);
        } else if (key === "google") {
          googleOAuth(config);
        }
      };

  return (
    <div className=" h-screen flex bg-[#E3D8C5] items-center justify-center flex-col pt-7">
      <Helmet>Login | 400JA-DIARY</Helmet>
      {onModal ? <FindPasswordModal modalHandle={modalHandle} /> : null}
      <div className="h-full sm:h-5/6 w-full bg-intro-notebook flex justify-center border-y-2 border-[#855958]">
        <div className=" w-10/12 sm:w-8/12 bg-white bg-opacity-70  flex flex-col px-5 justify-center items-center">
          <h1 className="whitespace-nowrap">하루 400자, 쉽고 편하게 당신의 하루를 정리해 보세요</h1>
          <div className="text-6xl lg:text-8xl border-t-2 border-b-2 border-slate-400 pb-2">400JA DIARY</div>
          <form className=" flex flex-col justify-center items-center min-w-max border-b-2 border-slate-400">
            <div className=" flex flex-col justify-between items-center sm:flex-row">
              <div className=" flex flex-col mt-5 mb-3 items-center sm:mr-12 ">
                <input
                  className="border border-slate-400 mb-1"
                  type="email"
                  name="email"
                  pattern={emailPattern + ""}
                  onChange={inputHandler("email")}
                  placeholder="email"
                  required
                />
                <input
                  className="border border-slate-400"
                  type="password"
                  name="password"
                  onChange={inputHandler("password")}
                  placeholder="Password"
                  required
                />
              </div>
              <div className="flex flex-row w-full justify-between sm:flex-col mb-3 sm:mt-5 sm:mb-3">
                <button
                  className="border border-slate-400 sm:mb-1 hover:bg-slate-300"
                  onClick={loginSubmitHandler(loginInfo)}
                >
                  로그인
                </button>
                <button
                  className="border border-slate-400 hover:bg-slate-300"
                  onClick={findPasswordHandle}
                >
                  비밀번호 찾기
                </button>
              </div>
            </div>
            {errorMessage ? (
              <div className="pb-2 text-sm text-red-500 text-center">{errorMessage}</div>
            ) : (
              <div className="pb-2">&nbsp;</div>
            )}
          </form>

          <Link to="/signup" className="text-blue-500 mb-3 ">
            <span>회원으로 등록하지 않으셨나요? </span>
            <span>회원가입</span>
          </Link>
          <div className="flex sm:flex-row items-center justify-center sm:w-4/5 flex-col mb-1">
            <button
              className="border flex items-center w-52 sm:w-40 min-w-fit px-1 mr-0 sm:mr-3 mb-2 sm:mb-0  bg-slate-100 rounded-md"
              onClick={socialLoginHandler("google")}
            >
              <img
                className="w-9 h-9 mr-6 sm:mr-2"
                src="Social-google.png"
                alt="social"
              />
              <span className="whitespace-nowrap">GOOGLE 로그인</span>
            </button>
            <button
              className="border flex  items-center w-52 sm:w-40 min-w-fit px-1 bg-yellow-300 rounded-md"
              onClick={socialLoginHandler("kakao")}
            >
              <img
                className="w-9 h-9 mr-7 sm:mr-1"
                src="Social-kakao.png"
                alt="social"
              />
              <span className="whitespace-nowrap">KAKAO 로그인</span>
            </button>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Login;
