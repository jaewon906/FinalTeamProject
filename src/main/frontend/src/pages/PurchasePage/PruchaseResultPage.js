import style from "../../css/PurchasePage/purchseResultPage.module.css"
import axios from "axios";
import {useParams} from "react-router-dom";
import {useEffect} from "react";
export default function PurchaseResultPage() {

    const urlSearchParams = new URLSearchParams(window.location.search);
    const orderNumber = urlSearchParams.get('userNumber');
    console.log(orderNumber)

    // useEffect(()=>{
    //
    //     axios.get("/api/user/purchase/result?")
    //         .then()
    //         .catch()
    // },[])

    return(
        <div className={style.container}>
            <div className={style.main}>
                <h1 style={{letterSpacing:"3px", fontSize:"36px"}}>결제가 완료되었습니다.</h1>
            </div>
        </div>
    )
};