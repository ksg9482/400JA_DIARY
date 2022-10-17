import axios from "axios";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import VerifyCompleteModal from "./verifyCompleteModal";

const EmailVerify = () => {
  const [onModal, setOnModal] = useState(false);
  const [success, setSuccess] = useState(true);
  const modalHandle = () => {
    setOnModal(onModal => !onModal);
    self.close();
  }

  const getTempPassword = async (verfyCode: string) => {
    const userData: any = await axios.get(
      `http://localhost:8080/api/auth/verify/code?code=${verfyCode}`,
      { withCredentials: true }
    );
  }

  useEffect(() => {
    const [_, code] = window.location.href.split('code=');
    getTempPassword(code)
      .then((resp) => {
        setOnModal(true);
      })
      .catch((error) => {
        setSuccess(false)
        setOnModal(true);
      })
  }, []);
  return (
    <div className=" h-screen flex bg-[#E3D8C5] items-center justify-center flex-col pt-7">
      <Helmet>Verify | 400JA-DIARY</Helmet>
      {onModal ? <VerifyCompleteModal modalHandle={modalHandle} success={success} /> : null}
      <div>인증중입니다. 잠시만 기다려주세요</div>
    </div>
  );
};

export default EmailVerify;
