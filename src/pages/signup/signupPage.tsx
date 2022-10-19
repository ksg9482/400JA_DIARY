import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { emailPattern } from "components/common";
import config from "config";
interface IsignupInfoState {
  email: string;
  password: string;
  passwordCheck: string;
}
const Signup = () => {
  
  const HOST = config.SERVER_HOST;
  

  const [signupInfo, setSignupInfo] = useState<IsignupInfoState>({
    email: "",
    password: "",
    passwordCheck: "",
  });
  const [validCheck, setValidCheck] = useState({
    email: false,
    password: false,
  });
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const inputHandler =
    (key: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setSignupInfo({ ...signupInfo, [key]: e.target.value });
    };

  const validCheckHandle = (signupInfo: IsignupInfoState): void => {
    const emailCheck = () => {
      return emailPattern.exec(signupInfo.email);
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

    const userSignup = await axios.post(
      `${HOST}/api/auth/signup`,
      { email: body.email, password: body.password },
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
    navigate("/");
  };

  const emptyCheck = () => {
    if (
      signupInfo.email === "" ||
      signupInfo.password === "" ||
      signupInfo.passwordCheck === ""
    ) {
      return { message: "각 항목을 채워주세요." };
    }
    if (signupInfo.password !== signupInfo.passwordCheck) {
      return { message: "비밀번호와 비밀번호 확인이 같지 않습니다." };
    }
    return;
  };
  const handleSubmit = async (
    e: React.MouseEvent<HTMLButtonElement>
  ): Promise<void> => {
    try {
      e.preventDefault();
      const check = emptyCheck();
      if (check) {
        return setErrorMessage(check.message);
      }
      validCheckHandle(signupInfo);
      await sendSignup();
      onCompleted();
    } catch (error: any) {
      if (error.response.status === 409) {
        return setErrorMessage("이미 가입된 이메일입니다");
      }
      return;
    }
  };

  return (
    <div className="h-screen flex bg-[#E3D8C5] items-center justify-center flex-col pt-7">
      <Helmet>Login | 400JA-DIARY</Helmet>
      <div className=" h-5/6 w-full bg-intro-notebook flex justify-center border-y-2 border-[#855958]">
        <div className="w-8/12 bg-white flex flex-col px-5 justify-center items-center">
          <form className="flex flex-col gap-3 mt-5 w-3/4 mb-5">
            <div className="w-full flex flex-col sm:flex-row gap-1 justify-between">
              <span className="text-left w-28">이메일</span>
              <input
                className="border w-full sm:w-3/4"
                type="email"
                pattern={emailPattern + ""}
                placeholder="email"
                onChange={inputHandler("email")}
              />
            </div>
            <div className="w-full flex flex-col sm:flex-row gap-1 justify-between">
              <span className="text-left w-28">비밀번호</span>
              <input
                className="border w-full sm:w-3/4"
                type="password"
                placeholder="Password"
                onChange={inputHandler("password")}
              />
            </div>
            <div className="w-full flex flex-col sm:flex-row gap-1 justify-between items-start sm:items-center">
              <span className="text-left w-28">비밀번호 확인</span>
              <input
                className="border w-full sm:w-3/4 h-6"
                type="password"
                placeholder="Password check"
                onChange={inputHandler("passwordCheck")}
              />
            </div>
            {errorMessage ? (
              <div className="border-b-2 text-red-500 text-sm text-center">{errorMessage}</div>
            ) : (
              <div className="border-b-2 text-sm">&nbsp;</div>
            )}
            <div className="mt-5 flex w-full flex-col-reverse justify-between sm:flex-row ">
              <Link className="box-border w-full hover:bg-slate-300 sm:w-52 sm:mr-6" to="/">
                <div className="border w-full text-center">취소</div>
              </Link>
              <button
                className="border w-full hover:bg-slate-300 mb-4 sm:mb-0 sm:w-52"
                onClick={handleSubmit}
              >
                회원가입
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
