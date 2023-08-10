export default function Main() {

    const toLogIn=()=>{
        const myInfo = document.cookie.split(';')
        console.log(myInfo)
        if(myInfo[0]===""){
            const ret = window.confirm("로그인 서비스입니다. 로그인 하시겠습니까?")
            if(ret){
                window.location.href="/logIn"
            }
        }
        else window.location.href="/board"
    }
    return(
        <div >

        </div>
    )
}
