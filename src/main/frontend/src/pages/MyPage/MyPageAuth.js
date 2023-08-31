import axios from "axios";
import {useRef, useState} from "react";
import {getUserNumber} from "../../js/getUserNumber";
import style from "../../css/MyPage/myPageAuth.module.css"
import MyPageAndModifyPasswordPage from "./MyPageAndModifyPasswordPage";


export default function MyPageAuth() {

    const [myInfo, setMyInfo] = useState({});
    const password = useRef();
    const [myInfoAuthentication, setMyInfoAuthentication] = useState(false)




    const getMyInfo = () => {

        axios.get("/api/user/myPage", {
            params: {
                userNumber: getUserNumber().userNumber
            }
        })
            .then(res => {

                setMyInfo(res.data);
            })
            .catch(err => {

                console.error(err);
                const ret = window.confirm("로그인이 필요한 서비스입니다. 로그인 하시겠습니까?")

                if (ret) {
                    window.location.href = "/logIn"
                }
            })
    }


    const authenticateToSeeMyInfo = () => {

        axios.get("/api/user/myPage/auth", {
            params: {
                userNumber: getUserNumber().userNumber, password: password.current.value
            }
        }).then((res) => {
            setMyInfoAuthentication(res.data)
            getMyInfo()
        }).catch(e => {
            alert("비밀번호를 확인해주세요")
            console.error(e)
        })
    }



    const onEnter = (e) => {
        if (e.keyCode === 13) {
            authenticateToSeeMyInfo()
        }
    }


    return (
        <div className={style.container}>
            {myInfoAuthentication ?
                <MyPageAndModifyPasswordPage userInfo={myInfo}/> :
                <div className={style.main}>
                    <h2 style={{marginTop: "50px"}}>회원 정보 수정</h2>
                    <p style={{margin: "50px 0 50px 0"}} className={style.notification}>회원님의 비밀번호를 입력해주세요</p>
                    <input onKeyDown={onEnter} type={"password"} ref={password} placeholder={"비밀번호를 입력하세요"}/>
                    <button onClick={authenticateToSeeMyInfo}>제출하기</button>
                </div>
            }
        </div>)
}