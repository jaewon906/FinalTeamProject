import style from "../../css/PurchasePage/purchseResultPage.module.css"
import {useEffect, useState} from "react";
import axios from "axios";
import convertToWon from "../../js/convertToWon";

export default function PurchaseResultPage() {

    const [purchasedResult, setPursedResult] = useState([{}]);

    const urlSearchParams = new URLSearchParams(window.location.search);
    const userNumber = urlSearchParams.get('userNumber');
    const merchantUid = urlSearchParams.get('merchant_uid');


    useEffect(() => {
        axios.get(`/api/user/purchase/result?`
            + `userNumber=${userNumber}&merchant_uid=${merchantUid}`)
            .then(res => {
                setPursedResult(res.data);
            })
            .catch(() => {
                alert("존재하지 않는 게시글입니다.")
                window.location.href = "/home"
            })
    }, [])


    return (
        <div className={style.container}>
                <>
                    <h1>결제가 완료되었습니다.</h1>
                    <div
                        className={style.main}>
                        <div
                            className={style.result}>
                            <div
                                className={style.orderProductHeader}>
                                <div
                                    className={style.orderNumber}>주문번호
                                </div>
                                <div
                                    className={style.orderName}>주문명
                                </div>
                                <div
                                    className={style.username}>주문인
                                </div>
                                <div
                                    className={style.address}>주소
                                </div>
                                <div
                                    className={style.totalPrice}>가격
                                </div>
                            </div>
                            {purchasedResult.map((el, idx) => {

                                let totalPrice;

                                if (el.totalPrice) {
                                    totalPrice = el.totalPrice.toString();
                                }

                                return (
                                    <div key={idx} className={style.orderProduct}>
                                        <div className={style.orderNumber}>{el.orderNumber}</div>
                                        <div className={style.orderName}>{el.orderName}</div>
                                        <div className={style.username}>{el.username}</div>
                                        <div className={style.address}>{el.userAddress}</div>
                                        <div className={style.totalPrice}>{convertToWon(totalPrice, null)}원</div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </>
            <div className={style.btnBox}>
                <button onClick={() => {
                    window.location.href = "/home"
                }} className={style.homeBtn}>홈으로
                </button>
                <button onClick={() => {
                    window.location.href = "/home/booklist"
                }} className={style.shoppingBtn}>계속 쇼핑하기
                </button>
            </div>

        </div>
    )
};