import style from "../../css/USER/header.module.css"
import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import {getUserNumber} from "../../js/getUserNumber";

export default function Header() {

    const [isLogin, setIsLogin] = useState(false)
    const [nickname, setNickname] = useState()
    const [userNumber, setUserNumber] = useState("0")

    useEffect(() => {
        setUserNumber(getUserNumber().userNumber);

        if (userNumber !== "0" && userNumber !== undefined) {
            setIsLogin(true);
            setNickname(getUserNumber().username)

        } else setIsLogin(false);

    }, [userNumber])

    const myPage = () => {

        axios.get("/api/user/myPage", {
            params: {
                userNumber: userNumber
            }
        })
            .then(() => {
                window.location.href = "/home/myPage"
            })
            .catch(err => {
                console.error(err);
                const ret = window.confirm("로그인이 필요한 서비스입니다. 로그인 하시겠습니까?")

                if (ret) {
                    window.location.href = "/home/logIn"
                }
            })
    }
    const signUp = () => {
        window.location.href = "/home/signUp"
    }
    const logIn = () => {
        window.location.href = "/home/logIn"
    }
    const logOut = () => {
        const ret = window.confirm("로그아웃 하시겠습니까?")

        if (ret) {
            axios.get("/api/user/logOut")
                .then(() => {
                        alert("로그아웃 되셨습니다.")
                        setIsLogin(false);
                        window.location.href="/home"
                    }
                ).catch(e => {
                console.error(e)
                alert("잠시후에 다시 시도해주세요")
            })
        }
    }


    return (
        <div className={style.container}>
            <div className={style.logo}>
                <Link style={{color: "#45b751", textDecoration: "none"}} to={"/"}>BookVoyage</Link>
            </div>
            <div className={style.functionBox}>
                {isLogin ? <p style={{fontSize: "14px"}}>반갑습니다 <strong>{nickname}</strong> 님</p> : ""}
                <button className={style.cart}>
                    <img src="../../../public/image/cart.png" alt={""}/>
                </button>
                <button onClick={myPage} className={style.myInfo}>
                    <img src="../.." alt={""}/>
                </button>
                <input name={"search"} type={"search"} className={style.search} placeholder={"search..."}/>
                <button className={style.signUp} onClick={signUp}>SignUp</button>
                {isLogin ?
                    <button className={style.logIn} onClick={logOut}>LogOut</button> :
                    <button className={style.logIn} onClick={logIn}>LogIn</button>
                }
            </div>
        </div>
    )
}