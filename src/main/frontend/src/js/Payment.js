
import style from "../css/USER/payment.module.css"
import {useEffect} from "react";
export default function Payment(props) {

    const username = props.username
    const userTel = props.userTel
    const address = props.userAddress
    const userEmail = props.userEmail
    const userNumber = props.userNumber
    const price = props.price

    const { IMP } = window;
    const code = 'imp14397622'
    IMP.init(code); // 'imp00000000' 대신 발급받은 가맹점 식별코드를 사용합니다.

    let random = ""
    let idx=0;

    while(idx<=7){
        let num =String.fromCharCode(Math.floor(Math.random()*122));
        let arr =[num]
        const pattern=/^[a-zA-Z0-9]+$/
        let filteredData = arr.filter(el=>pattern.test(el));

        if(filteredData[0]!==undefined){
            random += filteredData[0]
            idx++
        }
    }


    const payment = () =>{
        IMP.request_pay({
            pg: "html5_inicis",
            pay_method: "card",
            escrow: true,
            merchant_uid: "test_"+random,
            customer_uid: "",
            name: "BookVoyage",
            amount: 100,
            currency: "KRW",
            language: "ko",
            popup: true,
            buyer_name: username,
            buyer_tel: userTel,
            buyer_email: userEmail,
            buyer_addr: address,
            buyer_postcode: userNumber,
            m_redirect_url: "http://localhost:3000/home",
            notice_url: "",
            app_scheme: "",
        });
    }

    return(
        <div className={style.payment}>
            <button onClick={payment}>결제하기</button>
        </div>

)

};

