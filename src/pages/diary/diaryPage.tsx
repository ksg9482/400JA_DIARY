import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import CreateDiary from "./createDiary";
import DiaryCompoenet from "./diaryCompoenet";
import { diaryInputKey } from "../../constants";
import axios from "axios";
const Diary = () => {
    interface IdiaryValidCheck{
        subject:string;
        content:string;
    }
    //일기 생성, 일기 모아보기, 오늘 일기 페이지
    const fakeDiaries = [
        {
            id: 'a1',
            subject: '제목1',
            content: '"sssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss"',
            createAt: '2022-07-29T13:03:33.020Z'
        },
        {
            id: 'b2',
            subject: '제목2',
            content: '매일쓰면 좋은 일기',
            createAt: '2022-07-29T13:04:33.020Z'
        },
        {
            id: 'c3',
            subject: '제목3',
            content: '일기장을 뒤적이지 않아도 되는 일기',
            createAt: '2022-07-29T13:05:33.020Z'
        },
    ]
    //오늘의 일기(위)
    //일기 컨테이너(아래)
    //위로가기 버튼
    //onClick 말고 이벤트 리스너가 나을까?
    //제목은 없애는게 좋을지도
    const [subjectInputForm, setSubjectInputForm] = useState('');
    const [contentInputForm, setContentInputForm] = useState('');
    const [scrollY, setScrollY] = useState(0);
    const [btnStatus, setBtnStatus] = useState(false);
    const [diaries, setDiaries] = useState(fakeDiaries);

    const createDiaryHandle = async () => {
        //인수로 내용을 받아야 하나?
        const test = {
            id: 'd4',
            subject: subjectInputForm,
            content: contentInputForm,
            createAt: '2022-07-30T13:05:33.020Z'
        }
        setDiaries([ test, ...diaries])
        // create 보내기
        // 새로 일주일치 적용해서 캐시에 넣고 뿌리기

    }

    const getWeeklyDiary = async () => { //맨처음에 뿌릴 일주일치 일기
        const weeklyDiary:any = await axios.get(`http://localhost:8080/api/diary/weekly`, { withCredentials: true });
        //이거 함수에 넣어서 객체로
        const convertDiaryForm = weeklyDiary['_doc']
        setDiaries(convertDiaryForm)
    }
    
    const handleFollow = () => {
        setScrollY(window.pageYOffset); //스크롤 Y축 수
        if (scrollY > 100) {
            // 100 이상이면 버튼이 보이게
            setBtnStatus(true);
        } else {
            // 100 이하면 버튼이 사라지게
            setBtnStatus(false);
        }
    }

    const scrollTop = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
        setScrollY(0);  // ScrollY 의 값을 초기화
        setBtnStatus(false); // BtnStatus의 값을 false로 바꿈 => 버튼 숨김
    }
    
    const diaryValidCheck = (/*{subject, content}:IdiaryValidCheck*/):boolean => {
        console.log(subjectInputForm, contentInputForm)
        if (subjectInputForm.length === 0 || contentInputForm.length === 0) {
            return false
        }
        return true
    }

    const diaryInputHandler = (key:string)=>(e: React.ChangeEvent<HTMLInputElement>) => {
        if(key === diaryInputKey.subject) {
            setSubjectInputForm(e.target.value);
        };

        if(key === diaryInputKey.content) {
            setContentInputForm(e.target.value);
        };

        
    }

    const diaryStateInit = () => {
        setSubjectInputForm('');
        setContentInputForm('');
    }
    

    useEffect(() => {
        const watch = () => {
            window.addEventListener('scroll', handleFollow)
        }
        //setTimeout 말고 스크롤 이벤트를 제한할 방법이 있을까?
        //스크롤 이벤트가 끝나고 어느정도 시간이 지나면?(0.2초정도)
        setTimeout(()=>{watch()}, 1000);
        return () => {
            window.removeEventListener('scroll', handleFollow)
        }
    })
    
    return (
        <div className="border h-screen flex items-center justify-center flex-col mt-8 lg:mt-0">
            <Helmet>
                Diary | 400JA-DIARY
            </Helmet>
            <CreateDiary
                diaryInputHandler={diaryInputHandler}
                createDiaryHandle={createDiaryHandle}
                diaryStateInit={diaryStateInit}
                diaryValidCheck={diaryValidCheck}
            />
            <div className="w-full max-w-screen-lg flex flex-col px-5 items-center">

                <div className="w-full">
                    <div className="border">{
                        diaries.map((diaryContent) =>
                            <DiaryCompoenet diaryContent={diaryContent} key={diaryContent.id} />
                        )}
                    </div>
                </div>
                <button className="border " onClick={scrollTop}>맨위로</button>{/*맨 위 레이어로 빼서 오른쪽에 붙이기 */}
            </div>
        </div>
    )
};

export default Diary;