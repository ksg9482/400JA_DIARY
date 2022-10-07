import axios from "axios";
import { getEventListeners } from "events";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const FindPasswordModal = (props: any) => {
  //유저 정보 삭제 페이지.
  const [emailInput, setEmailInput] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { modalHandle } = props;
  const nav = useNavigate();
  
  const escKey = (e: KeyboardEvent) => {
    if(e.key === 'Escape') {
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
  const passwordFindHandle = async (email: string) => {
    try {
      setErrorMessage("등록되지 않은 사용자 입니다.");
      const userValid = await axios.post(
        `http://localhost:8080/api/auth/findPassword`,
        { email: email },
        { withCredentials: true }
      );
      modalHandle();
      nav("/", { replace: true });
    } catch (error: any) {
      if (error.response.data.error === "Password change fail") {
        setErrorMessage("임시 비밀번호 발급에 실패하였습니다.");
        return;
      }
      return error;
    }
  };

  window.addEventListener('keydown', escKey)
  //일반가입이면 단순 데이터 삭제
  //소셜 로그인이면 소셜 끊기?
  //삭제하고 유저 정보 삭제되었다 알리기(이용에 감사드립니다 등)
  return (
    <div className="fixed bg-slate-400 top-0 h-full w-full bg-opacity-50 flex justify-center items-center">
      <div className="bg-white w-1/3 pt-1 min-w-min max-w-sm">
        <div className="flex mb-5">
          <div className="w-64"></div>
        </div>
        <div className="flex flex-col mb-6 sm:pb-1">
          <div className="mb-4 px-1 sm:pb-1">
            입력하신 이메일로 임시 비밀번호가 발송됩니다.
          </div>
          <div className="mb-5 px-1">
            로그인 후 반드시 비밀번호를 수정해 주세요.
          </div>
          <div className="flex flex-col">
            <div className="flex flex-col justify-center items-start px-2 sm:mt-6 sm:flex-row sm:items-center">
              <span className="mb-1 sm:mb-0 sm:mr-3 whitespace-nowrap">
                이메일
              </span>
              <input
                className="border w-full sm:w-3/4"
                type="text"
                placeholder="이메일"
                onChange={inputHandle}
              />
            </div>
          </div>
        </div>

        {errorMessage ? errorMessage : <div>&nbsp;</div>}

        <div className="flex justify-center gap-6 mb-4 px-4">
          <button
            className=" hover:bg-slate-300 w-28"
            onClick={passwordFindCancle}
          >
            취소
          </button>
          <button
            className="hover:bg-slate-300 w-28"
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
