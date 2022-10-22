import axios from "axios";
import React, { useEffect, useState } from "react";

const CreateDiary = (props: any) => {
  const {
    diaryInputHandler,
    createDiaryHandle,
    diaryStateInit,
    diaryValidCheck,
    currentDiary,
  } = props;

  const [defaultInputForm, setDefaultInputForm] = useState({
    subject: "",
    content: "",
  });


  const submitHandle = (e: React.FormEvent<HTMLFormElement>) => {
    const diaryValid: boolean = diaryValidCheck();
    if (!diaryValid) {
      return ;
    }

    e.preventDefault();
    createDiaryHandle();
    return ;
  };

  const defaultInputHandler = (
    key: string,
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    if (key === 'subject') {
      return setDefaultInputForm({ ...defaultInputForm, [key]: e.target.value });
    }

    if (key === 'content') {
      return setDefaultInputForm({ ...defaultInputForm, [key]: e.target.value });
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
              defaultInputHandler('subject', e);
              diaryInputHandler('subject', e);
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
              defaultInputHandler('content', e);
              diaryInputHandler('content', e);
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
