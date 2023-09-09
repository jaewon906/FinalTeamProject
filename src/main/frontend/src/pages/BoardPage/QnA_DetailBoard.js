import React, {useEffect, useState} from "react";
import axios, {get, request} from "axios";
import {Link, useLocation, useNavigate, useParams} from "react-router-dom";
import {getUserNumber} from "../../js/getUserNumber";
import styles from "../../css/BOARD/board.module.css"
import ReplySection from "../../component/BOARD/QnA_Reply";
import QnA_Reply from "../../component/BOARD/QnA_Reply";

const QnA_DetailBoard = () => {

    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("");
    const [content, setContent] = useState("");
    const [writer, setWriter] = useState("");
    const [replies, setReplies] = useState([]);
    const [regDate, setRegDate] = useState(new Date());
    const [editorModules, setEditorModules] = useState(null);
    const [editorFormats, setEditorFormats] = useState(null);
    const [loading, setLoading] = useState(true); // 초기 로딩 상태 설정
    const location = useLocation();
    const currentPage = location.state?.currentPage ?? 0;
    const navigate = useNavigate();
    const {id} = useParams();


    /** =========== 게시글 상세보기 위한 백엔드 통신 ==============  */
    useEffect(() => {
        const getDetailBoard = async () => {
            try {
                let response = await axios.get(`/api/board/board-detail/${id}`);
                console.log("Detail/response = ", response);
                console.log("detail/response/data.data = ", response.data.data);
                setTitle(response.data.data.title);
                setCategory(response.data.data.category);
                setContent(response.data.data.content);
                setWriter(response.data.data.writer);

                // EditorComponent에서 사용할 modules와 formats 값을 가져와서 설정
                setEditorModules(response.data.data.modules);
                setEditorFormats(response.data.data.formats);

                // 데이터를 가져오는 데 성공하면 로딩 상태를 false로 변경
                setLoading(false)
            } catch (error) {
                console.log("게시글 정보 or 댓글 데이터 불러오기 실패", error);
            }
        }
        getDetailBoard();
    }, [id]);


    /** =========== 게시글 삭제위한 백엔드 통신 ==============  */
    const boardDeleteBtnClick = async (e) => {
        e.preventDefault();
        if (window.confirm("게시글을 삭제하시겟습니까?")) {
            const request_data = {id: id};
            try {
                let response = await axios({
                    method: 'delete',
                    url: '/api/board/delete-board',
                    headers: {'Content-Type': 'application/json'},
                    data: JSON.stringify(request_data)
                });
                console.log("detail/event/response = ", response);
                navigate("/home/board", {});
                //확인을 누르는 순간 navigate를 통해서 Route로 설정된 board 페이지로 이동
                if (response.status === 204) {
                    alert("게시물 삭제 완료");
                } else if (response.status > 400) {
                    alert("게시물 삭제 실패");
                }
            } catch (error) {
                console.log("게시물 삭제 실패:", error);
                alert("게시물 삭제 중 에러가 발생했습니다.");
            }
        } else {
            // 취소 시 메서드가 취소되며, 페이지 이동은 하지 않습니다.
        }
    };

    console.log(replies.nickname)
    console.log("현재 페이지 = " + currentPage);
    console.log(getUserNumber().nickname)


    /** =========== 게시글 상세보기 및 댓글작성, 삭제기능 구현 view(리액트) ==============  */
    return (
        <>
            {loading ? ( // 로딩 중인 경우
                <div className={styles.spinnerContainer}>
                    <div className={`spinner ${styles.spinner}`}></div>
                </div>
            ) : (
            <div style={{display: "flex", justifyContent: "space-around", paddingTop: "15px", paddingBottom: "25px", padding:"50px 0 30px 0"}}>
                <div className={styles.detailContainer}>
                    <div className={styles.detailHeader}>
                        <h2> 문의 사항 : {category}</h2>
                    </div>
                    <div style={{marginTop:"2px", width:"100%"}}>
                        <h3 className={styles.detailTitle}>글 제목</h3>
                        <h4 style={{
                            padding: "15px",
                            border: "2px solid #45b751",
                            borderRadius: "8px",
                            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                            backgroundColor:"white",
                            color:"black"
                        }}> " {title} "</h4>
                        <h3 className={styles.detailTitle} style={{marginTop:"15px"}}>글 내용</h3>
                        <div className={styles.detailContent} dangerouslySetInnerHTML={{__html: content}}></div>
                        <p className={styles.detailAuthor}>작성자 : {writer}</p>
                        <p className={styles.detailDate}>작성 일자 : {regDate.toLocaleDateString().replace(/\.$/, '')}</p>
                        {/*replace() 메서드를 사용하여 이 마침표를 빈 문자열로 대체하여 제거*/}

                        {writer === getUserNumber().nickname ? (
                            <div className={styles.detailBtnGroup}>
                                <button
                                    className={styles.detailUpdateBtn}
                                    style={{marginRight:"8px"}}
                                    onClick={() => {
                                        navigate(`/home/board/update-board/${id}`, {
                                            state: {
                                                id: id,
                                                title: title,
                                                category: category,
                                                content: content,
                                                writer: writer,
                                                regDate: regDate,
                                            },
                                        });
                                    }}
                                >
                                    수정하기
                                </button>
                                <button
                                    className={styles.detailDeleteBtn}
                                    onClick={boardDeleteBtnClick}
                                >
                                    삭제하기
                                </button>
                            </div>
                        ) : " "}
                    </div>
                    <QnA_Reply boardId = {id}  />
                </div>
            </div>
            )}
        </>
    );

}

export default QnA_DetailBoard;


/*
    /!** =========== 게시글 상세보기 위한 백엔드 통신 ==============  *!/
    useEffect(() => {
        const getDetailBoard = async () => {
            try {
                let response = await axios.get(`/api/board/board-detail/${id}`);
                console.log("Detail/response = ", response);
                console.log("detail/response/data.data = ", response.data.data);
                setTitle(response.data.data.title);
                setCategory(response.data.data.category);
                setContent(response.data.data.content);
                setWriter(response.data.data.writer);

                // EditorComponent에서 사용할 modules와 formats 값을 가져와서 설정
                setEditorModules(response.data.data.modules);
                setEditorFormats(response.data.data.formats);

                const replyResponse = await axios.get(`/api/board/board-detail/${id}/reply-list`);
                const replyList = replyResponse.data;
                console.log("댓글 작성 응답(replyList) = ", replyList);
                setReplies(replyList);
            } catch (error) {
                console.log("게시글 정보 or 댓글 데이터 불러오기 실패", error);
            }
        }
        getDetailBoard();
    }, [id]);*/


/* useEffect 훅은 특정한 조건을 만족할 때만 실행되도록 도와주는 역할
 * 여기서 getDetailBoard 함수는 특정한 게시글의 내용을 가져오는 역할을 하죠
 * 그런데 이 함수가 호출되기 위해서는 어떤 게시글의 내용을 가져와야 할지를 알아야 합니다.
 * 이때 사용하는 것이 바로 id 값입니다.
 *
 * 그래서 useEffect의 두 번째 인자로 [id]를 전달하면, 만약 id 값이 변경되면, 즉 다른 게시글을 선택하거나 조회할 때마다,
 * getDetailBoard 함수를 호출해서 해당 게시글의 내용을 가져와서 보여줘야 합니다.
 * 즉, id 값이 바뀔 때마다 그에 맞는 게시글 내용을 가져오는 역할을 getDetailBoard 함수에 부여합니다. */


