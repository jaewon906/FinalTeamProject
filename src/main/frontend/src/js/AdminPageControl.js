import {useEffect} from "react";

export default function AdminPageControl() {

    useEffect(() => {
        const a = document.getElementById("adminOnly")
        const u = document.getElementById("userOnly")

        if (u!==null && a!==null) {
            a.remove()
        }
    }, [])
}