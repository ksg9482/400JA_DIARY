import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
const FindPasswordModal = (props: any) => {
    //유저 정보 삭제 페이지.
    const [emailInput, setEmailInput] = useState('');
    const [errorMessage,setErrorMessage] = useState('');
    const { modalHandle } = props;
    const nav = useNavigate()
    const passwordFindCancle = () => {
        modalHandle()
    }
    const inputHandle = (e:React.ChangeEvent<HTMLInputElement>) => {
        setEmailInput(e.target.value)
    }
    const passwordFindHandle = async (email:string) => {
        try {
            setErrorMessage('등록되지 않은 사용자 입니다.')
        const userLogin = await axios.post(
            `http://localhost:8080/api/auth/findPassword`,
            {email:email},
            { withCredentials: true }
          );
        console.log(userLogin)
        // modalHandle()
        // nav('/',{replace:true})
        } catch (error:any) {
            if(error.response.data.error === 'Password change fail') {
                setErrorMessage('임시 비밀번호 발급에 실패하였습니다.')
                return ;
            };
            return error;
        }
        
    }

    //일반가입이면 단순 데이터 삭제
    //소셜 로그인이면 소셜 끊기?
    //삭제하고 유저 정보 삭제되었다 알리기(이용에 감사드립니다 등)
    return (
        <div className="absolute bg-slate-400 h-full w-full bg-opacity-50 flex justify-center items-center">
            <div className="bg-white w-1/3 h-1/3  ">
                <div>
                    <div>
                        입력하신 이메일로 임시 비밀번호가 발송됩니다. 
                    </div>
                    <div>
                        로그인 후 반드시 비밀번호를 수정해 주세요.
                    </div>
                    <input type="text" placeholder="이메일" onChange={inputHandle}/>
                </div>
                    {errorMessage? errorMessage : <div>&nbsp;</div>}
                
                <div>
                    <button onClick={passwordFindCancle} >취소</button>
                    <button onClick={(e)=>passwordFindHandle(emailInput)} >비밀번호 찾기</button>
                </div>
            </div>


        </div>
    )
};

export default FindPasswordModal;