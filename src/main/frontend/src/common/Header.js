import style from "../css/Common/header.module.css"
import {Link, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import {getUserNumber} from "../js/getUserNumber";
import {useDispatch} from "react-redux";
import {modeRdc} from "../js/ThemeReducer";
import ThemeToggleBtn from "../js/ThemeToggleBtn";


export default function Header(props) {

    const [isLogin, setIsLogin] = useState(false)
    const [nickname, setNickname] = useState()
    const [userNumber, setUserNumber] = useState("0")
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleChange = (e) => {
        navigate(`/search?q=${e.target.value}`)
    }

    const handleClick = () => {
        navigate("/home/cart");
    }

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
                        window.location.href = "/home"
                        window.sessionStorage.clear()
                    }
                ).catch(e => {
                console.error(e)
                alert("잠시후에 다시 시도해주세요")
            })
        }
    }

    const themeChange = () => {

        const localStorage = window.localStorage
        const themeState = localStorage.getItem("theme");

        if (themeState === "0" || themeState === null) {
            localStorage.setItem("theme", "1");
        }
        if (themeState === "1")
            localStorage.setItem("theme", "0")

        dispatch(modeRdc())
    }


    return (
        <div style={props.style} className={style.container}>
            <div className={style.logo}>
                <Link to={"/home"}>BookVoyage</Link>
                <div onClick={themeChange}><ThemeToggleBtn/></div>
            </div>
            <div className={style.functionBox}>
                {isLogin ?
                    <div style={{display:"flex"}}>
                        <p>반갑습니다</p>
                        <p style={{marginLeft:"20px"}}>{nickname} 님</p>
                    </div> : ""}

                <button onClick={handleClick} className={style.cart}>
                    <i className="fa-solid fa-cart-shopping"></i>
                </button>

                <button onClick={myPage} className={style.myInfo}>
                    <i className="fa-solid fa-user-pen"></i>
                </button>

                <input name={"search"} type={"search"} className={style.search} placeholder={"search..."}
                       onChange={handleChange}/>
                <button className={style.signUp} onClick={signUp}>회원가입</button>
                {isLogin ?
                    <button className={style.logIn} onClick={logOut}>로그아웃</button> :
                    <button className={style.logIn} onClick={logIn}>로그인</button>
                }
            </div>
        </div>
    )
}