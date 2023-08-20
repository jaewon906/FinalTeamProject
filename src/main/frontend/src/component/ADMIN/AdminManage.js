import style from "../../css/ADMIN/adminManage.module.css";
import {useEffect, useState} from "react";
import axios from "axios";

export default function AdminManage(){

    const [isLoading, setIsLoading] = useState(false);
    const [totalMember,setTotalMember] = useState(0)
    let totalBooks = 0;
    let unreadCS = 0;

    useEffect(()=>{
        axios.get("/api/admin/manage")
            .then((res)=>{
                console.log(res.data[0])
                setTotalMember(res.data[0])
                setIsLoading(true)
            })
            .catch(()=>{
                alert("관리자 전용 페이지 입니다. 로그인 해주세요")
                window.location.href="/admin/login/"})
    })


    return(
        <>
            <div className={style.section1}>
                <div style={{display:"flex"}}>
                    <div onClick={()=>{window.location.href="user/"}} className={style.totalMember}>
                        <h3>총 가입 수</h3>
                        <h1>{totalMember}명</h1>
                    </div>
                    <div onClick={()=>{window.location.href="product/"}} className={style.totalProduct}>
                        <h3>총 권수</h3>
                        <h1>1권</h1>
                    </div>
                </div>
                <div onClick={()=>{window.location.href="CS/"}} style={{display:"flex"}}>
                    <div className={style.unreadCS}>
                        <h3>읽지 않은 문의사항</h3>
                        <h1>1개</h1>
                    </div>
                    <div className={style.comingSoon}>
                        <h1>준비중</h1>
                    </div>
                </div>
            </div>
        </>
    )
}