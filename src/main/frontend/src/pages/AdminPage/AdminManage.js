import style from "../../css/ADMIN/adminManage.module.css";
import {useEffect, useState} from "react";
import axios from "axios";
import UserChart from "./UserChart";
import convertToWon from "../../js/convertToWon";
import {Link} from "react-router-dom";

export default function AdminManage() {

    const [isLoading, setIsLoading] = useState(false);
    const [totalMember, setTotalMember] = useState(0)
    const [totalOrders, setTotalOrders] = useState([{}])
    const [recentOrders, setRecentOrders] = useState([{}])
    const [user, setUser] = useState([])

    let i = 0

    // let totalBooks = 0;
    // let unreadCS = 0;

    useEffect(() => {

        axios.get("/api/admin/summary") //가입 요약
            .then((res) => {

                setTotalMember(res.data)
                setIsLoading(true)

            })
            .catch(() => {
                alert("관리자 전용 페이지 입니다. 로그인 해주세요")
                window.location.href = "/admin/login/"
            })

        axios.get("/api/admin/summaryNewUserPerDay") //가입자수 추이
            .then(res => {

                const dataFromServer = res.data

                const datesFromServer = Object.keys(dataFromServer);

                const sortedDates = datesFromServer.sort((a, b) => new Date(a) - new Date(b));

                sortedDates.forEach(date => {

                    setUser(val => {
                        const arr = [...val]
                        arr.push(dataFromServer[date])
                        return arr;
                    })
                    i++;
                });

            })

        axios.get("/api/admin/showRecentOrders") // 최근 3개 주문내역 조회
            .then(res => {
                setRecentOrders(res.data)
            })
            .catch(e => console.error(e))


        axios.get("/api/admin/showAllOrders") // 모든 주문내역 조회
            .then(res => {
                setTotalOrders(res.data)
            })
            .catch(e => console.error(e))

    }, [])

    let twoWeeksAgo = 0;
    let weeksAgo = 0;

    for (let i = 0; i <= 7; i++) {
        twoWeeksAgo += user[i]
        weeksAgo += user[i + 7]

    }

    const gapDay = user[user.length - 1] - user[user.length - 2]
    const gapWeeks = weeksAgo - twoWeeksAgo


    const orderNoticeDot = (v) => {


        return (<div style={{height: "100%", position: "relative"}}>
            {v === 0 ?
                <div style={{
                    position: "absolute",
                    left: "13px",
                    top: "25px",
                    width: "7px",
                    height: "7px",
                    borderRadius: "20px",
                    backgroundColor: "red"
                }}>
                </div> :
                <div
                    style={{
                        position: "absolute",
                        left: "13px",
                        top: "25px",
                        width: "7px",
                        height: "7px",
                        backgroundColor: "transparent"
                    }}>

                </div>
            }
        </div>)
    }


    return (<>{isLoading ? <div className={style.section1}>
        <div style={{display: "flex"}}>
            <div>
                <div style={{display: "flex"}}>

                    <div
                        onClick={() => {
                            window.location.href = "user/"
                        }}
                        className={style.totalMember}>
                        <h3>총 가입 수</h3>
                        <h1>{totalMember}명</h1>
                    </div>

                    <div
                        onClick={() => {
                            window.location.href = "product/"
                        }}
                        className={style.totalProduct}>
                        <h3>주문 수</h3>
                        <h1>{totalOrders.length} 건</h1>
                    </div>

                </div>

                <div
                    onClick={() => {
                        window.location.href = "CS/"
                    }}
                    style={{display: "flex"}}>

                    <div className={style.unreadCS}>
                        <h3>읽지 않은 문의사항</h3>
                        <h1>1개</h1>
                    </div>

                    <div className={style.comingSoon}>
                        <h1>준비중</h1>
                    </div>

                </div>
            </div>

            <div
                className={style.userChart}>
                <div
                    className={style.summaryUserTrendsArea}>
                    <div
                        className={style.summaryUserTrends}>
                        <h3>전일 대비 가입자 수</h3>
                        <div>
                            <h1 style={{marginRight: "10px"}}>{Math.abs(gapDay)}명</h1>
                            <h1>
                                {gapDay > 0 ?
                                    <i
                                        style={{color: "red", marginTop: "5px"}}
                                        className="fa-solid fa-up-long">

                                    </i> :
                                    <i style={{color: "blue", marginTop: "5px"}}
                                       className="fa-solid fa-down-long">

                                    </i>
                                }
                            </h1>
                        </div>
                    </div>
                    <div
                        className={style.summaryUserTrends}>
                        <h3>지난주 대비 가입자 수</h3>
                        <div>
                            <h1
                                style={{marginRight: "10px"}}>
                                {Math.abs(gapWeeks)}명
                            </h1>
                            <h1>
                                {gapWeeks > 0 ?
                                    <i
                                        style={{color: "red", marginTop: "5px"}}
                                        className="fa-solid fa-up-long">

                                    </i> :
                                    <i
                                        style={{color: "blue", marginTop: "5px"}}
                                        className="fa-solid fa-down-long">

                                    </i>
                                }
                            </h1>
                        </div>
                    </div>
                </div>
                <UserChart today={user[user.length - 1]}/>
            </div>
        </div>
        <div
            className={style.product}>
            <p>읽지 않은 최근 주문 내역</p>
            <div
                className={style.orderHeader}>
                <div
                    className={style.orderNumber}>주문번호
                </div>
                <div
                    className={style.orderName}>주문명
                </div>
                <div
                    className={style.customer}>주문자
                </div>
                <div
                    className={style.tel}>연락처
                </div>
                <div
                    className={style.addr}>배송지
                </div>
                <div
                    className={style.price}>금액
                </div>
            </div>
            {recentOrders.map((el, idx) => {

                return (
                    <Link to={`order/orderDetail?orderNumber=${el.orderNumber}`}><div id={el.orderNumber}
                         className={style.order}
                         key={idx}>
                        {orderNoticeDot(el.isRead)}
                        <div
                            className={style.orderNumber}>
                            {el.orderNumber}
                        </div>
                        <div
                            className={style.orderName}>
                            {el.orderName}
                        </div>
                        <div
                            className={style.customer}>
                            {el.username}
                        </div>
                        <div
                            className={style.tel}>
                            {el.userTel}
                        </div>
                        <div className={style.addr}>
                            {el.userAddress}
                        </div>
                        {el.totalPrice !== undefined ?
                            <div
                                className={style.price}>
                                {convertToWon(el.totalPrice + "", null)}
                            </div> :
                            ""}
                    </div></Link>)
            })}

        </div>
        <div className={style.CS}>문의사항 표기</div>
    </div> : ""}

    </>)
}