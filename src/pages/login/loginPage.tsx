import axios from "axios";
import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

interface loginInfoState {
    email: string,
    password: string
};

const Login = () => {

    const [loginInfo, setLoginInfo] = useState<loginInfoState>({
        email: '',
        password: ''
    })
    const inputHandler = (key: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
        setLoginInfo({ ...loginInfo, [key]: e.target.value })
    }
    const linkSignupHandler = async (e: React.MouseEvent<HTMLButtonElement>) => {

    }
    const loginSubmitHandler = (loginInfo: loginInfoState) => async (e: React.MouseEvent<HTMLButtonElement>) => {
        //env 적용 해야함
        e.preventDefault();
        try {
            if (loginInfo.email === '' || loginInfo.password === '') {
                //setErrorMessage('이메일 혹은 비밀번호를 확인해주세요')
            }
            const body = { email: loginInfo.email, password: loginInfo.password };
            const userLogin = await axios.post(`http://localhost:8080/api/auth/login`, body, { withCredentials: true });

            const userInfo = userLogin.data
            return userInfo;
        } catch (error: any) {
            throw new Error(error)
        }

    }
    //아이디
    //비밀번호
    //회원가입 로그인

    //에러메시지 공간 필요함
    return (
        <div className="border h-screen flex items-center justify-center flex-col mt-8 lg:mt-0">
            <Helmet>
                Login | 400JA-DIARY
            </Helmet>
            <div className="border w-full h-3/4 max-w-screen-sm flex flex-col items-center justify-center">
                <form className="border w-full h-3/4 max-w-screen-sm flex flex-col items-center">
                    <div className="border flex flex-col mt-10 items-center mb-6">
                        <input className="input border mb-1" type="email" name="email" onChange={inputHandler('email')} placeholder="email" required />
                        <input className="input border" type="password" name="password" onChange={inputHandler('password')} placeholder="Password" required />
                    </div>
                    <div className="border flex items-center justify-between w-1/4">
                        <Link to ="/signup">
                        <button className="border" >sign up</button>
                        </Link>
                        <button className="border" onClick={loginSubmitHandler(loginInfo)}>log in</button>
                    </div>

                </form>
            </div>
        </div>
    )
};

export default Login;