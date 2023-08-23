import style from "../../css/USER/modifyPasswordPage.module.css"
import {useRef, useState} from "react";
import axios from "axios";
import {getUserNumber} from "../../js/getUserNumber";

export default function ModifyPasswordPage() {

    const resetPassword = useRef();
    const confirmResetPassword = useRef();
    const [isPasswordMatch, setIsPasswordMatch] = useState(false)
    const updatePassword = () => {

        const ret = window.confirm("비밀번호를 변경하시겠습니까?")

        if (ret) {
            if (resetPassword.current.value === confirmResetPassword.current.value) {
                axios.post("/api/user/findMyInfo/resetAndModifyPassword", null, {
                    params: {
                        userNumber: getUserNumber().userNumber,
                        password: resetPassword.current.value
                    }
                }).then(() => {
                    alert("비밀번호 재설정이 완료되었습니다. 설정한 비밀번호로 로그인 해주세요")
                    window.location.href = "/home"
                }).catch(err => {
                    console.error(err)
                    alert("비밀번호 양식을 확인해주세요.")
                })
            } else alert("비밀번호가 다릅니다.")
        }
    }

    const verifyPassword = () => {
        if (resetPassword.current.value === confirmResetPassword.current.value) {
            setIsPasswordMatch(true)
        } else setIsPasswordMatch(false)
    }


    return (
        <div className={style.container}>
            <div className={style.box}>
                <br/>
                <br/>
                <br/>
                <h2>비밀번호 재설정</h2><br/><br/>
                <div className={style.main}>
                    <p style={{fontSize: "12px"}}>비밀번호</p><br/>
                    <input style={{marginBottom: "20px"}} onInput={verifyPassword} type={"password"} ref={resetPassword}
                           placeholder={"숫자 영문자 특수문자 포함 8~15글자"}/>
                    <p style={{fontSize: "12px"}}>비밀번호 확인</p><br/>
                    <input style={{marginBottom: "20px"}} onInput={verifyPassword} type={"password"}
                           ref={confirmResetPassword} placeholder={"입력한 비밀번호를 다시 입력 해주세요"}/>
                    {isPasswordMatch ? ((resetPassword.current.value !== "" && confirmResetPassword.current.value !== "") ?
                            <p style={{fontSize: "12px", color: "green", marginBottom: "20px"}}>암호가
                                동일합니다.</p> : "") :
                        <p style={{fontSize: "12px", color: "red", marginBottom: "20px"}}>암호가 일치하지 않습니다.</p>}
                    <button style={{marginTop: "50px", marginBottom: "100px"}} onClick={updatePassword}>비밀번호 변경하기
                    </button>
                </div>
            </div>

        </div>
    )
}