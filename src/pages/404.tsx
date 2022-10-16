import React from "react";
import { Helmet } from "react-helmet-async";
import { Link, useNavigate } from "react-router-dom";

const NotFound = () => {

  return (
    <div className=" h-screen flex bg-[#E3D8C5] items-center justify-center flex-col pt-7">
      <Helmet>404 | 400JA-DIARY</Helmet>
      <div className="mb-2">페이지를 찾을 수 없습니다.</div>
      <Link className="" to="/">
        <div>메인화면으로</div>
      </Link>

    </div>
  );
};

export default NotFound;
