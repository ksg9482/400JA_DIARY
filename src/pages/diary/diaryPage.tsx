import React from "react";
import { Helmet } from "react-helmet-async";
const Diary = () => {
    //일기 생성, 일기 모아보기, 오늘 일기 페이지
    const fakeDiaries = [
        {
            id: 'a1',
            subject: '제목1',
            content: '하루 400자',
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
    return (
        <div className="border h-screen flex items-center justify-center flex-col mt-8 lg:mt-0">
            <Helmet>
                Diary | 400JA-DIARY
            </Helmet>
            <div className="w-full max-w-screen-lg flex flex-col px-5 items-center">
                <form className="border flex flex-col w-full mb-8">
                    <input className="border" type="text" placeholder="일기를 적어주세요" required />
                    <button className="border">일기 쓰기</button>
                </form>
                <div className="w-full">
                    <div className="border">{fakeDiaries.map((diaryContent) => {
                        return (
                            <div className="border" key={diaryContent.id}>
                                <div>{diaryContent.subject}</div>
                                <div>{diaryContent.content}</div>
                            </div>
                        )
                    })}</div>
                </div>
            </div>
        </div>
    )
};

export default Diary;