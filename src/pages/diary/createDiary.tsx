import axios from "axios";
import React, { useEffect, useState } from "react";
import { diaryInputKey } from "../../constants";

const CreateDiary = (props: any) => {
  const [defaultInputForm, setDefaultInputForm] = useState({
    subject: "",
    content: "",
  });
  const {
    diaryInputHandler,
    createDiaryHandle,
    diaryStateInit,
    diaryValidCheck,
    currentDiary,
  } = props;

  // 새로고침되지 않기 때문에 입력창을 초기화 하기 위해 별도의 함수 적용

  const submitHandle = (e: React.FormEvent<HTMLFormElement>) => {
    const diaryValid: boolean = diaryValidCheck();
    if (!diaryValid) {
      return;
    }

    e.preventDefault(); //set이 안되는건 이벤트 전파가 안되서?
    createDiaryHandle();
    //diaryInputValueInit();
  };

  // const diaryInputValueInit = () => {
  //   const diaryInputId = ["diaryInputSubject", "diaryInputContent"];
  //   diaryInputId.forEach((id) => {
  //     const targetElement: HTMLInputElement | null = document.querySelector(
  //       `#${id}`
  //     );
  //     if (targetElement) {
  //       targetElement.value = "";
  //     }
  //   });
  // };

  const defaultInputHandler = (
    key: string,
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    if (key === diaryInputKey.subject) {
      setDefaultInputForm({ ...defaultInputForm, [key]: e.target.value });
    }

    if (key === diaryInputKey.content) {
      setDefaultInputForm({ ...defaultInputForm, [key]: e.target.value });
    }
  };

  useEffect(() => {
    setDefaultInputForm({
      subject: currentDiary?.subject || "",
      content: currentDiary?.content || "",
    });

    diaryInputHandler("init", {
      subject: currentDiary?.subject || "",
      content: currentDiary?.content || "",
    });
  }, []);
  //일기 생성, 오늘 일기 페이지(트위터처럼 바로 위쪽은 작성창, 아래는 이미 작성된 일기)
  //key 값으로 구분해서 작동
  
  return (
    <div className="border-2 border-[#855958] bg-white flex justify-center items-center w-full rounded-md">
      <div className="flex justify-center items-center w-full">
      <form
        className="flex flex-col w-10/12 gap-2 py-1 min-w-min max-w-screen-lg justify-center items-center"
        onSubmit={submitHandle}
      >
        <textarea
          id="diaryInputSubject"
          className="border px-1 w-full resize-none"
          placeholder="제목을 적어주세요"
          rows={1}
          maxLength={30}
          value={defaultInputForm.subject}
          onChange={(e) => {
            defaultInputHandler(diaryInputKey.subject, e);
            diaryInputHandler(diaryInputKey.subject, e);
          }}
          
          required
        />
        <textarea
          id="diaryInputContent"
          className="border w-full overflow-y-scroll h-auto px-1 resize-none scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-slate-200"
          placeholder="일기를 적어주세요"
          rows={6}
          maxLength={400}
          value={defaultInputForm.content}
          onChange={(e) => {
            defaultInputHandler(diaryInputKey.content, e);
            diaryInputHandler(diaryInputKey.content, e);
          }}
          required
        />
        <button className="border w-full hover:bg-slate-300">일기 쓰기</button>
      </form>
      </div>
    </div>
  );
};

export default CreateDiary;
