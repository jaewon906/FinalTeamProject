import {useState} from "react";
import style from "../../css/USER/myPageAndModifyPaswordPage.module.css";
import MyPage from "./MyPage";
import ModifyPasswordPage from "./ModifyPasswordPage";

export default function MyPageAndModifyPasswordPage(props) {

    const [goToMyPage, setGoToMyPage] = useState(false)
    const [goToModifyPasswordPage, setGoToModifyPasswordPage] = useState(false)


    return (<>
            {!goToMyPage && !goToModifyPasswordPage ?
                <div className={style.container}>
                    <div className={style.main}>
                        <h2 style={{marginTop: "80px"}}>회원 정보 수정</h2>
                        <button onClick={() => setGoToMyPage(true)}>입장하기</button>
                    </div>
                    <div className={style.main}>
                        <h2 style={{marginTop: "80px"}}>비밀번호 변경</h2>
                        <button onClick={() => setGoToModifyPasswordPage(true)}>입장하기</button>
                    </div>
                </div>:""}

            {goToMyPage ? <MyPage userInfo={props.userInfo}/> : ""}
            {goToModifyPasswordPage ? <ModifyPasswordPage userInfo={props.userInfo}/> : ""}
        </>
    )
}