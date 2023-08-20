import style from "../../css/ADMIN/userManage.module.css"
import axios from "axios";
import {useEffect, useState} from "react";
export default function UserManage(){

    const paging = "?"

    const [userInfo, setUserInfo] = useState([{}])

    useEffect(()=>{
        axios.get("/api/admin/manage/user")
            .then(res=>{
                setUserInfo(res.data)
            })
            .catch((e)=>{
                console.error(e)
            })
    },[])

    const toSearch=()=>{
        axios.get("")
            .then()
            .catch()
    }



    return(
        <>
            <div className={style.section}>{userInfo.map(el=>{
                return(
                    <p>{el.userId}</p>
                )
            })}</div>
        </>
    )
}