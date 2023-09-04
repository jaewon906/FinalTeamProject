import {useEffect, useState} from "react";
import axios from "axios";
import style from "../../css/ADMIN/orderManageDetail.module.css"
import convertToWon from "../../js/convertToWon";

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
                    <p>상품 주문 상세정보</p>
                    <div className={style.orderDetailHeader}>
                        <div className={style.orderDetailNumber}>주문번호</div>
                        <div className={style.orderDetailIsbn}>상품 코드</div>
                        <div className={style.orderDetailImg}>상품 이미지</div>
                        <div className={style.orderDetailTitle}>상품 이름</div>
                        <div className={style.orderDetailPrice}>상품 가격</div>
                        <div className={style.orderDetailAmount}>상품 수량</div>
                    </div>
                    {orderList.orderProductDTOList !==undefined ?
                        orderList.orderProductDTOList.map((el,idx)=>{
                            return(
                                <div style={{display:"flex"}} key={idx}>
                                    <div className={style.orderDetailNumber}>{orderList.orderNumber}</div>
                                    <div className={style.orderDetailIsbn}>{el.isbn13}</div>
                                    <div className={style.orderDetailImg}>
                                        <img src={el.cover} alt={""}/>
                                    </div>
                                    <div className={style.orderDetailTitle}>{el.title}</div>
                                    <div className={style.orderDetailPrice}>{el.priceSales}</div>
                                    <div className={style.orderDetailAmount}>{el.amount}</div>
                                </div>
                            )
                        }) : ""
                    }
                </div>
                <div className={style.deliveryStateBox}>
                    <p>배송정보</p>
                    <div className={style.deliveryStateHeader}>
                        <div className={style.delivery}>배송상태</div>
                        <div className={style.deliveryStart}>배송 시작시간</div>
                        <div className={style.deliveryEnd}>배송 종료시간</div>
                        <div className={style.deliveryDiscount}>배송비 할인</div>
                        <div className={style.deliveryAddress}>배송지 주소</div>
                    </div>
                    <div style={{display:"flex"}}>
                        <div className={style.delivery}>{orderList.orderState}</div>
                        <div className={style.deliveryStart}>{orderList.orderStart}</div>
                        <div className={style.deliveryEnd}>{orderList.orderEnd}</div>
                        <div className={style.deliveryDiscount}>{orderList.deliveryDiscount}</div>
                        <div className={style.deliveryAddress}>{orderList.deliveryAddress}</div>
                    </div>
                </div>
                <div className={style.receiverBox}>
                    <p> 수령인 정보</p>
                    <div className={style.receiverHeader}>
                        <div className={style.receiverName}>성함</div>
                        <div className={style.receiverTel}>전화번호</div>
                        <div className={style.receiverAddress}>주소</div>
                    </div>
                    <div style={{display:"flex"}}>
                        <div className={style.receiverName}>{orderList.receiverName}</div>
                        <div className={style.receiverTel}>{orderList.receiverTel}</div>
                        <div className={style.receiverAddress}>{orderList.receiverAddress}</div>
                    </div>
                </div>
                <div className={style.paymentInfoBox}>
                    <p>결제 정보</p>
                    <div className={style.paymentInfoHeader}>
                        <div className={style.paymentTotal}>총 주문금액</div>
                        <div className={style.paymentMethod}>결제수단</div>
                        <div className={style.paymentDeliveryFee}>총 배송비</div>
                        <div className={style.paymentDeliveryDiscount}>배송비 할인</div>
                        <div className={style.paymentMemberDiscount}>회원 할인금액</div>
                        <div className={style.paymentCouponDiscount}>쿠폰 할인금액</div>
                        <div className={style.paymentResultTotal}>최종 결제금액</div>
                    </div>
                    <div style={{display:"flex"}}>
                        <div className={style.paymentTotal}>{convertToWon(orderList.payTotal,null)} 원</div>
                        <div className={style.paymentMethod}>{orderList.payMethod}</div>
                        <div className={style.paymentDeliveryFee}>{orderList.deliveryPay}</div>
                        <div className={style.paymentDeliveryDiscount}>{orderList.deliveryPayDiscount}</div>
                        <div className={style.paymentMemberDiscount}>{orderList.memberDiscount}</div>
                        <div className={style.paymentCouponDiscount}>{orderList.couponDiscount}</div>
                        <div className={style.paymentResultTotal}>{convertToWon(orderList.finalPay,null)} 원</div>
                    </div>
                </div>
                <div className={style.customerInfoBox}>
                    <p>구매자 정보</p>
                    <div className={style.customerInfoHeader}>
                        <div className={style.customerId}>아이디</div>
                        <div className={style.customerName}>성함</div>
                        <div className={style.customerEmail}>이메일</div>
                        <div className={style.customerTel}>전화번호</div>
                    </div>
                    <div style={{display:"flex"}}>
                        <div className={style.customerId}>{orderList.customerId}</div>
                        <div className={style.customerName}>{orderList.customerName}</div>
                        <div className={style.customerEmail}>{orderList.customerEmail}</div>
                        <div className={style.customerTel}>{orderList.customerTel}</div>
                    </div>
                </div>
            </div>
        </div>

    )
}
