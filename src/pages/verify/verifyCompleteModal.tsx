import React from "react";
const VerifyCompleteModal = (props: any) => {

  const { modalHandle, success } = props;
  const closePage = async () => {
    modalHandle();

  };
  const SuccessMessage = () => {
    return (
      <div className="flex flex-col mb-6 sm:pb-1">
        <div className="mb-4 px-1 sm:pb-1 text-center">
          입력하신 이메일로 임시 비밀번호가 발송됩니다.
        </div>
        <div className="mb-5 px-1 text-center">
          로그인 후 반드시 비밀번호를 수정해 주세요.
        </div>
      </div>
    );
  };
  const FailMessage = () => {
    return (
      <div className="flex flex-col mb-6 sm:pb-1 text-center">
        <div className="mb-4 px-1 sm:pb-1">
          임시 비밀번호 발급에 실패했습니다.
        </div>
        <div className="mb-5 px-1 text-center">
          나중에 다시 시도해주세요.
        </div>
      </div>
    );
  };

  return (
    <div className="fixed bg-slate-400 top-0 h-full w-full bg-opacity-50 flex justify-center items-center">
      <div className="bg-white w-1/3 pt-1 min-w-min max-w-sm rounded-sm flex flex-col justify-center items-center pb-2">
        <div className="flex mb-5">
          <div className="w-64"></div>
        </div>
        {success ? <SuccessMessage /> : <FailMessage />}
        <button
          className="border hover:bg-slate-300 w-28"
          onClick={closePage}
        >
          확인
        </button>
      </div>
    </div>
  );
};

export default VerifyCompleteModal;
