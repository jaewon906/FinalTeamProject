export default function NotFound(){
    if(document.getElementById("userOnly")){

        document.getElementById("userOnly").remove()
    }

    if(document.getElementById("adminOnly")){

        document.getElementById("adminOnly").remove()
    }

    return(
        <div style={{width:"100%", height:"500px"}}>
            <h2 style={{marginLeft:"20px"}}>404 Not Found</h2>
        </div>

    )
}