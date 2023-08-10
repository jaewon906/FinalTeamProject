import style from "../css/logInPage.module.css"
import {Link} from "react-router-dom";


export default function LogInPage() {
    return (
        <div className={style.container}>
            <div className={style.main}>
                <div className={style.leftSection}>
                    <div className={style.logInBox}>
                        <p style={{fontSize:"20px", fontWeight:"600"}}>로그인</p>
                        <input placeholder={"아이디"}/>
                        <input placeholder={"패스워드"}/>
                        <button className={style.loginBtn}>로그인</button>
                        <div className={style.findId}>
                            <p>아이디를 잊어버리셨나요?</p>
                            <Link to={"/findId"}>아이디 찾기</Link>
                        </div>
                        <div className={style.findPw}>
                           <p>비밀번호를 잊어버리셨나요?</p>
                            <Link to={"/findId"}>비밀번호 찾기</Link>
                        </div>
                    </div>
                    <div className={style.copyright}></div>
                </div>
                <div className={style.rightSection}></div>
            </div>
        </div>
    )
}