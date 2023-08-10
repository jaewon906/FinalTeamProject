import style from "../css/header.module.css"
import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";

export default function Header() {

    const [isLogin, setIsLogin] = useState(false)
    let userNumber="";

    useEffect(() => {
        const getCookie = (name) => {
            const value = "; " + document.cookie;
            const parts = value.split("; " + name + "=");
            if (parts.length === 2) {
                return parts.pop().split(";").shift();
            }
        }
        const parseJwt = (token) => {
            let base64Url = token.split('.')[1];
            let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            let jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            }).join(''));

            return JSON.parse(jsonPayload);
        };
        try {
           userNumber = parseJwt(getCookie("accessToken")).userNumber
            setIsLogin(true)
        } catch (e) {
            console.error(e)
        }
    }, [])

    const signUp = () => {
        window.location.href = "/signUp"
    }
    const logIn = () => {
        window.location.href = "/login"
    }
    const logOut = () => {
        const ret = window.confirm("로그아웃 하시겠습니까?")

        if (ret) {
            axios.get("api/user/logOut")
                .then(res => {
                        alert("로그아웃 되셨습니다.")
                    setIsLogin(false);
                    }
                ).catch(e=>{
                    console.error(e)
                    alert("잠시후에 다시 시도해주세요")
            })
        }
    }


    return (
        <div className={style.container}>
            <div className={style.logo}>
                <Link style={{color: "#45b751", textDecoration: "none"}} to={"/"}>KyoYesAla</Link>
            </div>
            <div className={style.functionBox}>
                <button className={style.cart}>
                    <img src="../../public/image/cart.png" alt={""}/>
                </button>
                <button className={style.myInfo}>
                    <img src="../" alt={""}/>
                </button>
                <input type={"search"} className={style.search} placeholder={"search..."}/>
                <button className={style.signUp} onClick={signUp}>SignUp</button>
                {isLogin ?
                    <button className={style.logIn} onClick={logOut}>LogOut</button> :
                    <button className={style.logIn} onClick={logIn}>LogIn</button>
                }
            </div>
        </div>
    )
}