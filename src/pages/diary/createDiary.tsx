import React from "react";
import { diaryInputKey } from "../../constants";
const CreateDiary = (props: any) => {
    const { diaryInputHandler, createDiaryHandle, diaryStateInit, diaryValidCheck } = props
    //일기 작성 컴포넌트

    // 페이지가 새로고침 되지 않게 preventDefault 적용.
    // 새로고침되지 않기 때문에 입력창을 초기화 하기 위해 별도의 함수 적용
    
    //적합성 체크는 어디다?
    
    const submitHandle = (e:React.FormEvent<HTMLFormElement>) => {
        const diaryValid:boolean = diaryValidCheck();
        if(!diaryValid){
            return ;
        }
        e.preventDefault();
        createDiaryHandle()
        diaryStateInit();
        diaryInputValueInit();
    }

    const diaryInputValueInit = () => {
        const diaryInputId = ['diaryInputSubject', 'diaryInputContent'];
        diaryInputId.forEach((id) => {
            const targetElement:HTMLInputElement | null = document.querySelector(`#${id}`);
            if(targetElement) {
                targetElement.value = '';
            };
        });
    };

    //일기 생성, 오늘 일기 페이지(트위터처럼 바로 위쪽은 작성창, 아래는 이미 작성된 일기)
    //key 값으로 구분해서 작동
    return (
        <form className="border flex flex-col w-full mb-8" onSubmit={submitHandle}>
            <input id="diaryInputSubject" className="border" type="text" placeholder="제목을 적어주세요" onChange={diaryInputHandler(diaryInputKey.subject)} required />
            <input id="diaryInputContent" className="border" type="text" placeholder="일기를 적어주세요" onChange={diaryInputHandler(diaryInputKey.content)} required />
            <button className="border" >일기 쓰기</button>
        </form>
    )
};

export default CreateDiary;