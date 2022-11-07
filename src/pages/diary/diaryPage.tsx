import React, { useCallback, useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import CreateDiary from "./createDiary";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
import config from "../../config";
import axios from "axios";
import Diarys from "./diarys";
import SideBar from "components/sideBar/sideBar";
import { LoadingSpin } from "components/loading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { customAxios } from "components/axios/customAxios";
const Diary = () => {
  
  
  const HOST = config.SERVER_HOST;
  

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
  const [load, setLoad] = useState(true);
  const [page, setPage] = useState(0);

  //무한 스크롤
  const preventRef = useRef(true); //옵저버 중복실행 방지. 
  const obsRef = useRef(null); //옵저버 element
  const endRef = useRef(false); //모든 글 로드여부
  const token:string = localStorage.getItem('accessToken') ? localStorage.getItem('accessToken')! : '';
  const refreshToken:string = localStorage.getItem('refreshToken') ? localStorage.getItem('refreshToken')! : '';
  const setFindResult = (result: any) => {
    setDiaries([...result.list]);
    preventRef.current = true;
    if (result.end) {
      endRef.current = true;
    }
    return ;
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
    try {
      const dateKR = getKRDate();
      if (contentInputForm === diaries[0].content && subjectInputForm === diaries[0].subject) {
        return ;
      };

      const body = { subject: subjectInputForm, content: contentInputForm };
      const createdDiary = {
        id: "temp-Id",
        ...body,
        date: dateKR,
      };
      
      //token은 Authorization필드에 넣어서 보낸다. Authorization: <type> <credentials>
      const sendDiary: any = await customAxios.post(
        `${HOST}/api/diary`,
        body
      );
      
      if (!sendDiary) {
        throw new Error("Create diary fail");
      }
      if (createdDiary.date === diaries[0].date) {
        return setDiaries([createdDiary, ...diaries.slice(1)]);
      } else {
        return setDiaries([createdDiary, ...diaries]);
      }

    } catch (error) {
      return error;
    }
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
      return ;
    } else {
      if (key === 'subject') {
        setSubjectInputForm(e.target.value);
        setContentInputForm(contentInputForm);
        return ;
      } else if (key === 'content') {
        setSubjectInputForm(subjectInputForm);
        setContentInputForm(e.target.value);
        return ;
      }
    }
  };

  const getPost = async () => {

    const lastDiaryId = diaries[diaries.length - 1].id;

    if (lastDiaryId.length <= 0) {
      const diaryInit = async () => {
        const weeklyDiary: any = await customAxios.get(
          `/diary`
        );
        const diaryLength = weeklyDiary.data.list.length;
        if (weeklyDiary.data) {
          if (weeklyDiary.data.end) {
            endRef.current = true;
          }

          if (0 < diaryLength) setDiaries([...weeklyDiary.data.list]);
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

      return ;
    } else {
      const res = await customAxios.post(
        `/diary/nextDiary`,
        { lastDiaryId: lastDiaryId }
      );
      
      if (res.data) {
        if (res.data.end) {
          endRef.current = true;
        }
        setDiaries((prev) => [...prev, ...res.data.list]);
        preventRef.current = true;
      }
    }
    return ;
  };

  const isCurrentDiary = () => {
    const nowDate = new Date(getKRDate());
    const targetDate = new Date(diaries[0].date);
    const isCurrentDiary = nowDate <= targetDate;
    return isCurrentDiary
  };

  const obsHandle = (entries: any) => {
    const target = entries[0];
    //옵저버 중복실행 방지
    if (!endRef.current && target.isIntersecting && preventRef.current) {
      preventRef.current = false; //다음 데이터를 불러오면 명시적으로 false로 해주고 page업.
      setPage((prev) => prev + 1);
    }
  };

  //탑 버튼
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

  const ScrollTopButton = () => {
    return (
      <button
        className="border-2 border-[#332121] flex bottom-0 right-28 fixed "
        onClick={scrollTop}
      >
        <FontAwesomeIcon
          icon={faArrowUp}
          color="#332121"
          size="3x"
        ></FontAwesomeIcon>
      </button>
    );
  };

  useEffect(() => {
    const watch = () => {
      window.addEventListener("scroll", handleFollow);
    };
    watch();

    return () => {
      window.removeEventListener("scroll", handleFollow);
    };
  });

  //무한 스크롤
  useEffect(() => {
    const observer = new IntersectionObserver(obsHandle, { threshold: 0.5 });
    if (obsRef.current) observer.observe(obsRef.current);
    return () => {
      observer.disconnect();
    };
  }, [diaries]);

  useEffect(() => {
    //end가 true면 무한스크롤이 잠기기 때문에 page가 갱신되지 않는다.
    getPost();
  }, [page]);

  return (
    <div className="h-full min-h-screen flex bg-[#E3D8C5] items-center justify-center flex-col pt-7">

      <Helmet>Diary | 400JA-DIARY</Helmet>
      {load ? (
        <div className="absolute top-1/2">{LoadingSpin()}</div>
      ) : (
        <div className="flex flex-col items-center w-full h-full">
          <SideBar setFindResult={setFindResult} />
          <div className="w-11/12 bg-intro-notebook bg-fixed border-2 border-[#855958]">
            <div className="flex w-full justify-center items-center my-2">
              <div className="w-full bg-white max-w-screen-lg flex flex-col px-5 items-center py-2 bg-opacity-50 rounded-md">
                <CreateDiary
                  diaryInputHandler={diaryInputHandler}
                  createDiaryHandle={createDiaryHandle}
                  diaryValidCheck={diaryValidCheck}
                  currentDiary={isCurrentDiary() ? diaries[0] : null}
                />
              </div>
            </div>
            <div className="flex h-full w-full justify-center items-center ">
              <div className="h-full w-full bg-white max-w-screen-lg flex flex-col px-5 items-center py-2 mb-2 bg-opacity-50 rounded-md">
                <div className="flex">
                  <div className="w-72"></div>
                  <div className="w-72"></div>
                </div>
                <div className="w-full">
                  <Diarys diaries={diaries} />
                  <div id="diary-end" ref={obsRef}></div>
                </div>
              </div>
              {btnStatus ? ScrollTopButton() : null}
            </div>
          </div>

        </div>
      )}
    </div>
  );
};

export default Diary;