import {useEffect, useState} from "react";
import axios from "axios";
import style from "../../css/ADMIN/adminManage.module.css";
export default function AdminManage() {

    const [isLoading, setIsLoading] = useState(false);
    const [totalMember,setTotalMember] = useState(0)
    let totalBooks = 0;
    let unreadCS = 0;

    useEffect(()=>{
        document.getElementById("userOnly").remove()
    },[])

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
            <div className={style.main}>
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
            </div>
        </div>:""}
            </>
    )

}