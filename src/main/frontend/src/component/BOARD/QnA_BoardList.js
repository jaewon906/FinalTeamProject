import {React, useEffect, useState} from "react";
import QnA_BoardBox from "./QnA_BoardBox";
import axios from "axios";
import styles from '../../css/BOARD/board.module.css'
import QnA_BoardPagination from "./QnA_BoardPagination";


const QnA_BoardList = (props) => {
    const formattedCreatedTime = props;
    const [searchText, setSearchText] = useState("");
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [selectCategory, setSelectCategory] = useState("all"); // 초기 카테고리 선택은 'all'로 설정
    const [data, setData] = useState([]); // 데이터를 저장할 상태 변수
    const [isLoading, setIsLoading] = useState(true);
    const [searchResults, setSearchResults] = useState([]);


    const authenticate = () => {
        axios.get("/api/board/create-board/authenticate").then(() => {
            window.location.href = "board/create-board/"
        }).catch(e => {
            window.confirm("게시글 작성을 위해 로그인이 필요합니다. 로그인 페이지로 이동하시겠습니까?")
            window.location.href = "/home/logIn"
            console.error(e);
        })
    }


    // 데이터를 가져오는 함수
    const fetchBoardData = async () => {
        setIsLoading(true); // 데이터 로딩이 시작됨을 표시
        try {
            let url = `/api/board/board-list?page=${currentPage}&size=10&sort=id,DESC`;
            if (selectCategory !== "all") {
                url += `&category=${selectCategory}`;
                console.log(url, "all 카테고리아닐때");
            }

            // 검색어가 입력된 경우에만 검색 쿼리를 추가
            if (searchText !== "") {
                url += `&keyword=${searchText}`;
                console.log(url, "검색기능 진행");
            }

            const response = await axios.get(url);

            // 검색 결과인 경우 setSearchResults로 상태 업데이트
            if (searchText !== "") {
                setSearchResults(response.data.content);
                setTotalPages(response.data.totalPages);
            } else {
                setData(response.data.content);
                setTotalPages(response.data.totalPages);
            }


            if (searchText && response.data.content.length === 0) {
                // 검색어가 있고 결과가 없는 경우
                setSearchResults([]);
            } else {
                // 검색 결과 또는 일반 데이터를 업데이트
                setSearchResults(response.data.content);
            }

            setData(response.data.content);
            setTotalPages(response.data.totalPages);

            console.log(response.data);
        } catch (error) {
            console.error("데이터 가져오기 실패:", error);
        } finally {
            setIsLoading(false); // 데이터 로딩이 완료됨을 표시
        }
    }


    // 컴포넌트가 마운트되었을 때 데이터 가져오기
    useEffect(() => {
        fetchBoardData();
    }, [currentPage, selectCategory]);
    // 페이지 변경 시

    const onPageChange = (page) => {
        setCurrentPage(page);
    };


    // 검색 버튼 클릭 시
    const handleSearch = () => {
        setCurrentPage(0); // 페이지를 0으로 초기화하여 첫 페이지부터 검색 결과를 보여줍니다.
        fetchBoardData(); // 검색 버튼을 누를 때 검색어를 전달하여 데이터를 다시 불러오도록 호출
        console.log("검색버튼시작");
        console.log(searchText);
    };


    const handleSearchInputKeyPress = (e) => {
        if (e.key === "Enter") {
            handleSearch();
        }
    };


    // 검색어 입력 필드의 onChange 핸들러
    const handleSearchInputChange = (e) => {
        const newSearchText = e.target.value;
        setSearchText(newSearchText);

        if (!newSearchText) {
            // 검색어를 전부 지운 경우
            setCurrentPage(0);
            fetchBoardData(); // 전체 데이터를 다시 불러오도록 호출
        }
    };


    const handleCategoryChange = (category) => {
        setSelectCategory(category);
        setCurrentPage(0);
    };


    return (
        <>
            <div className={styles.boardMainContainer}>
                <div style={{display: "flex", justifyContent: "center"}}>
                    <h1>문의 게시판</h1>
                </div>
                <br/>
                <div style={{width: "100%"}}>
                    <div style={{
                        paddingBottom: "25px",
                        display: "flex",
                        justifyContent: "space-between",
                        flexDirection: "row-reverse",
                        alignItems: "center"
                    }}>
                        <div className={styles.boardMainSearch}>
                            <div>
                                <input
                                    type="text"
                                    placeholder=" 검색어를 입력하세요 "
                                    value={searchText}
                                    style={{width: "250px", marginRight: "10px", height: "40px"}}
                                    onChange={handleSearchInputChange}
                                    onKeyPress={handleSearchInputKeyPress} // 엔터 키 입력 시 검색 수행

                                />
                                <button style={{
                                    width: "60px",
                                    height: "35px",
                                    backgroundColor: "#45B751",
                                    border: "none",
                                    color: "white",
                                    borderRadius: "5px",
                                    cursor: "pointer"
                                }}
                                        onClick={handleSearch}
                                >
                                    Search
                                </button>
                            </div>
                        </div>
                        <div className={styles.categoryContainer}>
                            <label className={styles.categoryLabel}>카테고리:</label>
                            <select
                                value={selectCategory}
                                className={styles.categoryDropdown}
                                onChange={(e) => handleCategoryChange(e.target.value)}
                            >
                                <option value="all">All</option>
                                <option value="회원 가입">회원 가입</option>
                                <option value="주문 및 배송">주문 및 배송</option>
                                <option value="교환 및 환불">교환 및 환불</option>
                                <option value="도서 예약">도서 예약</option>
                                <option value="계정 관련 문의">계정 관련 문의</option>
                            </select>
                        </div>
                    </div>
                    <div>
                        <table className={styles.tableContainer}>
                            <thead>
                            <tr>
                                <th>번호</th>
                                <th>카테고리</th>
                                <th>제목</th>
                                <th>내용</th>
                                <th>작성자</th>
                                <th>조회수</th>
                                <th>작성 일자</th>
                            </tr>
                            </thead>
                            <tbody>
                            {isLoading ? (
                                // 로딩 중일 때
                                <tr>
                                    <td colSpan="8">
                                        <div className={styles.spinnerContainer}>
                                            <div className={`spinner ${styles.spinner}`}></div>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                searchText ? (
                                    searchResults.length === 0 ? (
                                        // 검색어가 있고 결과가 없는 경우
                                        <tr>
                                            <td colSpan="8">검색 결과가 없습니다.</td>
                                        </tr>
                                    ) : (
                                        // 검색 결과가 있는 경우 렌더링
                                        (searchResults || []).map((i) => (
                                            <QnA_BoardBox
                                                key={i.id}
                                                id={i.id}
                                                title={i.title}
                                                category={i.category}
                                                content={i.content.replace(/<[^>]+>/g, '')}
                                                writer={i.writer}
                                                view={i.view}
                                                createdTime={i.createdTime}
                                                formattedCreatedTime={formattedCreatedTime}
                                                currentPage={currentPage + 1}
                                            />
                                        ))
                                    )
                                ) : (
                                    data.length === 0 && selectCategory !== 'all' ? (
                                        // 데이터가 없는 경우
                                        <tr>
                                            <td colSpan="8">선택한 카테고리에 해당하는 데이터가 없습니다.</td>
                                        </tr>
                                    ) : (
                                        // 데이터가 있는 경우 렌더링
                                        (data || []).map((i) => (
                                            <QnA_BoardBox
                                                key={i.id}
                                                id={i.id}
                                                title={i.title}
                                                category={i.category}
                                                content={i.content.replace(/<[^>]+>/g, '')}
                                                writer={i.writer}
                                                view={i.view}
                                                createdTime={i.createdTime}
                                                formattedCreatedTime={formattedCreatedTime}
                                                currentPage={currentPage + 1}
                                            />
                                        ))
                                    )
                                )
                            )}
                            </tbody>
                        </table>
                    </div>
                    <QnA_BoardPagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={onPageChange}
                    />
                    <div className={styles.boardMainWriteButton}>
                        <button
                            type="submit"
                            onClick={authenticate}
                        >
                            게시글 작성하기
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};
export default QnA_BoardList;


/*

import {React, useEffect, useState} from "react";
import QnA_BoardBox from "./QnA_BoardBox";
import axios from "axios";
import styles from '../../css/BOARD/board.module.css'
import QnA_BoardPagination from "./QnA_BoardPagination";
const QnA_BoardList = (props) => {
    const formattedCreatedTime = props;
    const [searchText, setSearchText] = useState("");
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [selectCategory, setSelectCategory] = useState("all"); // 초기 카테고리 선택은 'all'로 설정
    const [data, setData] = useState([]); // 데이터를 저장할 상태 변수
    const [isLoading, setIsLoading] = useState(true);
    const [searchResults, setSearchResults] = useState([]);
    const authenticate = () => {
        axios.get("/api/board/create-board/authenticate").then(() => {
            window.location.href = "board/create-board/"
        }).catch(e => {
            window.confirm("게시글 작성을 위해 로그인이 필요합니다. 로그인 페이지로 이동하시겠습니까?")
            window.location.href = "/home/logIn"
            console.error(e);
        })
    }
    // 데이터를 가져오는 함수
    const fetchBoardData = async () => {
        setIsLoading(true); // 데이터 로딩이 시작됨을 표시
        try {
            let url = `/api/board/board-list?page=${currentPage}&size=10&sort=id,DESC`;
            if (selectCategory !== "all") {
                url += `&category=${selectCategory}`;
                console.log(url, "all 카테고리아닐때");
            }

            // 검색어가 입력된 경우에만 검색 쿼리를 추가
            if (searchText !== "") {
                url += `&search=${searchText}`;
                console.log(url, "검색기능 진행");
            }

            const response = await axios.get(url);
            setData(response.data.content);
            setTotalPages(response.data.totalPages);

            // 검색 결과인 경우 setSearchResults로 상태 업데이트
            if (searchText !== "") {
                setSearchResults(response.data.content);
                setTotalPages(response.data.totalPages);
            } else {
                setData(response.data.content);
                setTotalPages(response.data.totalPages);
            }
            console.log(response.data);
        } catch (error) {
            console.error("데이터 가져오기 실패:", error);
        } finally {
            setIsLoading(false); // 데이터 로딩이 완료됨을 표시
        }
    }
    // 컴포넌트가 마운트되었을 때 데이터 가져오기
    useEffect(() => {
        fetchBoardData();
    }, [currentPage, selectCategory]);
    // 페이지 변경 시
    const onPageChange = (page) => {
        setCurrentPage(page);
    };


    // 검색 버튼 클릭 시
    const handleSearch = (searchText) => {
        setSearchResults(searchText)
        setCurrentPage(0);
        fetchBoardData(); // 검색 버튼을 누를 때 검색어를 전달하여 데이터를 다시 불러오도록 호출
        console.log("검색버튼시작");
        console.log(searchText);
    };
    const handleCategoryChange = (category) => {
        setSelectCategory(category);
        setCurrentPage(0);
    };
    return (
        <>
            <div className={styles.boardMainContainer}>
                <div style={{display: "flex", justifyContent: "center"}}>
                    <h1>문의 게시판</h1>
                </div>
                <br/>
                <div style={{width: "100%"}}>
                    <div style={{
                        paddingBottom: "25px",
                        display: "flex",
                        justifyContent: "space-between",
                        flexDirection: "row-reverse",
                        alignItems: "center"
                    }}>
                        <div className={styles.boardMainSearch}>
                            <div>
                                <input
                                    type="text"
                                    placeholder=" 검색어를 입력하세요 "
                                    value={searchText}
                                    style={{width: "250px", marginRight: "10px", height: "40px"}}
                                    onChange={(e) => setSearchText(e.target.value)}
                                />
                                <button style={{
                                    width: "60px",
                                    height: "35px",
                                    backgroundColor: "#45B751",
                                    border: "none",
                                    color: "white",
                                    borderRadius: "5px",
                                    cursor: "pointer"
                                }}
                                        onClick={handleSearch}
                                >
                                    Search
                                </button>
                            </div>
                        </div>
                        <div className={styles.categoryContainer}>
                            <label className={styles.categoryLabel}>카테고리:</label>
                            <select
                                value={selectCategory}
                                className={styles.categoryDropdown}
                                onChange={(e) => handleCategoryChange(e.target.value)}
                            >
                                <option value="all">All</option>
                                <option value="회원 가입">회원 가입</option>
                                <option value="주문 및 배송">주문 및 배송</option>
                                <option value="교환 및 환불">교환 및 환불</option>
                                <option value="도서 예약">도서 예약</option>
                                <option value="계정 관련 문의">계정 관련 문의</option>
                            </select>
                        </div>
                    </div>
                    <div>
                        <table className={styles.tableContainer}>
                            <thead>
                            <tr>
                                <th>번호</th>
                                <th>카테고리</th>
                                <th>제목</th>
                                <th>내용</th>
                                <th>작성자</th>
                                <th>조회수</th>
                                <th>작성 일자</th>
                            </tr>
                            </thead>
                            <tbody>
                            {isLoading ? (
                                // 로딩 중일 때
                                <tr>
                                    <td colSpan="8">
                                        <div className={styles.spinnerContainer}>
                                            <div className={`spinner ${styles.spinner}`}></div>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                searchText && searchResults.length === 0 ? (
                                    // 검색어가 있고 결과가 없는 경우
                                    <tr>
                                        <td colSpan="8">검색 결과가 없습니다.</td>
                                    </tr>
                                ) : (data.length === 0 && selectCategory !== 'all') ? (
                                    // 데이터가 없는 경우
                                    <tr>
                                        <td colSpan="8">선택한 카테고리에 해당하는 데이터가 없습니다.</td>
                                    </tr>
                                ) : (
                                    // 데이터가 있는 경우
                                    (searchText ? searchResults : data).map((i) => (
                                        <QnA_BoardBox
                                            key={i.id}
                                            id={i.id} //게시글 번호 역순으로 생성
                                            title={i.title}
                                            category={i.category}
                                            content={i.content.replace(/<[^>]+>/g, '')}
                                            writer={i.writer}
                                            view={i.view}
                                            createdTime={i.createdTime}
                                            formattedCreatedTime={formattedCreatedTime}
                                            currentPage={currentPage + 1}
                                        />
                                    ))
                                )
                            )}
                            </tbody>
                        </table>
                    </div>
                    <QnA_BoardPagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={onPageChange}
                    />
                    <div className={styles.boardMainWriteButton}>
                        <button
                            type="submit"
                            onClick={authenticate}
                        >
                            게시글 작성하기
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};
export default QnA_BoardList;*/
