import axios from "axios";
import config from "config";
import React, { useState } from "react";

interface IpasswordInputObj {
  password: string;
  passwordChange: string;
}

const PasswordChangeModal = (props: any) => {
  
  const HOST = config.SERVER_HOST;
  

  const { modalHandle } = props;

  const [passwordInputObj, setPasswordInputObj] = useState({
    password: "",
    passwordChange: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const token:string = localStorage.getItem('jwt') ? localStorage.getItem('jwt')! : '';


  const escKey = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      passwordChangeCancle()
    }
  }
  const passwordChangeCancle = () => {
    modalHandle();
    window.removeEventListener('keydown', escKey)
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
      `${HOST}/api/user/password`,
      body,
      { withCredentials: true, headers:{ Authorization: `Bearer ${token}` } }
    );
    if (passwordChange.status !== 200) {
      setErrorMessage("비밀번호 변경에 실패했습니다.");
      return;
    }
    modalHandle();
  };
  window.addEventListener('keydown', escKey)

  return (
    <div className="fixed bg-slate-400 top-0 h-full w-full bg-opacity-50 flex justify-center items-center">
      <div className="bg-white w-1/3 min-w-min max-w-sm rounded-sm">
        <div className="flex mb-5">
          <div className="w-64"></div>
        </div>
        <div className="flex flex-col mb-6 sm:pb-1">
          <div className="mb-4 px-1 sm:pb-1 text-center">비밀번호를 변경합니다.</div>
          <div className="flex flex-col mb-2">
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
          {errorMessage ? <div className="text-sm text-red-500 text-center">{errorMessage}</div> : <div className="text-sm">&nbsp;</div>}
        </div>
        <div className="flex justify-center gap-6 mb-4 px-4">
          <button
            className="border hover:bg-slate-300 w-28"
            onClick={passwordChangeCancle}
          >
            취소
          </button>
          <button
            className="border hover:bg-slate-300 w-28"
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
