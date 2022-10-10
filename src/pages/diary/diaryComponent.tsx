import React from "react";
const DiaryComponent = (props: any) => {
    const diaryContent = props.diaryContent;
    //console.log(diaryContent.content.split('\n'))
    return (
        <div className="my-2 flex gap-1 flex-col justify-center items-center max-w-full px-1" >
            <div className="border flex w-10/12 justify-between items-center">
                <span className="mr-2">{diaryContent.subject}</span>
                <span>{diaryContent.date}</span>
            </div>
            <div className="flex border break-words w-10/12 min-h-min">
                <div className="h-44 w-0"></div>
                <div className="flex flex-col">
                {diaryContent.content.split('\n').map((textLine: string, i: number) => {
                    return <div className="text-left px-1" key={i}>{textLine}</div>
                })}
                </div>
            </div>
        </div>
    )
};

export default DiaryComponent;
