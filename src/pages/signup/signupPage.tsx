import React from "react";
import { Link } from "react-router-dom";
const Signup = () => {
    //이메일 중복확인 - 정합성검사(이메일 형식 맞는지)
    //비밀번호 - 정합성검사
    //비밀번호 확인 - 정합성 검사, 서로 맞는지
    //회원가입

    //본인인증 메일
    //본인인증 했으면 웰컴 메일

    //에러메시지 공간 필요함
    return (
        <div className="border h-screen flex items-center justify-center flex-col mt-8 lg:mt-0">
            <form className="border mt-24 w-full h-3/4 max-w-screen-sm flex flex-col items-center">
                <div className="border w-full flex mt-10 justify-center items-center mb-6">
                    <input className="border" type="email" placeholder="email" />
                    <button className="border">email valid</button>
                </div>
                <div className="border w-full flex flex-col mt-10 items-center mb-6">
                    <input className="border" type="password" placeholder="Password" />
                    <input className="border" type="password" placeholder="Password check" />
                </div>
                <div className="border flex items-center justify-between w-1/4">
                    <button className="border">cancle</button>
                    <Link to="/">
                        <button className="border">sign up</button>
                    </Link>
                </div>
            </form>
        </div>
    )
};

export default Signup;