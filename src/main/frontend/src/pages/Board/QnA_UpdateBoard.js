import {React, useEffect, useState} from "react";
import axios from "axios";
import {useNavigate, useLocation, useParams} from "react-router-dom";
import EditorComponent from "../../component/BOARD/EditorComponent";

const QnA_UpdateBoard = () => {

    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("");
    const [content, setContent] = useState("");
    const [regDate, setRegDate] = useState(new Date());
    let location = useLocation();
    let navigate = useNavigate();
    const { id} = useParams();
    const [warn, setWarn] = useState(false);

    console.log('UpdateBoard/location.state : ', location.state);




    /** 수정할 값들 / 수정하기 버튼을 누를 때의 값 */
    const pre_title = location.state.title;
    const pre_category = location.state.category;
    const pre_content = location.state.content;
    const pre_writer = location.state.writer;

    const resetInput = () => {
        setTitle("");
        setCategory("");
        setContent("");
        document.getElementById('title_input').value = ' ';
        document.getElementById('category_input').value = ' ';
        document.getElementById('content_text').value = ' ';
    }

    const handleEditClick = async (e) => {
        e.preventDefault();
        document.getElementById('title_input').value = ' ';
        document.getElementById('category_input').value = ' ';

        console.log('게시글 작성')
        const request_data = {id: id, title:title, category:category, content:content};
        console.log("업데이트 아이디" + id);

        // 필수 필드 체크 및 경고 메시지
        if (!title || !category ) {
            setWarn(true);
            alert("아래의 입력값을 입력해주세요.");
            return; // 필수 필드가 하나라도 비어있으면 함수 종료
        }

        /** 수정하기 버튼을 누름과 동시에 api에 요청할 작업 */
         try {
             let response = await axios({
                method : 'put',
                url:`/api/board/update-board`,
                headers: {'Content-Type' : 'application/json'},
                data: JSON.stringify(request_data)

            });
             alert("수정사항이 저장되었습니다.");
             navigate(`/home/board/detail/${id}`);
             console.log("response 내놔 = " , response);
         } catch (err) {
             console.log("게시글 생성 에러",  err);
             resetInput();
         }
    }

    useEffect(() => {
        setTitle(pre_title);
        setCategory(pre_category);
        setContent(pre_content);
    }, [])

    /** text-editor 메서드 */
    function onEditorChange(newContent) {
        setContent(newContent)
    }
    return (
        <>
            <div className="container mt-5">
                <div className="form">
                    <div className="col-md-3 mb-4">
                        <div className="form-group">
                            <label htmlFor="category">카테고리를 선택하세요</label>
                            <select
                                id="category_input"
                                className="form-control"
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
                                <div className="text-danger">카테고리를 선택해주세요.</div>
                            )}
                        </div>
                    </div>

                    <div className="col-md-6 mb-4">
                        <div className="form-group">
                            <label htmlFor="title">제목을 입력하세요</label>
                            <input
                                type="text"
                                id="title_input"
                                className="form-control"
                                value={title}
                                onChange={(e) => {
                                    setTitle(e.target.value);
                                    setWarn(false) }}
                            />
                            {warn && title === "" && (
                                <div className="text-danger">제목을 입력해주세요.</div>
                            )}
                        </div>
                    </div>

                    <div className="col-md-7 mb-4">
                        <div className="form-group">
                            <label htmlFor="content">내용을 입력하세요</label>
                            <EditorComponent
                                dangerouslySetInnerHTML={{ __html: content }}
                                id="content_text"
                                className="form-control"
                                rows="12"
                                modules={EditorComponent.modules}  // modules와 formats를 전달
                                formats={EditorComponent.formats}
                                value={content}
                                onChange={(newContent) => {
                                    onEditorChange(newContent);
                                    setWarn(false);
                                }} />
                            {warn && content === "" && (<div className="text-danger">내용을 입력해주세요</div>)}
                        </div>
                    </div>
                    <div className="col-md-6 mb-4">
                    <p>작성자: {pre_writer}</p>
                    <button
                        type="button"
                        className="btn btn-success"
                        onClick={handleEditClick}
                    >
                        게시글 수정
                    </button>
                    </div>
                </div>
            </div>
        </>
        )
    }

export default QnA_UpdateBoard;


