import style from "../../css/ADMIN/adminLogin.module.css"
import {useEffect} from "react";

export default function AdminLogin() {

    useEffect(()=>{
        document.getElementById("userOnly").remove()
    })

    return (
        <div className={style.container}>
            <div className={style.main}></div>
        </div>
    )
};