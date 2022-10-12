import axios from "axios";
import { LoadingSpin } from "components/loading";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import PasswordChangeModal from "./passwordChangeModal";
import UserDeleteModal from "./userDelete";
//프로필 페이지가 좋을까?
const Mypage = () => {
  //유저정보, 정보변경, 일기 정보, 유저 삭제
  //필요한 메서드: 아이디에 해당하는 일기가 몇개인지,
  const [userData, setUserdata] = useState({
    email: "",
    diaryCount: "",
    type: ""
  });

  const [onModal, setOnModal] = useState(false);
  const [load, setLoad] = useState(true);
  const modalHandle = () => {
    setOnModal(onModal => !onModal)
  }
  const [modalPage, setModalPage] = useState(<UserDeleteModal modalHandle={modalHandle} />);

  const setModalPage2 = (key: string) => {
    if (key === 'userDelete') {
      setModalPage(<UserDeleteModal modalHandle={modalHandle} />)
    }
    if (key === 'passwordChange') {
      setModalPage(<PasswordChangeModal modalHandle={modalHandle} />)
    }
    modalHandle()
  }

  // const LoadingSpin = () => {
  //   return (
  //       <div id="" className="inline-flex items-center px-4 py-2 font-semibold leading-6 text-sm shadow rounded-md text-white bg-indigo-500 hover:bg-indigo-400 transition ease-in-out duration-150 cursor-not-allowed">
  //         <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" >
  //           <circle className="opacity-25" cx="12" cy="12" r="10" strokeWidth="4" stroke="currentColor"></circle>
  //           <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
  //         </svg>
  //         Loading...
  //       </div>
  //   )
  // }
  
  useEffect(() => {
    const mypageInit = async () => {
      const userData: any = await axios.get(
        `http://localhost:8080/api/user/me`,
        { withCredentials: true }
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
        :<div>
          <div className="mb-4">
          <div>{userData.email}님의 마이페이지 입니다.</div>
          <div>
            오늘까지 총<span>{userData.diaryCount}</span>개 일기를 쓰셨습니다.
          </div>
        </div>
        <div>
          {userData.type === 'BASIC' ? <div className="mb-5 hover:bg-slate-300 cursor-default" onClick={() => setModalPage2('passwordChange')}>비밀번호 변경</div> : <div className="mb-5 bg-slate-300">소셜로그인은 비밀번호를 변경할 수 없습니다</div>}
          <div className="hover:bg-slate-200 cursor-default" onClick={() => setModalPage2('userDelete')}>회원 탈퇴</div>
        </div>
        </div>
      }
        

      </div>
      </div>
      
    </div>
  );
};

export default Mypage;
