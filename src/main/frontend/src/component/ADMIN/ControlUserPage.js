import {useEffect} from "react";

export default function ControlUserPage(){
    useEffect(()=>{
        document.getElementById("userOnly").remove()
    },[])
}