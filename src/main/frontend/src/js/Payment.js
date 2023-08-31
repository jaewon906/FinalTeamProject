import style from "../css/USER/payment.module.css";
import axios from "axios";

export default function Payment(props) {

    const username = props.username
    const userTel = props.userTel
    const address = props.userAddress
    const userEmail = props.userEmail
    const userNumber = props.userNumber
    const price = props.price

    // 값을 못 불러오는거 : 주소, 이름, 전화번호
    function onClickPayment() {
        /* 1. 가맹점 식별하기 */
        const {IMP} = window;
        const code = 'imp14397622'
        IMP.init(code);

        let random = ""
        let idx = 0;

        while (idx <= 7) {
            let num = String.fromCharCode(Math.floor(Math.random() * 122));
            let arr = [num]
            const pattern = /^[a-zA-Z0-9]+$/
            let filteredData = arr.filter(el => pattern.test(el));

            if (filteredData[0] !== undefined) {
                random += filteredData[0]
                idx++
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
            const dateToString = new Date().toString()
            const year = dateToString.split(" ")[3]
            const hms = dateToString.split(" ")[4].split(":")[0]
                + dateToString.split(" ")[4].split(":")[1]
                + dateToString.split(" ")[4].split(":")[2]


            axios.post("/api/user/purchase/purchasedList", {}, {
                params: {
                    purchasedList: purchasedList.join(","),
                    amount: amounts.join(","),
                    userNumber: userNumber,
                    orderNumber: year + hms + userNumber
                }
            })
                .then(() => {
                    // window.location.href =`result?userNumber=${userNumber}&merchant_uid=${merchant_uid}&paid_at=${paid_at}`
                })
                .catch(e => {
                    console.error(e)
                    console.error("서버로 결제 내용을 보내는데 실패했습니다.")
                })

            // axios.post("/api/user/purchase/order", {},{
            //     params:{
            //         purchasedList:purchasedList.join(","),
            //         amount:amounts.join(",")
            //     }
            // })
            //     .then(() => {
            //         // window.location.href =`result?userNumber=${userNumber}&merchant_uid=${merchant_uid}&paid_at=${paid_at}`
            //     })
            //     .catch(e => {
            //         console.error(e)
            //         console.error("서버로 결제 내용을 보내는데 실패했습니다.")
            //     })
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
}