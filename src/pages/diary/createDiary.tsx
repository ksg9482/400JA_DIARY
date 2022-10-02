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
    currentDiary
  } = props;

  // 새로고침되지 않기 때문에 입력창을 초기화 하기 위해 별도의 함수 적용

  const submitHandle = (e: React.FormEvent<HTMLFormElement>) => {
    const diaryValid: boolean = diaryValidCheck();
    if (!diaryValid) {
      return;
    }

    e.preventDefault(); //set이 안되는건 이벤트 전파가 안되서?
    createDiaryHandle();
    diaryInputValueInit();
  };

  const diaryInputValueInit = () => {
    const diaryInputId = ["diaryInputSubject", "diaryInputContent"];
    diaryInputId.forEach((id) => {
      const targetElement: HTMLInputElement | null = document.querySelector(
        `#${id}`
      );
      if (targetElement) {
        targetElement.value = "";
      }
    });
  };

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
      subject: currentDiary.subject || '',
      content: currentDiary.content || '',
    });

    diaryInputHandler("init", {
      subject: currentDiary.subject || '',
      content: currentDiary.content || '',
    });
  },[])
  //일기 생성, 오늘 일기 페이지(트위터처럼 바로 위쪽은 작성창, 아래는 이미 작성된 일기)
  //key 값으로 구분해서 작동
  return (
    <form
      className="border flex flex-col w-3/4 my-2 py-2 min-w-min bg-white px-5 max-w-screen-lg"
      onSubmit={submitHandle}
    >
      <div className="flex">
        <div className="w-72"></div>
        <div className="w-72"></div>
      </div>
      <textarea
        id="diaryInputSubject"
        className="border px-1 mb-1"
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
        className="border overflow-y-scroll h-auto mb-1 px-1"
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
      <button className="border hover:bg-slate-300">일기 쓰기</button>
    </form>
  );
};

export default CreateDiary;
