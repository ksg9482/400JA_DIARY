import React from "react";
const DiaryComponent = (props:any) => {
    const diaryContent = props.diaryContent;
    return (
        <div className="border my-1 flex flex-col justify-center items-center max-w-full px-1" >
            <div className="border flex w-3/4 justify-between items-center">
                <span className="mr-2">{diaryContent.subject}</span>
                <span>{diaryContent.date}</span>
            </div>
            <div className="break-words w-full h-44 overflow-y-scroll">
                {diaryContent.content}
            </div>
        </div>
    )
};

export default DiaryComponent;
