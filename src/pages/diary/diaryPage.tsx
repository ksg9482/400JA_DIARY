import React from "react";
const Diary = () => {
    //일기 생성, 일기 모아보기, 오늘 일기 페이지
    const fakeDiaries = [
        {
            id: 'a1',
            content: '하루 400자',
            createAt: '2022-07-29T13:03:33.020Z'
        },
        {
            id: 'b2',
            content: '매일쓰면 좋은 일기',
            createAt: '2022-07-29T13:04:33.020Z'
        },
        {
            id: 'c3',
            content: '일기장을 뒤적이지 않아도 되는 일기',
            createAt: '2022-07-29T13:05:33.020Z'
        },
    ]
    //오늘의 일기(위)
    //일기 컨테이너(아래)
    return (
        <div>
            <form>
                <input type="text" placeholder="일기를 적어주세요" required/>
                <button>일기 쓰기</button>
            </form>
            <div>
                diaries container
                <div>{fakeDiaries.map((diaryContent)=>{return(
                    <div key={diaryContent.id}>
                        <div>{diaryContent.content}</div>
                    </div>
                )})}</div>
            </div>
        </div>
    )
};

export default Diary;