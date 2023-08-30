import {Link, useLocation} from "react-router-dom";
import {React, useEffect, useState} from "react";
import QnA_BoardBox from "./QnA_BoardBox";
import axios from "axios";
import '../../css/board.css';
import QnA_BoardPagination from "./QnA_BoardPagination";


const QnA_BoardList = (props) => {

    const {currentPage, totalPages, onPageChange, handleSearch , formattedCreatedTime} = props;
    const [searchText, setSearchText] = useState("");
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false);

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


    console.log(props.data);
    return (
        <>

            <div className="container text-center" style={{paddingTop: ' 100px', border: '2px solid black'}}>
                <h1 className="mt-5">문의 게시판</h1>
                <br/>
                <div className="col-md-7" style={{marginLeft: '900px'}}>
                    <div className="col-md-6" style={{display: 'flex'}}>
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
                                        formattedCreatedTime={formattedCreatedTime}
                                        currentPage={currentPage + 1}
                                    />

                                ))
                            ) : (
                                <tr>
                                    <td colSpan="8" style={{ textAlign: "center" }}>
                                        <div className="spinner-border text-primary-emphasis" role="status">
                                            <span className="visually-hidden">Loading...</span>
                                        </div>
                                    </td>
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
                    <div className="col-md-6 mb-4"
                         style={{padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                        <button
                            type="submit"
                            className="btn btn-success mt-4"
                            onClick={authenticate}
                        >
                            게시글 작성하기
                        </button>
                    </div>
                </div>
            </div>
            )
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
            </div>*/}
