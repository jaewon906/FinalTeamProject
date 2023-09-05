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
    const [editReplyId, setEditReplyId] = useState(null);


    /** =========== 게시글에 댓글 작성하기 위한 백엔드 통신 ==============  */
    const replySubmit = async () => {

        if (reply.trim() === "") {
            alert("댓글 입력 바람.");
            return;
        }
        try {

            const userNickname = getUserNumber().nickname;

            axios.post(
                `/api/board/board-detail/reply-list/${id}`, null, {
                    params: {
                        reply: reply,
                        nickname: userNickname
                    }
                }
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


    /** =========== 게시글에 댓글 수정하기 위한 백엔드 통신 ==============  */
    const updateReply = (replyId) => {
        setEditReplyId(replyId);
        setIsEditing(true);
        const replyToEdit = replies.find((reply) => reply.id === replyId);
        setUpdatedReply(replyToEdit.reply);
    }

    const saveUpdateReply = async (replyId) => {
        try {
            await axios.put(`/api/board/board-detail/reply-update/${replyId}`,
                {reply: updatedReply});

            setReplies((prevReplies) => prevReplies.map((reply) =>
                    reply.id === replyId ? {...reply, reply: updatedReply} : reply
                )
            )
        } catch (error) {
            console.error("댓글 수정 에러", error);
        }

        setIsEditing(false);
        setEditReplyId(null);
    }


    /** =========== 게시글에 댓글 삭제하기 위한 백엔드 통신 ==============  */
    const deleteReply = async (replyId) => {
        if (window.confirm("댓글을 삭제하시겟습니까?")) {
            try {
                await axios.delete(`/api/board/board-detail/reply-delete/${replyId}`);
                setReplies((prevReplies) => prevReplies.filter((reply) => reply.id !== replyId));
                console.log(replyId);
            } catch (error) {
                console.error("댓글 삭제 에러 발생 = ", error);
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
                                    {isEditing && editReplyId === reply.id ? (
                                            <input
                                                type="text"
                                                value={updatedReply}
                                                className={styles.replyInput}
                                                placeholder="댓글을 입력하세요"
                                                onChange={(e) => setUpdatedReply(e.target.value)}
                                            />
                                    ) : (
                                        reply.reply
                                    )}
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
                                        {isEditing && editReplyId === reply.id ? (
                                            <button
                                                className={styles.detailUpdateBtn}
                                                style={{ fontSize: "11px", padding: "7px", marginRight: "3px" }}
                                                onClick={saveUpdateReply}
                                            >
                                                저장
                                            </button>
                                        ) : (
                                            <button
                                                className={styles.detailUpdateBtn}
                                                style={{ fontSize: "11px", padding: "7px", marginRight: "3px" }}
                                                onClick={() => updateReply(reply.id)}
                                            >
                                                수정
                                            </button>
                                        )}
                                        <button
                                            style={{ fontSize: "11px", padding: "7px" }}
                                            className={styles.detailDeleteBtn}
                                            onClick={() => deleteReply(reply.id)}
                                        >
                                            삭제
                                        </button>
                                    </div>
                                ) : " "}
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
                                onClick={replySubmit}
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


/*

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



    /!** =========== 게시글에 댓글 작성하기 위한 백엔드 통신 ==============  *!/
    const replySubmit = async () => {

        if (reply.trim() === "") {
            alert("댓글 입력 바람.");
            return;
        }
        try {

            const userNickname = getUserNumber().nickname;

            axios.post(
                `/api/board/board-detail/reply-list/${id}`,null, {
                    params:{
                        reply:reply,
                        nickname:userNickname
                    }
                }
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

    /!** =========== 게시글에 댓글 목록 조회 통신 ==============  *!/
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




    /!** =========== 게시글에 댓글 삭제하기 위한 백엔드 통신 ==============  *!/
    const deleteReply = async (replyId) => {
        if (window.confirm("댓글을 삭제하시겟습니까?")) {
            try {
                await axios.delete(`/api/board/board-detail/reply-delete/${replyId}`);
                setReplies((prevReplies) => prevReplies.filter((reply) => reply.id !== replyId));
                console.log(replyId);
            } catch (error) {
                console.error("댓글 삭제 에러 발생 = ", error);
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
                                {reply.nickname === getUserNumber().nickname ? (
                                    <div className={styles.replyActions}>
                                        {/!*수정 버튼 클릭 시 해당 댓글의 ID를 전달*!/}
                                        <button className={styles.detailUpdateBtn} style={{fontSize:"11px", padding:"7px", marginRight:"3px"}}
                                                onClick={() => updateReply(reply.id)}>수정</button>
                                        <button style={{fontSize: "11px", padding: "7px"}}
                                                className={styles.detailDeleteBtn}
                                                onClick={() => deleteReply(reply.id)}>삭제
                                        </button>
                                    </div>
                                ) : " "}
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
                                onClick={replySubmit}
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
