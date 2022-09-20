import axios from "axios";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
//프로필 페이지가 좋을까?
const Mypage = () => {
  //유저정보, 정보변경, 일기 정보, 유저 삭제
  //필요한 메서드: 아이디에 해당하는 일기가 몇개인지,
  const [userData, setUserdata] = useState({
    email: "",
    diaryCount: "",
  });
  const sampleUserData = {
    userId: "",
    email: "sample@test.com",
    password: "",
  };

  const getUserData = async () => {
    const userData: any = await axios.get(`http://localhost:8080/api/user/me`, {
      withCredentials: true,
    });
  };
  const checkDiaryCount = () => {
    //페이지가 열리면 자동으로 호출
    const fakeDiarycount = 107;
    return fakeDiarycount;
  };

  const passwordChangeHandle = () => {
    //등록된 이메일로 인증메일
    //비밀번호, 확인
  };

  const userDeleteHandle = () => {};
  const diaryCount = checkDiaryCount();

  // useEffect(()=>{
  //     const diaryCount = checkDiaryCount()
  // },[]);
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
            },
          ];
      setUserdata(MypageForm);
    };

    mypageInit();
  }, []);

  return (
    <div className="border h-screen overflow-y-scroll flex bg-slate-500 items-center justify-start flex-col pt-8">
      <Helmet>Diary | 400JA-DIARY</Helmet>
      <div className="border w-3/4 h-full bg-white max-w-screen-lg flex flex-col px-5 justify-center items-center">
        <div>{userData.email}님의 마이페이지 입니다.</div>
        <div>
          오늘까지 총<span>{userData.diaryCount}</span>개 일기를 쓰셨습니다.
        </div>
        <div onClick={passwordChangeHandle}>비밀번호 변경</div>
        <div onClick={userDeleteHandle}>회원 탈퇴</div>
      </div>
    </div>
  );
};

export default Mypage;
