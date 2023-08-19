import {useEffect} from "react";

export default function NotFound(){
    const userOnly = document.getElementById("userOnly")
    const adminOnly = document.getElementById("adminOnly")

    console.log(userOnly)
    console.log(adminOnly)

    useEffect(()=>{

        if(userOnly){

            userOnly.remove()
        }

        if(adminOnly){

            adminOnly.remove()
        }
    },[userOnly, adminOnly])


    return(
        <div style={{width:"100%", height:"500px"}}>
            <h2 style={{marginLeft:"20px"}}>404 Not Found</h2>
        </div>

    )
}