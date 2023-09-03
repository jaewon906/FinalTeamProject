import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "../../css/CartPage/Cart.module.css";
import { getUserNumber } from "../../js/getUserNumber";
import axios from "axios";
import Button from "../../component/common/Button";

function CartPage() {
  const [cart, setCart] = useState({ cartItems: [] });
  const [selectedItems, setSelectedItems] = useState([]);
  const [quantity, setQuantity] = useState(1);

  // 장바구니 상품 수량 조절
 
  
  // 사용자의 userNumber를 가져오기
   const userNumber = getUserNumber().userNumber;

  useEffect(() => {
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

  const handleCheckBoxChange = (itemId) => {
    if(selectedItems.includes(itemId)) {
      setSelectedItems(selectedItems.filter((id) => id !== itemId));
    } else {
      setSelectedItems([...selectedItems, itemId]);
    }
  };

  const handleDeleteItems = () => {
    const ret = window.confirm("상품을 삭제하겠습니까?");

    if(ret) {
    axios
      .delete(`/api/cart/${userNumber}/items`, {
        data: selectedItems
      })
      .then((response) => {
        // 백엔드에서 삭제가 성공하면 프론트에서도 상품 제거
        setCart((prevCart) => ({
          ...prevCart,
          cartItems: prevCart.cartItems.filter(
            (item) => !selectedItems.some(selectedId => selectedId === item.bookInfo.bookId)
          ),
        }));
        setSelectedItems([]); // 선택된 아이템 초기화
        // 삭제 후 장바구니 정보 다시 업데이트
        fetchCartItems(userNumber);
      })
      .catch((error) => {
        console.log(error);
      });
    } else {
      return;
    }
  };

  return (
    <div className="container1">
      <div className="main1">
        <div className={styles.tblItemWrap}>
          <table className={styles.tblItem}>
            <caption>장바구니</caption>
            <tbody>
              {cart.cartItems.map((item) => {
                return(
                  <tr key={item.id}>
                  <td className={styles.checkbox}>
                    <input 
                      type="checkbox"
                      checked={selectedItems.includes(item.id)}
                      onChange={() => handleCheckBoxChange(item.id)}
                      />
                  </td>
                  <td className="item">
                    <div className={styles.itemArea}>
                      <div className="cover-box">
                          {item.bookInfo ? (
                            <Link to={`/home/bookdetail/${item.bookInfo.isbn13}/`}>
                            <img src={item.bookInfo.previewImgList[0]} alt="book" width="100px" height="150px" />
                            </Link>
                          ) : (
                            <div>no image</div>
                          )}
                      </div>
                      <div className={styles.itemInfoBox}>
                        {item.bookInfo ? (
                          <Link to={`/home/bookdetail/${item.bookInfo.isbn13}/`}>{item.bookInfo.title}</Link>
                        ) : (
                          <div>Loading...</div>
                        )}

                        {item.bookInfo ? (
                          <div className="item-price">
                            <span className={styles.green}>10%</span>{item.bookInfo.priceSales}원 <del className={styles.del}>{item.bookInfo.priceStandard}원</del>
                            <p>{item.bookInfo.author} · {item.bookInfo.publisher}</p>
                          </div>
                        ) : (
                          <div>Loading...</div>
                        )}

                      </div>
                    </div>
                  </td>
                  <td>
                  
                  </td>
                  <td>
                    <Button red="true" onClick={handleDeleteItems}>삭제</Button>
                  </td>
                </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default CartPage;
