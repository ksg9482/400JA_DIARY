import axios from "axios";
import React, { useEffect, useState } from "react";

const KeywordSearch = (props:any) => {
    const {setFindResult} = props;
    const [searchInput, setSearchInput] = useState('')
    const inputHandle = (e:React.ChangeEvent<HTMLInputElement>) => {
        setSearchInput(e.target.value);
    }
    const findByKeyword = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        const findResult = await axios.get(
            `http://localhost:8080/api/diary/search/keyword?keyword=${searchInput}`,
            { withCredentials: true }
            );
        const diaryForm = [...findResult.data.list];
        setFindResult({end:findResult.data.end, list:diaryForm});
        return diaryForm
    }
    
    return (
            
            <form id="searchForm-keyword" className=" flex flex-col px-2" action="">
                <div className="border">키워드검색</div>
                <input className="border" type="text" onChange={inputHandle} placeholder="키워드를 입력해주세요"/>
                <button className="border hover:bg-slate-300" onClick={findByKeyword}>검색</button>
            </form>
    )
}

export default KeywordSearch