import axios from "axios";
import React, { useState } from "react";

interface IpasswordInputObj {
    password: string;
    passwordChange: string;
}

const PasswordChangeModal = (props: any) => {
    //유저 정보 삭제 페이지.
    const [passwordInputObj, setPasswordInputObj] = useState({
        password: "",
        passwordChange: "",
    });
    const [validCheck, setValidCheck] = useState({
        password: false,
    });
    const [errorMessage, setErrorMessage] = useState('');
    const { modalHandle } = props;

    const passwordFindCancle = () => {
        modalHandle()
    }
    const inputHandle =
        (key: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
            setPasswordInputObj({ ...passwordInputObj, [key]: e.target.value });
        };

    const emptyCheck = () => {
        if (passwordInputObj.password === '' || passwordInputObj.passwordChange === '') {
            return { message: '각 항목을 채워주세요.' }
        }
        // if(passwordInputObj.password !== passwordInputObj.passwordCheck) {
        //   return {message:'비밀번호와 비밀번호 확인이 같지 않습니다.'}
        // }
        return false;
    }

    const passwordChangeHandle = async (passwordInputObj: IpasswordInputObj) => {
        const check = emptyCheck()
        if (check) {
            console.log(check)
            setErrorMessage(check.message)
            return;
        }

        // validCheckHandle(passwordInputObj);
        // if(!validCheck) {
        //     return ;
        // }
        const body = passwordInputObj
        const passwordChange: any = await axios.patch(
            `http://localhost:8080/api/user/password`,
            body,
            { withCredentials: true }
        );
        console.log(passwordChange)
        if (passwordChange.status !== 200) {
            setErrorMessage('비밀번호 변경에 실패했습니다.')
            return;
        }
        modalHandle()
    }

    return (
        <div className="fixed bg-slate-400 h-full w-full bg-opacity-50 flex justify-center items-center">
            <div className="bg-white w-1/3 h-1/3 ">
                <div className="mb-6">
                    <div className="mb-6 px-1">
                        비밀번호를 변경합니다.
                    </div>
                    <div className="flex flex-col mt-6">
                        <div className="flex justify-between items-center mt-6 px-1">
                            <span>비밀번호</span>
                            <input className="w-3/4 border" type="password" placeholder="Password" onChange={inputHandle("password")} />
                        </div>
                        <div className="flex justify-between items-center mt-6 px-1">
                            <span className="">비밀번호 변경</span>
                            <input className="w-3/4 border" type="password" placeholder="Password Change" onChange={inputHandle("passwordChange")} />
                        </div>
                    </div>
                </div>
                {errorMessage ? errorMessage : <div>&nbsp;</div>}

                <div>
                    <button className="mr-6" onClick={passwordFindCancle} >취소</button>
                    <button onClick={(e) => passwordChangeHandle(passwordInputObj)} >비밀번호 변경</button>
                </div>
            </div>


        </div>
    )
};

export default PasswordChangeModal;