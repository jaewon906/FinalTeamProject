import axios from "axios";
import React, {useEffect, useRef, useState} from "react";
import style from "../../css/USER/purchasePage.module.css"
import {getUserNumber} from "../../js/getUserNumber";
import Payment from "../../js/Payment";

export default function PurchasePage() {

    const [userInfo, setUserInfo] = useState([{}]);
    const [bookInfo, setBookInfo] = useState([{}]);
    const [loading, setLoading] = useState(false);
    const [amount, setAmount] = useState([]);
    const [purchaseLength, setPurchaseLength] = useState(0)
    const quantity = useRef([])
    let orderData={}
    let totalPrice = 0


    useEffect(() => {

        const sessionStorage = window.sessionStorage;
        const isbnList = []
        setPurchaseLength(sessionStorage.length)
        setLoading(false)

        for (let i = 0; i < sessionStorage.length; i++) {
            isbnList[i] = sessionStorage.key(i);
        }

        axios.get("/api/user/purchase/userInfo", {
            params: {
                userNumber: getUserNumber().userNumber
            }
        })
            .then(res => setUserInfo(res.data))
            .catch(e => console.log(e))

        axios.get("/api/user/purchase/details", {
            params: {
                isbnList: isbnList.join(",")
            }
        })
            .then(res => {
                setBookInfo(res.data);
                setLoading(true)
                setAmount(() => {
                    const arr = []

                    for (let i = 0; i < res.data.length; i++) {
                        arr[i] = sessionStorage.getItem(sessionStorage.key(i))
                    }

                    return arr
                })
            })
            .catch(e => console.error(e))

        orderData={
            order_name:"BookVoyage",
            order_username:userInfo.username,
            order_price:totalPrice,
            order_userAddress:userInfo.userAddress + userInfo.userDetailAddress,
            order_userTel : userInfo.userTel
        }


    }, [purchaseLength])


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
                if (i % 3 === 0) {
                    temp += ","
                }
            }

            result = temp.split("").reverse().join("")
        } catch (e) {
            console.error(e)
        }


        return result
    }


    const handleQuantity = (e) => {

        const id = e.target.id
        const cases = id.split(" ")[0]
        const listNum = id.split(" ")[1]


        switch (cases) {
            case "plus": {
                if (1 <= quantity.current[listNum].value && quantity.current[listNum].value <= 9) {
                    setAmount(el => {
                        const newArr = [...el]

                        for (let i = 0; i < amount.length; i++) {
                            if (i === parseInt(listNum)) {
                                newArr[i]++
                            }
                        }

                        return newArr
                    })

                }
            }
                break;
            case "minus" : {
                if (2 <= quantity.current[listNum].value && quantity.current[listNum].value <= 10) {
                    setAmount(el => {
                        const newArr = [...el]

                        for (let i = 0; i < amount.length; i++) {
                            if (i === parseInt(listNum)) {
                                newArr[i]--
                            }
                        }

                        return newArr
                    })
                }
            }
                break;
            default:
                console.log(cases)
        }

    }

    const deleteBooks = (e) => {
        sessionStorage.removeItem(e.target.id)
        console.log(purchaseLength)
        setPurchaseLength(val => --val)
    }


    return (
        <div className={style.container}>
            <h1>구매하기</h1>
            <div className={style.main}>
                {loading ? <>
                        <div className={style.section2}>
                            <div className={style.purchaseListHeader}>
                                <div className={style.bookCover}>책 커버</div>
                                <div className={style.bookTitle}>제목</div>
                                <div className={style.bookPrice}>가격</div>
                                <div className={style.bookAmount}>수량</div>
                                <div className={style.bookTotalPrice}>총 금액</div>
                            </div>

                            {bookInfo.map((el, idx) => {
                                const cover = el.body.cover
                                const title = el.body.title
                                const priceStandard = el.body.priceStandard
                                const priceSales = el.body.priceSales
                                const isbn = el.body.isbn13

                                totalPrice = totalPrice + priceSales * amount[idx]

                                return (
                                    <div key={idx} className={style.purchaseList}>

                                        <div className={style.bookImg}><img src={cover} alt={""}/></div>
                                        <div className={style.bookTitle}>{title.split("-")[0]}</div>
                                        <div className={style.bookPrice}>
                                            <strike style={{color: "gray", fontSize: "14px"}}>정가
                                                : {convertToWon(priceStandard, null)}</strike>
                                            <i className="fa-solid fa-arrow-down"></i>
                                            <span>할인가 : {convertToWon(priceSales, null)}</span></div>
                                        <div className={style.bookAmount}>
                                            <p id={"minus " + idx} style={{cursor: "pointer", fontSize:"24px"}}
                                               onClick={handleQuantity}>-</p>
                                            <input
                                                ref={el => quantity.current[idx] = el}
                                                type="number"
                                                name="number_select"
                                                readOnly
                                                value={amount[idx]}  // 수량 상태를 입력값에 바인딩
                                            />
                                            <p id={"plus " + idx} style={{cursor: "pointer", fontSize:"24px"}} onClick={handleQuantity}>+</p>
                                        </div>
                                        <div className={style.bookTotalPrice}>
                                            <span
                                                style={{color: "red"}}>총 금액 : {convertToWon(priceSales, amount[idx])} 원</span>
                                        </div>
                                        <button className={style.deleteBtn} id={isbn} onClick={deleteBooks}>삭제</button>
                                    </div>
                                )
                            })}
                            <div className={style.totalPrice}>
                                <div style={{width:"50%",display:"flex", alignItems:"center", justifyContent:"space-between"}}>
                                    <h1>총 결제 금액 :</h1>
                                    <span style={{fontSize:"50px", color:"red"}}>{convertToWon(totalPrice.toString(),null)} 원</span>
                                </div>
                            </div>
                        </div>
                        <h1 style={{margin: "75px 0"}}>주문자</h1>
                        <div className={style.section1}>
                            <div className={style.username}>
                                <div className={style.key}>이름</div>
                                <div className={style.value}>{userInfo.username}</div>
                            </div>
                            <div className={style.userTel}>
                                <div className={style.key}>연락처</div>
                                <div className={style.value}>{userInfo.userTel}</div>
                            </div>
                            <div className={style.userAddress}>
                                <div className={style.key}>주소</div>
                                <div className={style.value}>
                                    {userInfo.userAddress} {userInfo.userDetailAddress}
                                </div>
                            </div>
                        </div>
                        <h1 style={{margin: "75px 0"}}>수령인</h1>
                        <div className={style.section1}>
                            <div className={style.username}>
                                <div className={style.key}>이름</div>
                                <div className={style.value}>{userInfo.username}</div>
                            </div>
                            <div className={style.userTel}>
                                <div className={style.key}>연락처</div>
                                <div className={style.value}>{userInfo.userTel}</div>
                            </div>
                            <div className={style.userAddress}>
                                <div className={style.key}>주소</div>
                                <div className={style.value}>
                                    {userInfo.userAddress} {userInfo.userDetailAddress}
                                </div>
                            </div>
                        </div>
                        <Payment data={orderData}/>

                    </>
                    : (purchaseLength === 0 ? <div className={style.noPurchaseList}>
                        <p style={{fontSize: "150px"}}>텅</p>
                    </div> : "")}
            </div>
        </div>
    )
};