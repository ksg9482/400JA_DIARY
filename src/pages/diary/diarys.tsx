import React from "react";
import DiaryCompoenet from "./diaryComponent";
interface DiaryContent {
  id: string;
  subject: string;
  content: string;
  date: string;
}
const Diarys = (props: any) => {
  const diaries = props.diaries;
  if (diaries.length <= 0) {
    diaries.push({
      id: ' ',
      subject: ' ',
      content: ' ',
      date: ' '
    });
  };
  
  return (
    <div className="border-2 border-[#855958] my-11 flex flex-col bg-white rounded-md">
      {diaries.map((diaryContent: DiaryContent) => (
        <DiaryCompoenet diaryContent={diaryContent} key={diaryContent.id} />
      ))}

    </div>
  );
};

export default Diarys;
