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
    const [selectedCategory, setSelectedCategory] = useState('all'); // 초기 카테고리 선택은 'all'로 설정


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
        if (selectedCategory === category) {
            // 이미 선택된 카테고리를 다시 클릭한 경우, 선택 해제
            setSelectedCategory('all'); // 또는 원하는 다른 초기 카테고리 선택
        } else {
            // 다른 카테고리를 선택한 경우, 해당 카테고리로 설정
            setSelectedCategory(category);
        }
    }

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
                    <div className={styles.boardMainSearch}>
                        <div style={{display: 'flex', justifyContent: "flex-end", margin: "20px"}}>
                            <div className={styles.categoryContainer} style={{border:"1px solid red"}}>
                                <button
                                    className={`${styles.categoryButton} ${
                                        selectedCategory === 'all' ? styles.active : ''
                                    }`}
                                    onClick={() => handleCategoryToggle('all')}
                                >
                                    전체
                                </button>
                                <button
                                    className={`${styles.categoryButton} ${
                                        selectedCategory === '회원 가입' ? styles.active : ''
                                    }`}
                                    onClick={() => handleCategoryToggle('category1')}
                                >
                                    회원 가입
                                </button>
                                <button
                                    className={`${styles.categoryButton} ${
                                        selectedCategory === 'category2' ? styles.active : ''
                                    }`}
                                    onClick={() => handleCategoryToggle('category2')}
                                >
                                    카테고리2
                                </button>
                                {/* 원하는 다른 카테고리 버튼들을 추가할 수 있습니다 */}
                            </div>
                            <div style={{border:"1px solid black"}}>
                                <input
                                    type="text"
                                    placeholder=" Search..."
                                    value={searchText}
                                    style={{width: "250px", marginRight: "10px"}}
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
                                props.data.map((i, index) => (
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

export default QnA_BoardList;

{/*            <div className="container text-center" style={{paddingTop: ' 100px', border: '2px solid black'}}>
                <h1 className="mt-5">문의 게시판</h1>
                <br/>
                <div className="col-md-7" style={{marginLeft:'900px'}}>
                    <div className="col-md-6" style={{display:'flex'}}>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search..."
                            value={searchText}
                            onChange={(e) => setSearchText(e.target.value)}
                        />
                        <button className="btn btn-success" style={{marginLeft: '15px'}}
                                onClick={() => handleSearch(searchText)}>
                            Search
                        </button>
                    </div>
                </div>
                <div className="row justify-content-center mt-5">
                    <div className="col-md-12">
                        <table className="table table-bordered table-hover shadow-lg">
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
                                props.data.map((i, index) => (
                                    <QnA_BoardBox
                                        key={i.id}
                                        id={i.id} //게시글 번호 역순으로 생성
                                        title={i.title}
                                        category={i.category}
                                        content={i.content.replace(/<[^>]+>/g, '')}
                                        writer={i.writer}
                                        view={i.view}
                                        createdTime={i.createdTime}
                                        currentPage={currentPage + 1}
                                    />

                                ))
                            ) : (
                                <tr>
                                    <td colSpan="8">존재하는 게시글이 없습니다.</td>
                                </tr>
                            )}
                            </tbody>
                        </table>
                        <QnA_BoardPagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={onPageChange}
                        />
                    </div>
                        <div className="col-md-6 mb-4" style={{padding: '20px', display: 'flex', flexDirection: 'column', alignItems:'center'}}>
                            <button
                                type="submit"
                                className="btn btn-success mt-4"
                                onClick={authenticate}
                            >
                                게시글 작성하기
                            </button>
                        </div>
                </div>
            </div>*/
}
