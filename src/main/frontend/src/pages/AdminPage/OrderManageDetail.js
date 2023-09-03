import {useEffect, useState} from "react";
import axios from "axios";
import style from "../../css/ADMIN/orderManageDetail.module.css"

export default function OrderManageDetail() {

    const [orderDetail, setOrderDetail] = useState([{}])
    const url = new URLSearchParams(window.location.search)
    const orderNumber = url.get("orderNumber");

    console.log(orderNumber)

    useEffect(() => {

        axios.post("/api/admin/manage/orderDetail", null, {
            params: {
                isRead: 1,
                orderNumber: orderNumber
            }
        })
            .then(res => {

                setOrderDetail((res.data))
            })
            .catch()

    }, [])

    return (

        <div className={style.container}>
            <h1>주문 상세 내역</h1>
            <div className={style.main}>
                {orderDetail.map((el, idx) => {

                    console.log(el)

                    return(
                        <>
                        <p>{el.orderedTime}</p>
                        <p>{el.orderNumber}</p>
                        </>
                    )
                })}
            </div>
        </div>

    )
}