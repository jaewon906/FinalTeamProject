import axios from "axios";
import {useRef, useState} from "react";
import style from "../../css/ADMIN/registerBook.module.css"
export default function RegisterBook() {

    const [isDuplicate, setIsDuplicate]=  useState([{}])
    const keyword = useRef();
    const validateDuplicateBook = () =>{
        axios.get("api/admin/manage/product/validateRegister",{
            params:{
                isbn13:keyword.current.value
            }
        })
            .then((res)=>{
                setIsDuplicate(res.data)
            })
            .catch(e=>{
                console.error(e)
            })
    }

    const register = () =>{
        axios.get("api/admin/manage/product/register")
            .then((res)=>{})
            .catch(e=>{
                console.error(e)
            })
    }

    return (
        <div className={style.main}>
            <h1>상품 등록</h1>
            <div className={style.section}>
                <div className={style.section1}>
                    <h3>isbn코드 입력</h3>
                    <input ref={keyword}/>
                    <button onClick={validateDuplicateBook}>중복 체크</button>
                </div>
                <div className={style.section2}>
                    {isDuplicate.map((el,idx)=>{

                    })}
                </div>
            </div>
        </div>

    );
};