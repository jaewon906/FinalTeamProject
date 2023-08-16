import style from "../css/footer.module.css"
export default function Footer(){
    return(
        <div className={style.container}>

            <div className={style.main}>
                <table>
                    <thead>
                    <tr>도서 관리 및 판매 시스템</tr>
                    </thead>
                    <tbody >
                    <tr>
                        <td>프로젝트명</td>
                        <td>BookVoyage</td>
                    </tr>
                    <tr>
                        <td>프로젝트 구성원</td>
                        <td>박재원, 주현준, 권민지</td>
                    </tr>
                    <tr>
                        <td>프로젝트 시작 기간</td>
                        <td>23.08.10 ~ 23.09.15</td>
                    </tr>
                    <tr>
                        <td>도서 DB 제공</td>
                        <td>알라딘 인터넷 서점(www.aladin.co.kr)</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}