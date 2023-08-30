import React from "react";

const QnA_BoardPagination = ({currentPage, totalPages, onPageChange}) => {

    const showPageNumber = [];
    let startPage;

    if (currentPage >= 10) {
        startPage = Math.floor(currentPage / 10) * 10;
    } else {
        startPage = 0;
    }

    const endPage = Math.min(startPage + 9, totalPages - 1);

    for (let i = startPage; i <= endPage; i++) {
        showPageNumber.push(i);
    }

    return (
        <div className="container text-center">
            <div className="button-container mt-3 d-flex justify-content-center">
                <button
                    className="page-button"
                    onClick={() => onPageChange(0)} // 매개변수page를 0으로 설정해 맨앞의 페이지로 이동
                >
                    &lt;&lt; {/* prev 화살표 */}
                </button>
                <button
                    className={`page-button ${currentPage === 0 ? 'disabled' : ''}`} // 현재 페이지가 0이면, 버튼을 비활성화
                    onClick={() => onPageChange(currentPage - 1)} // 이전페이지로 이동
                >
                    &lt; {/* prev 페이지 */}
                </button>
                {/** */}
                {showPageNumber.map((page) => (
                    <button
                        key={page}
                        className={`page-button ${page === currentPage ? 'active' : ''}`}
                        onClick={() => onPageChange(page)}
                    >
                        {page + 1}
                    </button>
                ))}
                <button
                    className={`page-button ${currentPage === totalPages - 1 ? 'disabled' : ''}`}
                    onClick={() => onPageChange(currentPage + 1)} // 다음 페이지
                >
                    &gt; {/* next 페이지 */}
                </button>
                <button
                    className="page-button"
                    onClick={() => onPageChange(totalPages - 1)} // 맨 끝으로 이동
                >
                    &gt;&gt; {/* next 화살표 */}
                </button>
            </div>
        </div>
    );
};

export default QnA_BoardPagination;