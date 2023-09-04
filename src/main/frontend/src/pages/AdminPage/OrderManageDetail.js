import {useEffect, useState} from "react";
import axios from "axios";
import style from "../../css/ADMIN/orderManageDetail.module.css"

export default function OrderManageDetail() {

    const [orderList, setOrderList] = useState([{}])
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

                setOrderList((res.data))
            })
            .catch()

    }, [])

    console.log(orderList)

    return (

        <div className={style.container}>
            <h1>주문 상세 내역</h1>
            <div className={style.main}>
                <div className={style.orderDetailBox}>
                    <p style={{margin:"15px 0"}}>상품 주문 상세정보</p>
                    <div className={style.orderDetailHeader}>
                        <div className={style.orderDetailNumber}>주문번호</div>
                        <div className={style.orderDetailIsbn}>상품 코드</div>
                        <div className={style.orderDetailImg}>상품 이미지</div>
                        <div className={style.orderDetailTitle}>상품 이름</div>
                        <div className={style.orderDetailPrice}>상품 가격</div>
                        <div className={style.orderDetailAmount}>상품 수량</div>
                    </div>
                </div>
                <div className={style.deliveryStateBox}>
                    <p style={{margin:"15px 0"}}>배송정보</p>
                    <div className={style.deliveryStateHeader}>
                        <div className={style.delivery}>배송상태</div>
                        <div className={style.deliveryStart}>배송 시작시간</div>
                        <div className={style.deliveryEnd}>배송 종료시간</div>
                        <div className={style.deliveryDiscount}>배송비 할인</div>
                        <div className={style.deliveryAddress}>배송지 주소</div>
                    </div>
                </div>
                <div className={style.receiverBox}>
                    <p style={{margin:"15px 0"}}> 수령인 정보</p>
                    <div className={style.receiverHeader}>
                        <div className={style.receiverName}>성함</div>
                        <div className={style.receiverTel}>전화번호</div>
                        <div className={style.receiverAddress}>주소</div>
                    </div>
                </div>
                <div className={style.paymentInfoBox}>
                    <p style={{margin:"15px 0"}}>결제 정보</p>
                    <div className={style.paymentInfoHeader}>
                        <div className={style.paymentTotal}>총 주문금액</div>
                        <div className={style.paymentMethod}>결제수단</div>
                        <div className={style.paymentDeliveryFee}>총 배송비</div>
                        <div className={style.paymentDeliveryDiscount}>배송비 할인</div>
                        <div className={style.paymentMemberDiscount}>회원 할인금액</div>
                        <div className={style.paymentCouponDiscount}>쿠폰 할인금액</div>
                        <div className={style.paymentResultTotal}>최종 결제금액</div>
                    </div>
                </div>
                <div className={style.customerInfoBox}>
                    <p style={{margin:"15px 0"}}>구매자 정보</p>
                    <div className={style.customerInfoHeader}>
                        <div className={style.customerId}>아이디</div>
                        <div className={style.customerName}>성함</div>
                        <div className={style.customerEmail}>이메일</div>
                        <div className={style.customerTel}>전화번호</div>
                    </div>
                </div>
            </div>
        </div>

    )
}
// {orderList.map((el, idx) => {
//
//     return(
//         <>
//             <p>{el.orderedTime}</p>
//             <p>{el.orderNumber}</p>
//         </>
//     )
// })}