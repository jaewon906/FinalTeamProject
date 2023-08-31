import React, {useEffect, useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import '../../css/BOARD/board.module.css'
import {getUserNumber} from "../../js/getUserNumber";
import EditorComponent from "../../component/BOARD/EditorComponent";
import styles from '../../css/BOARD/board.module.css'


const QnA_CreateBoard = () => {

    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("");
    const [content, setContent] = useState("");
    const [writer, setWriter] = useState("");
    const [isCollapsed, setIsCollapsed] = useState(true);
    const [warn, setWarn] = useState(false);
    const [isAuthenticate, setIsAuthenticate] = useState(false);
    const [loding, setLoding] = useState(false);


    let navigate = useNavigate();  // 다른 Component들로 이동 시에 사용 (Link는 a 태그 개념, Navigation은 함수 실행이 끝나면서, 이동 발생)

    //입력값을 초기화를 가능하게 해주는 메서드
    const resetInput = () => {
        // 입력 필드의 상태(state)를 초기화합니다.
        setCategory("");
        setTitle("");
        setContent("");
        setWriter("");
        // HTML 문서의 해당 요소에 빈 값을 설정하여 입력 필드를 초기화합니다.
        document.getElementById('category_input').value = ' ';
        document.getElementById('title_input').value = ' ';

    }



    useEffect(()=>{
        axios.get("/api/board/create-board/authenticate").then(() => {
            setIsAuthenticate(true)
            setLoding(true)
            setWriter(getUserNumber().nickname)
        }).catch(e => {
            alert("로그인이 필요한 서비스입니다.")
            console.error(e);
        })
    },[])


    /** text-editor 메서드 */

    function onEditorChange(newContent) {
        setContent(newContent)
    }

    const handleInputCheck = async (e) => {

        e.preventDefault();
        /** 사용할 입력 필드 초기화 - 새 게시글 작성 시 기존의 입력 내용이 지워지고 새로운 데이터 입력*/
        document.getElementById('category_input').value = ' ';
        document.getElementById('title_input').value = ' ';
        console.log('게시글 작성');

        // 필수 필드 체크 및 경고 메시지
        if (!title || !category || !writer || !content) {
            setWarn(true);
            alert("아래의 입력값을 입력해주세요.");
            return; // 필수 필드가 하나라도 비어있으면 함수 종료
        }

        /** 요청할 데이터 객체 생성 */
        const request_data = {title: title, category: category, content: content, writer: writer};
        console.log("요청한 데이터", request_data);

        try {
            /** 게시글 생성 요청 전송 */
            let response = await axios({
                method: 'post',
                url: '/api/board/create-board',
                headers: {"Content-Type": 'application/json'}, //JSON형식의 데이터 전송 명시
                data: request_data
            });

            console.log("게시글 작성하기의 응답", response);
            console.log("게시글 작성하기 응답에 대한 상태" + response.status);

            /** 응답에 따라 알럿창으로 알림 */
            if (response.status >= 200 && response.status <= 300) {
                alert("게시글이 정상적으로 생성되었습니다.");
                // 새 게시글 데이터를 부모 컴포넌트로 전달
            }
            if (response.status >= 400) {
                alert("게시글 생성이 정상적으로 되지 않았습니다.");
            }
            /** 해당 메서드 실행 완료 후 페이지 전환 */
            navigate("/home/board", {});
        } catch (err) {
            console.log("게시글 작성하기를 동작하는 기능 에러", err);
            resetInput();
        }
    }



    return (
        <>
{/*
            <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>

            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            ...
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-primary">Save changes</button>
                        </div>
                    </div>
                </div>
            </div>*/}
            {loding ?
            <div className={styles.createContainer}>
                <h1 className={styles.createTitle}>글 작성</h1>
                <div className={styles.createForm}>
                    <div className={styles.createFormRow}>
                        <div className={styles.createFormCol}>
                            <form onSubmit={handleInputCheck}>
                                    <div className={styles.createFormGroup}>
                                        <label htmlFor="category">카테고리를 선택하세요</label>
                                        <select
                                            id="category_input"
                                            className={styles.createSelect}
                                            value={category}
                                            onChange={(e) => {
                                                setCategory(e.target.value);
                                                setWarn(false) //카테고리가 선택되면 경고메세지는 사라짐
                                            }}
                                        >
                                            <option value="">카테고리 선택</option>
                                            <option value="주문 및 배송">주문 및 배송</option>
                                            <option value="교환 및 환불">교환 및 환불</option>
                                            <option value="회원 가입">회원 가입</option>
                                            <option value="도서 예약">도서 예약</option>
                                        </select>
                                        {warn && category === "" && (
                                            <div className={styles.createError} style={{color:"red"}}>카테고리를 선택해주세요.</div>
                                        )}
                                    </div>
                                <div>
                                    <div className = {styles.createFormGroup}>
                                        <label htmlFor="title" style={{marginBottom:"10px"}}>제목을 입력하세요</label>
                                        <input
                                            type="text"
                                            id="title_input"
                                            style={{height:"25px", width:"500px", padding:"5px"}}
                                            value={title}
                                            onChange={(e) => {
                                                setTitle(e.target.value);
                                                setWarn(false)
                                            }}
                                        />
                                        {warn && title === "" && (
                                            <div style={{color:"red"}}>제목을 입력해주세요.</div>
                                        )}
                                    </div>
                                </div>

                                <div>
                                    <div>
                                        <label htmlFor="content">내용을 입력하세요</label>
                                        <EditorComponent
                                            dangerouslySetInnerHTML={{ __html: content }}
                                            id="content_text"
                                            className="form-control"
                                            rows="12"
                                            value={content}
                                            onChange={(newContent) => {
                                                onEditorChange(newContent);
                                                setWarn(false);
                                            }} />

                                        {warn && content === "" && (<div style={{color:"red"}}>내용을 입력해주세요</div>)}
                                    </div>
                                </div>


                                <div>
                                    <div style={{marginTop:"25px"}}>
                                        <p>작성자 : {writer}</p>
                                    </div>
                                </div>
                                <button type="submit" className={styles.createSubmitBtn} onClick={handleInputCheck}>글 작성
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
          : " " }
        </>
    )
};

export default QnA_CreateBoard;
