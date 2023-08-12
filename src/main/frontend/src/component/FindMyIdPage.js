import style from "../css/findMyIdPage.module.css"
import {useRef, useState} from "react";
import axios from "axios";

export default function FindMyIdPage() {

    const email = useRef();
    const verificationCode = useRef();
    const [myId, setMyId] = useState("");
    const [isEmailExist, setIsEmailExist] = useState(false);
    const [emailFromRepo, setEmailFromRepo] = useState("");


    const sendEmail = () => {

        axios.get("/api/user/findMyInfo/byEmail", {
            params: {
                userEmail: email.current.value
            }
        }).then((res) => {
            alert("인증번호가 전송되었습니다.")
            setIsEmailExist(true)
            setEmailFromRepo(res.data[0])
        })
            .catch(() => {
            alert("이메일이 존재하지 않습니다.")
        })

    }

    const sendVerifyCode = () => {
        axios.get("api/user/findMyInfo/byEmail/auth", {
            params: {
                userEmail: emailFromRepo,
                verificationCode: verificationCode.current.value
            }
        }).then(res => {
            alert("인증이 완료되었습니다.")
            setMyId(res.data)
        }).catch(()=>{
            alert("인증번호가 다릅니다.")
        })

    }

    return (
        <div className={style.container}>
            {myId === "" ?<div className={style.box}>
                <br/>
                <br/>
                <br/>
                <h2>아이디를 잊어 버리셨나요?</h2><br/>
                <p>저희가 도와 드리겠습니다.</p><br/>
                <p>본인이 가입하신 이메일을 입력하면 인증코드가 전송됩니다.</p><br/><br/>
                <div className={style.main}>
                    <br/>
                    {isEmailExist ? <div style={{display:"flex", justifyContent:"center",width:"100%"}}><p style={{fontWeight:"bold"}}>{emailFromRepo}</p></div> : ""}<br/><br/>
                    {isEmailExist ? <p style={{fontSize: "12px"}}>인증코드</p> : <p style={{fontSize: "12px"}}>이메일</p>}<br/>
                    {isEmailExist ? <input type={"text"} ref={verificationCode} placeholder={"Verification Code"}/> : ""}
                    {isEmailExist ?
                        "" :
                        <input type={"text"} ref={email} placeholder={"ploi9@example.com"}/> }
                    {isEmailExist ?
                        <button onClick={sendVerifyCode} className={style.sendVerificationBtn}>인증하기</button> :
                        <button onClick={sendEmail} className={style.sendVerificationBtn}>인증코드 전송하기</button>}
                </div>
            </div>:
            <div className={style.box}>
                <p>고객님의 ID는 <strong>{myId}</strong> 입니다.</p>
                <button onClick={()=> window.location.href="/"}>홈으로 가기</button>
                <button onClick={() => {window.location.href="/findMyPw"}}></button>
            </div>}
        </div>
    )
};