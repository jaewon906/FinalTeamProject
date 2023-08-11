import style from "../css/logInPage.module.css"
import {Link} from "react-router-dom";
import {useRef} from "react";
import axios from "axios";


export default function LogInPage() {

    const userId = useRef();
    const password = useRef();

    const toLogIn = () => {
        axios.get("api/user/logIn", {
            params: {
                userId: userId.current.value,
                password: password.current.value
            }
        }).then(() => {
            window.location.href="/"
            }
        ).catch(err=>{
            alert("아이디나 비밀번호를 확인하세요")
            console.error(err)
        })
    }

    return (
        <div className={style.container}>
            <div className={style.main}>
                <div className={style.leftSection}>
                    <div className={style.logInBox}>
                        <p style={{fontSize: "20px", fontWeight: "600"}}>로그인</p>
                        <input ref={userId} type={"text"} placeholder={"아이디"}/>
                        <input ref={password} type={"password"} placeholder={"패스워드"}/>
                        <button onClick={toLogIn} className={style.loginBtn}>로그인</button>
                        <div className={style.findId}>
                            <p>아이디를 잊어버리셨나요?</p>
                            <Link to={"/findId"}>아이디 찾기</Link>
                        </div>
                        <div className={style.findPw}>
                            <p>비밀번호를 잊어버리셨나요?</p>
                            <Link to={"/findId"}>비밀번호 찾기</Link>
                        </div>
                    </div>
                </div>
                <div className={style.rightSection}></div>
            </div>

        </div>
    )
}