import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
interface IsignupInfoState {
  email: string;
  password: string;
  passwordCheck: string;
}
const Signup = () => {
  const [signupInfo, setSignupInfo] = useState<IsignupInfoState>({
    email: "",
    password: "",
    passwordCheck: "",
  });
  const [validCheck, setValidCheck] = useState({
    email: false,
    password: false,
  });

  const inputHandler =
    (key: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setSignupInfo({ ...signupInfo, [key]: e.target.value });
    };

  const navigate = useNavigate();
  //이메일 중복확인 - 정합성검사(이메일 형식 맞는지)
  //비밀번호 - 정합성검사
  //비밀번호 확인 - 정합성 검사, 서로 맞는지
  //회원가입

  //본인인증 메일
  //본인인증 했으면 웰컴 메일

  const validCheckHandle = (signupInfo: IsignupInfoState): void => {
    const emailCheck = () => {
      const emailValidPattern =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return emailValidPattern.exec(signupInfo.email);
    };

    const samePasswordCheck = () => {
      return signupInfo.password === signupInfo.passwordCheck;
    };

    if (emailCheck()) {
      setValidCheck({ ...validCheck, email: true });
    }
    if (samePasswordCheck()) {
      setValidCheck({ ...validCheck, password: true });
    }
  };
  const sendSignup = async (): Promise<{ data: any }> => {
    const body: IsignupInfoState = {
      email: signupInfo.email,
      password: signupInfo.password,
      passwordCheck: signupInfo.passwordCheck,
    };

    //error 처리 개선!!!
    const userSignup = await axios.post(
      `http://localhost:8080/api/auth/signup`,
      {email:body.email, password:body.password},
      { withCredentials: true }
    );
    if (userSignup.status === 500) {
      throw new Error("Signup connect fail");
    }
    if (!userSignup.data) {
      throw new Error("Signup fail");
    }

    return { data: { ...userSignup.data } };
  };

  const onCompleted = (): void => {
    console.log('회원가입 네비')
    navigate("/");
  };

  const handleSubmit = async (e:React.MouseEvent<HTMLButtonElement>): Promise<void> => {
    try {
      e.preventDefault()
      console.log('start')
      validCheckHandle(signupInfo);
      console.log('validCheckHandle')
      await sendSignup();
      console.log('sendSignup')
      onCompleted();
    } catch (error: any) {
      if (error.message === "Already Email") {
        alert("이미 가입된 이메일 입니다.");
      }
    }
  };
  //에러메시지 공간 필요함
  return (
    <div className="border h-screen bg-slate-500 flex items-center justify-center flex-col mt-8 lg:mt-0 pt-8">
      <Helmet>Login | 400JA-DIARY</Helmet>
      <div className="w-full h-full lg:max-w-screen-lg bg-white  flex flex-col px-5 justify-center items-center">
        <form
          //onSubmit={handleSubmit}
          className="grid gap-3 mt-5 w-3/4 mb-5"
        >
          <div className="w-full flex justify-between">
            <span>Email</span>
            <input
              className="border w-3/4"
              type="email"
              placeholder="email"
              onChange={inputHandler("email")}
            />
          </div>
          <div className="w-full flex justify-between">
            <span>Password</span>
            <input
              className="border w-3/4"
              type="password"
              placeholder="Password"
              onChange={inputHandler("password")}
            />
          </div>
          <div className="w-full flex justify-between">
            <span>Password Check</span>
            <input
              className="border w-3/4"
              type="password"
              placeholder="Password check"
              onChange={inputHandler("passwordCheck")}
            />
          </div>

          <div className="border flex justify-center w-full mt-10">
            <div className="w-3/4 flex justify-between">
              <Link to="/">
                <button className="border">cancle</button>
              </Link>
              <button className="border" onClick={handleSubmit}>
                sign up
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
