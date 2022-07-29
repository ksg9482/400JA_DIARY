import React from "react";
const Signup = () => {
//이메일 중복확인 - 정합성검사(이메일 형식 맞는지)
//비밀번호 - 정합성검사
//비밀번호 확인 - 정합성 검사, 서로 맞는지
//회원가입

//본인인증 메일
//본인인증 했으면 웰컴 메일

//에러메시지 공간 필요함
    return (
        <div>
            Signup
            <form>
                <input type="email" placeholder="email"/>
                <button>email valid</button>
                <input type="password" placeholder="Password"/>
                <input type="password" placeholder="Password check"/>
                <button>cancle</button>
                <button>sign up</button>
            </form>
        </div>
    )
};

export default Signup;