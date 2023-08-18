import {useEffect} from "react";

export default function ControllAdminPage(){
    useEffect(() => {
        document.getElementById("adminOnly").remove()
    }, [])
}