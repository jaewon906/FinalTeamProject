import {React, useEffect, useState} from "react";
import QnA_BoardBox from "./QnA_BoardBox";
import axios from "axios";
import styles from '../../css/BOARD/board.module.css'
import QnA_BoardPagination from "./QnA_BoardPagination";


const QnA_BoardList = (props) => {

    const {currentPage, totalPages, onPageChange, handleSearch, formattedCreatedTime, data} = props;
    const [searchText, setSearchText] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("all"); // 초기 카테고리 선택은 'all'로 설정


    const authenticate = () => {
        axios.get("/api/board/create-board/authenticate").then(() => {
            window.location.href = "board/create-board/"
        }).catch(e => {
            alert("로그인이 필요한 서비스입니다.")
            window.location.href = "/home/logIn"
            console.error(e);
        })
    }


    //카테고리 버튼 클릭 시 실행되는 함수
    const categoryChange = (category) => {
        setSelectedCategory(category);

    }


    return (
        <>
            <div className={styles.boardMainContainer}>
                <div style={{display: "flex", justifyContent: "center"}}>
                    <h1>문의 게시판</h1>
                </div>
                <br/>

                <div style={{width: "100%"}}>
                    <div style={{paddingBottom:"25px"}}>
                        <div className={styles.categoryContainer} style={{marginBottom: "50px"}}>
                            <button
                                className={`${styles.categoryButton} ${selectedCategory === 'all' ? styles.active : ''}`}
                                onClick={() => categoryChange("all")}
                            >
                                전체
                            </button>
                            <button
                                className={`${styles.categoryButton} ${selectedCategory === "회원 가입" ? styles.active : ''}`}
                                onClick={() => categoryChange("회원 가입")}
                            >
                                회원 가입
                            </button>
                            <button
                                className={`${styles.categoryButton} ${selectedCategory === '주문 및 배송' ? styles.active : ''}`}
                                onClick={() => categoryChange("주문 및 배송")}

                            >
                                주문 및 배송
                            </button>
                            <button
                                className={`${styles.categoryButton} ${selectedCategory === '교환 및 환불' ? styles.active : ''}`}
                                onClick={() => categoryChange("교환 및 환불")}

                            >
                                교환 및 환불
                            </button>
                            <button
                                className={`${styles.categoryButton} ${selectedCategory === '도서 예약' ? styles.active : ''}`}
                                onClick={() => categoryChange("도서 예약")}

                            >
                                도서 예약
                            </button>
                            <button
                                className={`${styles.categoryButton} ${selectedCategory === '계정 관련 문의' ? styles.active : ''}`}
                                onClick={() => categoryChange("계정 관련 문의")}

                            >
                                계정 관련 문의
                            </button>
                        </div>
                        <div className={styles.boardMainSearch}>
                            <div style={{display: "flex", alignItems: "center", justifyContent: "flex-end"}}>
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
                                        onClick={() => handleSearch(searchText)}
                                >
                                    Search
                                </button>
                            </div>
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
                            {Array.isArray(props.data) && props.data.length !== 0 ? (
                             props.data
                                    .map((i, index) => (
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
                            ) : (
                                <tr>
                                    <td colSpan="8">
                                        {selectedCategory !== 'all' ? (
                                            '데이터가 없습니다.'
                                        ) : (
                                            <div className={styles.spinnerContainer}>
                                                <div className={`spinner ${styles.spinner}`}></div>
                                            </div>
                                        )}
                                    </td>
                                </tr>
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
                            style={{
                                width: "100px",
                                height: "35px",
                                backgroundColor: "#45B751",
                                border: "none",
                                color: "white",
                                borderRadius: "5px",
                                cursor: "pointer"
                            }}
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

    const {currentPage, totalPages, onPageChange, handleSearch, formattedCreatedTime} = props;
    const [data, setData] = useState([])
    const [searchText, setSearchText] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState("all"); // 초기 카테고리 선택은 'all'로 설정


    const authenticate = () => {
        axios.get("/api/board/create-board/authenticate").then(() => {
            window.location.href = "board/create-board/"
        }).catch(e => {
            alert("로그인이 필요한 서비스입니다.")
            window.location.href = "/home/logIn"
            console.error(e);
        })
    }


    const refreshData = async (page, search) => {
        try {
            setLoading(true);
            const response = await axios.get(`/api/board/board-list`, {
                params: {page, size: 10, search,},
            });
            setData(response.data.data);
        } catch (error) {
            console.error("페이징 데이터", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        refreshData(currentPage, searchText)
    }, [currentPage, searchText]);

    const handleCategoryToggle = (category) => {
        setSelectedCategory(category);
    };

    const filterCategory = props.data.filter((option) => {
        if (selectedCategory === "all") {
            return true;
        }
        return option.category === selectedCategory;
    })

    console.log(props.data);
    return (
        <>
            <div className={styles.boardMainContainer}>
                <div style={{display: "flex", justifyContent: "center"}}>
                    <h1 style={{
                        width: "300px",
                        textAlign: "center",
                        paddingBottom: "10px",
                        backgroundColor: "transparent",
                        borderBottom: "2px solid #45b751"
                    }}>문의 게시판</h1>
                </div>
                <br/>

                <div style={{width: "100%"}}>
                    <div style={{padding:"10px"}}>
                        <div className={styles.categoryContainer} style={{marginBottom:"20px"}}>
                            <button
                                className={`${styles.categoryButton} ${selectedCategory === 'all' ? styles.active : ''}`}
                                onClick={() => handleCategoryToggle('all')}
                            >
                                전체
                            </button>
                            <button
                                className={`${styles.categoryButton} ${selectedCategory === "회원 가입" ? styles.active : ''}`}
                                onClick={() => handleCategoryToggle("회원 가입")}
                            >
                                회원 가입
                            </button>
                            <button
                                className={`${styles.categoryButton} ${selectedCategory === '주문 및 배송' ? styles.active : ''}`}
                                onClick={() => handleCategoryToggle('주문 및 배송')}
                            >
                                주문 및 배송
                            </button>
                            <button
                                className={`${styles.categoryButton} ${selectedCategory === '교환 및 환불' ? styles.active : ''}`}
                                onClick={() => handleCategoryToggle('교환 및 환불')}
                            >
                                교환 및 환불
                            </button>
                            <button
                                className={`${styles.categoryButton} ${selectedCategory === '도서 예약' ? styles.active : ''}`}
                                onClick={() => handleCategoryToggle('도서 예약')}
                            >
                                도서 예약
                            </button>
                        </div>
                        <div className={styles.boardMainSearch}>
                            <div style={{display:"flex", alignItems:"center", justifyContent:"flex-end"}}>
                                <input
                                    type="text"
                                    placeholder=" 검색어를 입력하세요 "
                                    value={searchText}
                                    style={{width: "250px", marginRight: "10px", height:"40px"}}
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
                                        onClick={() => handleSearch(searchText)}
                                >
                                    Search
                                </button>
                            </div>
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
                            {Array.isArray(props.data) && props.data.length !== 0 ? (
                                filterCategory.map((i, index) => (
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
                            ) : (
                                <tr>
                                    <td colSpan="8">
                                        <div className={styles.spinnerContainer}>
                                            <div className={`spinner ${styles.spinner}`}></div>
                                        </div>
                                    </td>
                                </tr>
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
                            style={{
                                width: "100px",
                                height: "35px",
                                backgroundColor: "#45B751",
                                border: "none",
                                color: "white",
                                borderRadius: "5px",
                                cursor: "pointer"
                            }}
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

















/*
    const refreshData = async (page, search) => {
        try {
            setLoading(true);
            const response = await axios.get(`/api/board/board-list`, {
                params: {page, size: 10, search,},
            });
            setData(response.data.data);
            console.log(response.data.data)
        } catch (error) {
            console.error("페이징 데이터", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        refreshData(selectedCategory === "all" ? currentPage : currentPageFiltered, searchText);
    }, [currentPage, searchText,currentPageFiltered,selectedCategory]);
*/


// 페이지 변경 및 카테고리 선택 시 데이터 업데이트
/*    useEffect(() => {
        // 필터링된 데이터 생성
        let filteredData = props.data;
        if (selectedCategory !== 'all') {
            filteredData = props.data.filter((option) => option.category === selectedCategory);
        }


        // 전체 필터링된 아이템 수 및 페이지 수 계산
        const totalFilteredItems = filteredData.length;
        const totalFilteredPages = Math.ceil(totalFilteredItems / itemsPerPage);

        // currentPage가 범위를 벗어날 경우 조정
        const adjustedCurrentPage = Math.min(currentPage, Math.max(0, totalFilteredPages - 1));

        setCurrentPageFiltered(adjustedCurrentPage);

        // 필터링된 데이터를 페이징하여 출력
        const startIdxFiltered = adjustedCurrentPage * itemsPerPage;
        const endIdxFiltered = startIdxFiltered + itemsPerPage;
        const pagedFilteredData = filteredData.slice(startIdxFiltered, endIdxFiltered);

        setData(pagedFilteredData);
    }, [ currentPageFiltered, props.data, selectedCategory]);

    const onPageChangeFiltered = (page) => {
        setCurrentPageFiltered(page);
    };

    const handleCategoryToggle = (category) => {
        setSelectedCategory(category);
        // 카테고리 변경 시, 현재 페이지를 0으로 초기화
        setCurrentPageFiltered(0);
    };

    const filterCategory = selectedCategory === 'all'
        ? props.data
        : props.data.filter((option) => option.category === selectedCategory);

    const startIdxFiltered = currentPageFiltered * itemsPerPage;
    const endIdxFiltered = startIdxFiltered + itemsPerPage;
    const pagedFilteredData = filterCategory.slice(startIdxFiltered, endIdxFiltered);

    const totalFilteredItems = filterCategory.length;
    const totalFilteredPages = Math.ceil(totalFilteredItems / itemsPerPage);*/