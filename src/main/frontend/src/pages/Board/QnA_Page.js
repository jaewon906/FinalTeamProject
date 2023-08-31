import React, {useState, useEffect} from "react";
import axios from "axios";
import '../../css/BOARD/board.module.css'
import QnA_BoardList from "../../component/BOARD/QnA_BoardList";


const QnA_Page = () => {

    const [data, setData] = useState([]);
    const [isCollapsed, setIsCollapsed] = useState(true);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [searchText, setSearchText] = useState("");


    // 데이터를 가져오는 함수
    const fetchBoardData = async () => {
        try {
            const response = await axios.get(`/api/board/board-list?page=${currentPage}&size=10&sort=id, DESC&search=${searchText}`);
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


    const faqList = [
        {question: '질문 1', answer: '답변 1'},
        {question: '질문 2', answer: '답변 2'},
        {question: '질문 3', answer: '답변 3'},
        // 추가적인 질문과 답변
    ];

    const [showQnA, setShowQnA] = useState({});

    const toggleQnA = (id) => {
        setShowQnA(prevShowQna => ({
            ...prevShowQna,
            [id] : !prevShowQna[id]
        }))
    }

    return (
        <>
            <div style={{border: "2px solid pink", display: 'flex', justifyContent: 'center'}}>
                <div style={{border: '5px solid red', display: 'flex', flexDirection: 'column'}}>
                    <div style={{paddingTop: ' 80px'}}>
                        <h1 style={{textAlign: 'center'}}>자주 묻는 질문</h1>
                        <div style={{display: 'flex', justifyContent: 'center', border: '2px solid yellow'}}>
                            {faqList.map((qna, index) => (
                                <div key={index}>
                                        <button
                                            className={`accordionButton ${showQnA === index ? 'expanded' : ''}`}
                                            type="button"
                                            onClick={() => toggleQnA(qna)}
                                        >
                                            {qna.question}
                                        </button>
                                    <div>
                                        <div className={`accordionButtonBody ${showQnA === index ? 'show' : ''}`}>
                                            {qna.answer}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <QnA_BoardList
                        data={data}
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={onPageChange}
                        handleSearch={handleSearch}
                    />


                    <div style={{
                        border: "2px solid red",
                        display: 'flex',
                        justifyContent: 'center',
                        flexDirection: "column",
                        alignItems: "center"
                    }}>
                        <h2 style={{textAlign: 'center'}}>도서 구매 관련 공지사항</h2>
                        <div className="col-md-6 mb-4">
                            <div className="alert alert-info">
                                <h5 className="alert-heading">중요 공지</h5>
                                <p>도서 구매 시 할인 프로모션을 진행합니다. 기간: 2023년 8월 21일부터 8월 31일까지. 놓치지 마세요!</p>
                            </div>
                        </div>
                        <div className="col-md-6 mb-4">
                            <div className="alert alert-warning">
                                <h5 className="alert-heading">주의 사항</h5>
                                <p>예약 구매한 도서는 발매일에 자동으로 배송됩니다. 주문 취소는 발매일 전에만 가능합니다.</p>
                            </div>
                        </div>
                        <div className="col-md-6 mb-4">
                            <div className="alert alert-danger">
                                <h5 className="alert-heading">환불 정책 변경</h5>
                                <p>구매한 도서의 환불은 구매 후 7일 이내에만 가능합니다. 자세한 내용은 '환불 정책' 페이지에서 확인하세요.</p>
                            </div>
                        </div>
                        <div className="col-md-6 mb-4">
                            <div className="alert alert-success">
                                <h5 className="alert-heading">새로운 기능 추가</h5>
                                <p>이제부터 회원 리워드 프로그램을 시작합니다. 도서 구매 시 포인트가 적립되며, 다음 구매에 사용할 수 있습니다.</p>
                            </div>
                        </div>
                        <button style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}
                                className="btn btn-secondary mt-3"
                                onClick={() => setIsCollapsed(!isCollapsed)}
                                type="button"
                                data-toggle="collapse"
                                data-target="#collapseExample"
                                aria-expanded={!isCollapsed}
                                aria-controls="collapseExample"
                        > 도움말
                        </button>
                        <div className="col-md-6 mb-4">
                            <div className={`collapse mt-3 ${isCollapsed ? '' : 'show'}`} id="collapseExample">
                                <div className="card card-body">
                                    공지사항 이외에 도움 제공
                                </div>
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


/*



    const [data, setData] = useState([]);
    const [isCollapsed, setIsCollapsed] = useState(true);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [searchText, setSearchText] = useState("");


    // 데이터를 가져오는 함수
    const fetchBoardData = async () => {
        try {
            const response = await axios.get("/api/board/board-list?page=0&size=10");
            setData(response.data.content);
        } catch (error) {
            console.error("게시글 데이터 가져오기 실패:", error);

        }
    };

    // 컴포넌트가 마운트되었을 때 데이터 가져오기
    useEffect(() => {
        fetchBoardData();
    }, []);


    useEffect((page, search) => {
        const getBoardList = async () => {
            console.log('게시글 목록 가져오는 메서드 실행');
            let response = await axios.get(
                `/api/board/board-list?page=${currentPage}&size=10&sort=id, DESC`);
            setData(response.data.data);
            setTotalPages(response.data.totalPages);
            console.log('board/response = ', response.data);
        };
        getBoardList();
    },[currentPage, searchText])

    const fetchData = async (page, search) => {
        try {
            const response = await axios.get(`/api/board/board-list`, {
                params: {
                    page,
                    size: 10,
                    search,
                },
            });
            setData(response.data.content);
            setTotalPages(response.data.totalPages);
        } catch (error) {
            console.error("페이징 데이터", error);
        }
    };

    useEffect(() => {
        fetchData(currentPage, searchText);
    }, [currentPage,  searchText]);


    const onPageChange = (page) => {
        setCurrentPage(page);
    };

    const handleSearch = (text) => {
        setSearchText(text);
        setCurrentPage(0);
    };
*/

