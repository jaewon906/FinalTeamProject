import axios from "axios";
import {useState, useEffect} from "react";
import style from "../../css/MyPage/orderDetail.module.css"
import {Link, useNavigate} from "react-router-dom";
import convertToWon from "../../js/convertToWon";

export default function OrderDetailPage() {

    const urlSearchParams = new URLSearchParams(window.location.search);
    const orderNumber = urlSearchParams.get('orderNumber');
    const [orderData, setOrderData] = useState([{}]);
    let totalPrice = 0;

    const goBack = useNavigate();

    useEffect(() => {
        axios.get(`/api/user/myPage/orderDetail/${orderNumber}`)
            .then(res => {
                console.log(res.data)
                setOrderData(res.data)
            })
            .catch(e => console.error(e))
    }, [])

    const cancelOrder = () => {

        const ret = window.confirm("주문을 취소하시겠습니까?")

        if (ret) {
            axios.post("/api/user/purchase/cancel", null, {
                params: {
                    orderNumber: orderNumber
                }
            })
                .then(() => {
                    alert("결제가 취소되었습니다.");
                    goBack(-1)
                })
                .catch(() => alert("잠시후에 다시 시도해주세요"))
        }

    }

    console.log(orderData.orderState)

    return (
        <div className={style.container}>
            <h1>주문 상세 내역</h1>
            <div className={style.main}>
                <div className={style.section}>
                    <div className={style.orderProductHeader}>
                        <div className={style.cover}>책 표지</div>
                        <div className={style.title}>제목</div>
                        <div className={style.author}>작가</div>
                        <div className={style.amount}>수량</div>
                        <div className={style.priceSales}>개당 가격</div>
                        <div className={style.totalPrice}>총 금액</div>
                    </div>

                    {orderData.orderProductDTOList !== undefined ?
                        orderData.orderProductDTOList.map((el, idx) => {

                            const totalPricePerProduct = parseInt(el.priceSales) * parseInt(el.amount)
                            totalPrice += totalPricePerProduct

                            return (
                                <div className={style.orderProduct} key={idx}>
                                    <div className={style.cover}>
                                        <img src={el.cover}/>
                                    </div>
                                    <div className={style.title}>
                                        <Link to={`/home/bookdetail/${el.isbn13}`}>{el.title}</Link>
                                    </div>
                                    <div className={style.author}>{el.author}</div>
                                    <div className={style.amount}>{el.amount}</div>
                                    <div className={style.priceSales}>{convertToWon(el.priceSales, null)}원</div>
                                    <div
                                        className={style.totalPrice}>{convertToWon(totalPricePerProduct.toString(), null)}원
                                    </div>
                                </div>
                            )
                        }) : ""}
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
                    <div style={{display: "flex"}}>
                        <div className={style.delivery}>{orderData.orderState}</div>
                        <div className={style.deliveryStart}>{orderData.orderStart}</div>
                        <div className={style.deliveryEnd}>{orderData.orderEnd}</div>
                        <div className={style.deliveryDiscount}>{orderData.deliveryDiscount}</div>
                        <div className={style.deliveryAddress}>{orderData.deliveryAddress}</div>
                    </div>
                </div>
                <div className={style.receiverBox}>
                    <p> 수령인 정보</p>
                    <div className={style.receiverHeader}>
                        <div className={style.receiverName}>성함</div>
                        <div className={style.receiverTel}>전화번호</div>
                        <div className={style.receiverAddress}>주소</div>
                    </div>
                    <div style={{display: "flex"}}>
                        <div className={style.receiverName}>{orderData.receiverName}</div>
                        <div className={style.receiverTel}>{orderData.receiverTel}</div>
                        <div className={style.receiverAddress}>{orderData.receiverAddress}</div>
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
                    <div style={{display: "flex"}}>
                        <div className={style.paymentTotal}>{convertToWon(orderData.payTotal, null)} 원</div>
                        <div className={style.paymentMethod}>{orderData.payMethod}</div>
                        <div className={style.paymentDeliveryFee}>{orderData.deliveryPay}</div>
                        <div className={style.paymentDeliveryDiscount}>{orderData.deliveryPayDiscount}</div>
                        <div className={style.paymentMemberDiscount}>{orderData.memberDiscount}</div>
                        <div className={style.paymentCouponDiscount}>{orderData.couponDiscount}</div>
                        <div className={style.paymentResultTotal}>{convertToWon(orderData.finalPay, null)} 원</div>
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
                    <div style={{display: "flex"}}>
                        <div className={style.customerId}>{orderData.customerId}</div>
                        <div className={style.customerName}>{orderData.customerName}</div>
                        <div className={style.customerEmail}>{orderData.customerEmail}</div>
                        <div className={style.customerTel}>{orderData.customerTel}</div>
                    </div>
                </div>
                <div className={style.section1}>
                    {totalPrice ?
                        <h1>총 금액 : <span style={{color: "red"}}>{convertToWon(totalPrice.toString(), null)}</span>
                        </h1> : ""}
                    {
                        (orderData.orderState === "주문 완료" ||
                        orderData.orderState === "배송 준비중") &&
                        orderData.orderState !== undefined ?
                            <button onClick={cancelOrder}>취소하기</button> :
                            ""
                    }
                </div>
            </div>
        </div>
    );

};