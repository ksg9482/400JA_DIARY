import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
const Diary = () => {
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
    const [diaryInputForm, setDiaryInputForm] = useState('');
    const [scrollY, setScrollY] = useState(0);
    const [btnStatus, setBtnStatus] = useState(false);

    const createDiaryHandle = (e:React.MouseEvent<HTMLButtonElement>) => async() => {
        e.preventDefault();
        // create 보내기
        // 새로 일주일치 적용해서 캐시에 넣고 뿌리기

    }

    const handleFollow = () => {
        setScrollY(window.pageYOffset);
        if(scrollY > 100) {
          // 100 이상이면 버튼이 보이게
          setBtnStatus(true);
        } else {
          // 100 이하면 버튼이 사라지게
          setBtnStatus(false);
        }
      }

    const scrollTop = (e:React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: "smooth"
          });
          setScrollY(0);  // ScrollY 의 값을 초기화
          setBtnStatus(false); // BtnStatus의 값을 false로 바꿈 => 버튼 숨김
    }

    useEffect(() => {
        const watch = () => {
          window.addEventListener('scroll', handleFollow)
        }
        watch();
        return () => {
          window.removeEventListener('scroll', handleFollow)
        }
      })

    return (
        <div className="border h-screen flex items-center justify-center flex-col mt-8 lg:mt-0">
            <Helmet>
                Diary | 400JA-DIARY
            </Helmet>
            <div className="w-full max-w-screen-lg flex flex-col px-5 items-center">
                <form className="border flex flex-col w-full mb-8">
                    <input className="border" type="text" placeholder="일기를 적어주세요" required />
                    <button className="border" onClick={createDiaryHandle}>일기 쓰기</button>
                </form>
                <div className="w-full">
                    <div className="border">{fakeDiaries.map((diaryContent) => {
                        return (
                            <div className="border mb-2" key={diaryContent.id}>
                                <div>{diaryContent.subject}</div>
                                <div className="break-words">{diaryContent.content}</div>
                            </div>
                        )
                    })}</div>
                </div>
                <button className="border " onClick={scrollTop}>맨위로</button>{/*맨 위 레이어로 빼서 오른쪽에 붙이기 */}
            </div>
        </div>
    )
};

export default Diary;