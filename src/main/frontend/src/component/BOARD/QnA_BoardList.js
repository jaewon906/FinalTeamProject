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

    const authenticate = () => {
        axios.get("/api/board/create-board/authenticate").then(() => {
            window.location.href = "board/create-board/"
        }).catch(e => {
            alert("로그인이 필요한 서비스입니다.")
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
                console.log(url , "all 카테고리아닐때");

            }
            const response = await axios.get(url);
            setData(response.data.content);
            setTotalPages(response.data.totalPages);
            console.log(response.data);
        } catch (error) {
            console.error("데이터 가져오기 실패:", error);
        } finally {
            setIsLoading(false); // 데이터 로딩이 완료됨을 표시
        }
    }
            /*else {
                let url = `/api/board/board-list?page=${currentPage}&size=10&sort=id,DESC`;
                url += `&category=all`
                const response = await axios.get(url);
                console.log(url, "all 카테고리일때");
                setData(response.data.content);
                setTotalPages(response.data.totalPages);
            }*/
            
/*            let url = `/api/board/board-list?page=${currentPage}&size=10&sort=id,DESC`;
            if (selectCategory !== "all") {
                url += `&category=${selectCategory}`;
                console.log(url);
            }*/


    // 컴포넌트가 마운트되었을 때 데이터 가져오기
    useEffect(() => {
        fetchBoardData();
    }, [currentPage, searchText, selectCategory]);

    // 페이지 변경 시
    const onPageChange = (page) => {
        setCurrentPage(page);
    };

    // 검색어 변경 시
    const handleSearch = (text) => {
        setSearchText(text);
        onPageChange(0);
    };
    const handleCategoryChange = (category) => {
        setSelectCategory(category);
        setCurrentPage(0);
    };

    const filteredData = Array.isArray(data) ? data.filter((i) => selectCategory === 'all' || i.category === selectCategory) : [];

    return (
        <>
            <div className={styles.boardMainContainer}>
                <div style={{display: "flex", justifyContent: "center"}}>
                    <h1>문의 게시판</h1>
                </div>
                <br/>

                <div style={{width: "100%"}}>
                    <div style={{paddingBottom:"25px", display:"flex",justifyContent:"space-between",flexDirection:"row-reverse",alignItems:"center"}}>
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
                                        onClick={() => handleSearch(searchText)}
                                >
                                    Search
                                </button>
                            </div>
                        </div>
                        <div className={styles.categoryContainer}>
                            <label className={styles.categoryLable}>카테고리:</label>
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
{/*                        <div className={styles.categoryContainer}>
                            <label className={styles.categoryLable}>카테고리:</label>
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
                        </div>*/}
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
                            ) : data.length === 0 && selectCategory !== 'all' ? (
                                // 데이터가 없는 경우
                                <tr>
                                    <td colSpan="8">선택한 카테고리에 해당하는 데이터가 없습니다.</td>
                                </tr>
                            ) : (
                                // 데이터가 있는 경우
                                data.map((i, index) => (
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


{/*                            {filteredData.length !== 0 ?(
                                    filteredData.map((i, index) => (
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
                                        {filteredData.length === 0 && selectCategory !== "all" ? (
                                            '선택한 카테고리에 해당하는 데이터가 없습니다.'
                                        ) : (
                                            <div className={styles.spinnerContainer}>
                                                <div className={`spinner ${styles.spinner}`}></div>
                                            </div>
                                        )}
                                    </td>
                                </tr>
                            )}*/}

/*
            if (selectCategory !== "all") {
                url += `&category=${selectCategory}`;
                console.log(url);

            } else {
                let url = `/api/board/board-list?page=${currentPage}&size=10&sort=id,DESC`;
                url += `&category=all`
                const response = await axios.get(url);
                console.log(url);
                setData(response.data.content);
                setTotalPages(response.data.totalPages);
            }*/


{/*                        <div className={styles.categoryContainer} style={{marginBottom: "50px"}}>
                            <button
                                className={`${styles.categoryButton} ${selectCategory === 'all' ? styles.active : ''}`}
                                onClick={() => {
                                    categoryChange("all");
                                }}
                            >
                                전체
                            </button>
                            <button
                                className={`${styles.categoryButton} ${selectCategory === "회원 가입" ? styles.active : ''}`}
                                onClick={() => {categoryChange("회원 가입");
                                }}
                            >
                                회원 가입
                            </button>
                            <button
                                className={`${styles.categoryButton} ${selectCategory === '주문 및 배송' ? styles.active : ''}`}
                                onClick={() => categoryChange("주문 및 배송")}

                            >
                                주문 및 배송
                            </button>
                            <button
                                className={`${styles.categoryButton} ${selectCategory === '교환 및 환불' ? styles.active : ''}`}
                                onClick={() => categoryChange("교환 및 환불")}

                            >
                                교환 및 환불
                            </button>
                            <button
                                className={`${styles.categoryButton} ${selectCategory === '도서 예약' ? styles.active : ''}`}
                                onClick={() => categoryChange("도서 예약")}

                            >
                                도서 예약
                            </button>
                            <button
                                className={`${styles.categoryButton} ${selectCategory === '계정 관련 문의' ? styles.active : ''}`}
                                onClick={() => categoryChange("계정 관련 문의")}

                            >
                                계정 관련 문의
                            </button>
                        </div>*/}

/*
    useEffect(() => {
        // 카테고리별 게시글 데이터 불러오기
        fetchData();
    }, [selectCategory, categoryCurrentPage]);


    const fetchData = async () => {
        try {
            const response = await axios.get(`/api/board/board-list/category/${selectCategory}`, {
                params: {
                    page: categoryCurrentPage,
                },
            });
            setCategoryData(response.data.categoryData);
            setCategoryTotalPages(response.data.totalPages);
            console.log(response.data);
            console.log(response.data.categoryData[1].category);
            console.log(response.data.totalPages)
        } catch (error) {
            console.error('데이터 불러오기 에러', error);
        }
    };
*/


//카테고리 버튼 클릭 시 실행되는 함수
/*    const categoryChange = (category) => {
        setSelectCategory(category);
        setCategoryCurrentPage(0); // 카테고리 변경 시 해당 카테고리의 페이지 초기화
    };*/


/*













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


/*





const QnA_BoardList = (props) => {

    const {currentPage, totalPages, onPageChange, handleSearch, formattedCreatedTime, data} = props;
    const [searchText, setSearchText] = useState("");
    const [selectCategory, setSelectCategory] = useState("all"); // 초기 카테고리 선택은 'all'로 설정
    const [categoryData, setCategoryData] = useState([]); // 각 카테고리별 게시글 데이터
    const [categoryCurrentPage, setCategoryCurrentPage] = useState(0); // 각 카테고리별 현재 페이지
    const [categoryTotalPages, setCategoryTotalPages] = useState(0); // 각 카테고리별 총 페이지 수


    const authenticate = () => {
        axios.get("/api/board/create-board/authenticate").then(() => {
            window.location.href = "board/create-board/"
        }).catch(e => {
            alert("로그인이 필요한 서비스입니다.")
            window.location.href = "/home/logIn"
            console.error(e);
        })
    }

    /!*
        useEffect(() => {
            // 카테고리별 게시글 데이터 불러오기
            fetchData();
        }, [selectCategory, categoryCurrentPage]);


        const fetchData = async () => {
            try {
                const response = await axios.get(`/api/board/board-list/category/${selectCategory}`, {
                    params: {
                        page: categoryCurrentPage,
                    },
                });
                setCategoryData(response.data.categoryData);
                setCategoryTotalPages(response.data.totalPages);
                console.log(response.data);
                console.log(response.data.categoryData[1].category);
                console.log(response.data.totalPages)
            } catch (error) {
                console.error('데이터 불러오기 에러', error);
            }
        };
    *!/


    //카테고리 버튼 클릭 시 실행되는 함수
    const categoryChange = (category) => {
        setSelectCategory(category);
        setCategoryCurrentPage(0); // 카테고리 변경 시 해당 카테고리의 페이지 초기화
    };


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
                                className={`${styles.categoryButton} ${selectCategory === 'all' ? styles.active : ''}`}
                                onClick={() => {
                                    categoryChange("all");
                                }}
                            >
                                전체
                            </button>
                            <button
                                className={`${styles.categoryButton} ${selectCategory === "회원 가입" ? styles.active : ''}`}
                                onClick={() => {categoryChange("회원 가입");
                                }}
                            >
                                회원 가입
                            </button>
                            <button
                                className={`${styles.categoryButton} ${selectCategory === '주문 및 배송' ? styles.active : ''}`}
                                onClick={() => categoryChange("주문 및 배송")}

                            >
                                주문 및 배송
                            </button>
                            <button
                                className={`${styles.categoryButton} ${selectCategory === '교환 및 환불' ? styles.active : ''}`}
                                onClick={() => categoryChange("교환 및 환불")}

                            >
                                교환 및 환불
                            </button>
                            <button
                                className={`${styles.categoryButton} ${selectCategory === '도서 예약' ? styles.active : ''}`}
                                onClick={() => categoryChange("도서 예약")}

                            >
                                도서 예약
                            </button>
                            <button
                                className={`${styles.categoryButton} ${selectCategory === '계정 관련 문의' ? styles.active : ''}`}
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
                                    .filter((post) => selectCategory === 'all' || post.category === selectCategory)
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
                                        {selectCategory !== "all" ? (
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

export default QnA_BoardList;*/
