import axios from "axios";
import React, { useState } from "react";

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
    const loginSubmitHandler = (loginInfo:loginInfoState) => async (e: React.MouseEvent<HTMLButtonElement>) => {
        //env 적용 해야함
        e.preventDefault();
        try {
            if (loginInfo.email === '' || loginInfo.password === '') {
                //setErrorMessage('이메일 혹은 비밀번호를 확인해주세요')
            }
            const body = { email: loginInfo.email, password: loginInfo.password };
            const userLogin = await axios.post(`http://localhost:8080/api/auth/login`, body, {withCredentials:true}) ;
            
            const userInfo = userLogin.data
            return userInfo;
        } catch (error:any) {
            throw new Error(error)
        }
        
    }
    //아이디
    //비밀번호
    //회원가입 로그인

    //에러메시지 공간 필요함
    return (
        <div>
            Login
            <form>
                <input type="email" onChange={inputHandler('email')} placeholder="email"/>
                <input type="password" onChange={inputHandler('password')} placeholder="Password"/>
                <button>sign up</button>
                <button onClick={loginSubmitHandler(loginInfo)}>login</button>
            </form>
        </div>
    )
};

export default Login;