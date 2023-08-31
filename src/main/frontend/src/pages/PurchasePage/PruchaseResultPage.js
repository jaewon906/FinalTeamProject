import style from "../../css/PurchasePage/purchseResultPage.module.css"
import axios from "axios";
export default function PurchaseResultPage() {

    axios.get("/api/user/purchase/")

    return(
        <div className={style.container}>
            <div className={style.main}>
                <h1 style={{letterSpacing:"3px", fontSize:"36px"}}>결제가 완료되었습니다.</h1>
            </div>
        </div>
    )
};