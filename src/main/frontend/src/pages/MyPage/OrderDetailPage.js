import axios from "axios";
import {useState, useEffect} from "react";
import style from "../../css/MyPage/orderDetail.module.css"
import {Link,  useNavigate} from "react-router-dom";
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

    const cancelOrder = () =>{

        const ret = window.confirm("주문을 취소하시겠습니까?")

        if(ret){
            axios.post("/api/user/purchase/cancel",null,{
                params:{
                    orderNumber:orderNumber
                }
            })
                .then(()=>{
                    alert("결제가 취소되었습니다.");
                    goBack(-1)
                })
                .catch(()=> alert("잠시후에 다시 시도해주세요"))
        }

    }


    return (
        <div className={style.container}>
            <h1>상세 내역</h1>
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

                    {orderData.map((el, idx) => {

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
                    })}</div>
                <div className={style.section1}>
                    {totalPrice?<h1>총 금액 : <span style={{color: "red"}}>{convertToWon(totalPrice.toString(), null)}</span></h1>:""}
                    <button onClick={cancelOrder}>취소하기</button>
                </div>
            </div>
        </div>
    );

};