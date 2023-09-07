import axios from "axios";
import {useRef, useState} from "react";
import style from "../../css/ADMIN/registerBook.module.css"
import convertToWon from "../../js/convertToWon";

export default function RegisterBook() {

    const [isDuplicate, setIsDuplicate] = useState({})
    const [tgr, setTgr] = useState(false)
    const isbn13 = useRef();
    const urlPattern = /https?:\/\/[^\s]+/g;
    const [urls, setUrls] = useState("")
    const validateDuplicateBook = () => {

        axios.get("/api/admin/manage/product/duplicateValidation", {
            params: {
                isbn13: isbn13.current.value
            }
        })
            .then((res) => {

                setIsDuplicate(res.data)
                setTgr(true)

                if(res.data.previewImgList){
                    setUrls(res.data.previewImgList.match(urlPattern)[0].split("\"")[0])
                }

                if(res.data.previewImgList===null){
                    setUrls(null)
                }

            })
            .catch(e => {
                console.error(e)
                setTgr(false)
            })


    }

    const register = () => {
        axios.post("/api/admin/manage/product/register",null,{
            params:{
                isbn13:isbn13.current.value
            }
        })
            .then((res) => {
                alert("등록 되었습니다.")
            })
            .catch(e => {
                alert("알라딘에는 등록되어 있지 않습니다.")
                console.error(e)
            })
    }

    const onEnter = (e) => {
        if (e.keyCode === 13) {
            validateDuplicateBook()
        }
    }

    return (
        <div className={style.main}>
            <h1>상품 등록</h1>
            <div className={style.section}>
                <div className={style.section1}>
                    <h2>ISBN 코드 입력</h2>
                    <input onKeyUp={onEnter} type={"number"} ref={isbn13}/>
                    <button onClick={validateDuplicateBook}>중복 체크</button>
                </div>
                <div className={style.section2}>
                    {tgr ?
                        (urls === null ?
                                <>
                                    <h2>등록되지 않은 상품입니다.</h2>
                                    <button onClick={register}>등록하기</button>
                                </> :
                                <div style={{display:"flex", alignItems:"center", marginTop:"100px", width:"100%"}}>
                                    <div style={{width:"50%", display:"flex", justifyContent:"center"}}>
                                        <img src={urls} alt={""}/>
                                    </div>
                                    <div style={{width:"50%", height:"100%"}}>
                                        <table style={{height:"100%"}}>
                                            <tbody>
                                            <tr>
                                                <td>제목</td>
                                                <td>{isDuplicate.title}</td>
                                            </tr>
                                            <tr>
                                                <td>작가 </td>
                                                <td>{isDuplicate.author}</td>
                                            </tr>
                                            <tr>
                                                <td>출판사 </td>
                                                <td>{isDuplicate.publisher}</td>
                                            </tr>
                                            <tr>
                                                <td>가격 </td>
                                                <td>{convertToWon(isDuplicate.priceSales, null)} 원</td>
                                            </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                        ) : ""}
                </div>
            </div>
        </div>

    );
};