import style from "../../css/USER/categoryHeader.module.css"
import {Link} from "react-router-dom";

export default function CategoryHeader() {
    return(
        <div className={style.container}>
            <div className={style.main}>
                <Link to={"/home"}>홈</Link>
                <Link as={Link} to={"/booklist"}>All</Link>
                <Link as={Link} to={"/novels"}>소설/시/희곡</Link>
                <Link as={Link} to={"/economics"}>경제/경영</Link>
                <Link as={Link} to={"/developments"}>자기계발</Link>
                <Link as={Link} to={"/children"}>어린이</Link>
                <Link as={Link} to={"/foreign"}>외국어</Link>
                <Link as={Link} to={"/board"}>문의게시판</Link>
            </div>

        </div>
    )
}
