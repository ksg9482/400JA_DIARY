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
            console.log(findResult)
        const diaryForm = [...findResult.data];
        setFindResult(diaryForm)
        return diaryForm
    }
    
    return (
            
            <form id="searchForm-keyword" className="border flex flex-col px-2" action="">
                키워드검색
                <input className="border" type="text" onChange={inputHandle} placeholder="키워드를 입력해주세요"/>
                <button className="border" onClick={findByKeyword}>검색</button>
            </form>
    )
}

export default KeywordSearch