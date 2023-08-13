import axios from "axios";
import {useEffect, useRef, useState} from "react";
import {getUserNumber} from "../js/getUserNumber";
import style from "../css/myPage.module.css"

export default function MyPage() {

    const [myInfo, setMyInfo] = useState();
    let userNumber = "";

    const userId = useRef();
    const password = useRef();
    const confirmPassword = useRef();
    const nickname1 = useRef();
    const email = useRef([]);
    const tel = useRef([]);
    const address = useRef();
    const sex = useRef([]);
    const age_year = useRef();
    const age_month = useRef();
    const age_date = useRef();
    const username1 = useRef();
    const interest = useRef();
    const verificationCode1 = useRef();
    const [deleteFlag1, setDeleteFlag1] = useState("");
    const [isEmailValidate, setIsEmailValidate] = useState(false);
    const [isPasswordMatch, setIsPasswordMatch] = useState(false);
    const [idState1, setIdState1] = useState(false);
    const [nickState1, setNickState1] = useState(false);
    const [emailState1, setEmailState1] = useState(false);

    let idState=false
    let nicknameState =false
    let emailState =false

    let year = [];
    let month= [];
    let j1=0;
    let j2=0;
    let j3=0;

    let date = [];
    for(let i=2023; i>=1900;i--){
        year[j1++] = i + "년"
    }

    for(let i=1; i<=12; i++){
        month[j2++] = i + "월"
    }

    for(let i=1; i<=31; i++){
        date[j3++] = i + "일"
    }

    useEffect(() => {
        userNumber = getUserNumber().userNumber

        axios.get("/api/user/myPage", {
            params: {
                userNumber: userNumber
            }
        })
            .then(res => {
                setMyInfo(res.data);
                console.log(myInfo)
            })
            .catch(err => {
                console.error(err);
                const ret = window.confirm("로그인이 필요한 서비스입니다. 로그인 하시겠습니까?")

                if (ret) {
                    window.location.href = "/logIn"
                }
            })
    }, [])



    const validateNickname = () => {

        axios.get("/api/user/signUp/nicknameValidation", {
            params:
                {
                    nickname: nickname1.current.value
                }
        })
            .then(res => {
                nicknameState =res.data
                setNickState1(nicknameState)
                if (nicknameState === true) {
                    alert("사용 가능합니다.")
                } else alert("중복된 닉네임입니다.")
            })
            .catch(err => {
                nicknameState=false
                setNickState1(nicknameState);
                console.error(err)
                alert("양식을 확인해주세요.")
            })
    }

    const verifyPassword = () => {

        console.log(confirmPassword)
        if(password.current.value === confirmPassword.current.value){
            setIsPasswordMatch(true)
        }
        else setIsPasswordMatch(false)
    }

    const checkInputSize = (e) =>{
        let size = e.target.value;

        if(size.length>4){
            e.target.value = size.substring(0,4);
        }
    }

    const toUpdate = () => {

        const ret = window.confirm("등록하시겠습니까?")


        if(ret && (password.current.value===confirmPassword.current.value)){
            axios.post("/api/user/signUp", null, {
                params: {
                    userId: userId.current.value,
                    password: password.current.value,
                    username: username1.current.value,
                    nickname: nickname1.current.value,
                    userEmail: email.current[0].value + "@" + email.current[1].value,
                    userTel: tel.current[0].value + "-" + tel.current[1].value + "-" + tel.current[2].value,
                    userAddress: address.current.value,
                    gender: sex.current[0].value,
                    userAge: age_year.current.value + " " + age_month.current.value + " " + age_date.current.value,
                    interest: interest.current.value,
                    deleteFlag: deleteFlag1

                }
            })
                .then(() => {
                    alert("회원가입이 완료되었습니다.")
                    window.location.href = "/"

                })
                .catch(err => {
                    console.error(err)
                    alert("가입 양식을 확인해주세요.")
                })
        }

    }


    return (
        <div className={style.container}>
            {myInfo!==undefined ?
            <div className={style.main}>
                <br/><br/><h2>회원수정</h2><br/><br/>
                <div className={style.section}>
                    <div style={{width:"100px"}}><p style={{fontSize: "12px"}}>아이디</p></div>
                    <input type={"z"} value={myInfo.userId}/>
                </div>

                <div className={style.section}>
                    <div style={{width:"100px"}}><p style={{fontSize: "12px"}}>비밀번호</p></div>
                    <input value={myInfo.password}/>
                </div>

                <div className={style.section}>
                    <div style={{width:"100px"}}><p style={{fontSize: "12px"}}>비밀번호 확인</p></div>
                    <input value={myInfo.confirmPassword}/>
                </div>

                <div className={style.section}>
                    <div style={{width:"100px"}}><p style={{fontSize: "12px"}}>닉네임</p></div>
                    <input value={myInfo.nickname}/>
                </div>

                <div className={style.section}>
                    <div style={{width:"100px"}}><p style={{fontSize: "12px"}}>이름</p></div>
                    <input value={myInfo.username}/>
                </div>

                <div className={style.section}>
                    <div style={{width:"100px"}}><p style={{fontSize: "12px"}}>이메일</p></div>
                    <input value={myInfo.userEmail}/>
                </div>

                <div className={style.section}>
                    <div style={{width:"100px"}}><p style={{fontSize: "12px"}}>전화번호</p></div>
                    <input value={myInfo.userTel}/>
                </div>

                <div className={style.section}>
                    <div style={{width:"100px"}}><p style={{fontSize: "12px"}}>주소</p></div>
                    <input value={myInfo.userAddress}/>
                </div>

                <div className={style.section}>
                    <div style={{width:"100px"}}><p style={{fontSize: "12px"}}>성별</p></div>
                    <div style={{width:"350px", display:"flex", justifyContent:"center"}}>
                        <input ref={el => sex.current[0] = el} type="radio" value="남자" checked/>남자
                        <input ref={el => sex.current[1] = el} type="radio" value="여자"/>여자
                    </div>
                </div>

                <div className={style.section}>
                    <div style={{width:"100px"}}><p style={{fontSize: "12px"}}>관심사</p></div>
                    <input value={myInfo.interest}/>
                </div>

                <div className={style.section}>
                    <div style={{width:"100px"}}><p style={{fontSize: "12px"}}>나이</p></div>
                    <input value={myInfo.userAge}/>
                </div>

                <button onClick={toUpdate}>수정하기</button>

            </div>:""}
        </div>
        )
}