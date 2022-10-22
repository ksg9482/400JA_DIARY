import React from "react";

const DiaryComponent = (props: any) => {
    const diaryContent = props.diaryContent;
    const dateArr = diaryContent.date.split('-');
    const isEmpty = (diaryContent: any) => {
        return diaryContent.id.length <= 0 && diaryContent.subject.length <= 0 && diaryContent.content.length <= 0 && diaryContent.date.length <= 0;
    }

    const EmptyDiaryComponent = () => {
        return (
            <div className="my-2 mx-1 flex gap-2 flex-row  justify-center w-full px-1">
                <div>
                    작성한 다이어리가 없습니다.
                </div>
            </div>
        )
    };
    return (
        <div>
            {isEmpty(diaryContent)
                ? <EmptyDiaryComponent />
                : <div className="my-2 mx-1 flex gap-2 flex-row  justify-center w-full px-1">
                    <span className="flex flex-col justify-center items-center w-16 mt-2 h-14 border">
                        <span className="text-xs">{dateArr[0]}</span>
                        <div className="text-lg text-center whitespace-nowrap">
                            <span>{dateArr[1]}</span> / <span>{dateArr[2]}</span>
                        </div>
                    </span>
                    <div className="my-2 flex gap-1 flex-col w-10/12 px-1" >
                        <div className="border flex w-full justify-between items-center">
                            <div className="mr-2">{diaryContent.subject === " " ? "　" : diaryContent.subject}</div>
                        </div>
                        <div className="flex border break-words w-full min-h-min">
                            <div className="h-44 w-0"></div>
                            <div className="flex flex-col w-full">
                                {diaryContent.content.split('\n').map((textLine: string, i: number) => {
                                   
                                    if (textLine.length <= 0) {
                                        return <div className="text-left px-1" key={i}>&nbsp;</div>
                                    }

                                    return <div className="text-left px-1" key={i}>{textLine}</div>
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            }

        </div>
    )
};

export default DiaryComponent;
