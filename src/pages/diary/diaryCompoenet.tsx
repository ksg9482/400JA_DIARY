import React from "react";
const DiaryCompoenet = (props:any) => {
    const diaryContent = props.diaryContent;
    return (
        <div className="border mb-2" >
            <div>{diaryContent.subject}</div>
            <div className="break-words">{diaryContent.content}</div>
        </div>
    )
};

export default DiaryCompoenet;
