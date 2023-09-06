import style from "../../css/ADMIN/productManage.module.css"
import axios from "axios";
import {useEffect, useRef, useState} from "react";
import convertToWon from "../../js/convertToWon";



let sort = "bookId";
let order = "ASC"
let page = "0"
let updateDataArr = [{}]
updateDataArr.pop()

export default function ProductManage() {

    const userAmount = useRef();
    const keyword = useRef();
    const [btn, setBtn] = useState("")
    const [isOrder, setIsOrder] = useState(false);
    const [productInfo, setProductInfo] = useState([{}])
    const [searchResultLength, setSearchResultLength] = useState("")
    const [totalPage, setTotalPage] = useState()
    const [cat, setCat] = useState([false, false, false, false, false, false, false, false])
    const [currentPage, setCurrentPage] = useState("0")
    const [updateArrLength, setUpdateArrLength] = useState(0)
    const [loading, setLoading] = useState(false)


    useEffect(() => {
        axios.get("/api/admin/manage/product?page=" + page + "&size=100&sort=bookId,ASC")
            .then(res => {
                console.log(res.data)
                setProductInfo(res.data.content)
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
        axios.get("/api/admin/manage/product/search?page=" + page + "&size=" + size + "&sort=" + sort + "," + order, {
            params: {
                keyword: keyword.current.value
            }
        })
            .then(res => {
                setProductInfo(res.data.content)
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

        axios.get("/api/admin/manage/order/search?page=" + page + "&size=" + size + "&sort=" + sort + "," + order, {
            params: {
                keyword: keyword.current.value
            }
        })
            .then(res => {
                setProductInfo(res.data.content)
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

        document.getElementById("orderNumber").style.background = "#f2f4fa"
        document.getElementById("orderName").style.background = "#f2f4fa"
        document.getElementById("username").style.background = "#f2f4fa"
        document.getElementById("userAddress").style.background = "#f2f4fa"
        document.getElementById("userTel").style.background = "#f2f4fa"
        document.getElementById("totalPrice").style.background = "#f2f4fa"
        document.getElementById("orderState").style.background = "#f2f4fa"

        e.target.style.backgroundColor = "#cbdfff"
        sort = e.target.id;

        if (btn !== sort) {
            setBtn(sort)

            if (isOrder === true) {

                setIsOrder(false)
            }
            if (isOrder === false) {

                setIsOrder(true)
            }


            switch (sort) {
                case "orderNumber":
                    setCat([true, false, false, false, false, false, false, false]);
                    break;
                case "orderName":
                    setCat([false, true, false, false, false, false, false, false]);
                    break;
                case "username":
                    setCat([false, false, true, false, false, false, false, false]);
                    break;
                case "userAddress":
                    setCat([false, false, false, true, false, false, false, false]);
                    break;
                case "userTel":
                    setCat([false, false, false, false, true, false, false, false]);
                    break;
                case "totalPrice":
                    setCat([false, false, false, false, false, true, false, false]);
                    break;
                case "orderState":
                    setCat([false, false, false, false, false, false, true, false]);
                    break;
                case "deleteFlag":
                    setCat([false, false, false, false, false, false, false, true]);
                    break;
                default:
            }
        }

        if (btn === sort) {
            setIsOrder(val => !val)

            let idx = 0

            switch (sort) {
                case "orderNumber":
                    idx = 0;
                    break;
                case "orderName":
                    idx = 1;
                    break;
                case "username":
                    idx = 2;
                    break;
                case "userAddress":
                    idx = 3;
                    break;
                case "userTel":
                    idx = 4;
                    break;
                case "totalPrice":
                    idx = 5;
                    break;
                case "orderState":
                    idx = 6;
                    break;
                case "deleteFlag":
                    idx = 7;
                    break;
                default:
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
                            <p style={{width: "60px", textAlign: "center"}} id={c - 5 + j + ""} key={c - 4 + j}
                               onClick={toSearchWithPage}>
                                {currentPage === (c - 5 + j) + "" ?
                                    <span id={c - 5 + j + ""}>{c - 4 + j}</span> : c - 4 + j}
                            </p>
                        );
                    }
                } else {
                    for (cnt; cnt < b; cnt++) {
                        paginationButtons.push(
                            <p style={{width: "60px", textAlign: "center"}} id={cnt - 5 + ""} key={cnt - 4}
                               onClick={toSearchWithPage}>
                                {currentPage === (cnt - 5) + "" ? <span id={cnt - 5 + ""}>{cnt - 4}</span> : cnt - 4}
                            </p>
                        );
                    }
                }

            } else {
                for (i; i <= 10; i++) {
                    paginationButtons.push(
                        <p style={{width: "60px", textAlign: "center"}} id={i - 1 + ""} key={i}
                           onClick={toSearchWithPage}>
                            {currentPage === (i - 1) + "" ? <span id={i - 1 + ""}>{i}</span> : i}
                        </p>
                    );
                }
            }
        } else {
            for (i; i <= totalPage; i++) {
                paginationButtons.push(
                    <p style={{width: "60px", textAlign: "center"}} id={i - 1 + ""} key={i} onClick={toSearchWithPage}>
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

        axios.get("/api/admin/manage/product/search?page=" + page + "&size=" + size + "&sort=" + sort + "," + order, {
            params: {
                keyword: keyword.current.value
            }
        })
            .then(res => {
                setProductInfo(res.data.content)
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
            default:
        }
    }


    const visualizationModifyDataAndAddToArray = (e) => {

        let cnt = 0;
        let atOrderNumber = e.currentTarget.parentNode.parentNode.children[0].textContent


        for (let i = 0; i < updateDataArr.length; i++) {
            if (updateDataArr[i].isbn13 === atOrderNumber) {
                cnt++;
            }
        }

        if (cnt === 0) {
            updateDataArr.push(
                {
                    orderNumber: atOrderNumber,
                    orderState: e.currentTarget.value
                });
            setUpdateArrLength(updateDataArr.length)
        }

        if (cnt === 1) {
            let filter = updateDataArr.filter(el => el.userNumber !== atOrderNumber);

            filter.push({
                orderNumber: atOrderNumber,
                orderState: e.currentTarget.value
            })

            updateDataArr = filter

            setUpdateArrLength(updateDataArr.length)
        }

        e.currentTarget.style.backgroundColor = "yellow"
    }

    const updateUserState = () => {

        const ret = window.confirm("수정 하시겠습니까?")

        if (ret) {
            axios.post("/api/admin/manage/product/update", updateDataArr
            ).then(() => {
                alert("수정이 완료되었습니다.")
                window.location.reload()
            }).catch((e) => {
                console.error(e)
                alert("다시 시도해주세요")
            })
        }

    }

    const returnOptionElement = (productState, key) => {
        return (
            <select onChange={visualizationModifyDataAndAddToArray} id={`select${key}`}
                    defaultValue={productState}>
                <option value={"재고 있음"}>재고 있음</option>
                <option value={"품절"}>품절</option>
            </select>)
    }


    return (
        <>
            <div className={style.main}>
                <h1 style={{margin: "100px 0 50px 0 "}}>상품 리스트</h1>
                <div className={style.selectAndSearch}>
                    <button
                        onClick={()=>{
                            window.location.href="product/register"
                        }}
                        className={style.registerBookBtn}>등록하기</button>
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
                            <option value={"2000"}>2000개</option>
                        </select>
                    </div>
                </div>
                <div className={style.section}>
                    <div className={style.table}>
                        <div style={{position: "sticky", top: "0px", backgroundColor: "#f2f4fa"}}
                             className={style.productInfo}>
                            <div id={"orderNumber"} onClick={sortMethod}
                                 className={`${style.isbn13} ${style.category}`}>isbn
                                {
                                    cat[0] ? <i className="fa-solid fa-caret-up"></i>
                                        : <i className="fa-solid fa-caret-down"></i>
                                }
                            </div>
                            <div
                                 className={`${style.cover} `}>책 표지
                                {

                                }
                            </div>
                            <div id={"username"} onClick={sortMethod}
                                 className={`${style.title} ${style.category}`}>제목
                                {
                                    cat[2] ? <i className="fa-solid fa-caret-up"></i>
                                        : <i className="fa-solid fa-caret-down"></i>
                                }
                            </div>
                            <div id={"userAddress"} onClick={sortMethod}
                                 className={`${style.author} ${style.category}`}>작가
                                {
                                    cat[3] ? <i className="fa-solid fa-caret-up"></i>
                                        : <i className="fa-solid fa-caret-down"></i>
                                }
                            </div>
                            <div id={"userTel"} onClick={sortMethod}
                                 className={`${style.publisher} ${style.category}`}>출판사
                                {
                                    cat[4] ? <i className="fa-solid fa-caret-up"></i>
                                        : <i className="fa-solid fa-caret-down"></i>
                                }
                            </div>
                            <div id={"totalPrice"} onClick={sortMethod}
                                 className={`${style.price} ${style.category}`}>가격
                                {
                                    cat[5] ? <i className="fa-solid fa-caret-up"></i>
                                        : <i className="fa-solid fa-caret-down"></i>
                                }
                            </div>
                            <div id={"orderState"} onClick={sortMethod}
                                 className={`${style.productState} ${style.category}`}>재고 상태
                                {
                                    cat[6] ? <i className="fa-solid fa-caret-up"></i>
                                        : <i className="fa-solid fa-caret-down"></i>
                                }
                            </div>
                        </div>
                        {loading ?
                            productInfo.map((el, key) => {

                                const imgUrl = el.previewImgList
                                const urlPattern = /https?:\/\/[^\s]+/g;
                                const urls = imgUrl.match(urlPattern)[0].split("\"")[0];

                                const toOrderDetail = () =>

                                {
                                    window.location.href = `/admin/manage/orderDetail/order?orderNumber=${el.isbn13}`
                                }

                                return (
                                    <div key={key} style={{height:"100px"}} className={style.productInfo}>
                                        <div onClick={toOrderDetail} style={{color:"red"}} className={style.isbn13}>{el.isbn13}</div>
                                        <div style={{justifyContent:"center"}} className={style.cover}>
                                            <img src={urls} alt={""}/>
                                        </div>
                                        <div className={style.title}>{el.title}</div>
                                        <div className={style.author}>{el.author}</div>
                                        <div className={style.publisher}>{el.publisher}</div>
                                        <div
                                            className={style.price}>{convertToWon(el.priceSales
                                            .toString(), null)} 원
                                        </div>
                                        <div className={style.productState}>
                                            {returnOptionElement(el.productState, key)}
                                        </div>
                                    </div>

                                )
                            })
                            :
                            <div className={style.loadingBox}>
                                <div className={style.loading}></div>
                            </div>
                        }
                    </div>

                </div>
                <div style={{width: "100%", display: "flex", alignItems: "center", flexDirection: "column"}}>
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