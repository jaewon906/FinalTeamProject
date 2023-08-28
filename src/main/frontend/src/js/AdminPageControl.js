import {useEffect} from "react";

export default function AdminPageControl(){
    useEffect(()=>{
    if(document.getElementById("adminOnly") && document.getElementById("adminOnly")){
        document.getElementById("adminOnly").remove()
    }
    },[])
}