import axios from "axios";
import config from "config";
import React, { useEffect, useState } from "react";

const DateSearch = (props: any) => {
    const { setFindResult } = props;
    const [errorMessage, setErrorMessage] = useState('');
    
    const HOST = config.SERVER_HOST;

    const now = new Date().toISOString().split('T')[0];
    const token: string = localStorage.getItem('accessToken') ? localStorage.getItem('accessToken')! : '';
    const refreshToken:string = localStorage.getItem('refreshToken') ? localStorage.getItem('refreshToken')! : '';

    const findByDate = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        const targetDate: any = document.getElementById('date-search');
        if (!targetDate.value) {
            setErrorMessage('날짜를 입력하지 않았습니다.')
            return ;
        };
        
        const findResult = await axios.get(
            `/diary/search/date?date=${targetDate.value}`
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
        <form id="searchForm-date" className="flex flex-col px-2">
            <div className="border border-slate-500 flex flex-col">
                <div>날짜 검색</div>
                <input className="border-y border-slate-500" type="date" id="date-search" min={"2022-01-01"} max={now} />
                <button className="hover:bg-slate-300" onClick={findByDate}>검색</button>
            </div>
            <div className="text-sm text-red-500  mt-1">{errorMessage}</div>
        </form>
    )
}

export default DateSearch