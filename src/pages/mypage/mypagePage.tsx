import axios from "axios";
import { LoadingSpin } from "components/loading";
import config from "config";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import PasswordChangeModal from "./passwordChangeModal";
import UserDeleteModal from "./userDelete";

const Mypage = () => {
  
  const HOST = config.SERVER_HOST;
  

  const [userData, setUserdata] = useState({
    email: "",
    diaryCount: "",
    type: ""
  });
  const [onModal, setOnModal] = useState(false);
  const [load, setLoad] = useState(true);
  const [modalPage, setModalPage] = useState(<UserDeleteModal modalHandle={modalHandle} />);
  const token:string = localStorage.getItem('jwt') ? localStorage.getItem('jwt')! : '';
  function modalHandle() {
    setOnModal(onModal => !onModal)
  }


  const setModalPage2 = (key: string) => {
    if (key === 'userDelete') {
      setModalPage(<UserDeleteModal modalHandle={modalHandle} />)
    };
    if (key === 'passwordChange') {
      setModalPage(<PasswordChangeModal modalHandle={modalHandle} />)
    };
    modalHandle();
  };

  useEffect(() => {
    const mypageInit = async () => {
      const userData: any = await axios.get(
        `${HOST}/api/user/me`,
        { withCredentials: true, headers:{ jwt: token } }
      );

      const MypageForm = userData.data;
      setUserdata(MypageForm);
      setLoad(false);
    };

    mypageInit();
  }, []);

  useEffect(() => {

  }, [onModal])
  return (
    <div className="border h-screen flex bg-[#E3D8C5] items-center justify-center flex-col pt-7">
      <Helmet>Diary | 400JA-DIARY</Helmet>
      {onModal ? modalPage : null}
      <div className=" h-5/6 w-full bg-intro-notebook flex justify-center border-y-2 border-[#855958]">
        <div className="w-8/12 h-full bg-white flex flex-col px-5 justify-center items-center">
          {load
            ? LoadingSpin()
            : <div>
              <div className="mb-4 flex flex-col justify-center items-center">
                <div>{userData.email}님의 마이페이지 입니다.</div>
                <div>
                  오늘까지 총<span>{userData.diaryCount}</span>개 일기를 쓰셨습니다.
                </div>
              </div>
              <div>
                {userData.type === 'BASIC' ? <div className="mb-5 hover:bg-slate-300 cursor-default text-center" onClick={() => setModalPage2('passwordChange')}>비밀번호 변경</div> : <div className="mb-5 bg-slate-300 text-center">소셜로그인은 비밀번호를 변경할 수 없습니다</div>}
                <div className="hover:bg-slate-200 cursor-default text-center" onClick={() => setModalPage2('userDelete')}>회원 탈퇴</div>
              </div>
            </div>
          }
        </div>
      </div>
    </div>
  );
};

export default Mypage;
