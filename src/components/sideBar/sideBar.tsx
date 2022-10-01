import axios from "axios";
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearchLocation, faSearch } from "@fortawesome/free-solid-svg-icons";
import DateSearch from "./DateSearch";
import KeywordSearch from "./keywordSearch";

const SideBar = (props: any) => {
    const { setFindResult } = props;
    const [sideBarHandle, setSideBarHandle] = useState("fixed top-auto left-0 z-auto float-none overflow-auto w-64 h-full bg-slate-400 box-border web hidden")
    const constants = {
        keyWord: 'keyWord',
        date: 'date'
    }
    const [searchBox, setSearchBox] = useState(<KeywordSearch setFindResult={setFindResult} />)
    const searchBoxChange =
        (key: string) => (e: React.MouseEvent<HTMLSpanElement>) => {
            if (key === constants.keyWord) {
                if (document.getElementById('searchForm-keyword')) {
                    return;
                }
                document.getElementById('searchbox-keyword')?.classList.toggle('border-slate-600')
                document.getElementById('searchbox-date')?.classList.toggle('border-slate-600')
                setSearchBox(<KeywordSearch setFindResult={setFindResult} />)
                return;
            }
            if (key === constants.date) {
                if (document.getElementById('searchForm-date')) {
                    return;
                }
                document.getElementById('searchbox-keyword')?.classList.toggle('border-slate-600')
                document.getElementById('searchbox-date')?.classList.toggle('border-slate-600')
                setSearchBox(<DateSearch setFindResult={setFindResult} />)
                return;
            }
        }
    // 키워드 검색
    // 날짜로 찾기
    // 열기-접기 기능
    /*
    선택: 키워드 / 날짜
    */
    //하이드 버튼을 눌러서 넣고 빼고 할 수 있게
    const sideBarHandler = () => {
        console.log(document.getElementById('sideBar'));
        document.getElementById('sideBar')?.classList.toggle('hidden')
        document.getElementById('sidebar-hide-button')?.classList.toggle('left-56')
        document.getElementById('sidebar-hide-button')?.classList.toggle('rounded-r-md')
        document.getElementById('sidebar-hide-button')?.classList.toggle('rounded-l-md')
        document.getElementById('sidebar-hide-button')?.classList.toggle('border-l-2')
        document.getElementById('sidebar-hide-button')?.classList.toggle('border-l-slate-600')
    }
    return (
        <div className="flex w-full">
            <aside id='sideBar' className="fixed top-auto left-0 z-auto float-none overflow-auto w-64 h-full border-2 border-slate-500 bg-slate-400 box-border hidden">
                <div className="pt-14 pb-28 flex justify-center">
                    <button id="searchbox-keyword" className="border hover:bg-slate-300 border-slate-600 mr-3" onClick={searchBoxChange(constants.keyWord)}>키워드 검색</button>
                    <button id="searchbox-date" className="border hover:bg-slate-300" onClick={searchBoxChange(constants.date)}>날짜 검색</button>
                </div>
                <div>
                    {searchBox}
                </div>
            </aside>
            <button id="sidebar-hide-button" className="fixed top-96 z-auto inline-block w-8 h-24 border-t-2 border-b-2 border-r-2 border-t-slate-600 border-b-slate-600 border-r-slate-600 rounded-r-md outline-none hover:bg-slate-300 bg-slate-400" onClick={sideBarHandler}> 
            <FontAwesomeIcon icon={faSearch} size='1x'></FontAwesomeIcon>
            </button>
        </div>
    )
}

export default SideBar