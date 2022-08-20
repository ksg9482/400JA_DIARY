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
        email: '',
        password: '',
        passwordCheck: ''
    });
    const [validCheck, setValidCheck] = useState({
        email: false,
        password: false,
    })

    const inputHandler = (key: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
        setSignupInfo({ ...signupInfo, [key]: e.target.value })
    }

    const navigate = useNavigate()
    //이메일 중복확인 - 정합성검사(이메일 형식 맞는지)
    //비밀번호 - 정합성검사
    //비밀번호 확인 - 정합성 검사, 서로 맞는지
    //회원가입

    //본인인증 메일
    //본인인증 했으면 웰컴 메일
    
    const validCheckHandle = (signupInfo:IsignupInfoState):void => {
        const emailCheck = () => {
            const emailValidPattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            return emailValidPattern.exec(signupInfo.email)
        };

        const samePasswordCheck = () => {
            return signupInfo.password === signupInfo.passwordCheck
        };

        if(emailCheck()) {
            setValidCheck({ ...validCheck, email: true})
        };
        if(samePasswordCheck()) {
            setValidCheck({ ...validCheck, password: true})
        };
    }
    const sendSignup = async (): Promise<{ data: any }> => {
        const body: IsignupInfoState = {
            email: signupInfo.email,
            password: signupInfo.password,
            passwordCheck: signupInfo.passwordCheck
        };

        const userSignup = await axios.post(`http://localhost:8080/api/auth/signup`, body, { withCredentials: true });
        if (userSignup.status === 500) {
            throw new Error('Signup connect fail');
        }
        if (!userSignup.data) {
            throw new Error('Signup fail');
        };

        return { data: { ...userSignup.data } }
    };

    const onCompleted = (): void => {
        navigate('/')
    };

    const handleSubmit = async (): Promise<void> => {
        try {
            validCheckHandle(signupInfo)
            await sendSignup()
            onCompleted()
        } catch (error:any) {
            if(error.message === 'Already Email') {
                alert('이미 가입된 이메일 입니다.');
            }
        }

    }
    //에러메시지 공간 필요함
    return (
        <div className="border h-screen flex items-center justify-center flex-col mt-8 lg:mt-0">
            <Helmet>
                Login | 400JA-DIARY
            </Helmet>
            <div className="w-full max-w-screen-sm flex flex-col px-5 items-center">
                <form
                    onSubmit={handleSubmit}
                    className="grid gap-3 mt-5 w-full mb-5"
                >
                    <input className="border" type="email" placeholder="email" onChange={inputHandler('email')} />
                    <input className="border" type="password" placeholder="Password" onChange={inputHandler('password')} />
                    <input className="border" type="password" placeholder="Password check" onChange={inputHandler('passwordCheck')} />

                    <div className="border flex items-center justify-between w-2/4">
                        <Link to="/">
                            <button className="border">cancle</button>
                        </Link>
                        <Link to="/">
                            <button className="border">sign up</button>
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    )
};

export default Signup;