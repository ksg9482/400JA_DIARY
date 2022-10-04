import axios from "axios";
import React, { useState } from "react";

interface IpasswordInputObj {
  password: string;
  passwordChange: string;
}

const PasswordChangeModal = (props: any) => {
  //유저 정보 삭제 페이지.
  const [passwordInputObj, setPasswordInputObj] = useState({
    password: "",
    passwordChange: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const { modalHandle } = props;

  const passwordFindCancle = () => {
    modalHandle();
  };
  const inputHandle =
    (key: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setPasswordInputObj({ ...passwordInputObj, [key]: e.target.value });
    };

  const emptyCheck = () => {
    if (
      passwordInputObj.password === "" ||
      passwordInputObj.passwordChange === ""
    ) {
      return { message: "각 항목을 채워주세요." };
    }
    // if(passwordInputObj.password !== passwordInputObj.passwordCheck) {
    //   return {message:'비밀번호와 비밀번호 확인이 같지 않습니다.'}
    // }
    return false;
  };

  const passwordChangeHandle = async (passwordInputObj: IpasswordInputObj) => {
    const check = emptyCheck();
    if (check) {
      setErrorMessage(check.message);
      return;
    }

    const body = passwordInputObj;
    const passwordChange: any = await axios.patch(
      `http://localhost:8080/api/user/password`,
      body,
      { withCredentials: true }
    );
    if (passwordChange.status !== 200) {
      setErrorMessage("비밀번호 변경에 실패했습니다.");
      return;
    }
    modalHandle();
  };

  return (
    <div className="fixed bg-slate-400 h-full w-full bg-opacity-50 flex justify-center items-center">
      <div className="bg-white w-1/3 min-w-min max-w-sm">
        <div className="flex mb-5">
          <div className="w-64"></div>
        </div>
        <div className="flex flex-col mb-6 sm:pb-1">
          <div className="mb-4 px-1 sm:pb-1">비밀번호를 변경합니다.</div>
          <div className="flex flex-col">
            <div className="flex flex-col justify-center items-start px-2 sm:mt-6 sm:flex-row sm:items-center">
              <span className="mb-1 sm:mb-0 sm:mr-3 whitespace-nowrap w-28 flex justify-start">
                현재 비밀번호
              </span>
              <input
                className="border w-full sm:w-3/4"
                type="password"
                placeholder="Password"
                onChange={inputHandle("password")}
              />
            </div>
            <div className="flex flex-col justify-center items-start px-2 sm:mt-6 sm:flex-row sm:items-center">
              <span className="mb-1 sm:mb-0 sm:mr-3 whitespace-nowrap w-28 flex justify-start">
                비밀번호 변경
              </span>
              <input
                className="border w-full sm:w-3/4"
                type="password"
                placeholder="Password Change"
                onChange={inputHandle("passwordChange")}
              />
            </div>
          </div>
        </div>
        {errorMessage ? errorMessage : <div>&nbsp;</div>}

        <div className="flex justify-center gap-6 mb-4 px-4">
          <button
            className="hover:bg-slate-300 w-28"
            onClick={passwordFindCancle}
          >
            취소
          </button>
          <button
            className="hover:bg-slate-300 w-28"
            onClick={(e) => passwordChangeHandle(passwordInputObj)}
          >
            비밀번호 변경
          </button>
        </div>
      </div>
    </div>
  );
};

export default PasswordChangeModal;
