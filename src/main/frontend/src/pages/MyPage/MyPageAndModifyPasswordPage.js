import {useState} from "react";
import style from "../../css/MyPage/myPageAndModifyPaswordPage.module.css";
import MyPage from "./MyPage";
import ModifyPasswordPage from "./ModifyPasswordPage";
import OrderListPage from "./OrderListPage";

export default function MyPageAndModifyPasswordPage(props) {

    const [goToMyPage, setGoToMyPage] = useState(false)
    const [goToModifyPasswordPage, setGoToModifyPasswordPage] = useState(false)
    const [goToOrderPage, setGoToOrderPage] = useState(false)


    return (<>
            {!goToMyPage && !goToModifyPasswordPage && !goToOrderPage ?
                <div className={style.container}>
                    <div className={style.main}>
                        <h2 style={{marginTop: "80px"}}>회원 정보 수정</h2>
                        <button onClick={() => setGoToMyPage(true)}>입장하기</button>
                    </div>
                    <div className={style.main}>
                        <h2 style={{marginTop: "80px"}}>주문 내역 확인</h2>
                        <button onClick={() => setGoToOrderPage(true)}>입장하기</button>
                    </div>
                    <div className={style.main}>
                        <h2 style={{marginTop: "80px"}}>비밀번호 변경</h2>
                        <button onClick={() => setGoToModifyPasswordPage(true)}>입장하기</button>
                    </div>
                </div>:""}

            {goToMyPage ? <MyPage userInfo={props.userInfo}/> : ""}
            {goToModifyPasswordPage ? <ModifyPasswordPage userInfo={props.userInfo}/> : ""}
            {goToOrderPage ? <OrderListPage userInfo={props.userInfo}/> : ""}

        </>
    )
}