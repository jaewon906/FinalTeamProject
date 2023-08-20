import {useEffect, useState} from "react";
import axios from "axios";
import style from "../../css/ADMIN/adminManage.module.css";
import AdminManage from "./AdminManage";
export default function AdminTheme(props) {

    useEffect(()=>{
        document.getElementById("userOnly").remove()
    },[])

    return(
        <>
       <div className={style.container}>
            <div className={style.leftSide}>
                <div className={style.logo}>
                    <h2>BookVoyage</h2>
                    <p>관리 페이지</p>
                </div>
                <div className={style.categories}>
                    <div onClick={()=>{window.location.href="/admin/manage/user/"}} className={style.category}>고객 관리</div>
                    <div onClick={()=>{window.location.href="/admin/manage/product/"}} className={style.category}>상품 관리</div>
                    <div onClick={()=>{window.location.href="/admin/manage/CS/"}} className={style.category}>문의 관리</div>
                </div>
            </div>
           <div className={style.main}>
               {props.page}
           </div>
        </div>
            </>
    )

}