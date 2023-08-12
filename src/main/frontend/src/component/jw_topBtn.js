import style from '../css/jw_topBtn.module.css'
import {useState} from 'react';

// top 버튼 클릭시 최상단으로 이동하는 기능
function moveTop() {
    window.scrollTo({top: 0, behavior: "smooth"})
}

function TopBtn() {
    const [btnMarginTop, setBtnMarginTop] = useState(window.innerHeight - 100);
    window.onscroll = () => {
        setBtnMarginTop(window.innerHeight - 100)

    }
    window.onresize = () => {
        setBtnMarginTop(window.innerHeight - 100)
    }
    return (
        <div onClick={moveTop} style={{position: 'sticky', top: `${btnMarginTop}px`}} className={style.topBtn}>
            <div className={style.topBtnArrow}><i className="fa-solid fa-arrow-up"></i></div>
        </div>
    )
}

export default TopBtn;
