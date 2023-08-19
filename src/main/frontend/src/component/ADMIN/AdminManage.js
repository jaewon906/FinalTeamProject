import {useEffect} from "react";
import axios from "axios";

export default function AdminManage() {

    useEffect(()=>{
        axios.get("/api/admin/manage")
            .then()
            .catch()
    })

    return(
        <div>asd</div>
    )
}