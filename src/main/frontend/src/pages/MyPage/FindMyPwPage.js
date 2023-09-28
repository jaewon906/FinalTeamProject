import style from "../../css/MyPage/findMyPwPage.module.css"
import {useRef, useState} from "react";
import axios from "axios";

export default function FindMyPwPage() {

    const email = useRef();
    const userId = useRef();
    const verificationCode = useRef();
    const [isEmailExist, setIsEmailExist] = useState(false);
    const [emailFromRepo, setEmailFromRepo] = useState("");
    const [idFromRepo, setIdFromRepo] = useState("");
    const [resetMyPw, setResetMyPw] = useState("");
    const [loading, setLoading] = useState(false)
    const setPassword=useRef();
    const confirmPassword=useRef()


    const sendEmail = () => {

        setLoading(true)

        axios.get(process.env.REACT_APP_DB_HOST+"/api/user/findMyInfo/byEmailAndId", {
            params: {
                userId : userId.current.value,
                userEmail: email.current.value
            }
        }).then((res) => {
            alert("인증번호가 전송되었습니다.")
            setIsEmailExist(true)
            setLoading(false)
            setEmailFromRepo(res.data[0])
            setIdFromRepo(res.data[1])
        })
            .catch(() => {
                alert("아이디 또는 이메일을 확인해주세요.")
                setLoading(false)
            })

    }

    const sendVerifyCode = () => {
        axios.get(process.env.REACT_APP_DB_HOST+"/api/user/findMyInfo/byEmailAndId/auth", {
            params: {
                userId:idFromRepo,
                userEmail: emailFromRepo,
                verificationCode: verificationCode.current.value
            }
        }).then((res) => {
            setResetMyPw(res.data)
            alert("인증이 완료되었습니다.")

        }).catch(()=>{
            alert("인증번호가 다릅니다.")
        })

    }

    const resetPassword = () => {

        if(setPassword.current.value === confirmPassword.current.value){
            axios.post(process.env.REACT_APP_DB_HOST+"/api/user/findMyInfo/resetAndModifyPassword",null,{
                params:{
                    userNumber:resetMyPw,
                    password:setPassword.current.value
                }
            }).then(()=>{
                alert("비밀번호 재설정이 완료되었습니다. 설정한 비밀번호로 로그인 해주세요")
                window.location.href="/home"
            }).catch(err=>{
                console.error(err)
                alert("비밀번호 양식을 확인해주세요.")
            })
        }
        else alert("비밀번호가 다릅니다.")
    }

    return (
        <div className={style.container}>
            { loading ? <div className={style.loading}></div>:
                (resetMyPw === "" ?<div className={style.box}>
                    <br/>
                    <br/>
                    <br/>
                    <h2>비밀번호를 잊어 버리셨나요?</h2><br/>
                    <p>저희가 도와 드리겠습니다.</p><br/>
                    <p>가입하신 아이디와 이메일을 입력하면 인증코드가 전송됩니다.</p><br/><br/>
                    <div className={style.main}>
                        <br/>
                        {isEmailExist ? <div style={{display:"flex", justifyContent:"center",width:"100%"}}><p style={{fontWeight:"bold"}}>{emailFromRepo}</p><br/><br/></div> : ""}
                        {isEmailExist ? <p style={{fontSize: "12px"}}>인증코드</p> : <p style={{fontSize: "12px"}}>아이디</p>}<br/>
                        {isEmailExist ? <input type={"text"} ref={verificationCode} placeholder={"Verification Code"}/> : ""}
                        {isEmailExist ? "" : <input style={{marginBottom:"20px"}} type={"text"} ref={userId} placeholder={"Your ID"}/>}
                        {isEmailExist ? "" : <p style={{fontSize: "12px"}}>이메일</p>}<br/>
                        {isEmailExist ? "" : <input type={"text"} ref={email} placeholder={"Your Email"}/>}
                        {isEmailExist ?
                            <button style={{marginTop:"50px", marginBottom:"100px"}} onClick={sendVerifyCode}>인증하기</button> :
                            <button style={{marginTop:"50px", marginBottom:"100px"}} onClick={sendEmail}>인증코드 전송하기</button>}
                    </div>
                </div>:
                <div className={style.box}>
                    <br/>
                    <br/>
                    <br/>
                    <h2>비밀번호 재설정</h2><br/><br/>
                    <div className={style.main}>
                        <p style={{fontSize: "12px"}}>비밀번호</p><br/>
                        <input style={{marginBottom:"20px"}} type={"password"} ref={setPassword} placeholder={"숫자 영문자 특수문자 포함 8~15글자"}/>
                        <p style={{fontSize: "12px"}}>비밀번호 확인</p><br/>
                        <input style={{marginBottom:"20px"}} type={"password"} ref={confirmPassword} placeholder={"입력한 비밀번호를 다시 입력 해주세요"}/>
                        <button style={{marginTop:"50px", marginBottom:"100px"}} onClick={resetPassword}>비밀번호 변경하기</button>
                    </div>
                </div>
                )
            }</div>
    )
};