import React, { useEffect } from "react";
//프로필 페이지가 좋을까?
const Mypage = () => {
    //유저정보, 정보변경, 일기 정보, 유저 삭제
    //필요한 메서드: 아이디에 해당하는 일기가 몇개인지, 
    const sampleUserData = {
        userId:'',
        email:'sample@test.com',
        password:''
    }

    
    const checkDiaryCount = () => {
        //페이지가 열리면 자동으로 호출
        const fakeDiarycount = 107
        return fakeDiarycount
    }

    const passwordChangeHandle = () => {
        //등록된 이메일로 인증메일
        //비밀번호, 확인
        
    }

    const userDeleteHandle = () => {

    }
    const diaryCount = checkDiaryCount()
    
    // useEffect(()=>{
    //     const diaryCount = checkDiaryCount()
    // },[]);

    return (
        <div className="border h-screen flex items-center justify-center flex-col lg:mt-0">
            <div>
                {sampleUserData.email}님의 마이페이지 입니다.
            </div>
            <div>
                오늘까지 총 
                <span>{diaryCount}</span>
                개 일기를 쓰셨습니다.
            </div>
            <div onClick={passwordChangeHandle}>
                비밀번호 변경
            </div>
            <div onClick={userDeleteHandle}>
                회원 탈퇴
            </div>
        </div>
    )
};

export default Mypage;