import axios from "axios";
import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useDebounce from "../../hooks/useDebounce";
import Button from "../../component/common/Button";
import '../../css/SearchResults.css'

function SearchResults() {
  const [searchResults, setSearchResults] = useState([]);

  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  };

  let query = useQuery();
  const searchTerm = query.get("q");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const navigate = useNavigate();

  useEffect(() => {
    if (debouncedSearchTerm) {
      fetchSearchBook(debouncedSearchTerm);
    }
  }, [debouncedSearchTerm]);

  const fetchSearchBook = async (searchTerm) => {
    try {
      const response = await axios.get("/api/search", {
        params: { title: searchTerm },
      });
      const modifiedData = response.data.map((book) => {
        const imgUrlArray = JSON.parse(book.previewImgList.replace(/\\/g, ""));
        return {
          ...book,
          previewImgList: imgUrlArray,
        };
      });
      setSearchResults(modifiedData);
    } catch (error) {
      setSearchResults([])
    }
  };

  if (searchResults.length > 0) {
    return (
      <div>
        <Container>
          <Row>
            <Col>
              <ul className="all-book-list">
                <h1>검색 결과</h1>

                {searchResults.map((bookDetail, key) => {
                  const standardPrice = parseInt(bookDetail.priceStandard);
                  const salesPrice = parseInt(bookDetail.priceSales);

                  const formattedStdPrice = standardPrice.toLocaleString();
                  const formattedSalesPrice = salesPrice.toLocaleString();

                  return (
                  <>
                  <li className="book-list" key={key}>
                    <div className="book-cover">
                      <Link to={`/bookdetail/${bookDetail.isbn13}`}>
                      <img
                        src={bookDetail.previewImgList[0]}
                        width="180px"
                        height="250px"
                        alt="book-cover"
                      />
                      </Link>
                    </div>
                    <div className="info">
                     
                      <div className="book-title"><Link to={`/bookdetail/${bookDetail.isbn13}`}>{bookDetail.title}</Link></div>
                      <div className="author-pub">
                        {bookDetail.author} · {bookDetail.publisher} ·{" "}
                        {bookDetail.pubDate}
                      </div>
                      <div className="price">
                        <span className="green">10%</span>{" "}
                        <span className="sale-price">
                          {formattedSalesPrice}원
                        </span>{" "}
                        <del>{formattedStdPrice}원</del>
                      </div>
                      <div className="desc">
                        {bookDetail.fullDescription.length > 150
                          ? `${bookDetail.fullDescription.substring(
                              0,
                              150
                            )}......`
                          : bookDetail.fullDescription}
                      </div>
                    
                    </div>
                    <div className="cart-buy">
                      <div className="btn-cart">
                        <Button violet="true">장바구니 담기</Button>
                      </div>
                      <div className="btn-buy">
                        <Button green="true">구매하기</Button>
                      </div>
                    </div>
                  </li>
                </>
              )})}

              </ul>
            </Col>
          </Row>
        </Container>
      </div>
    )
  } else {
    return (
      <>
        <Container>
          <Row>
            <Col>
              <div className="no-results">
                <p>
                  찾고자 하는 검색어 "{searchTerm}"에 맞는 상품이 없습니다.
                  <br />
                  <span>맞춤법이 틀리지 않았는지 확인하거나 다른 검색어로 검색해 보세요.</span>
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </>
    )
  }
}

export default SearchResults;
