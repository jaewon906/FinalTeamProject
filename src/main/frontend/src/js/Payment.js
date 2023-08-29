
import style from "../css/USER/payment.module.css"
export default function Payment(props) {

    const { IMP } = window;
    const code = 'imp14397622'
    IMP.init(code); // 'imp00000000' 대신 발급받은 가맹점 식별코드를 사용합니다.

    const payment = () =>{
        IMP.request_pay({
            pg: "html5_inicis",
            pay_method: "card",
            escrow: true,
            merchant_uid: "test_llvktq2w",
            customer_uid: "",
            name: "테스트 결제",
            amount: 11111,
            currency: "KRW",
            language: "ko",
            popup: true,
            buyer_name: props.data.order_username,
            buyer_tel: props.data.order_userTel,
            buyer_email: "userEmail",
            buyer_addr: props.data.order_userAddress,
            buyer_postcode: "userNumber",
            m_redirect_url: "http://localhost:3000/",
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

