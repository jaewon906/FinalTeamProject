import axios from "axios";
import {useEffect, useState} from "react";
import {getUserNumber} from "../js/getUserNumber";

export default function MyPage() {

    const [myInfo, setMyInfo] = useState();
    let userNumber = "";

    useEffect(() => {
        userNumber = getUserNumber().userNumber

        axios.get("/api/user/myPage", {
            params: {
                userNumber: userNumber
            }
        })
            .then(res => {
                setMyInfo(res.data);
            })
            .catch(err => {
                console.error(err);
                const ret = window.confirm("로그인이 필요한 서비스입니다. 로그인 하시겠습니까?")

                if (ret) {
                    window.location.href = "/logIn"
                }
            })
    },[])


    return (
        <>
        </>)
}