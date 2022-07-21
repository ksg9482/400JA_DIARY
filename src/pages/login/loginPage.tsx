import React from "react";
const Login = () => {
    //아이디
    //비밀번호
    //회원가입 로그인

    //에러메시지 공간 필요함
    return (
        <div>
            Login
            <form>
                <input type="email" placeholder="email"/>
                <input type="password" placeholder="Password"/>
                <button>sign up</button>
                <button>login</button>
            </form>
        </div>
    )
};

export default Login;