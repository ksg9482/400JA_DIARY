import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
const UserDeleteModal = (props: any) => {
  //유저 정보 삭제 페이지.
  const [passwordInput, setPasswordInput] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { modalHandle } = props;
  const nav = useNavigate();

  const escKey = (e: KeyboardEvent) => {
    if(e.key === 'Escape') {
      userDeleteCancle()
    }
  }

  const userDeleteCancle = () => {
    modalHandle();
    window.removeEventListener('keydown', escKey)
  };
  const inputHandle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordInput(e.target.value);
  };
  const emptyCheck = () => {
    if (
      passwordInput === "" 
    ) {
      return { message: "비밀번호를 입력해주세요." };
    }
    // if(passwordInputObj.password !== passwordInputObj.passwordCheck) {
    //   return {message:'비밀번호와 비밀번호 확인이 같지 않습니다.'}
    // }
    return false;
  };

  const userDeleteHandle = async () => {
    const check = emptyCheck();
    if (check) {
      setErrorMessage(check.message);
      return;
    }
    const userDeleteSequence = async () => {
      const passwordCheck: any = await axios.post(
        `http://localhost:8080/api/user/valid`,
        { password: passwordInput },
        { withCredentials: true }
      );
      if (passwordCheck.data !== true) {
        setErrorMessage("비밀번호가 잘못 되었습니다.");
      }
      const userdelete: any = await axios.delete(
        `http://localhost:8080/api/user`,
        { withCredentials: true }
      );

      return "userDelete";
    };
    await userDeleteSequence();
    modalHandle();
    nav("/", { replace: true });
    location.reload();
  };
  window.addEventListener('keydown', escKey)
  //일반가입이면 단순 데이터 삭제
  //소셜 로그인이면 소셜 끊기?
  //삭제하고 유저 정보 삭제되었다 알리기(이용에 감사드립니다 등)
  return (
    <div className="fixed bg-slate-400 top-0 h-full w-full bg-opacity-50 flex justify-center items-center">
      <div className="bg-white w-1/3 min-w-min max-w-sm rounded-sm">
        <div className="flex mb-5">
          <div className="w-64"></div>
        </div>
        <div className="flex flex-col mb-6 sm:pb-1">
          <div className="mb-4 px-1 sm:pb-1">
            400JA-DIARY 회원을 탈퇴하시면 모든 유저정보가 삭제되고 복구할 수
            없습니다. 회원을 탈퇴하시겠습니까?
          </div>
          <div className="mb-4 px-1 ">
            최종 확인을 위해 비밀번호를 입력해 주세요.
          </div>
          <div className="flex flex-col mb-2">
            <div className="flex flex-col justify-center items-start px-2 sm:mt-6 sm:flex-row sm:items-center">
              <span className="mb-1 sm:mb-0 sm:mr-3 whitespace-nowrap">
                비밀번호
              </span>
              <input
                className="border w-full sm:w-3/4"
                type="password"
                placeholder="비밀번호"
                onChange={inputHandle}
              />
            </div>
          </div>
        {errorMessage ? <div className="text-sm text-red-500 ">{errorMessage}</div> : <div className="text-sm">&nbsp;</div>}
        </div>

        <div className="flex justify-center gap-6 mb-4 px-4">
          <button
            className="border hover:bg-slate-300 w-28"
            onClick={userDeleteCancle}
          >
            취소
          </button>
          <button
            className="border w-28 hover:bg-red-100 hover:border-red-500 "
            onClick={userDeleteHandle}
          >
            회원탈퇴
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserDeleteModal;
