import React from "react";
type headerProps = {
    isLogin:boolean
}
const Header = (props:headerProps) => {
    //헤더. 컴포넌트로 옮기는게 좋을지도?
    //로고
    //홈버튼, 일기페이지, 마이페이지, 로그아웃
    
    const pageLink = () => {
        return(
            <div>
                <span className="text-xs"> Diary Link</span>
                <span className="text-xs"> Mypage Link</span>
                <span className="text-xs"> Logout Link</span>
            </div>
        )
    }

    return (
        <header className="border flex items-center justify-center lg:mt-0">
            <span>logo Img.</span>
            {props.isLogin? pageLink() : <div></div>}
        </header>
    )
};

export default Header;