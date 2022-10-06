import React, { useCallback, useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import CreateDiary from "./createDiary";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { diaryInputKey } from "../../constants";
import axios from "axios";
import Diarys from "./diarys";
import SideBar from "components/sideBar/sideBar";
import { LoadingSpin } from "components/loading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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

  const [page, setPage] = useState(0);
  const [load, setLoad] = useState(true);

  const preventRef = useRef(true);
  const obsRef = useRef(null);
  const endRef = useRef(false);
  const setFindResult = (result: any) => {
    if (result.end) {
      endRef.current = true;
    }
    setDiaries([...result.list]);
    preventRef.current = true;
  };
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
  const createDiaryHandle = async () => {
    //인수로 내용을 받아야 하나?
    try {
      const dateKR = getKRDate();
      if(contentInputForm === diaries[0].content && subjectInputForm === diaries[0].subject) {
        return ;
      }
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
    setScrollY(window.pageYOffset);
    if (scrollY > 150) {
      setBtnStatus(true);
    } else {
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
  };

  const diaryValidCheck = (): boolean => {
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

  useEffect(() => {
    const watch = () => {
      window.addEventListener("scroll", handleFollow);
    };

    watch();
    // setTimeout(() => {
    //   watch();
    // }, 500);
    return () => {
      window.removeEventListener("scroll", handleFollow);
    };
  });

  const obsHandle = (entries: any) => {
    const target = entries[0];

    if (!endRef.current && target.isIntersecting && preventRef.current) {
      preventRef.current = false;
      setPage((prev) => prev + 1);
    }
  };

  const ScrollTopButton = () => {
    return (
      <button
        className="border-2 border-slate-400 flex bottom-0 right-20 fixed "
        onClick={scrollTop}
      >
        <FontAwesomeIcon
          icon={faArrowUp}
          color="#243c64"
          size="3x"
        ></FontAwesomeIcon>
      </button>
    );
  };

  const isCurrentDiary = () => {
    const nowDate = new Date(getKRDate());
    const targetDate = new Date(diaries[0].date);
    const isCurrentDiary = nowDate <= targetDate;
    return isCurrentDiary
  }
  useEffect(() => {
    const observer = new IntersectionObserver(obsHandle, { threshold: 0.5 });
    if (obsRef.current) observer.observe(obsRef.current);
    return () => {
      observer.disconnect();
    };
  }, []);

  const getPost = useCallback(async () => {
    //setLoad(true);
    const lastDiaryId = diaries[diaries.length - 1].id;
    if (lastDiaryId.length <= 0) {
      const diaryInit = async () => {
        const weeklyDiary: any = await axios.get(
          `http://localhost:8080/api/diary`,
          { withCredentials: true }
        );
        const diaryLength = weeklyDiary.data.list.length;
        if (weeklyDiary.data) {
          if (weeklyDiary.data.end) {
            endRef.current = true;
          }

          if (0 < diaryLength ) setDiaries([...weeklyDiary.data.list]);
          preventRef.current = true;
          
        } else {
          endRef.current = true;
          setDiaries([
            {
              id: "",
              subject: "",
              content: "",
              date: "",
            },
          ]);
          preventRef.current = true;
        }
        setLoad(false);
      };

      diaryInit();

      return;
    } else {
      const res = await axios.post(
        `http://localhost:8080/api/diary/nextDiary`,
        { lastDiaryId: lastDiaryId },
        { withCredentials: true }
      );

      if (res.data) {
        if (res.data.end) {
          endRef.current = true;
        }
        setDiaries((prev) => [...prev, ...res.data.list]); //list로 안보내줌
        preventRef.current = true;
      }
      setLoad(false);
    }
  }, [page]);

  useEffect(() => {
    if (page !== 1) getPost();
  }, [page]);

  return (
    <div className="h-full min-h-screen flex bg-slate-500 items-center  flex-col pt-7">
      <Helmet>Diary | 400JA-DIARY</Helmet>
      {load ? (
        <div className="absolute top-1/2">{LoadingSpin()}</div>
      ) : (
        <div className="flex flex-col w-full h-full">
          <SideBar setFindResult={setFindResult} />
          <div className="flex w-full justify-center items-center my-2">
            <div className="w-full bg-white max-w-screen-lg flex flex-col px-5 items-center py-2">
            <CreateDiary
              diaryInputHandler={diaryInputHandler}
              createDiaryHandle={createDiaryHandle}
              diaryValidCheck={diaryValidCheck}
              // 오늘 날짜 아니면 안보내거나 받아도 무시해야 함
              //10/4 < 10/5
              currentDiary={isCurrentDiary() ?  diaries[0] : null}
            />
            </div>
          </div>

          <div className="flex h-full w-full justify-center items-center">
            <div className="h-full w-full bg-white max-w-screen-lg flex flex-col px-5 items-center py-2">
              <div className="flex">
                <div className="w-72"></div>
                <div className="w-72"></div>
              </div>
              <div className="w-full">
                <Diarys diaries={diaries} />
              </div>
              <div id="diary-end" ref={obsRef}></div>
            </div>
            {btnStatus ? ScrollTopButton() : null}
          </div>
        </div>
      )}
    </div>
  );
};

export default Diary;
