import React from "react";
const CreateDiary = (props:any) => {
    const {diaryInputHandler, createDiaryHandle} = props
    //일기 작성 컴포넌트
    
    
    //일기 생성, 오늘 일기 페이지(트위터처럼 바로 위쪽은 작성창, 아래는 이미 작성된 일기)
    return(
        <div className="border flex flex-col w-full mb-8">
                <input className="border" type="text" placeholder="일기를 적어주세요" onChange={diaryInputHandler} required />
                <button className="border" onClick={createDiaryHandle}>일기 쓰기</button>
        </div>
    )
};

export default CreateDiary;