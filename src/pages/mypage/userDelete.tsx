import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
const UserDeleteModal = (props: any) => {
    //유저 정보 삭제 페이지.
    const [passwordInput, setPasswordInput] = useState('');
    const { modalHandle } = props;
    const nav = useNavigate()
    const userDeleteCancle = () => {
        modalHandle()
    }
    const inputHandle = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPasswordInput(e.target.value)
    }
    const userDeleteHandle = async () => {
        const userDeleteSequence = async () => {
            const passwordCheck: any = await axios.post(
                `http://localhost:8080/api/user/valid`,
                { password: passwordInput },
                { withCredentials: true }
            );
            if (passwordCheck.data !== true) {
                throw new Error('Invalid Password')
            }
            const userdelete: any = await axios.delete(
                `http://localhost:8080/api/user`,
                { withCredentials: true }
            );

            return 'userDelete';
        }
        await userDeleteSequence()
        modalHandle()
        nav('/', { replace: true })
        location.reload()
    }

    //일반가입이면 단순 데이터 삭제
    //소셜 로그인이면 소셜 끊기?
    //삭제하고 유저 정보 삭제되었다 알리기(이용에 감사드립니다 등)
    return (
        <div className="fixed bg-slate-400 h-full w-full bg-opacity-50 flex justify-center items-center">
            <div className="bg-white w-1/3 h-1/3 min-w-min max-w-sm">
            <div className="flex">
                    <div className="w-56"></div>
                </div>
                <div className="mb-6">
                    <div className="mb-6 px-1">
                        400JA-DIARY 회원을 탈퇴하시면 모든 유저정보가 삭제되고 복구할 수 없습니다. 회원을 탈퇴하시겠습니까?
                    </div>
                    <div className="mb-6 px-1">
                        최종 확인을 위해 비밀번호를 입력해 주세요.
                    </div>
                    <div className="flex justify-center items-center mt-6">
                        <span className="mr-3">비밀번호</span>
                        <input className="border w-3/4" type="password" placeholder="비밀번호" onChange={inputHandle} /></div>
                    </div>
                <div>
                    <button className="mr-6 hover:bg-slate-200" onClick={userDeleteCancle} >취소</button>
                    <button className="border-2 rounded-md border-white hover:border-red-500" onClick={userDeleteHandle} >회원탈퇴</button>
                </div>
            </div>


        </div>
    )
};

export default UserDeleteModal;