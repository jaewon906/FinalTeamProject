import {useEffect, useState} from "react";
import axios from "axios";
import style from "../../css/MyPage/orderListPage.module.css"
import {getUserNumber} from "../../js/getUserNumber";
import convertToWon from "../../js/convertToWon";
import {Link} from "react-router-dom";


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


    return (
        <div className={style.container}>
            <h1>주문내역</h1>
            <div className={style.main}>
                <div className={style.orderListsHeader}>
                    <div className={style.orderNumber}>주문번호</div>
                    <div className={style.orderName}>주문명</div>
                    <div className={style.customer}>주문자</div>
                    <div className={style.addr}>배송지</div>
                    <div className={style.price}>금액</div>
                    <div className={style.orderState}>주문상태</div>
                </div>
                {orderList.length !==0 ? orderList.map((el, idx) => {
                        let totalPrice = el.totalPrice
                        if (el.totalPrice !== undefined)
                            totalPrice = totalPrice.toString()

                        return (
                            <div key={idx} className={style.orderLists}>
                                <div className={style.orderNumber}>
                                    <Link style={{color:"#ff2768"}} to={`orderDetail/order?orderNumber=${el.orderNumber}`}>{el.orderNumber}</Link>
                                </div>
                                <div className={style.orderName}>{el.orderName}</div>
                                <div className={style.customer}>{el.username}</div>
                                <div className={style.addr}>{el.userAddress}</div>
                                <div className={style.price}>{convertToWon(totalPrice, null)} 원</div>
                                <div className={style.orderState}>{el.orderState}</div>
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