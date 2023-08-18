import style from "../../css/ADMIN/adminLogin.module.css"
import {useEffect} from "react";
import axios from "axios";

export default function AdminLogin() {

    useEffect(()=>{
        document.getElementById("userOnly").remove()
    },[])

    const toLogin =() =>{
        axios.get("",{
            params:{

            }
        })
    }

    return (
        <div className={style.container}>
            <div className={style.main}>
                <h2>관리자 페이지</h2>
                <div className={style.section}>
                    <div className={style.section_sub}>
                        <p>아이디</p>
                        <input type={"text"}/>
                    </div>
                    <div className={style.section_sub}>
                        <p>비밀번호</p>
                        <input type={"password"}/>
                    </div>
                </div>
                <button onClick={toLogin}>로그인</button>
            </div>
        </div>
    )
};