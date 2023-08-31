import {useEffect, useState} from "react";
import axios from "axios";
import style from "../../css/MyPage/orderListPage.module.css"
import {getUserNumber} from "../../js/getUserNumber";

export default function OrderListPage() {

    const [orderList, setOrderList] = useState([{}]);

    useEffect(() => {
        axios.get("/api/user/purchase/showAllOrders", {
            params: {
                userNumber: getUserNumber().userNumber
            }
        })
            .then(res => setOrderList(res.data))
            .catch(e => console.error(e))
    }, [])

    console.log(orderList)

    const convertToWon = (val, n) => {
        let flip = 0
        let temp = ""
        let result = ""

        try {

            if (n !== null) {
                let val1 = (val * n).toString()
                flip = val1.split("").reverse().join("")
            }
            if (n === null) flip = val.split("").reverse().join("")

            for (let i = 1; i <= flip.length; i++) {

                temp += flip.charAt(i - 1)
                if (i % 3 === 0 && i <= flip.length - 1) {
                    temp += ","
                }
            }

            result = temp.split("").reverse().join("")
        } catch (e) {

        }
        return result;
    }


    return (
        <div className={style.container}>
            <h1>주문내역</h1>
            <div className={style.main}>
                <div className={style.orderListsHeader}>
                    <div className={style.orderNumber}>주문번호</div>
                    <div className={style.orderName}>주문명</div>
                    <div className={style.customer}>주문자</div>
                    <div className={style.tel}>연락처</div>
                    <div className={style.addr}>배송지</div>
                    <div className={style.price}>금액</div>
                </div>
                {orderList.length !==0 ? orderList.map((el, idx) => {
                        let totalPrice = el.totalPrice
                        if (el.totalPrice !== undefined)
                            totalPrice = totalPrice.toString()

                        return (
                            <div key={idx} className={style.orderLists}>
                                <div className={style.orderNumber}>{el.orderNumber}</div>
                                <div className={style.orderName}>{el.orderName}</div>
                                <div className={style.customer}>{el.username}</div>
                                <div className={style.tel}>{el.userTel}</div>
                                <div className={style.addr}>{el.userAddress}</div>
                                <div className={style.price}>{convertToWon(totalPrice, null)}</div>
                            </div>
                        )
                    }) :
                    <div className={style.orderListsNotFound}>
                        <h1>텅</h1>
                    </div>
                }
            </div>
        </div>
    )
};