import axios from "axios";
import { emailPattern } from "components/common";
import config from "config";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
const FindPasswordModal = (props: any) => {
  const PROTOCOL = config.SERVER_PROTOCOL;
  const HOST = config.SERVER_HOST;
  const PORT = config.SERVER_PORT;

  const { modalHandle } = props;

  const [emailInput, setEmailInput] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const nav = useNavigate();



  const escKey = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      passwordFindCancle()
    }
  }

  const passwordFindCancle = () => {
    modalHandle();
    window.removeEventListener('keydown', escKey)
  };
  const inputHandle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmailInput(e.target.value);
  };

  const socialDoamain = ['google.com', 'kakao.com'];
  const passwordFindHandle = async (email: string) => {
    let domain = email.split('@');
    try {
      if (!email) {
        return setErrorMessage("이메일을 입력해 주세요");
      };
      if (socialDoamain.includes(domain[1])) {
        return setErrorMessage("소셜로그인을 이용해 주세요");
      };

      const userValid = await axios.post(
        `${PROTOCOL}://${HOST}:${PORT}/api/auth/findPassword`,
        { email: email },
        { withCredentials: true }
      );

      modalHandle();
      nav("/", { replace: true });
    } catch (error: any) {
      if (error.response.status === 404) {
        return setErrorMessage("가입되지 않은 사용자 입니다");
      };
      return setErrorMessage("인증코드 발급에 실패하였습니다.");
    };
  };

  window.addEventListener('keydown', escKey);

  return (
    <div className="fixed bg-slate-400 top-0 h-full w-full bg-opacity-50 flex justify-center items-center">
      <div className="bg-white w-1/3 pt-1 min-w-min max-w-sm rounded-sm">
        <div className="flex mb-5">
          <div className="w-64"></div>
        </div>
        <div className="flex flex-col mb-6 sm:pb-1">
          <div className="mb-4 px-1 sm:pb-1">
            입력하신 이메일로 인증 코드가 발송됩니다.
          </div>
          <div className="flex flex-col mb-2">
            <div className="flex flex-col justify-center items-start px-2 sm:mt-6 sm:flex-row sm:items-center">
              <span className="mb-1 sm:mb-0 sm:mr-3 whitespace-nowrap">
                이메일
              </span>
              <input
                className="border w-full sm:w-3/4 mb-2"
                type="email"
                pattern={emailPattern + ""}
                placeholder="이메일"
                onChange={inputHandle}
              />
            </div>
          </div>
          {errorMessage ? <div className="text-sm text-red-500 ">{errorMessage}</div> : <div className="text-sm">&nbsp;</div>}
        </div>

        <div className="flex justify-center gap-6 mb-4 px-4">
          <button
            className="border hover:bg-slate-300 w-28"
            onClick={passwordFindCancle}
          >
            취소
          </button>
          <button
            className="border hover:bg-slate-300 w-28"
            onClick={(e) => passwordFindHandle(emailInput)}
          >
            비밀번호 찾기
          </button>
        </div>
      </div>
    </div>
  );
};

export default FindPasswordModal;
