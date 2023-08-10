import style from "../css/main.module.css"

export default function MainPage() {
    const setCookie =(name, value, days) =>{
        let expires = "";
        if (days) {
            const date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = "; expires=" + date.toUTCString();
        }
        document.cookie = name + "=" + (value || "") + expires + "; path=/";
    }
    setCookie("재운", "ㅎㅇㅎㅇ","1")
    return (
        <div className={style.container}></div>
    )
}