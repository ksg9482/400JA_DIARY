import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import CreateDiary from "./createDiary";
import DiaryCompoenet from "./diaryComponent";
import { diaryInputKey } from "../../constants";
import axios from "axios";
import Diarys from "./diarys";
const Diary = () => {
  interface IdiaryValidCheck {
    subject: string;
    content: string;
  }
  //일기 생성, 일기 모아보기, 오늘 일기 페이지

  //오늘의 일기(위)
  //일기 컨테이너(아래)
  //위로가기 버튼
  //onClick 말고 이벤트 리스너가 나을까?
  //제목은 없애는게 좋을지도

  //todo 일기 쓰기 로직 수정, 소셜로그인, 회원가입, 비번변경

  const [subjectInputForm, setSubjectInputForm] = useState("");
  const [contentInputForm, setContentInputForm] = useState("");
  const [scrollY, setScrollY] = useState(0);
  const [btnStatus, setBtnStatus] = useState(false);
  const [diaries, setDiaries] = useState([
    {
      id: "",
      subject: "",
      content: "",
      date: "",
    },
  ]);

  const createDiaryHandle = async () => {
    //인수로 내용을 받아야 하나?
    try {
      const getKRDate = () => {
        const date = new Date().toLocaleString("ko-KR", {
          timeZone: "Asia/Seoul",
        });
        const dateSplitArr = date.split(". "); // 공백문자도 포함해 분리
        const year = dateSplitArr[0].padStart(2, "0");
        const month = dateSplitArr[1].padStart(2, "0");
        const day = dateSplitArr[2].padStart(2, "0");
        return `${year}-${month}-${day}`;
      };
      const dateKR = getKRDate();
      const body = { subject: subjectInputForm, content: contentInputForm };
      const createdDiary = {
        id: "temp-Id",
        ...body,
        date: dateKR,
      };
      const sendDiary: any = await axios.post(
        `http://localhost:8080/api/diary`,
        body,
        { withCredentials: true }
      );
      if (!sendDiary) {
        throw new Error("Create diary fail");
      }
      if (createdDiary.date === diaries[0].date) {
        setDiaries([createdDiary, ...diaries.slice(1)]);
      } else {
        setDiaries([createdDiary, ...diaries]);
      }

      // create 보내기
      // 새로 일주일치 적용해서 캐시에 넣고 뿌리기
    } catch (error) {
      return error;
    }
  };

  const handleFollow = () => {
    setScrollY(window.pageYOffset); //스크롤 Y축 수
    if (scrollY > 100) {
      // 100 이상이면 버튼이 보이게
      setBtnStatus(true);
    } else {
      // 100 이하면 버튼이 사라지게
      setBtnStatus(false);
    }
  };

  const scrollTop = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    setScrollY(0); // ScrollY 의 값을 초기화
    setBtnStatus(false); // BtnStatus의 값을 false로 바꿈 => 버튼 숨김
  };

  const diaryValidCheck =
    (/*{subject, content}:IdiaryValidCheck*/): boolean => {
      if (subjectInputForm.length === 0 || contentInputForm.length === 0) {
        return false;
      }
      return true;
    };

  const diaryInputHandler = (
    key: string,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (key === "init") {
      const initValue: any = e;
      setSubjectInputForm(initValue.subject);
      setContentInputForm(initValue.content);
      return;
    } else {
      if (key === diaryInputKey.subject) {
        setSubjectInputForm(e.target.value);
        setContentInputForm(contentInputForm);
        return;
      } else if (key === diaryInputKey.content) {
        setSubjectInputForm(subjectInputForm);
        setContentInputForm(e.target.value);
        return;
      }
    }
  };

  const diaryStateInit = () => {
    console.log("diaryStateInit");
    setSubjectInputForm("");
    setContentInputForm("");
  };

  // const createDefaultValue = () => {
  //     try {
  //         const diaryInit = async () => {
  //             const weeklyDiary: any = await axios.get(`http://localhost:8080/api/diary/weekly`, { withCredentials: true });
  //             //이거 함수에 넣어서 객체로
  //             //다이어리를 불러올수 없습니다 컴포넌트 만들고 이상 생기면 그거 보여줘야 됨
  //             const diaryForm = weeklyDiary ? weeklyDiary.data : [{
  //                 id: '',
  //                 subject: '',
  //                 content: '',
  //                 createAt: ''
  //             }]
  //             return diaryForm

  //         };

  //         diaryInit()

  //         const getKRDate = () => {
  //             const date = new Date().toLocaleString("ko-KR", { timeZone: "Asia/Seoul" })
  //                     const dateSplitArr = date.split('. ') // 공백문자도 포함해 분리

  //                     return `${dateSplitArr[0]}-${dateSplitArr[1].padStart(2, '0')}-${dateSplitArr[2].padStart(2, '0')}`
  //         }
  //         const now = new Date(getKRDate())
  //         //console.log(diaries[0])
  //         const targetDate = new Date(diaries[0].date)
  //         console.log(now, targetDate, now <= targetDate)
  //         const nowDiary = diaries[0]
  //         if (now <= targetDate) {
  //             return { subject: nowDiary.subject, content: nowDiary.content }
  //         }
  //         return { subject: '', content: '' }
  //     } catch (error) {
  //         return error
  //     }

  // }

  useEffect(() => {
    const watch = () => {
      window.addEventListener("scroll", handleFollow);
    };
    //setTimeout 말고 스크롤 이벤트를 제한할 방법이 있을까?
    //스크롤 이벤트가 끝나고 어느정도 시간이 지나면?(0.2초정도)
    setTimeout(() => {
      watch();
    }, 1000);
    return () => {
      window.removeEventListener("scroll", handleFollow);
    };
  });

  useEffect(() => {
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
      setDiaries(diaryForm);
    };

    diaryInit();
    return;
  }, []);
  return (
    <div className="border h-screen overflow-y-scroll flex bg-slate-500 items-center justify-start flex-col pt-8">
      <Helmet>Diary | 400JA-DIARY</Helmet>
      <CreateDiary
        diaryInputHandler={diaryInputHandler}
        createDiaryHandle={createDiaryHandle}
        diaryStateInit={diaryStateInit}
        diaryValidCheck={diaryValidCheck}
      />

      <div className="border w-3/4 h-full min-w-min bg-white max-w-screen-lg flex flex-col px-5 items-center">
        <div className="flex">
          <div className="w-60"></div>
          <div className="w-60"></div>
        </div>
        <div className="w-full">
          <Diarys diaries={diaries} />
        </div>
      </div>
      <button
        className="border flex bottom-0 right-7 absolute bg-white"
        onClick={scrollTop}
      >
        맨위로
      </button>
      {/*맨 위 레이어로 빼서 오른쪽에 붙이기 */}
    </div>
  );
};

export default Diary;
