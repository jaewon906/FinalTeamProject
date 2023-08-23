import style from "../../css/ADMIN/userManage.module.css"
import axios from "axios";
import {useEffect, useRef, useState} from "react";


let sort = "id";
let order = "ASC"
let page = "0"
let updateDataArr = [{}]
updateDataArr.pop()

export default function UserManage() {

    const userAmount = useRef();
    const keyword = useRef();
    const [btn, setBtn] = useState("")
    const [isOrder, setIsOrder] = useState(false);
    const [userInfo, setUserInfo] = useState([{}])
    const [searchResultLength, setSearchResultLength] = useState("")
    const [totalPage, setTotalPage] = useState()
    const [cat, setCat] = useState([false, false, false, false, false, false, false, false])
    const [currentPage, setCurrentPage] = useState("0")
    const [updateArrLength, setUpdateArrLength] = useState(0)
    const [loading, setLoading] = useState(false)


    useEffect(() => {
        axios.get("/api/admin/manage/user?page=" + page + "&size=100&sort=id,ASC")
            .then(res => {
                setUserInfo(res.data.content)
                setSearchResultLength(res.data.totalElements)
                setTotalPage(res.data.totalPages)
                setLoading(true)
            })
            .catch((e) => {
                console.error(e)
                alert("Error")
                window.location.href = "../"
            })


    }, [])

    const toSearch = () => {

        console.log(page)

        const size = userAmount.current.value;
        page = "0"
        setCurrentPage("0")
        dataTransfer1(size)
    }

    const toSearchWithUserAmount = () => {


        const size = userAmount.current.value;
        setCurrentPage("0")
        page = "0"

        dataTransfer1(size)

    }

    const dataTransfer1 = (size) => {
        setLoading(false)
        axios.get("/api/admin/manage/user/search?page=" + page + "&size=" + size + "&sort=" + sort + "," + order, {
            params: {
                keyword: keyword.current.value
            }
        })
            .then(res => {
                setUserInfo(res.data.content)
                setSearchResultLength(res.data.totalElements)
                setTotalPage(res.data.totalPages)
                setLoading(true)

            })
            .catch(e => {
                console.error(e)
            })
    }

    const toSearchWithPage = (e) => {
        setLoading(false)
        const size = userAmount.current.value;

        page = e.target.id
        setCurrentPage(e.target.id)

        axios.get("/api/admin/manage/user/search?page=" + page + "&size=" + size + "&sort=" + sort + "," + order, {
            params: {
                keyword: keyword.current.value
            }
        })
            .then(res => {
                setUserInfo(res.data.content)
                setSearchResultLength(res.data.totalElements)
                setLoading(true)
            })
            .catch(e => {
                console.error(e)
            })

    }


    const onEnter = (e) => {
        if (e.keyCode === 13) {
            toSearch()
        }
    }

    // false = DESC
    // true = ASC
    const sortMethod = (e) => {

        document.getElementById("userId").style.background = "#f2f4fa"
        document.getElementById("username").style.background = "#f2f4fa"
        document.getElementById("nickname").style.background = "#f2f4fa"
        document.getElementById("userNumber").style.background = "#f2f4fa"
        document.getElementById("userEmail").style.background = "#f2f4fa"
        document.getElementById("userAddress").style.background = "#f2f4fa"
        document.getElementById("userTel").style.background = "#f2f4fa"
        document.getElementById("deleteFlag").style.background = "#f2f4fa"

        e.target.style.backgroundColor = "#cbdfff"
        sort = e.target.id;

        if (btn !== sort) {
            console.log("달라달라")
            setBtn(sort)

            if (isOrder === true) {

                setIsOrder(false)
            }
            if (isOrder === false) {

                setIsOrder(true)
            }

            console.log(isOrder)

            switch (sort) {
                case "userId":
                    setCat([true, false, false, false, false, false, false, false]);
                    break;
                case "username":
                    setCat([false, true, false, false, false, false, false, false]);
                    break;
                case "nickname":
                    setCat([false, false, true, false, false, false, false, false]);
                    break;
                case "userNumber":
                    setCat([false, false, false, true, false, false, false, false]);
                    break;
                case "userEmail":
                    setCat([false, false, false, false, true, false, false, false]);
                    break;
                case "userAddress":
                    setCat([false, false, false, false, false, true, false, false]);
                    break;
                case "userTel":
                    setCat([false, false, false, false, false, false, true, false]);
                    break;
                case "deleteFlag":
                    setCat([false, false, false, false, false, false, false, true]);
                    break;
            }
        }

        if (btn === sort) {
            console.log("같아같아")
            setIsOrder(val => !val)
            console.log(isOrder)

            let idx = 0

            switch (sort) {
                case "userId":
                    idx = 0;
                    break;
                case "username":
                    idx = 1;
                    break;
                case "nickname":
                    idx = 2;
                    break;
                case "userNumber":
                    idx = 3;
                    break;
                case "userEmail":
                    idx = 4;
                    break;
                case "userAddress":
                    idx = 5;
                    break;
                case "userTel":
                    idx = 6;
                    break;
                case "deleteFlag":
                    idx = 7;
                    break;
            }

            setCat(val => {
                const newVal = [...val]
                for (let i = 0; i < newVal.length; i++) {
                    if (i !== idx) {
                        newVal[i] = false
                    }
                    if (i === idx) {
                        newVal[i] = !newVal[i]
                    }
                }
                return newVal
            });


        }

        if (isOrder === true) {
            order = "ASC"
        }

        if (isOrder === false) {
            order = "DESC"
        }

        toSearch()

    };

    const renderPagination = () => {

        const paginationButtons = [];
        let i = 1;
        let cnt = parseInt(page)

        if (totalPage >= 10) {

            if (cnt > 5) {

                let b = cnt + 10

                if (cnt > totalPage - 5) {

                    let c = totalPage - 5

                    for (let j = 0; j < 10; j++) {
                        paginationButtons.push(
                            <p style={{width:"60px", textAlign:"center"}} id={c - 5 + j + ""} key={c - 4 + j}
                               onClick={toSearchWithPage}>
                                {currentPage === (c - 5 + j) + "" ?
                                    <span id={c - 5 + j + ""}>{c - 4 + j}</span> : c - 4 + j}
                            </p>
                        );
                    }
                } else {
                    for (cnt; cnt < b; cnt++) {
                        paginationButtons.push(
                            <p style={{width:"60px", textAlign:"center"}} id={cnt - 5 + ""} key={cnt - 4} onClick={toSearchWithPage}>
                                {currentPage === (cnt - 5) + "" ? <span id={cnt - 5 + ""}>{cnt - 4}</span> : cnt - 4}
                            </p>
                        );
                    }
                }

            } else {
                for (i; i <= 10; i++) {
                    paginationButtons.push(
                        <p style={{width:"60px", textAlign:"center"}} id={i - 1 + ""} key={i} onClick={toSearchWithPage}>
                            {currentPage === (i - 1) + "" ? <span id={i - 1 + ""}>{i}</span> : i}
                        </p>
                    );
                }
            }
        } else {
            for (i; i <= totalPage; i++) {
                paginationButtons.push(
                    <p style={{width:"60px", textAlign:"center"}} id={i - 1 + ""} key={i} onClick={toSearchWithPage}>
                        {currentPage === (i - 1) + "" ? <span id={i - 1 + ""}>{i}</span> : i}
                    </p>
                );
            }
        }

        return (
            <div className={style.middlePagingBtnArea}>
                {paginationButtons}
            </div>
        );
    };

    const toSearchWithStartEndBtn = (val) => {

        setLoading(false)

        const size = userAmount.current.value;
        page = val

        axios.get("/api/admin/manage/user/search?page=" + page + "&size=" + size + "&sort=" + sort + "," + order, {
            params: {
                keyword: keyword.current.value
            }
        })
            .then(res => {
                setUserInfo(res.data.content)
                setSearchResultLength(res.data.totalElements)
                setTotalPage(res.data.totalPages)
                setCurrentPage(val + "")
                setLoading(true)

            })
            .catch(e => {
                console.error(e)
            })

    }

    const startEndBtn = (e) => {
        const btn = e.target.id

        switch (btn) {
            case "first":
                toSearchWithStartEndBtn(0);
                break;
            case "prev": {
                if (parseInt(page) - 10 >= 0) {

                    page = (parseInt(page) - 10) + ""
                } else {
                    page = 0
                }
                const a = page
                toSearchWithStartEndBtn(a)
            }
                break;
            case "next": {
                if (parseInt(page) + 10 <= totalPage) {

                    page = (parseInt(page) + 10) + ""
                } else {
                    page = totalPage - 1
                }
                const a = page
                toSearchWithStartEndBtn(a)
            }
                break;
            case "last":
                toSearchWithStartEndBtn(totalPage - 1);
                break;
        }
    }


    const visualizationModifyDataAndAddToArray = (e) => {
        let cnt = 0;
        let atUserNumber = e.currentTarget.parentNode.parentNode.children[3].textContent


        for (let i = 0; i < updateDataArr.length; i++) {
            if (updateDataArr[i].userNumber === atUserNumber) {
                cnt++;
            }
        }

        if (cnt === 0) {
            updateDataArr.push(
                {
                    userNumber: atUserNumber,
                    deleteFlag: e.currentTarget.value
                });
            console.log("저장됨")
            setUpdateArrLength(updateDataArr.length)
        }

        if (cnt === 1) {
            let filter = updateDataArr.filter(el => el.userNumber !== atUserNumber);

            filter.push({
                userNumber: atUserNumber,
                deleteFlag: e.currentTarget.value
            })

            updateDataArr = filter

            console.log("수정됨")
            setUpdateArrLength(updateDataArr.length)
        }

        e.currentTarget.style.backgroundColor = "yellow"
    }

    const updateUserState = () => {

        const ret = window.confirm("수정 하시겠습니까?")

        if (ret) {
            axios.post("/api/admin/manage/user/update", updateDataArr
            ).then(() => {
                alert("수정이 완료되었습니다.")
                window.location.reload()
            }).catch((e) => {
                console.error(e)
                alert("다시 시도해주세요")
            })
        }

    }

    const returnOptionElement = (deleteFlag, key, color) => {
        return (
            <select style={{background: color}} onChange={visualizationModifyDataAndAddToArray} id={`select${key}`}
                    defaultValue={deleteFlag}>
                <option value={"N"}>활성</option>
                <option value={"Y"}>휴면</option>
                <option value={"B"}>정지</option>
            </select>)
    }


    return (
        <>
            <div className={style.main}>
                <h1 style={{margin: "200px 0 80px 0 "}}>회원정보 리스트</h1>
                <div className={style.selectAndSearch}>
                    <div className={style.selectAndSearchBox}>
                        <p style={{lineHeight: "27px"}}>검색 결과 : <strong>{searchResultLength}개</strong></p>
                        <input ref={keyword} type={"search"} onKeyDown={onEnter} placeholder={"search"}/>
                        <select onChange={toSearchWithUserAmount} defaultValue={"100"} ref={userAmount}>
                            <option value={"10"}>10개</option>
                            <option value={"50"}>50개</option>
                            <option value={"100"}>100개</option>
                            <option value={"300"}>300개</option>
                            <option value={"500"}>500개</option>
                            <option value={"1000"}>1000개</option>
                        </select>
                    </div>
                </div>
                <div className={style.section}>
                    <div className={style.table}>
                        <div style={{position: "sticky", top: "0px", backgroundColor: "#f2f4fa"}}
                             className={style.userInfo}>
                            <div id={"userId"} onClick={sortMethod}
                                 className={`${style.userId} ${style.category}`}>아이디
                                {
                                    cat[0] ? <i className="fa-solid fa-caret-up"></i>
                                        : <i className="fa-solid fa-caret-down"></i>
                                }
                            </div>
                            <div id={"username"} onClick={sortMethod}
                                 className={`${style.username} ${style.category} `}>이름
                                {
                                    cat[1] ? <i className="fa-solid fa-caret-up"></i>
                                        : <i className="fa-solid fa-caret-down"></i>
                                }
                            </div>
                            <div id={"nickname"} onClick={sortMethod}
                                 className={`${style.nickname} ${style.category}`}>닉네임
                                {
                                    cat[2] ? <i className="fa-solid fa-caret-up"></i>
                                        : <i className="fa-solid fa-caret-down"></i>
                                }
                            </div>
                            <div id={"userNumber"} onClick={sortMethod}
                                 className={`${style.userNumber} ${style.category}`}>일련번호
                                {
                                    cat[3] ? <i className="fa-solid fa-caret-up"></i>
                                        : <i className="fa-solid fa-caret-down"></i>
                                }
                            </div>
                            <div id={"userEmail"} onClick={sortMethod}
                                 className={`${style.userEmail} ${style.category}`}>이메일
                                {
                                    cat[4] ? <i className="fa-solid fa-caret-up"></i>
                                        : <i className="fa-solid fa-caret-down"></i>
                                }
                            </div>
                            <div id={"userAddress"} onClick={sortMethod}
                                 className={`${style.userAddress} ${style.category}`}>주소
                                {
                                    cat[5] ? <i className="fa-solid fa-caret-up"></i>
                                        : <i className="fa-solid fa-caret-down"></i>
                                }
                            </div>
                            <div id={"userTel"} onClick={sortMethod}
                                 className={`${style.userTel} ${style.category}`}>연락처
                                {
                                    cat[6] ? <i className="fa-solid fa-caret-up"></i>
                                        : <i className="fa-solid fa-caret-down"></i>
                                }
                            </div>
                            <div id={"deleteFlag"} onClick={sortMethod} style={{borderRight:"none"}}
                                 className={`${style.userDeleteFlag} ${style.category}`}>계정상태
                                {
                                    cat[7] ? <i className="fa-solid fa-caret-up"></i>
                                        : <i className="fa-solid fa-caret-down"></i>
                                }
                            </div>
                        </div>
                        {loading ?
                            userInfo.map((el, key) => {
                                return (
                                    <div key={key} className={style.userInfo}>
                                        <div className={style.userId}>{el.userId}</div>
                                        <div className={style.username}>{el.username}</div>
                                        <div className={style.nickname}>{el.nickname}</div>
                                        <div className={style.userNumber}>{el.userNumber}</div>
                                        <div className={style.userEmail}>{el.userEmail}</div>
                                        <div
                                            className={style.userAddress}>{el.userAddress + " " + el.userDetailAddress}</div>
                                        <div className={style.userTel}>{el.userTel}</div>
                                        <div className={style.userDeleteFlag1}>
                                            {el.deleteFlag === "N" ? returnOptionElement(el.deleteFlag, key, "#52d75f") : ""}
                                            {el.deleteFlag === "Y" ? returnOptionElement(el.deleteFlag, key, "orange") : ""}
                                            {el.deleteFlag === "B" ? returnOptionElement(el.deleteFlag, key, "red") : ""}
                                        </div>
                                    </div>
                                )
                            })
                            :
                            <div className={style.loading}>
                                <h1>Loading...</h1>
                            </div>
                        }
                    </div>

                </div>
                <div style={{width:"100%", display:"flex", alignItems:"center",flexDirection:"column"}}>
                    <div className={style.pagingBtnArea}>
                        <div className={style.leftPagingBtnArea}>
                            <i id={"first"} onClick={startEndBtn} className="fa-solid fa-angles-left"></i>
                            {currentPage !== "0" ?
                                <i id={"prev"} onClick={startEndBtn} className="fa-solid fa-chevron-left"></i> : ""}
                        </div>
                        {renderPagination()}
                        <div className={style.rightPagingBtnArea}>
                            {currentPage !== (totalPage - 1) + "" ?
                                <i id={"next"} onClick={startEndBtn} className="fa-solid fa-chevron-right"></i> :
                                <div style={{width: "16px"}}></div>}
                            <i id={"last"} onClick={startEndBtn} className="fa-solid fa-angles-right"></i>
                        </div>
                    </div>
                    <div style={{width: "100%", display: "flex", justifyContent: "center", marginTop: "30px"}}>
                        {updateArrLength !== 0 ?
                            <button className={style.updateUserStateBtn} onClick={updateUserState}>수정하기</button> : ""}
                    </div>
                </div>
            </div>

        </>
    )
}