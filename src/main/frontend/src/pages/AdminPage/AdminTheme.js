import {useEffect} from "react";
import style from "../../css/ADMIN/adminManage.module.css";
import axios from "axios";

export default function AdminTheme(props) {

    useEffect(() => {

        const a = document.getElementById("userOnly")

        if(a!==null){
        a.remove()
        }

    }, [])

    const logout = () => {

        const ret = window.confirm("로그아웃 하시겠습니까?")

        if (ret) {

            axios.get(process.env.REACT_APP_DB_HOST+"/api/user/logOut")
                .then(() => {
                    alert("로그아웃 되셨습니다.")
                    window.location.href = "/admin/login"
                })
        }
    }


    return (<>
            <div className={style.container}>
                <div className={style.leftSide}>
                    <div className={style.logo}>
                        <h2 style={{cursor: "pointer", fontWeight: "bolder"}} onClick={() => {
                            window.location.href = "/admin/manage"
                        }}>BookVoyage</h2>
                        <p>관리 페이지</p>
                    </div>
                    <div className={style.categories}>
                        <div onClick={() => {
                            window.location.href = "/admin/manage/user"
                        }} className={style.category}>고객 관리
                        </div>
                        <div onClick={() => {
                            window.location.href = "/admin/manage/order"
                        }} className={style.category}>주문 관리
                        </div>
                        <div onClick={() => {
                            window.location.href = "/admin/manage/product"
                        }} className={style.category}>상품 관리
                        </div>
                        <p onClick={logout} style={{marginTop: "300px", cursor: "pointer"}}>로그아웃</p>
                    </div>
                </div>
                <div className={style.main}>
                    {props.page}
                </div>
            </div>
        </>)

}