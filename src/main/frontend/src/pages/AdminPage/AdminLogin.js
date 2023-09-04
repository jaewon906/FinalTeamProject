import style from "../../css/ADMIN/adminLogin.module.css"
import {useEffect, useRef} from "react";
import axios from "axios";

export default function AdminLogin() {

    const adminId=useRef();
    const password=useRef();

    useEffect(()=>{
        axios.get("/api/admin/autoLogin", {})
            .then(()=>window.location.href="/admin/manage/")
            .catch(e=>console.error(e))
        document.getElementById("userOnly").remove()
    },[])

    const toLogin =() =>{
        axios.get("/api/admin/login", {
            params: {
                adminId:adminId.current.value,
                password:password.current.value
            }
        }).then(()=>{window.location.href="/admin/manage/"})
            .catch(()=>{alert("아이디나 비밀번호를 확인하세요")})
    }

    const onEnter = (e) => {
        if (e.keyCode === 13) {
            toLogin()
        }
    }

     return (
        <div className={style.container}>
            <div className={style.main}>
                <h2>관리자 페이지</h2>
                <div className={style.section}>
                    <div className={style.section_sub}>
                        <p>아이디</p>
                        <input onKeyDown={onEnter} type={"text"} ref={adminId}/>
                    </div>
                    <div className={style.section_sub}>
                        <p>비밀번호</p>
                        <input onKeyDown={onEnter} type={"password"} ref={password}/>
                    </div>
                </div>
                <button onClick={toLogin}>로그인</button>
            </div>
        </div>
    )
};