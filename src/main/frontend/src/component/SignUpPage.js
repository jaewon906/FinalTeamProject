import style from '../css/signUpPage.module.css'
import {Link} from "react-router-dom";
import axios from "axios";
import {useRef, useState} from "react";
import Modal from "react-modal";
import DaumPostcode from "react-daum-postcode";

export default function SignUpPage() {

    const id = useRef();
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
    const [timeRemaining, setTimeRemaining] = useState([{minute: 1, second: "00"}]);
    const [addressData, setAddressData]=useState();

    let idState = false
    let nicknameState = false
    let emailState = false

    let expireTime = 60;

    let year = [];
    let month = [];
    let j1 = 0;
    let j2 = 0;
    let j3 = 0;

    let date = [];
    for (let i = 2023; i >= 1900; i--) {
        year[j1++] = i + "년"
    }

    for (let i = 1; i <= 12; i++) {
        month[j2++] = i + "월"
    }

    for (let i = 1; i <= 31; i++) {
        date[j3++] = i + "일"
    }
    const validateID = () => {

        axios.get("/api/user/signUp/idValidation", {
            params: {
                userId: id.current.value
            }
        })
            .then(res => {
                idState = res.data
                setIdState1(idState)
                if (idState === true) {
                    alert("사용 가능합니다.")
                } else alert("중복된 아이디 입니다.")
            })
            .catch(err => {
                idState = false
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
                nicknameState = res.data
                setNickState1(nicknameState)
                if (nicknameState === true) {
                    alert("사용 가능합니다.")
                } else alert("중복된 닉네임입니다.")
            })
            .catch(err => {
                nicknameState = false
                setNickState1(nicknameState);
                console.error(err)
                alert("양식을 확인해주세요.")
            })
    }

    const verificationCodeExpire = () => {
        let minute1 = Math.floor(expireTime / 60)
        let second1 = expireTime % 60
        let formattedSecond1 = second1.toString().padStart(2, '0')

        if (expireTime === -1) {

            axios.post("/api/user/signUp/deleteExpiredVerificationCode", null, {
                params: {
                    userEmail: email.current[0].value + "@" + email.current[1].value
                }
            }).then().catch()
            alert("시간이 초과되었습니다.")
            window.clearInterval(pause);

        }
        else setTimeRemaining([{minute: minute1, second: formattedSecond1}])
        console.log(expireTime)

        expireTime--
    }
    let pause

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
                    const play = (() => setInterval(verificationCodeExpire, 1000))
                    pause = play();

                } else alert("중복된 이메일입니다.")
            })
            .catch(() => alert("양식을 확인해주세요. (.com, .org, .net 만 가입 가능합니다.)"))
    }

    const confirmVerificationCode = () => {
        axios.get("/api/user/findMyInfo/byEmail/auth", {
            params: {
                userEmail: email.current[0].value + "@" + email.current[1].value,
                verificationCode: verificationCode1.current.value
            }
        }).then(() => {

            setDeleteFlag1("N");
            setEmailState1(true);
            alert("인증 되었습니다.")
            window.clearInterval(pause);
        }).catch(err => {
            alert("인증에 실패했습니다.")
            console.error(err)
        })
    }

    const verifyPassword = () => {

        console.log(confirmPassword)
        if (password.current.value === confirmPassword.current.value) {
            setIsPasswordMatch(true)
        } else setIsPasswordMatch(false)
    }

    const checkInputSize = (e) => {
        let size = e.target.value;

        if (size.length > 4) {
            e.target.value = size.substring(0, 4);
        }
    }
    const toSignUp = () => {

        const ret = window.confirm("등록하시겠습니까?")

        if (ret && (password.current.value === confirmPassword.current.value)) {
            axios.post("/api/user/signUp", null, {
                params: {
                    userId: id.current.value,
                    password: password.current.value,
                    username: username1.current.value,
                    nickname: nickname1.current.value,
                    userEmail: email.current[0].value + "@" + email.current[1].value,
                    userTel: tel.current[0].value + "-" + tel.current[1].value + "-" + tel.current[2].value,
                    userAddress: addressData +" "+ address.current.value,
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

    const genderChange = () => {

    }

    const openModal = () =>{
        setModalOpen(true)
    }

    const closeModal = () =>{
        setModalOpen(false)
    }

    const addressResult = (data) =>{
        setAddressData(data.address)
        setModalOpen(val=>!val)

    }

    // let i=0;
    // const createAccount = () => {
    //     i++;
    //
    //     axios.post("/api/user/signUp", null, {
    //         params: {
    //             userId: "qwer1234" + i,
    //             password: "rkddkwl1!",
    //             username: "박재원",
    //             nickname: "재원씨야" + i,
    //             userEmail: "ploi" + i + "@naver.com",
    //             userTel: "010-1234-1234",
    //             userAddress: "없음",
    //             gender: "남자",
    //             userAge: "1996-04-06",
    //             interest: "없음",
    //             deleteFlag: "Y"
    //
    //         }
    //     })
    //         .then(() => {
    //
    //         })
    //         .catch(err => {
    //             console.error(err)
    //         })
    //     console.log(i)
    // }
    // window.setInterval(createAccount,100);

    const [modalOpen,setModalOpen] = useState(false)

    const modalStyle = {
        content: {
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            minWidth:"500px",
            maxWidth:"700px",
            minHeight : "450px",
            maxHeight: "1000px",
            padding: "0px",
            border: "1px solid #ccc",
            borderRadius: "5px",
            boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
            margin:"0px",

        },
        overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 1000,
        },
    }
    const kakaoModalStyle={
        minHeight:"100%",
        minWidth :"100%"
    }

    return (
        <div className={style.container}>
            <Modal style={modalStyle} isOpen={modalOpen} onRequestClose={closeModal}>
                <DaumPostcode style={kakaoModalStyle} onComplete={addressResult}/>
            </Modal>

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
                    margin: "417px 0px 0px 530px"
                }}>중복확인
                </button>
                {!isEmailValidate ? <button onClick={validateEmail} style={{
                        width: "70px",
                        height: "30px",
                        borderRadius: "10px",
                        position: "absolute",
                        margin: "573px 0px 0px 530px"
                    }}>중복확인</button> :
                    <button onClick={confirmVerificationCode} style={{
                        width: "70px",
                        height: "30px",
                        borderRadius: "10px",
                        position: "absolute",
                        margin: "643px 0px 0px 530px"
                    }}>인증하기</button>}

                <p style={{fontSize: "30px", fontWeight: "600", margin: "20px 0px"}}>회원가입</p>
                <div><p style={{fontSize: "11px"}}>( <span>*</span> 는 필수 입력사항)</p></div>
                <div>
                    <div><span>*</span> 아이디</div>
                    <input ref={id} type="text" placeholder="특수문자 & 한글 제외 6~12글자"/></div>

                {idState1 ? <p style={{color: "green", fontSize: "12px"}}>사용 가능합니다.</p> : <pre> </pre>}


                <div>
                    <div><span>*</span> 비밀번호</div>
                    <input onInput={verifyPassword} ref={password} type="password" placeholder="숫자 영문자 특수문자 포함 8~15글자"/>
                </div>

                <div>
                    <div><span>*</span> 비밀번호 확인</div>
                    <input onInput={verifyPassword} ref={confirmPassword} type="password"
                           placeholder="설정한 비밀번호를 입력하세요"/>
                </div>
                {isPasswordMatch ? <p style={{color: "green", fontSize: "12px"}}>일치 합니다.</p> :
                    (confirmPassword !== undefined ? <p style={{color: "red", fontSize: "12px"}}>일치 하지 않습니다.</p> : "")}

                <div>
                    <div><span>*</span> 닉네임</div>
                    <input ref={nickname1} type="text" placeholder="특수문자 제외 4~20글자"/></div>

                {nickState1 ? <p style={{color: "green", fontSize: "12px"}}>사용 가능합니다.</p> : <pre> </pre>}

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
                {isEmailValidate && !emailState1 ? <p style={{color: "red", fontSize: "12px"}}>남은
                    시간 {timeRemaining[0].minute} : {timeRemaining[0].second}</p> : ""}
                {emailState1 ? <p style={{color: "green", fontSize: "12px"}}>인증 되었습니다.</p> : <pre> </pre>}

                <p style={{color: "red", fontSize: "10px"}}>{emailState}</p>

                <div>
                    <div><span>*</span> 전화번호</div>
                    <div>
                        <input style={{width: "81px", height: "30px"}} ref={el => tel.current[0] = el} type="number"
                               onInput={checkInputSize} placeholder="010"/>-
                        <input style={{width: "81px", height: "30px"}} ref={el => tel.current[1] = el} type="number"
                               onInput={checkInputSize} placeholder="1234"/>-
                        <input style={{width: "81px", height: "30px"}} ref={el => tel.current[2] = el} type="number"
                               onInput={checkInputSize} placeholder="5678"/>
                    </div>
                </div>

                <div>
                    <div><span>*</span> 주소</div>
                    <input readOnly onClick={openModal} value={addressData} type="text" placeholder="경기도 성남시 중원구 중앙로 326-21"/>
                </div>
                <div>
                    <div><span>*</span> 상세 주소</div>
                    <input ref={address} type="text" placeholder="105동 305호"/>
                </div>

                <div>
                    <div><span>*</span> 성별</div>
                    <div style={{width: "70%", display: "flex", justifyContent: "space-between"}}>
                        <input onChange={genderChange} ref={el => sex.current[0] = el} type="radio" value="남자" checked/>남자
                        <input onChange={genderChange} ref={el => sex.current[1] = el} type="radio" value="여자"/>여자
                    </div>
                </div>
                <div> 관심사
                    <div style={{width: "260px", height: "25px"}}>
                        <select style={{height: "25px"}} ref={interest}>
                            <option value={"없음"}>없음</option>
                            <option value={"아동도서"}>아동도서</option>
                            <option value={"세계도서"}>세계도서</option>
                            <option value={"국내도서"}>국내도서</option>
                        </select>
                    </div>
                </div>

                <div>
                    <div><span>*</span> 나이</div>
                    <div style={{width: "260px", height: "25px"}}>
                        <select style={{height: "25px"}} ref={age_year}>
                            {year.map(el => {
                                return (
                                    <option key={el} value={el}>{el}</option>
                                )
                            })}
                        </select>
                        <select style={{height: "25px", marginLeft: "20px"}} ref={age_month}>
                            {month.map(el => {
                                return (
                                    <option key={el} value={el}>{el}</option>
                                )
                            })}
                        </select>
                        <select style={{height: "25px", marginLeft: "20px"}} ref={age_date}>
                            {date.map(el => {
                                return (
                                    <option key={el} value={el}>{el}</option>
                                )
                            })}
                        </select>
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