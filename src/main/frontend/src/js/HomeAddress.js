import {useLocation} from "react-router-dom";

export default function HomeAddress(){

    const url = useLocation()

    if(url.pathname==='/'){
        window.location.href="/home"
    }

}