import axios from "axios";
import {useEffect, useRef, useState} from "react";
import style from "../../css/MyPage/myPage.module.css"
import Modal from "react-modal";
import DaumPostcode from "react-daum-postcode";

export default function MyPage(props) {

    const [myInfo, setMyInfo] = useState();

    const nickname1 = useRef();
    const tel = useRef([]);
    const address = useRef();
    const detailAddress = useRef()
    const gender = useRef([]);
    const [genderValue, setGenderValue] = useState("")
    const username1 = useRef();
    const [addressData, setAddressData] = useState("");

    let nicknameState = false

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


    useEffect(() => {

        console.log(props.userInfo)
        setMyInfo(props.userInfo)

        setAddressData(() => {

            return props.userInfo.userAddress.split("(")[0] + "(" + props.userInfo.userAddress.split("(")[1]
        })

        setGenderValue(props.userInfo.gender)

        if (myInfo !== undefined) {
            switch (myInfo.gender) {
                case "남자" :
                    gender.current[0].checked = true
                    gender.current[1].checked = false

                    break;
                case "여자" :
                    gender.current[0].checked = false
                    gender.current[1].checked = true

                    break;
                default:
            }
        }

    }, [myInfo,props.userInfo])


    const validateNickname = () => {

        axios.get("/api/user/signUp/nicknameValidation", {
            params: {
                nickname: nickname1.current.value
            }
        })
            .then(res => {
                nicknameState = res.data
                if (nicknameState === true) {
                    alert("사용 가능합니다.")
                } else alert("중복된 닉네임입니다.")
            })
            .catch(err => {
                nicknameState = false
                console.error(err)
                alert("양식을 확인해주세요.")
            })
    }


    const checkInputSize = (e) => {
        let size = e.target.value;

        if (size.length > 4) {
            e.target.value = size.substring(0, 4);
        }
    }

    const toUpdate = () => {

        const ret = window.confirm("수정 하시겠습니까?")

        if (ret) {
            axios.post("/api/user/myPage/update", null, {
                params: {
                    username: username1.current.value,
                    nickname: nickname1.current.value,
                    userAddress: address.current.value,
                    userDetailAddress: detailAddress.current.value,
                    gender: genderValue,
                    userTel: tel.current[0].value + "-" + tel.current[1].value + "-" + tel.current[2].value,
                    userNumber: myInfo.userNumber
                }
            })
                .then(() => {
                    alert("수정이 완료되었습니다.")
                    window.location.href = "/home/"

                })
                .catch(err => {
                    console.error(err)
                    alert("가입 양식을 확인해주세요.")
                })
        } else alert("비밀번호를 확인하세요")

    }

    const toDelete = () => {
        const ret = window.confirm("정말 회원탈퇴를 하시겠습니까? 탈퇴하실 경우 14일동안 휴면 상태로 전환되며 기간 안에 회원 복구를 진행하지 않을 경우 자동으로 탈퇴됩니다. 계속하시겠습니까?")

        if (ret) {
            const ret1 = window.prompt("암호를 입력하세요")

            axios.get("/api/user/logIn", {
                params: {
                    userId: myInfo.userId, password: ret1
                }
            }).then(() => {
                axios.post("/api/user/withdrawal", "", {
                    params: {
                        userNumber: myInfo.userNumber
                    }
                }).then(() => {
                    alert("그동안 이용해 주셔서 감사합니다.")
                    axios.get("/api/user/logOut")
                        .then()
                        .catch(err => console.error(err))
                    window.location.href = "/home/"
                })
                    .catch(() => {
                        alert("잠시후 다시 시도해주세요.")
                    })
            }).catch(() => alert("암호가 일치하지 않습니다."))
        }
    }

    const openModal = () => {
        setModalOpen(true)
    }

    const closeModal = () => {
        setModalOpen(false)
    }

    const addressResult = (data) => {
        setAddressData([data.roadAddress+ " (" + data.zonecode + ")"])

        setModalOpen(val => !val)

    }

    const genderChange = (e) => {

        gender.current[0].checked = false
        gender.current[1].checked = false

        e.target.checked = !e.target.checked

        setGenderValue(e.target.value)
    }

    const [modalOpen, setModalOpen] = useState(false)

    const modalStyle = {
        content: {
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            height: "500px",
            minWidth: "500px",
            padding: "0px",
            border: "1px solid #ccc",
            margin: "0px",

        }, overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.5)", zIndex: 1000,
        },
    }
    const kakaoModalStyle = {
        minHeight: "450px", minWidth: "100%"
    }

    return (
        <div className={style.container}>
            {myInfo !== undefined ?
                <div className={style.main}>
                    <Modal style={modalStyle} ariaHideApp={false} isOpen={modalOpen} onRequestClose={closeModal}>
                        <div style={{
                            width: "100%",
                            height: "50px",
                            backgroundColor: "#a0a0a0",
                            display: "flex",
                            alignItems: "center"
                        }}>
                            <p style={{color: "white", fontWeight: "bold", marginLeft: "20px"}}>우편번호 검색</p>
                            <i style={{cursor: "pointer", marginLeft: "calc(100% - 150px)"}} onClick={closeModal}
                               className="fa-solid fa-x"></i>
                        </div>
                        <DaumPostcode style={kakaoModalStyle} onComplete={addressResult}/>
                    </Modal>
                    <br/><br/><h2>회원수정</h2><br/><br/>
                    <div className={style.section}>
                        <div style={{width: "100px"}}><p style={{fontSize: "12px"}}>아이디</p></div>
                        <input style={{backgroundColor: "#d3d3d3"}} type={"text"} readOnly
                               defaultValue={myInfo.userId}/>
                    </div>

                    <div className={style.section}>
                        <div style={{width: "100px"}}><p style={{fontSize: "12px"}}>닉네임</p></div>
                        <div style={{display: "flex", alignItems: "center", marginLeft: "50px"}}>
                            <input ref={nickname1} type={"text"} defaultValue={myInfo.nickname}
                                   placeholder={"특수문자 제외 4~20글자"}/>
                            <button onClick={validateNickname} className={style.validateBtn}>중복 확인</button>
                        </div>
                    </div>

                    <div className={style.section}>
                        <div style={{width: "100px"}}><p style={{fontSize: "12px"}}>이름</p></div>
                        <input ref={username1} defaultValue={myInfo.username}/>
                    </div>

                    <div className={style.section}>
                        <div style={{width: "100px"}}><p style={{fontSize: "12px"}}>이메일</p></div>
                        <input style={{backgroundColor: "#d3d3d3"}} defaultValue={myInfo.userEmail} readOnly/>
                    </div>

                    <div className={style.section}>
                        <div style={{width: "100px"}}><p style={{fontSize: "12px"}}>전화번호</p></div>
                        <div style={{display: "flex", alignItems: "center", marginLeft: "50px"}}>
                            <input onInput={checkInputSize} style={{width: "54px"}} ref={el => tel.current[0] = el}
                                   defaultValue={myInfo.userTel.split("-")[0]}/>
                            <pre> - </pre>
                            <input onInput={checkInputSize} style={{width: "100px"}} ref={el => tel.current[1] = el}
                                   defaultValue={myInfo.userTel.split("-")[1]}/>
                            <pre> - </pre>
                            <input onInput={checkInputSize} style={{width: "100px"}} ref={el => tel.current[2] = el}
                                   defaultValue={myInfo.userTel.split("-")[2]}/>
                        </div>

                    </div>

                    <div className={style.section}>
                        <div style={{width: "100px"}}><p style={{fontSize: "12px"}}>주소</p></div>
                        <div style={{display: "flex", alignItems: "center", marginLeft: "50px"}}>
                            <input ref={address} readOnly value={addressData}/>
                            <button onClick={openModal} className={style.validateBtn}>주소찾기</button>
                        </div>
                    </div>

                    <div className={style.section}>
                        <div style={{width: "100px"}}><p style={{fontSize: "12px"}}>상세 주소</p></div>
                        <input ref={detailAddress} defaultValue={myInfo.userDetailAddress}/>
                    </div>

                    <div className={style.section}>
                        <div style={{width: "100px"}}><p style={{fontSize: "12px"}}>성별</p></div>
                        <div style={{
                            width: "300px",
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            marginLeft: "50px"
                        }}>
                            <input style={{width: "20px"}} name={"male"} onClick={genderChange}
                                   ref={el => gender.current[0] = el} type="radio" value="남자"/>남자
                            <input style={{width: "20px"}} name={"female"} onClick={genderChange}
                                   ref={el => gender.current[1] = el} type="radio" value="여자"/>여자
                        </div>
                    </div>

                    <div className={style.section}>
                        <div style={{width: "100px"}}><p style={{fontSize: "12px"}}>나이</p></div>
                        <input style={{backgroundColor: "#d3d3d3"}} readOnly defaultValue={myInfo.userAge}/>
                    </div>

                    <div style={{
                        margin: "30px 0 50px 0", width: "490px", display: "flex", justifyContent: "space-between"
                    }}>
                        <button className={style.cancelBtn} onClick={() => {
                            alert("회원 수정을 취소하시겠습니까? 작성된 데이터들은 저장되지 않습니다.")
                            window.location.href = "/home/"
                        }}>취소하기
                        </button>
                        <button className={style.modifyBtn} onClick={toUpdate}>수정하기</button>
                    </div>
                    <button className={style.deleteBtn} onClick={toDelete}>탈퇴하기</button>

                </div> : ""

            }
        </div>
    )
}