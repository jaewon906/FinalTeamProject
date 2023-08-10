import style from "../css/header.module.css"
import {Link} from "react-router-dom";

const signUp = () => {
    window.location.href = "/signUp"
}
const logIn = () => {
    window.location.href = "/login"
}

export default function Header() {
    return (
        <div className={style.container}>
            <div className={style.logo}>
                <Link style={{color:"#45b751", textDecoration:"none"}} to={"/"}>KyoYesAla</Link>
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
                <button className={style.logIn} onClick={logIn}>LogIn</button>
            </div>
        </div>
    )
}