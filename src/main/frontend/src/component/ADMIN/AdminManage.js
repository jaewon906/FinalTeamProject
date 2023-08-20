import {useEffect, useState} from "react";
import axios from "axios";
import style from "../../css/ADMIN/adminManage.module.css";
export default function AdminManage() {

    const [isLoading, setIsLoading] = useState(false);

    useEffect(()=>{
        document.getElementById("userOnly").remove()
    },[])

    useEffect(()=>{
        axios.get("/api/admin/manage")
            .then(()=>{
                setIsLoading(true)
            })
            .catch(()=>{
                alert("관리자 전용 페이지 입니다. 로그인 해주세요")
            window.location.href="/admin/login/"})
    })

    return(<>

        {isLoading ? <div className={style.container}>
            <div className={style.leftSide}>
                <div className={style.logo}>
                    <h2>BookVoyage</h2>
                    <p>관리 페이지</p>
                </div>
                <div className={style.categories}>
                    <div onClick={()=>{window.location.href="user/"}} className={style.category}>고객 관리</div>
                    <div onClick={()=>{window.location.href="product/"}} className={style.category}>상품 관리</div>
                    <div onClick={()=>{window.location.href="CS/"}} className={style.category}>문의 관리</div>
                </div>
            </div>
            <div className={style.main}></div>
        </div>:""}
            </>
    )

}