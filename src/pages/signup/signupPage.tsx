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
  const [errorMessage,setErrorMessage] = useState('');
  

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
    navigate("/");
  };
const emptyCheck = () => {
  if(signupInfo.email === '' || signupInfo.password === ''|| signupInfo.passwordCheck === ''){
    return {message:'각 항목을 채워주세요.'}
  }
  if(signupInfo.password !== signupInfo.passwordCheck) {
    return {message:'비밀번호와 비밀번호 확인이 같지 않습니다.'}
  }
  return ;
}
  const handleSubmit = async (e:React.MouseEvent<HTMLButtonElement>): Promise<void> => {
    try {
      e.preventDefault()
      const check = emptyCheck()
      if(check) {
        setErrorMessage(check.message)
        return ;
      }
      validCheckHandle(signupInfo);
      await sendSignup();
      onCompleted();
    } catch (error: any) {
      if (error.message === "Already Email") {
        alert("이미 가입된 이메일 입니다.");
      }
      return ;
    }
  };
  //에러메시지 공간 필요함
  return (
    <div className="border h-screen flex bg-slate-500 items-center justify-start flex-col pt-7">
      <Helmet>Login | 400JA-DIARY</Helmet>
      <div className="border w-3/4 h-full  min-w-min bg-white max-w-screen-lg flex flex-col px-5 justify-center items-center">
      <div className="flex">
          <div className="w-72"></div>
        </div>
        <form className="flex flex-col gap-3 mt-5 w-3/4 mb-5" >
          <div className="w-full flex flex-col sm:flex-row gap-1 justify-between">
            <span className="text-left">Email</span>
            <input
              className="border w-full sm:w-3/4"
              type="email"
              placeholder="email"
              onChange={inputHandler("email")}
            />
          </div>
          <div className="w-full flex flex-col sm:flex-row gap-1 justify-between">
            <span className="text-left">Password</span>
            <input
              className="border w-full sm:w-3/4"
              type="password"
              placeholder="Password"
              onChange={inputHandler("password")}
            />
          </div>
          <div className="w-full flex flex-col sm:flex-row gap-1 justify-between items-start sm:items-center">
            <span className="text-left">Password Check</span>
            <input
              className="border w-full sm:w-3/4 h-6"
              type="password"
              placeholder="Password check"
              onChange={inputHandler("passwordCheck")}
            />
          </div>
          {errorMessage? <div className="border-b-2">{errorMessage}</div> : <div className="border-b-2">&nbsp;</div>}
          <div className="flex justify-center w-full mt-5">
            <div className="flex w-full flex-col-reverse justify-between sm:flex-row ">
                <button className="border w-full hover:bg-slate-300 sm:w-52 sm:mr-6">
              <Link to="/">
                  <div className="w-full">cancle</div> 
              </Link>
                  </button>
              <button className="border w-full hover:bg-slate-300 mb-4 sm:mb-0 sm:w-52" onClick={handleSubmit}>
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
