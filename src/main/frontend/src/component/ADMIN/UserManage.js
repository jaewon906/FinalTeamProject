import style from "../../css/ADMIN/userManage.module.css"
import axios from "axios";
import {useEffect, useRef, useState} from "react";


let sort = "id";
let order = "DESC"
let page = "0"
export default function UserManage() {

    const userAmount = useRef();
    const keyword = useRef();
    const [btn, setBtn] = useState("")
    const [isOrder, setIsOrder] = useState(false);
    const [userInfo, setUserInfo] = useState([{}])
    const [searchResultLength, setSearchResultLength] = useState("")
    const [totalPage, setTotalPage] = useState("5")
    const [cat, setCat] = useState([false, false, false, false, false, false, false, false])
    const [currentPage, setCurrentPage] = useState("0")

    useEffect(() => {
        axios.get("/api/admin/manage/user?page=" + page + "&size=100&sort=id,DESC")
            .then(res => {
                setUserInfo(res.data.content)
                setSearchResultLength(res.data.totalElements)
                setTotalPage(res.data.totalPages)
                console.log(res.data.totalPages)
            })
            .catch((e) => {
                console.error(e)
            })

    }, [])

    const toSearch = () => {

        setUserInfo([{}])
        console.log(page)

        const size = userAmount.current.value;

        dataTransfer1(size)
    }

    const toSearchWithUserAmount = () => {

        setUserInfo([{}])

        const size = userAmount.current.value;
        page="0"

        dataTransfer1(size)

    }

    const dataTransfer1 = (size) =>{
        axios.get("/api/admin/manage/user/search?page=" + page + "&size=" + size + "&sort=" + sort + "," + order, {
            params: {
                keyword: keyword.current.value
            }
        })
            .then(res => {
                setUserInfo(res.data.content)
                setSearchResultLength(res.data.totalElements)
                setTotalPage(res.data.totalPages)
                setCurrentPage("0")

            })
            .catch(e => {
                console.error(e)
            })
    }

    const toSearchWithPage = (e) => {

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
            setIsOrder(true)
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
                    newVal[i] = !newVal[i]
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

        if(totalPage>=10){
            for (i; i <= 10; i++) {
                paginationButtons.push(
                    <p style={{margin:"0 10px"}} id={i-1+""} key={i} onClick={toSearchWithPage}>
                        {currentPage===(i-1)+""?<span>{i}</span>:i}
                    </p>
                );
            }
        }
        else{
            for (i; i <= totalPage; i++) {
                paginationButtons.push(
                    <p style={{margin:"0 10px"}} id={i-1+""} key={i} onClick={toSearchWithPage} >
                        {currentPage===(i-1)+""?<span>{i}</span>:i}
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

        setUserInfo([{}])

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
                setCurrentPage(val+"")

            })
            .catch(e => {
                console.error(e)
            })

    }

    const startEndBtn=(e)=>{
        const btn = e.target.id

        switch (btn){
            case "first":toSearchWithStartEndBtn(0);break;
            case "prev":toSearchWithStartEndBtn(--page);break;
            case "next":toSearchWithStartEndBtn(++page);break;
            case "last":toSearchWithStartEndBtn(totalPage-1);break;
        }
    }

    return (
        <>
            {userInfo !== [{}] ?
                <div className={style.main}>
                    <h1 style={{margin: "200px 0 100px 0 "}}>회원정보 리스트</h1>
                    <div className={style.selectAndSearch}>
                        <div className={style.selectAndSearchBox}>
                            <p>검색 결과 : <strong>{searchResultLength}개</strong></p>
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
                                <div id={"deleteFlag"} onClick={sortMethod}
                                     className={`${style.userDeleteFlag} ${style.category}`}>계정상태
                                    {
                                        cat[7] ? <i className="fa-solid fa-caret-up"></i>
                                            : <i className="fa-solid fa-caret-down"></i>
                                    }
                                </div>
                            </div>
                            {
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
                                            <div className={style.userDeleteFlag}>{el.deleteFlag}</div>
                                        </div>
                                    )
                                })
                            }
                        </div>

                    </div>
                    <div className={style.pagingBtnArea}>
                        <div className={style.leftPagingBtnArea}>
                            <p id={"first"} onClick={startEndBtn}>&lt;&lt;</p>
                            {currentPage==="1"?<p id={"prev"} onClick={startEndBtn}>&lt;</p>:""}
                        </div>
                        {renderPagination()}
                        <div className={style.rightPagingBtnArea}>
                            <p id={"next"} onClick={startEndBtn}>&gt;</p>
                            <p id={"last"} onClick={startEndBtn}>&gt;&gt;</p>
                        </div>

                    </div>
                </div> : ""}</>

    )
}