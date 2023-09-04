import React, {useState, useEffect} from "react";
import axios, {HttpStatusCode} from "axios";
import styles from "../../css/BOARD/reply.module.css";
import {getUserNumber} from "../../js/getUserNumber";
import {useNavigate, useParams} from "react-router-dom";

const ReplySection = () => {

    const [reply, setReply] = useState("");
    const [replies, setReplies] = useState([]);
    const navigate = useNavigate();
    const {id} = useParams();
    const [isEditing, setIsEditing] = useState(false);
    const [updatedReply, setUpdatedReply] = useState(reply.text);


    /** =========== 게시글에 댓글 작성하기 위한 백엔드 통신 ==============  */

        const handleReplySubmit = async () => {

            if (reply.trim() === "") {
                alert("댓글 입력 바람.");
                return;
            }
            try {

                const userNickname = getUserNumber().nickname;
                const requestData = {reply: reply, nickname: userNickname};
                console.log(userNickname);

                axios.post(
                    `/api/board/board-detail/reply-list/${id}`, requestData
                ).then((res) => {
                    const newReply = res.data;
                    console.log("댓글 작성 응답(newReply) = " + newReply)
                    setReplies((prevReplies) => [...prevReplies, newReply]);
                    setReply("");
                }).catch(e => {
                    alert("로그인이 필요한 서비스입니다.")
                    navigate("/home/login")
                    console.error(e)
                })

            } catch (error) {
                alert("잠시 후 시도해주세요 , 만약 이후에도 진행되지 않을 시 , 로그 아웃 후 로그인 하여 다시 시도 해주세요");
                console.log("댓글 작성 에러" + error);
            }
        }

    /** =========== 게시글에 댓글 목록 조회 통신 ==============  */

    useEffect(() => {
        const getReplies = async () => {
            try {
                const response = await axios.get(
                    `/api/board/board-detail/reply-list/${id}`
                );
                const replyList = response.data;
                console.log("댓글 작성 응답(replyList) = ", replyList);
                setReplies(replyList);
            } catch (error) {
                console.log("댓글 목록 조회 에러", error);
            }
        };
        getReplies();
    }, [id]);
    
    /** =========== 게시글에 댓글 삭제하기 위한 백엔드 통신 ==============  */

    const handleDeleteReply = async (replyId) => {
        try {
            // 서버로 댓글 삭제 요청 보내기
            await axios.delete(`/api/board/board-detail/reply-delete/${replyId}`);
            // 댓글 삭제 후 프론트엔드에서도 삭제
            setReplies((prevReplies) => prevReplies.filter((reply) => reply.id !== replyId));
            alert("댓글을 삭제하시겠습니까?")
        } catch (error) {
            console.error('댓글 삭제 에러', error);
        }
    };

    /** =========== 게시글에 댓글 수정하기 위한 백엔드 통신 ==============  */
    const handleUpdate = async (replyId) => {
        try {
            // 서버로 댓글 수정 요청 보내기
            await axios.put(`/api/board/board-detail/reply-update/${replyId}`, {text:updatedReply});

            // 댓글 수정 성공 시 업데이트 콜백 호출
            onUpdateReply(replyId, updatedReply);

            setIsEditing(false);
            setUpdatedReply("");
        } catch (error) {
            console.log("댓글 수정 에러", error);
        }
    }

    const onUpdateReply = (replyId, updatedText) => {
        setUpdatedReply((prevReplies) => ({
            ...prevReplies,
            [replyId]: updatedText,
        }));
    };

/*    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleCancel = () => {
        setIsEditing(false);
        setUpdatedReply(reply.text);
    };

    const handleChange = (e) => {
        setUpdatedReply(e.target.value);
    };*/

    return (
        <>
            <div style={{width: "100%", borderTop: "2px solid #888", marginTop: "50px"}}>
                <div className={styles.reply}>
                    <h4>{replies.length > 0 && `${replies.length} 개의 댓글 😊`}</h4>
                    <ul className={styles.replyList} id="replyList">
                        {replies.map((reply, idx) => (
                            <li key={idx}>
                                <div className={styles.replyContent}>
                                    {reply.reply}
                                </div>
                                <div className={styles.replyInfo}>
                                    <div className={styles.replyAuthor}>
                                        작성자: {reply.nickname}
                                    </div>
                                    <div className={styles.replyDate}>
                                        작성일: {reply.regDate}
                                    </div>
                                </div>
                                {reply.nickname === getUserNumber().nickname ? (
                                <div className={styles.replyActions}>
                                    {/*수정 버튼 클릭 시 해당 댓글의 ID를 전달*/}
                                    <button className={styles.detailUpdateBtn} style={{fontSize:"11px", padding:"7px", marginRight:"3px"}}
                                            onClick={() => handleUpdate(reply.id)}>수정</button>
                                    <button style={{fontSize: "11px", padding: "7px"}}
                                            className={styles.detailDeleteBtn}  onClick={() => handleDeleteReply(reply.id)} >삭제
                                    </button>
                                </div>
                                    ) : " " }
                            </li>
                        ))}
                    </ul>
                </div>

                <div>
                    <div className={styles.replyForm}>
                        <h4 style={{marginLeft: "10px"}}>댓글 작성</h4>
                        <input
                            type="text"
                            value={reply}
                            className={styles.replyInput}
                            placeholder="댓글을 입력하세요"
                            onChange={(e) => setReply(e.target.value)}
                        />

                        <div className={styles.replyBtnGroup}>
                            <button
                                type="submit"
                                className={styles.replySubmit}
                                onClick={handleReplySubmit}
                            >
                                댓글 작성
                            </button>
                            <button
                                className={styles.detailBackBtn}
                                onClick={() => {
                                    navigate(`/home/board`)
                                }}
                            >
                                목록 보기
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )

}

