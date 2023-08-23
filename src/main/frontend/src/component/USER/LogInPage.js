import style from "../../css/USER/logInPage.module.css"
import {Link} from "react-router-dom";
import {useRef} from "react";
import axios from "axios";


export default function LogInPage() {

    const userId = useRef();
    const password = useRef();
    let userState ;

    const toLogIn = () => {
        axios.get("/api/user/logIn", {
            params: {
                userId: userId.current.value,
                password: password.current.value
            }
        }).then((res) => {

                userState = res.data

                switch (userState) {
                    case true:

                        window.location.href = "/home";

                        break;

                    case false: {

                        const ret = window.confirm("휴면 계정입니다. 활동 계정으로 전환 하시겠습니까?")

                        if (ret) {
                            axios.post("/api/user/dormantAccount", null, {
                                params: {
                                    userId: userId.current.value,
                                }
                            }).then(() => {
                                axios.get("/api/user/logIn", {
                                    params: {
                                        userId: userId.current.value,
                                        password: password.current.value
                                    }
                                }).then(() => {
                                    alert("계정 전환이 완료되었습니다.")
                                    window.location.href = "/home"
                                })
                                    .catch(err => {
                                        console.error(err)
                                        alert("다시 시도해주세요")
                                    })
                            })
                                .catch(err => {
                                    console.error(err)
                                    alert("잠시후에 다시 시도해주세요.")
                                })

                        }
                    }
                        break;
                    case "": alert("블락된 계정입니다. 관리자에게 문의하세요")

                        break;
                    default:
                }
            }
        ).catch(err => {
            alert("아이디나 비밀번호를 확인하세요")
            console.error(err)
        })
    }

    const onEnter = (e) => {
        if (e.keyCode === 13) {
            toLogIn()
        }
    }

    return (
        <div className={style.container}>
            <div className={style.main}>
                <div className={style.leftSection}>
                    <div className={style.logInBox}>
                        <p style={{fontSize: "20px", fontWeight: "600"}}>로그인</p>
                        <input onKeyDown={onEnter} ref={userId} type={"text"} placeholder={"아이디"}/>
                        <input onKeyDown={onEnter} ref={password} type={"password"} placeholder={"패스워드"}/>
                        <button onClick={toLogIn} className={style.loginBtn}>로그인</button>

                        <div className={style.findPw}>
                            <p>아직 회원이 아니신가요?</p>
                            <Link to={"/home/signUp"}>회원가입 하기</Link>
                        </div>

                        <div className={style.findId}>
                            <p>아이디를 잊어버리셨나요?</p>
                            <Link to={"/home/findId"}>아이디 찾기</Link>
                        </div>

                        <div className={style.findPw}>
                            <p>비밀번호를 잊어버리셨나요?</p>
                            <Link to={"/home/findPw"}>비밀번호 찾기</Link>
                        </div>


                    </div>
                </div>
                <div className={style.rightSection}></div>
            </div>

        </div>
    )
}