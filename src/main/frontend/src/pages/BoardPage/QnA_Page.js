import React, {useState, useEffect} from "react";
import axios from "axios";
import '../../css/BOARD/board.module.css'
import QnA_BoardList from "../../component/BOARD/QnA_BoardList";
import styles from "../../css/BOARD/board.module.css";


const QnA_Page = () => {

    const [data, setData] = useState([]);
    const [isCollapsed, setIsCollapsed] = useState(true);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [searchText, setSearchText] = useState(0);


    // 데이터를 가져오는 함수
    const fetchBoardData = async () => {
        try {
            const response = await axios.get(`/api/board/board-list?page=${currentPage}&size=10&sort=id, DESC`);
            setData(response.data.content);
            setTotalPages(response.data.totalPages);
        } catch (error) {
            console.error("게시글 데이터 가져오기 실패:", error);

        }
    };

    // 컴포넌트가 마운트되었을 때 데이터 가져오기
    useEffect(() => {
        fetchBoardData();
    }, [currentPage, searchText]);


    const onPageChange = (page) => {
        setCurrentPage(page);
    };

    const handleSearch = (text) => {
        setSearchText(text);
        setCurrentPage(0);
    };



    const faqData = [
        {
            question: "사이트에서 어떻게 책을 구매할 수 있나요?",
            answer: "책을 구매하려면 먼저 사이트에 로그인하거나 회원 가입을 완료하세요. 그런 다음 원하는 책을 검색하거나 카테고리를 찾아보세요. 책의 상세 페이지로 이동하여 '구매' 버튼을 클릭하고 결제를 진행하면 됩니다."
        },
        {
            question: "배송은 어떻게 이루어지나요? 배송료가 있나요?",
            answer: "주문한 책은 최대한 빠르게 배송됩니다. 주문 내역에서 배송 상태를 확인하실 수 있으며, 배송 추적 코드를 제공합니다. 일부 상품의 경우 무료 배송 또는 일정 금액 이상 주문 시 무료 배송 혜택을 제공할 수 있습니다."
        },
        {
            question: "결제는 어떤 방식으로 이루어지나요? 어떤 결제 수단을 지원하나요?",
            answer: "우리 사이트에서는 신용카드, 데빗카드, 온라인 결제 플랫폼 (예: 페이팔, 카카오페이) 등 다양한 결제 수단을 지원합니다. 결제 과정에서 원하는 방식을 선택하실 수 있습니다."
        },
        {
            question: "구매한 책의 상태를 어떻게 확인하나요?",
            answer: "각 책의 상세 페이지에서는 상품의 상태에 대한 정보를 자세히 제공합니다. 새 책인지, 중고 책인지, 또는 어떤 상태인지 확인하실 수 있습니다."
        },
    ];

    // 토글 상태 관리를 위한 state 변수
    const [activeIndex, setActiveIndex] = useState(null);

    // 토글 버튼 클릭 시 행동 함수
    const toggleAnswer = (index) => {
        if (activeIndex === index) {
            setActiveIndex(null);
        } else {
            setActiveIndex(index);
        }
    };



    return (
        <>
            <div style={{padding:"30px 0px 30px 0px", display: 'flex',flexDirection:"column",alignItems:"center"}}>
                    <div className={styles.qnaContainer}>
                        <h1 className={styles.qnaTitle}>자주 묻는 질문</h1>
                        <ul className={styles.qnaList}>
                            {faqData.map((faq, index) => (
                                <li key={index} className={styles.qnaData} style={{listStyleType:"none"}}>
                                    <button
                                        style={{
                                            fontSize: "15px",
                                            height: "35px",
                                            border: "none",
                                            color: "black",
                                            borderRadius: "5px",
                                            cursor: "pointer"}}
                                        className={`${activeIndex === index ? 'active' : ''}`}
                                        onClick={() => toggleAnswer(index)}
                                    >
                                        {faq.question}
                                    </button>
                                    {activeIndex === index && <p className={styles.qnaAnswer}>{faq.answer}</p>}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <QnA_BoardList
                        data={data}
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={onPageChange}
                        handleSearch={handleSearch}
                    />


                    <div className={styles.noticeContainer}>
                        <h2 className={styles.noticeTitle}>도서 구매 관련 공지사항</h2>
                            <div className={styles.noticeContent}>
                                <h5 className="alert-heading">중요 공지</h5>
                                <p>도서 구매 시 할인 프로모션을 진행합니다. 기간: 2023년 8월 21일부터 8월 31일까지. 놓치지 마세요!</p>
                            </div>
                        <div className={styles.noticeContent}>
                                <h5>주의 사항</h5>
                                <p>예약 구매한 도서는 발매일에 자동으로 배송됩니다. 주문 취소는 발매일 전에만 가능합니다.</p>
                            </div>
                        <div className={styles.noticeContent}>
                                <h5>환불 정책 변경</h5>
                                <p>구매한 도서의 환불은 구매 후 7일 이내에만 가능합니다. 자세한 내용은 '환불 정책' 페이지에서 확인하세요.</p>
                        </div>
                        <div className={styles.noticeContent}>
                                <h5>새로운 기능 추가</h5>
                                <p>이제부터 회원 리워드 프로그램을 시작합니다. 도서 구매 시 포인트가 적립되며, 다음 구매에 사용할 수 있습니다.</p>
                        </div>
                        <button
                                className={styles.noticeHelpBtn}
                                onClick={() => setIsCollapsed(!isCollapsed)}
                                type="button"
                        > 도움말
                        </button>
                        <div className="col-md-6 mb-4">
                            <div className={`collapse mt-3 ${isCollapsed ? '' : 'show'}`} id="collapseExample">
                                <div className={styles.noticeCollapseText}>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        </>
    )
        ;
};


export default QnA_Page;
