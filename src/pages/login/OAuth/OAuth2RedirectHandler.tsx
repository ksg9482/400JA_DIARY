import React from "react";
const OAuth2RedirectHandler = (props:any) => {
    //소셜로그인 상태관리는 어떻게? 상위에서 보내줘야 하는데?
    const code = new URL(window.location.href).searchParams.get("code");
    console.log(code)
    return(
        <div></div>
    )
}

export default OAuth2RedirectHandler