import style from "../css/PurchasePage/payment.module.css";
import axios from "axios";

export default function Payment(props) {

    const username = props.username
    const tel = props.userTel
    const address = props.userAddress
    const email = props.userEmail
    const userNumber = props.userNumber
    const price = props.price

    // 값을 못 불러오는거 : 주소, 이름, 전화번호
    function onClickPayment() {
        /* 1. 가맹점 식별하기 */
        const {IMP} = window;
        const code = 'imp14397622'
        IMP.init(code);

        /* 2. 결제 데이터 정의하기 */
        const data = {
            pg: 'html5_inicis',                           // PG사
            pay_method: 'card',                           // 결제수단
            merchant_uid: `mid_${new Date().getTime()}`,   // 주문번호
            amount: 100,                                 // 결제금액
            name: 'BookVoyage',                  // 주문명
            buyer_name: username,                           // 구매자 이름
            buyer_tel: tel,                     // 구매자 전화번호
            buyer_email: email,               // 구매자 이메일
            buyer_addr: address,                    // 구매자 주소
            buyer_postcode: userNumber,                      // 구매자 우편번호
        };

        /* 4. 결제 창 호출하기 */
        IMP.request_pay(data, callback);
    }

    /* 3. 콜백 함수 정의하기 */
    function callback(response) {
        console.log(response)
        const {
            success,
            merchant_uid,
            amount,
            error_msg,
            imp_uid,
            pay_method,
            name,
            paid_amount,
            currency,
            pg_provider,
            pg_type,
            pg_tid,
            apply_num,
            buyer_nane,
            buyer_email,
            buyer_tel,
            buyer_addr,
            buyer_postcode,
            custom_data,
            status,
            paid_at,
            receipt_url,
            card_name,
            bank_name,
            card_quota,
            card_number
        } = response;

        if (success) {
            alert('결제 성공');


        } else {
            alert(`결제 실패: ${error_msg}`);

            // window.sessionStorage.clear()
            // window.location.href =`result?userNumber=${userNumber}&merchant_uid=${merchant_uid}&paid_at=${paid_at}`
            // console.log( success,
            //     merchant_uid,
            //     amount,
            //     error_msg,
            //     imp_uid,
            //     pay_method,
            //     name,
            //     paid_amount,
            //     currency,
            //     pg_provider,
            //     pg_type,
            //     pg_tid,
            //     apply_num,
            //     buyer_nane,
            //     buyer_email,
            //     buyer_tel,
            //     buyer_addr,
            //     buyer_postcode,
            //     custom_data,
            //     status,
            //     paid_at,
            //     receipt_url,
            //     card_name,
            //     bank_name,
            //     card_quota,
            //     card_number)
        }
    }

    const aaaa = () => {
        const sessionStorage = window.sessionStorage

        let purchasedList = []
        let amounts = []

        for (let i = 0; i < sessionStorage.length; i++) {
            let isbn = sessionStorage.key(i);
            let amount = sessionStorage.getItem(isbn);
            purchasedList[i] = isbn
            amounts[i] = amount

        }

        axios.post("/api/user/purchase/purchasedList", {}, {
            params: {
                purchasedList: purchasedList.join(","),
                amount: amounts.join(","),
                userNumber: userNumber,
                totalPrice:props.price
            }
        })
            .then(() => {
                // window.location.href =`result?userNumber=${userNumber}&merchant_uid=${merchant_uid}&paid_at=${paid_at}`
            })
            .catch(e => {
                alert("error")
                console.error(e)
                console.error("서버로 결제 내용을 보내는데 실패했습니다.")
            })

    }
    return (
        <div className={style.payment}>
            <button onClick={aaaa}>테스트</button>
            <button onClick={onClickPayment}>결제하기</button>
        </div>
    );
}
// {
//   "success": true,
//   "imp_uid": "imp_154428151131",
//   "pay_method": "point",
//   "merchant_uid": "test_llx3wiqs",
//   "name": "테스트 결제",
//   "paid_amount": 100,
//   "currency": "KRW",
//   "pg_provider": "kakaopay",
//   "pg_type": "payment",
//   "pg_tid": "T4eed00c2a5910121a36",
//   "apply_num": "",
//   "buyer_name": "",
//   "buyer_email": "",
//   "buyer_tel": "010-0000-0000",
//   "buyer_addr": "",
//   "buyer_postcode": "",
//   "custom_data": null,
//   "status": "paid",
//   "paid_at": 1693372448,
//   "receipt_url": "https://mockup-pg-web.kakao.com/v1/confirmation/p/T4eed00c2a5910121a36/ea8251135346f17e836a9c0d569c286f4e717d117ed574e479389482b97a9fbd",
//   "card_name": null,
//   "bank_name": null,
//   "card_quota": 0,
//   "card_number": ""
// }
