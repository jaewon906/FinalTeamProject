import style from '../css/signUpPage.module.css'
import {Link} from "react-router-dom";
import axios from "axios";
import {useRef, useState} from "react";

export default function SignUpPage() {

    const id = useRef();
    const password = useRef();
    const nickname1 = useRef();
    const email = useRef([]);
    const tel = useRef([]);
    const address = useRef();
    const sex = useRef([]);
    const age = useRef();
    const username1 = useRef();
    const interest = useRef();
    const verificationCode1 = useRef();
    const [deleteFlag1, setDeleteFlag1] = useState("");
    const [isEmailValidate, setIsEmailValidate] = useState(false);
    const [idState1, setIdState1] = useState(false);
    const [nickState1, setNickState1] = useState(false);
    const [emailState1, setEmailState1] = useState(false);

    let idState=false
    let nicknameState =false
    let emailState =false


    const validateID = () => {

        axios.get("/api/user/signUp/idValidation", {
            params: {
                userId: id.current.value
            }
        })
            .then(res => {
                idState=res.data
                setIdState1(idState)
                if (idState === true) {
                    alert("사용 가능합니다.")
                } else alert("중복된 아이디 입니다.")
            })
            .catch(err => {
                idState=false
                setIdState1(idState)
                console.error(err)
                alert("양식을 확인해주세요.")
            })

    }
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
    const validateEmail = () => {
        axios.get("/api/user/signUp/emailValidation", {
            params: {
                userEmail: email.current[0].value + "@" + email.current[1].value
            }
        })
            .then(res => {
                emailState = res.data
                if (emailState === true) {
                    alert("전송되었습니다.")
                    setIsEmailValidate(true);
                } else alert("중복된 이메일입니다.")
            })
            .catch(() =>  alert("양식을 확인해주세요."))
    }

    const confirmVerificationCode = () => {
        axios.get("/api/user/findMyInfo/byEmail/auth", {
            params: {
                userEmail: email.current[0].value + "@" + email.current[1].value,
                verificationCode: verificationCode1.current.value
            }
        }).then(() => {
            setDeleteFlag1("N");
            alert("인증 되었습니다.")
        }).catch(err=>{
            alert("인증에 실패했습니다.")
            console.error(err)
        })
    }
    const toSignUp = () => {

        axios.post("/api/user/signUp", null, {
            params: {
                userId: id.current.value,
                password: password.current.value,
                username: username1.current.value,
                nickname: nickname1.current.value,
                userEmail: email.current[0].value + "@" + email.current[1].value,
                userTel: tel.current[0].value + "-" + tel.current[1].value + "-" + tel.current[2].value,
                userAddress: address.current.value,
                gender: sex.current[0].value,
                userAge: age.current.value,
                interest: interest.current.value,
                deleteFlag: deleteFlag1

            }
        })
            .then(() => {
                const ret = window.confirm("등록하시겠습니까?")

                if (ret) {
                    alert("회원가입이 완료되었습니다.")
                    window.location.href = "/"
                }
            })
            .catch(err => {
                console.error(err)
                alert("가입 양식을 확인해주세요.")
            })


    }

    return (
        <div className={style.container}>
            <div className={style.main}>
                <button onClick={validateID} style={{
                    width: "70px",
                    height: "30px",
                    borderRadius: "10px",
                    position: "absolute",
                    margin: "179px 0px 0px 530px"
                }}>중복확인
                </button>
                <button onClick={validateNickname} style={{
                    width: "70px",
                    height: "30px",
                    borderRadius: "10px",
                    position: "absolute",
                    margin: "335px 0px 0px 530px"
                }}>중복확인
                </button>
                {!isEmailValidate ? <button onClick={validateEmail} style={{
                        width: "70px",
                        height: "30px",
                        borderRadius: "10px",
                        position: "absolute",
                        margin: "490px 0px 0px 530px"
                    }}>중복확인</button> :
                    <button onClick={confirmVerificationCode} style={{
                        width: "70px",
                        height: "30px",
                        borderRadius: "10px",
                        position: "absolute",
                        margin: "560px 0px 0px 530px"
                    }}>인증하기</button>}

                <p style={{ fontSize: "30px", fontWeight: "600", margin: "20px 0px"}}>회원가입</p>
                <div><p style={{fontSize: "11px"}}>( <span>*</span> 는 필수 입력사항)</p></div>
                <div>
                    <div><span>*</span> 아이디</div>
                    <input ref={id} type="text" placeholder="특수문자 & 한글 제외 6~12글자"/></div>

                {idState1 ? <p style={{color: "green", fontSize: "10px"}}>사용 가능합니다.</p> : <pre> </pre>}


                <div>
                    <div><span>*</span> 비밀번호</div>
                    <input ref={password} type="password" placeholder="숫자 영문자 특수문자 포함 8~15글자"/></div>

                <div>
                    <div><span>*</span> 닉네임</div>
                    <input ref={nickname1} type="text" placeholder="특수문자 제외 4~20글자"/></div>

                {nickState1 ? <p style={{color: "green", fontSize: "10px"}}>사용 가능합니다.</p> : <pre> </pre>}

                <div>
                    <div><span>*</span> 이름</div>
                    <input ref={username1} type="text" placeholder="이름"/></div>


                <div>
                    <div><span>*</span> 이메일</div>
                    <div>
                        <input style={{width: "85px", height: "30px"}} ref={el => email.current[0] = el} type="text"
                               placeholder="qwer1234"/>
                        @
                        <input style={{width: "160px", height: "30px"}} ref={el => email.current[1] = el} type="text"
                               placeholder="naver.com"/>

                    </div>
                </div>
                {isEmailValidate ? <div>
                    <div></div>
                    <div>
                        <input type={"text"} ref={verificationCode1} placeholder={"인증번호"}/>
                    </div>
                </div> : ""}

                <p style={{color: "red", fontSize: "10px"}}>{emailState}</p>

                <div>
                    <div><span>*</span> 전화번호</div>
                    <div>
                        <input style={{width: "81px", height: "30px"}} ref={el => tel.current[0] = el} type="number"
                               placeholder="010"/>-
                        <input style={{width: "81px", height: "30px"}} ref={el => tel.current[1] = el} type="number"
                               placeholder="1234"/>-
                        <input style={{width: "81px", height: "30px"}} ref={el => tel.current[2] = el} type="number"
                               placeholder="5678"/>
                    </div>
                </div>

                <div>
                    <div><span>*</span> 주소</div>
                    <input ref={address} type="text" placeholder="경기도 성남시 중원구 중앙로 326-21"/></div>

                <div>
                    <div><span>*</span> 성별</div>
                    <div style={{width: "70%", display: "flex", justifyContent: "space-between"}}>
                        <input ref={el => sex.current[0] = el} type="radio" value="남자" checked/>남자
                        <input ref={el => sex.current[1] = el} type="radio" value="여자"/>여자
                    </div>
                </div>
                <div> 관심사
                    <div style={{width: "260px", height: "25px"}}>
                        <input ref={interest} type="text" placeholder={"관심사"}/>
                    </div>
                </div>

                <div>
                    <div><span>*</span> 나이</div>
                    <div style={{width: "260px", height: "25px"}}>
                        <input ref={age} type="text" placeholder={"나이"}/>
                    </div>
                </div>

                <button onClick={toSignUp} type="button">회원가입</button>
                <div className={style.findAndSignUpArea}>
                    <Link to="/findId">아이디 찾기</Link>
                    <Link to="/findPw">비밀번호 찾기</Link>
                </div>
            </div>
        </div>
    )
}