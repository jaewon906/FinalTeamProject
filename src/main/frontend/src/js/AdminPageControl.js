import {useEffect} from "react";

export default function AdminPageControl(){
    useEffect(()=>{
        document.getElementById("adminOnly").remove()
    },[])
}