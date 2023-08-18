import {useEffect} from "react";

export default function ControllUserPage(){
    useEffect(()=>{
        document.getElementById("userOnly").remove()
    },[])
}