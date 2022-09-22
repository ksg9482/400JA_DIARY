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
  } = props;
  //일기 작성 컴포넌트

  // 페이지가 새로고침 되지 않게 preventDefault 적용.
  // 새로고침되지 않기 때문에 입력창을 초기화 하기 위해 별도의 함수 적용

  //적합성 체크는 어디다?

  const submitHandle = (e: React.FormEvent<HTMLFormElement>) => {
    const diaryValid: boolean = diaryValidCheck();
    if (!diaryValid) {
      return;
    }

    createDiaryHandle();
    //e.preventDefault(); //set이 안되는건 이벤트 전파가 안되서?
    diaryStateInit();
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
    const createDefaultValue = () => {
      try {
        const diaryInit = async () => {
          const weeklyDiary: any = await axios.get(
            `http://localhost:8080/api/diary/weekly`,
            { withCredentials: true }
          );
          //이거 함수에 넣어서 객체로
          //다이어리를 불러올수 없습니다 컴포넌트 만들고 이상 생기면 그거 보여줘야 됨
          const diaryForm = weeklyDiary
            ? weeklyDiary.data
            : [
                {
                  id: "",
                  subject: "",
                  content: "",
                  createAt: "",
                },
              ];
          return diaryForm;
        };

        diaryInit().then((resp) => {
          
          const getKRDate = () => {
            const date = new Date().toLocaleString("ko-KR", {
              timeZone: "Asia/Seoul",
            });
            const dateSplitArr = date.split(". "); // 공백문자도 포함해 분리

            return `${dateSplitArr[0]}-${dateSplitArr[1].padStart(
              2,
              "0"
            )}-${dateSplitArr[2].padStart(2, "0")}`;
          };

          if(resp.length <= 0){
            resp.push({
              subject: '',
              content: ''
            })
          }

          const now = new Date(getKRDate());
          const targetDate = new Date(resp[0].date);
          const nowDiary = resp[0];
          if (now <= targetDate) {
            setDefaultInputForm({
              subject: nowDiary.subject,
              content: nowDiary.content,
            });

            diaryInputHandler("init", {
              subject: nowDiary.subject,
              content: nowDiary.content,
            });
          }
          return { subject: "", content: "" };
        });
      } catch (error) {
        return error;
      }
    };
    createDefaultValue();
    // const defaultValue = createDefaultValue();
    // console.log(defaultValue)
    // setDefaultInputForm({
    //     subject:defaultValue.subject,
    //     content:defaultValue.content
    // })
  }, []);

  //일기 생성, 오늘 일기 페이지(트위터처럼 바로 위쪽은 작성창, 아래는 이미 작성된 일기)
  //key 값으로 구분해서 작동
  return (
    <form
      className="border flex flex-col w-3/4 my-2 min-w-min bg-white px-5 max-w-screen-lg"
      onSubmit={submitHandle}
    >
      <div className="flex">
        <div className="w-60"></div>
        <div className="w-60"></div>
      </div>
      <textarea
        id="diaryInputSubject"
        className="border"
        placeholder="제목을 적어주세요"
        rows={1}
        value={defaultInputForm.subject}
        onChange={(e) => {
          defaultInputHandler(diaryInputKey.subject, e);
          diaryInputHandler(diaryInputKey.subject, e);
        }}
        required
      />
      <textarea
        id="diaryInputContent"
        className="border overflow-y-scroll h-auto"
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
      <button className="border">일기 쓰기</button>
    </form>
  );
};

export default CreateDiary;
