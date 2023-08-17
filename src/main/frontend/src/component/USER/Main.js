import {useEffect} from "react";

export default function Main(){
    useEffect(()=>{
        document.getElementById("adminOnly").remove()
    })
}