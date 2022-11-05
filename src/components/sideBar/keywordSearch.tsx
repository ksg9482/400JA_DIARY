import axios from "axios";
import config from "config";
import React, { useEffect, useState } from "react";

const KeywordSearch = (props: any) => {
    const { setFindResult } = props;
    const [searchInput, setSearchInput] = useState('');
    const [errorMessage, setErrorMessage] = useState('');


    const HOST = config.SERVER_HOST;
    const token: string = localStorage.getItem('jwt') ? localStorage.getItem('jwt')! : '';


    const inputHandle = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchInput(e.target.value);
    }
    const findByKeyword = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        if (!searchInput) {
            setErrorMessage('키워드를 입력하지 않았습니다.')
            return;
        }
        const findResult = await axios.get(
            `${HOST}/api/diary/search/keyword?keyword=${searchInput}`,
            { withCredentials: true, headers:{ Authorization: `Bearer ${token}` } }
        );
        const diaryForm = 0 < findResult.data.list.length
            ? [...findResult.data.list]
            : [{
                id: "",
                subject: "",
                content: "",
                date: "",
            }];
        setErrorMessage('');
        setFindResult({ end: findResult.data.end, list: diaryForm });
        return diaryForm
    }

    return (
        <form id="searchForm-keyword" className=" flex flex-col px-2" action="">
            <div className="border border-slate-500 flex flex-col">
                <div>키워드검색</div>
                <input className="border-y border-slate-500" type="text" onChange={inputHandle} placeholder="키워드를 입력해주세요" />
                <button className="hover:bg-slate-300" onClick={findByKeyword}>검색</button>
            </div>
            <div className="text-sm text-red-500 mt-1">{errorMessage}</div>
        </form>
    )
}

export default KeywordSearch