export default ReplySection;

/*import React, {useState, useEffect} from "react";
import axios from "axios";
import styles from "../../css/BOARD/reply.module.css";
import {getUserNumber} from "../../js/getUserNumber";
import {useNavigate, useParams} from "react-router-dom";

const ReplySection = () => {

    const [reply, setReply] = useState("");
    const [replies, setReplies] = useState([]);
    const navigate = useNavigate();
    const {id} = useParams();


    /!** =========== 게시글에 댓글 작성하기 위한 백엔드 통신 ==============  *!/

    const handleReplySubmit = async () => {

        if (reply.trim() === "") {
            alert("댓글 입력 바람.");
            return;
        }
        try {

            const userNickname = getUserNumber().nickname;
            const requestData = {reply: reply, nickname: userNickname};
            console.log(userNickname);

            axios.post(
                `/api/board/board-detail/reply-list/${id}`, requestData
            ).then((res) => {
                const newReply = res.data;
                console.log("댓글 작성 응답(newReply) = " + newReply)
                setReplies((prevReplies) => [...prevReplies, newReply]);
                // window.location.reload()
                setReply("");
            }).catch(e => {
                console.error(e)
            })

        } catch (error) {
            alert("잠시 후 시도해주세요 , 만약 이후에도 진행되지 않을 시 , 로그 아웃 후 로그인 하여 다시 시도 해주세요");
            console.log("댓글 작성 에러" + error);
        }
    }


    useEffect(() => {
        const getReplies = async () => {
            try {
                const response = await axios.get(
                    `/api/board/board-detail/reply-list/${id}`
                );
                const replyList = response.data;
                console.log("댓글 작성 응답(replyList) = ", replyList);
                setReplies(replyList);
            } catch (error) {
                console.log("댓글 목록 조회 에러", error);
            }
        };
        getReplies();
    }, [id]);


    const handleDeleteReply = async (replyId) => {
        if (window.confirm("댓글을 삭제하시겠습니까?")) {

            try {
                const response = await axios.delete(
                    `/api/board/board-detail/reply-delete/${replyId}`

                );
                console.log("Delete Request Data:", {
                    url: `/api/board/board-detail/reply-delete/${replyId}`,
                    responseStatus: response.status,
                    responseData: response.data
                });

                if (response.status === 204) {
                    alert("댓글 삭제 완료");
                    // 댓글 삭제 후, 해당 댓글을 replies에서 제거해주어야 합니다.
                    /!*
                                        const reply = replies.find((reply) => reply.id === replyId);
                    *!/

                    setReplies((prevReplies) =>
                        prevReplies.filter((reply) => reply.id !== replyId)
                    );
                    console.log("reply = ", reply)
                    console.log(replies);
                    console.log(reply.id, replyId)
                } else if (response.status > 400) {
                    alert("댓글 삭제 실패");
                }
            } catch (error) {
                console.log("댓글 삭제 실패 ㅠㅠ", error);
                alert("댓글 삭제 중 에러 발생");
            }
        }

    }


    return (
        <>
            <div style={{width: "100%", borderTop: "2px solid #888", marginTop: "50px"}}>
                <div className={styles.reply}>
                    <h4>{replies.length > 0 && `${replies.length} 개의 댓글 😊`}</h4>
                    <ul className={styles.replyList} id="replyList">
                        {replies.map((reply, idx) => (
                            <li key={idx}>
                                <div className={styles.replyContent}>
                                    {reply.reply}
                                </div>
                                <div className={styles.replyInfo}>
                                    <div className={styles.replyAuthor}>
                                        작성자: {reply.nickname}
                                    </div>
                                    <div className={styles.replyDate}>
                                        작성일: {reply.regDate}
                                    </div>
                                </div>
                                <div className={styles.replyActions}>
                                    <button className={styles.detailUpdateBtn} style={{fontSize:"11px", padding:"7px", marginRight:"3px"}}>수정</button>

                                    {/!*
                                    <button onClick={() => handleEditReply(idx)}>수정</button>
*!/}

                                    <button style={{fontSize: "11px", padding: "7px"}}
                                            className={styles.detailDeleteBtn}>삭제
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>

                <div>
                    <div className={styles.replyForm}>
                        <h4 style={{marginLeft: "10px"}}>댓글 작성</h4>
                        <input
                            type="text"
                            value={reply}
                            className={styles.replyInput}
                            placeholder="댓글을 입력하세요"
                            onChange={(e) => setReply(e.target.value)}
                        />

                        <div className={styles.replyBtnGroup}>
                            <button
                                type="submit"
                                className={styles.replySubmit}
                                onClick={handleReplySubmit}
                            >
                                댓글 작성
                            </button>
                            <button
                                className={styles.detailBackBtn}
                                onClick={() => {
                                    navigate(`/home/board`)
                                }}
                            >
                                목록 보기
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )

}

export default ReplySection;*/

