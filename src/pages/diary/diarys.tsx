import React from "react";
import DiaryCompoenet from "./diaryCompoenet";
interface IdiaryContent {
    id: string;
    subject: string;
    content: string;
    date: string;
}
const Diarys = (props:any) => {
    
    const diaries = props.diaries
    //여러 일기의 컨테이너 컴포넌트.

    //일기 모아보기. map으로 뿌린다.
    //전체보기, 년별로 보기, 월별로 보기, 주별로 보기에도 같은 양식으로.
    return (
        <div className="border flex flex-col">{
            diaries.map((diaryContent:IdiaryContent) =>
                            <DiaryCompoenet diaryContent={diaryContent} key={diaryContent.id} />
                        )
        }</div>
    )
};

export default Diarys;