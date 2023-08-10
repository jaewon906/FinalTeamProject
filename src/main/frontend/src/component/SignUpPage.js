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
    const username = useRef();
    const interest = useRef();
    const [idState, setIdState] = useState();
    const [nicknameState, setNicknameState] = useState();
    const [emailState, setEmailState] = useState();


    const validateID = () => {
        axios.get("/api/user/signUp/idValidation", {
            params: {
                userId: id.current.value
            }
        })
            .then(res => setIdState(res.data))
            .catch()

    }
    const validateNickname = () => {
        axios.get("/api/user/signUp/nicknameValidation", {
            params:
                {
                    nickname: nickname1.current.value
                }
        })
            .then(res => setNicknameState(res.data))
            .catch()
    }
    const validateEmail = () => {
        axios.get("/api/user/signUp/emailValidation", {
            params: {
                userEmail:  email.current[0].value + "@" + email.current[1].value
            }
        })
            .then(res => {
                setEmailState(res.data)
                if (emailState === true) {
                    alert("전송되었습니다.")
                }
                else alert("중복된 이메일입니다.")
            })
            .catch(e=>alert("중복된 이메일입니다."))
    }
    const toSignUp = () => {

        axios.post("/api/user/signUp", null, {
            params: {
                userId: id.current.value,
                password: password.current.value,
                username: username.current.value,
                nickname: nickname1.current.value,
                userEmail: email.current[0].value + "@" + email.current[1].value,
                userTel: tel.current[0].value + "-" + tel.current[1].value + "-" + tel.current[2].value,
                userAddress: address.current.value,
                gender: sex.current[0].value,
                userAge:age.current.value,
                interest:interest.current.value
            }
        })
            .then(() => {
                const ret = window.confirm("등록하시겠습니까?")

                if(ret){
                    alert("회원가입이 완료되었습니다.")
                    window.location.href="/"
                }
            })
            .catch(err => {console.error(err)
                alert("아이디, 닉네임 중복 및 이메일 인증을 진행해주세요")
            })


    }

    return (
        <div className={style.container}>
            <div className={style.main}>
                <button onClick={validateID} style={{width:"70px", height:"40px", borderRadius:"10px", position:"absolute", margin:"105px 0px 0px 530px"}}>인증하기</button>
                <button onClick={validateNickname} style={{width:"70px", height:"40px", borderRadius:"10px", position:"absolute", margin:"270px 0px 0px 530px"}}>인증하기</button>
                <button onClick={validateEmail} style={{width:"70px", height:"40px", borderRadius:"10px", position:"absolute", margin:"345px 0px 0px 530px"}}>인증하기</button>

                <p style={{position:"relative",  fontSize:"30px", fontWeight:"600", margin:"20px 0px"}}>회원가입</p>
                <div>아이디<input ref={id} type="text" placeholder="아이디"/></div>

                {idState ?
                    <p style={{color:"red", fontSize:"10px"}}>아이디가 중복됩니다.</p>:
                    <p style={{color:"green", fontSize:"10px"}}>통과 되었습니다.</p>
                }


                <div>비밀번호<input ref={password} type="password" placeholder="비밀번호"/></div>

                <div>닉네임<input ref={nickname1} type="text" placeholder="닉네임"/></div>

                {nicknameState ?
                    <p style={{color:"red", fontSize:"10px"}}>닉네임이 중복됩니다.</p> :
                    <p style={{color:"green", fontSize:"10px"}}>통과 되었습니다.</p>
                }

                <div>이름<input ref={username} type="text" placeholder="닉네임"/></div>



                <div>이메일
                    <div>
                        <input ref={el => email.current[0] = el} type="text" placeholder="qwer1234"/>
                        @
                        <input ref={el => email.current[1] = el} type="text"
                    placeholder="naver.com"/>

                    </div>
                </div>

                <p style={{color:"red", fontSize:"10px"}}>{emailState}</p>

                <div>전화번호
                    <div>
                        <input ref={el => tel.current[0] = el} type="number" placeholder="010"/>-
                        <input ref={el => tel.current[1] = el} type="number" placeholder="1234"/>-
                        <input ref={el => tel.current[2] = el} type="number" placeholder="5678"/>
                    </div>
                </div>

                <div>주소<input ref={address} type="text" placeholder="경기도 성남시 중원구 중앙로 326-21"/></div>

                <div>성별
                    <div style={{width: "70%", display: "flex", justifyContent: "space-between"}}>
                        <input ref={el => sex.current[0] = el} type="radio" value="남자" checked/>남자
                        <input ref={el => sex.current[1] = el} type="radio" value="여자"/>여자
                    </div>
                </div>
                <div>관심사
                    <div style={{width: "260px", height:"25px"}}>
                        <input ref={interest} type="text" placeholder={"관심사"}/>
                    </div>
                </div>

                <div>나이
                    <div style={{width: "260px", height:"25px"}}>
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