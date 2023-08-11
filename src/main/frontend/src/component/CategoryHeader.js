import style from "../css/categoryHeader.module.css"
import {Link} from "react-router-dom";

export default function CategoryHeader() {
    return(
        <div className={style.container}>
            <div className={style.main}>
                <Link to={"/"}>카테고리1</Link>
                <Link to={"/"}>카테고리2</Link>
                <Link to={"/"}>카테고리3</Link>
            </div>

        </div>
    )
}
