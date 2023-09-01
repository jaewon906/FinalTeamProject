import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../../css/CartPage/Cart.css";
import { getUserNumber } from "../../js/getUserNumber";
import axios from "axios";

function CartPage() {
  const [cart, setCart] = useState({ cartItems: [] });

  useEffect(() => {
    // 사용자의 userNumber를 가져오기
    const userNumber = getUserNumber().userNumber;

    // 백엔드에서 장바구니 정보를 가져와서 상태 업데이트
    fetchCartItems(userNumber);
  }, []);

  const fetchCartItems = (userNumber) => {
    axios
      .get(`/api/cart/${userNumber}`)
      .then((response) => {
        // 가져온 장바구니 정보를 상태에 설정
        setCart(response.data);
        console.log(response.data);
        fetchBookInfo(response.data.cartItems);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const fetchBookInfo = (cartItems) => {
    const bookIds = cartItems.map((item) => item.bookId);
    axios
      .get(`/api/bookitems?ids=${bookIds.join(",")}`)
      .then((response) => {
        console.log("Response Data", response.data);
        // 도서 정보를 가져온 뒤, cartItems에 병합하여 상태 업데이트
        const updatedCartItems = cartItems.map((item) => {
          const bookInfo = response.data.find((book) => 
            book.bookId === item.bookId
          );
          if(bookInfo) {
            const imgUrlArray = JSON.parse(bookInfo.previewImgList.replace(/\\/g, ""));
            return {
              ...item,
              bookInfo: {
                ...bookInfo,
                previewImgList: imgUrlArray,
              },
            };
          } else {
            return {
              ...item,
              bookInfo: { previewImgList: [] }, // 빈 배열로 초기값 설정
            }
          }
        });
        setCart((prevCart) => ({...prevCart, cartItems: updatedCartItems }));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="container1">
      <div className="main1">
        <div className="tbl-item-wrap">
          <table className="tbl-item">
            <caption>장바구니</caption>
            <tbody>
              {cart.cartItems.map((item) => (
                <tr key={item.id}>
                  <td className="checkbox">
                    <input type="checkbox" />
                  </td>
                  <td className="item">
                    <div className="item-area">
                      <div className="cover-box">
                          {/* {item.bookInfo.previewImgList.length > 0 ? (
                            <img src={item.bookInfo.previewImgList[0]} alt="book" width="100px" height="150px" />
                          ) : (
                            <div>no image</div>
                          )} */}
                      </div>
                      <div className="item-info-box">
                        {item.bookInfo ? (
                          <Link to={`home/bookdetail/${item.bookInfo.isbn13}/`}>{item.bookInfo.title}</Link>
                        ) : (
                          <div>Loading...</div>
                        )}

                        {item.bookInfo ? (
                          <div className="item-price">10% {item.bookInfo.priceSales}</div>
                        ) : (
                          <div>Loading...</div>
                        )}

                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default CartPage;
