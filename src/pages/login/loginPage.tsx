import axios from "axios";
import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useNavigate } from "react-router-dom";
import config from "../../config";
import FindPasswordModal from "./findPasswordModal";
//import config from '../../config';
/*
맨처음 로그인하면 유저정보 받아오기, 토큰 받아오기
다이어리 페이지 접속하면 일주일치 받아와서 캐시 저장(새 일기 쓰면 늘어난 다이어리 배열 초기화하고 오늘꺼 넣어서 7개. 스크롤 하면 그때서야 다시 읽기)
마이페이지 접속하면 이미 다 있는 정보만 있다. 뿌리기. 총 몇개인지는 언제?
*/
interface loginInfoState {
  email: string;
  password: string;
}

const Login = () => {
  const [loginInfo, setLoginInfo] = useState<loginInfoState>({
    email: "",
    password: "",
  });
  const inputHandler =
    (key: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setLoginInfo({ ...loginInfo, [key]: e.target.value });
    };

  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [onModal, setOnModal] = useState(false);
  const modalHandle = () => {
    setOnModal((onModal) => !onModal);
  };
  const loginSubmitHandler =
    (loginInfo: loginInfoState) =>
      async (e: React.MouseEvent<HTMLButtonElement>) => {
        //env 적용 해야함
        e.preventDefault();
        try {
          if (loginInfo.email === "" || loginInfo.password === "") {
            setErrorMessage("이메일과 비밀번호를 입력해주세요");
            return;
          }
          const body = { email: loginInfo.email, password: loginInfo.password };
          const userLogin = await axios.post(
            `http://localhost:8080/api/auth/login`,
            body,
            { withCredentials: true }
          );
          const userInfo = userLogin.data;
          navigate("/", { replace: true });
          location.reload();
          return userInfo;
        } catch (error: any) {
          console.log(error);
          if (error.response.data.error === "User not registered") {
            setErrorMessage("가입되지 않은 사용자 입니다");
            return;
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
      async (e: React.MouseEvent<HTMLSpanElement /*이거 바뀜 */>) => {
        //함수로 나눠 관리해도 리다이렉트가 제대로 되나?
        const kakaoOAuth = () => {
          const kakaoHost = "kauth.kakao.com";
          const kakaoParametor = {
            client_id: config.KAKAO_REST_API_KEY,
            redirect_uri: config.KAKAO_REDIRECT_URI,
          };
          const kakaoOAuthURL =
            `https://${kakaoHost}/oauth/authorize?` +
            `client_id=${kakaoParametor.client_id}` +
            `&redirect_uri=${kakaoParametor.redirect_uri}` +
            `&response_type=code`;

          window.location.href = kakaoOAuthURL;
        };

        const googleOAuth = () => {
          const googleHost = "accounts.google.com";
          const googleParametor = {
            client_id: config.GOOGLE_CLIENT_ID,
            redirect_uri: config.GOOGLE_REDIRECT_URI,
            scope_email: "https://www.googleapis.com/auth/userinfo.email",
          };
          const googleOAuthURL =
            `https://${googleHost}/o/oauth2/v2/auth` +
            `?client_id=${googleParametor.client_id}` +
            `&redirect_uri=${googleParametor.redirect_uri}` +
            `&response_type=token` +
            `&scope=${googleParametor.scope_email}`;

          window.location.href = googleOAuthURL;
        };

        if (key === "kakao") {
          kakaoOAuth();
        } else if (key === "google") {
          googleOAuth();
        }
      };
  // async (e: React.MouseEvent<HTMLSpanElement /*이거 바뀜 */>) => {
  //     //함수로 나눠 관리해도 리다이렉트가 제대로 되나?
  //   const kakaoOAuth = `https://kauth.kakao.com/oauth/authorize?client_id=${config.KAKAO_REST_API_KEY}&redirect_uri=${config.KAKAO_REDIRECT_URI}&response_type=code`;
  //   const GOOGLE = process.env.GOOGLE || "http://localhost:8080/google";
  //   if (key === "kakao") {
  //     window.location.href = kakaoOAuth;
  //   } else if (key === "google") {
  //     window.location.href = GOOGLE;
  //   }
  // };
  //아이디
  //비밀번호
  //회원가입 로그인

  //에러메시지 공간 필요함
  //소셜 로그인은 컴포넌트 따로 만들어서 관리하는게 안전

  return (
    <div className=" h-screen flex bg-slate-500 items-center justify-start flex-col pt-7">
      <Helmet>Login | 400JA-DIARY</Helmet>
      {onModal ? <FindPasswordModal modalHandle={modalHandle} /> : null}
      <div className="h-full w-full bg-white max-w-screen-lg flex flex-col px-5 justify-center items-center">
        <div className="text-8xl border-t-2 border-b-2 pb-2">400JA DIARY</div>
        <form className=" flex flex-col justify-center items-center min-w-max border-b-2">
          <div className=" flex flex-col justify-between items-center sm:flex-row">
            <div className=" flex flex-col mt-5 mb-3 items-center sm:mr-12 ">
              <input
                className="border mb-1"
                type="email"
                name="email"
                onChange={inputHandler("email")}
                placeholder="email"
                required
              />
              <input
                className="border"
                type="password"
                name="password"
                onChange={inputHandler("password")}
                placeholder="Password"
                required
              />
            </div>
            <div className="flex flex-row w-full justify-between sm:flex-col mb-3 sm:mt-5 sm:mb-3">
              <button
                className="border sm:mb-1 hover:bg-slate-300"
                onClick={loginSubmitHandler(loginInfo)}
              >
                로그인
              </button>
              <button
                className="border hover:bg-slate-300"
                onClick={findPasswordHandle}
              >
                비밀번호 찾기
              </button>
            </div>
          </div>
          {errorMessage ? (
            <div className="pb-2 text-red-500">{errorMessage}</div>
          ) : (
            <div className="pb-2">&nbsp;</div>
          )}
        </form>

        <Link to="/signup" className="text-blue-400 mb-3 ">
          <span>회원으로 등록하지 않으셨나요? </span>
          <span>회원가입</span>
        </Link>
        <div className="flex sm:flex-row items-center justify-center sm:w-4/5 flex-col">
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
  );
};

export default Login;
