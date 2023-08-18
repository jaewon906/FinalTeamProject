import style from "../../css/USER/categoryHeader.module.css"
import {Link} from "react-router-dom";

export default function CategoryHeader() {
    return(
        <div className={style.container}>
            <div className={style.main}>
                <Link to={"/home"}>카테고리1</Link>
                <Link to={"/home"}>카테고리2</Link>
                <Link to={"/home"}>카테고리3</Link>
                <Link to={"/home"}>카테고리4</Link>
                <Link to={"/home"}>카테고리5</Link>
            </div>

        </div>
    )
}
