import axios from "axios";
import React, { useEffect, useState } from "react";

const DateSearch = (props:any) => {
    const {setFindResult} = props;
    const now = new Date().toISOString().split('T')[0]//.split('-').map((str) => { return parseInt(str) })
    // const createDateList = (now: any) => {
    //     const nowYear = now[0];
    //     const nowMonth = now[1];
    //     const nowDay = now[2];
    //     //while 돌리면서 -1씩? 31부터 1까지 돌리면 날짜 배열 얻을 수 있다.
    //     const dateLists = {}
    //     return;
    // }
    const findByDate = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        const targetDate:any = document.getElementById('date-search')
        //diary/search/date?date=2022-08-09
        const findResult = await axios.get(
            `http://localhost:8080/api/diary/search/date?date=${targetDate.value}`,
            { withCredentials: true }
            );
            const diaryForm = [...findResult.data.list];
            setFindResult({end:findResult.data.end, list:diaryForm});
        return diaryForm
    }

    //createDateList(now)
    return (
        <form id="searchForm-date" className="border flex flex-col px-2">
            날짜 검색
            <input className="border" type="date" id="date-search" min={"2022-01-01"} max={now}/>
            <button className="border" onClick={findByDate}>검색</button>
        </form>
    )
}

export default DateSearch