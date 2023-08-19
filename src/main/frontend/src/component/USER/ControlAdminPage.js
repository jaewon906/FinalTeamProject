import {useEffect} from "react";

export default function ControlAdminPage(){
    useEffect(() => {
        document.getElementById("adminOnly").remove()
    }, [])
}