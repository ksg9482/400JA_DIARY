import axios from "axios";
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
    type:""
  });
 
  const [onModal, setOnModal] = useState(false); 
  const modalHandle = () => {
    setOnModal(onModal => !onModal)
  }
  const [modalPage, setModalPage] = useState(<UserDeleteModal modalHandle={modalHandle}/>); 
  
  const setModalPage2 = (key:string) => {
    if(key === 'userDelete') {
      setModalPage(<UserDeleteModal modalHandle={modalHandle}/>) 
    }
    if(key === 'passwordChange') {
      setModalPage(<PasswordChangeModal modalHandle={modalHandle}/>) 
    }
    modalHandle()
  }
  
  useEffect(() => {
    const mypageInit = async () => {
      const userData: any = await axios.get(
        `http://localhost:8080/api/user/me`,
        { withCredentials: true }
      );
      
      //이거 함수에 넣어서 객체로
      //다이어리를 불러올수 없습니다 컴포넌트 만들고 이상 생기면 그거 보여줘야 됨
      const MypageForm = userData
        ? userData.data
        : [
          {
            email: "",
            diaryCount: "",
            type:""
          },
        ];
      setUserdata(MypageForm);
    };

    mypageInit();
  }, []);

  useEffect(()=>{

  },[onModal])
  return (
    <div className="border h-screen overflow-y-scroll flex bg-slate-500 items-center justify-start flex-col ">
      <Helmet>Diary | 400JA-DIARY</Helmet>
      {onModal? modalPage : null}
      <div className="border w-3/4 h-full bg-white max-w-screen-lg flex flex-col px-5 justify-center items-center">
        <div className="mb-4">
          <div>{userData.email}님의 마이페이지 입니다.</div>
          <div>
            오늘까지 총<span>{userData.diaryCount}</span>개 일기를 쓰셨습니다.
          </div>
        </div>
        <div>
          {userData.type === 'BASIC' ? <div className="mb-4" onClick={()=>setModalPage2('passwordChange')}>비밀번호 변경</div> : <div>소셜로그인은 비밀번호를 변경할 수 없습니다</div>}
          <div onClick={()=>setModalPage2('userDelete')}>회원 탈퇴</div>
        </div>

      </div>
    </div>
  );
};

export default Mypage;
