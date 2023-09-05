import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "../../../css/CartPage/Cart.module.css";
import { getUserNumber } from "../../../js/getUserNumber";
import axios from "axios";
import Button from "../../../common/Button";
import Loading from "../../../js/Loading";

function Cart() {
  const [cart, setCart] = useState({ cartItems: [] });
  const [selectedItems, setSelectedItems] = useState([]);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

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
        fetchBookInfo(response.data.cartItems);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        // 데이터를 가져온 후 로딩 상태 해제
        setTimeout(() => {
          setIsLoading(false);
        }, 500)
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
          const bookInfo = response.data.find(
            (book) => book.bookId === item.bookId
          );
          if (bookInfo) {
            const imgUrlArray = JSON.parse(
              bookInfo.previewImgList.replace(/\\/g, "")
            );
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
            };
          }
        });
        setCart((prevCart) => ({ ...prevCart, cartItems: updatedCartItems }));
      })
      .catch((error) => {
        console.log(error);
      });
  };

   // 로딩 중일 때 로딩 컴포넌트 보여주기
   if(isLoading) {
    return <Loading />
  }

  const handleCheckBoxChange = (itemId, isbn) => {
    // if (selectedItems.includes(itemId)) {
    //   setSelectedItems(selectedItems.filter((id) => id !== itemId));
    // } else {
    //   setSelectedItems([...selectedItems, itemId]);
    // }
    setSelectedItems((prevSelectedItems) => {
      const selectedItem = prevSelectedItems.find((item) => item.itemId === itemId);

      if(selectedItem) {
        // 이미 선택된 아이템이 있는 경우, 선택 해제
        return prevSelectedItems.filter((item) => item.itemId !== itemId);
      } else {
        // 선택된 아이템이 없는 경우, 추가
        return [...prevSelectedItems, { itemId, isbn }];
      }
    });
  };
  

  const handleDeleteItems = () => {

    if(selectedItems.length === 0) {
      // 선택된 상품이 없는 경우 메시지 표시
      alert("상품을 선택해주세요.");
      return;
    }
    const ret = window.confirm("상품을 삭제하겠습니까?");
    const itemIdsToDelete = selectedItems.map((item) => item.itemId);

    if (ret) {
      axios
        .delete(`/api/cart/${userNumber}/items`, {
          data: itemIdsToDelete,
        })
        .then((response) => {
          // 백엔드에서 삭제가 성공하면 프론트에서도 상품 제거
          setCart((prevCart) => ({
            ...prevCart,
            cartItems: prevCart.cartItems.filter(
              (item) =>
                !selectedItems.some(
                  (selectedId) => selectedId === item.bookInfo.bookId
                )
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

  const emptyCart = () => {
    if(cart.cartItems.length === 0) {
      return <td><div className={styles.center}><span className={styles.empty}>텅</span></div></td>;
    }
    return null;  // 장바구니에 상품이 있을 때는 null 반환
  }

  // 개별 상품의 수량 변경 함수
  const handleQuantityChange = (itemId, newQuantity) => {
    // 상품 수량의 최소값과 최대값 설정
    newQuantity = Math.min(100, Math.max(1, newQuantity));

    // cart.cartItems를 업데이트하면서 수량 변경
    const updatedCartItems = cart.cartItems.map((item) => {
      if (item.id === itemId) {
        return { ...item, quantity: newQuantity };
      }
      return item;
    });
    setCart((prevCart) => ({ ...prevCart, cartItems: updatedCartItems }));
  };

  const goToPurchase = (isbn) => {
    if(userNumber) {
      const sessionStorage = window.sessionStorage;

      selectedItems.forEach((selectedItems) => {
        const { itemId, isbn } = selectedItems;

        let item_number = sessionStorage.getItem(isbn);

        if(item_number) {
          item_number = parseInt(item_number);
          item_number += cart.cartItems.find((item) => item.id === itemId).quantity;
        } else {
          item_number = cart.cartItems.find((item) => item.id === itemId).quantity;
        }
        sessionStorage.setItem(isbn, item_number);
      });
      
      navigate("/home/purchase");
      
    } else {
      const ret = window.confirm(
        "로그인이 필요한 서비스입니다. 로그인 하시겠습니까?"
      );
      if(ret) {
        navigate("/home/logIn/")
      }
    }
  }

  const handlePurchaseClick = () => {

    if(selectedItems.length === 0) {
      // 선택된 상품이 없는 경우 메시지 표시
      alert("상품을 선택해주세요.");
      return;
    }
    // selectedItems 배열에서 isbn 값만 추출하여 selectedIsbns 배열 생성
    const selectedIsbns = selectedItems.map((item) => item.isbn);

    // goToPurchase 함수를 호출하여 선택한 책들을 구매 페이지로 이동
    goToPurchase(selectedIsbns);
  }

  return (
    <div className="container1">
      <div className="main1">
        <div className={styles.tblItemWrap}>
          <table className={styles.tblItem}>
            <caption>장바구니({cart.quantity})</caption>
            {emptyCart()}
            <tbody>
              {cart.cartItems.map((item) => {
               
                const priceSales = item.bookInfo
                  ? parseInt(item.bookInfo.priceSales)
                  : 0;
                const priceStd = item.bookInfo
                  ? parseInt(item.bookInfo.priceStandard)
                  : 0;
                const totalPrice = item.bookInfo
                  ? item.bookInfo.priceSales * item.quantity
                  : 0;

                const formattedPriceSales = priceSales.toLocaleString();
                const formattedPriceStd = priceStd.toLocaleString();
                const formattedTotalPrice = totalPrice.toLocaleString();

                return (
                  <tr key={item.id}>
                    <td className={styles.checkbox}>
                      <input
                        type="checkbox"
                        checked={selectedItems.some((selectedItem) => selectedItem.itemId === item.id)}
                        onChange={() => handleCheckBoxChange(item.id, item.bookInfo.isbn13)}
                      />
                    </td>
                    <td className="item">
                      <div className={styles.itemArea}>
                        <div className="cover-box">
                          {item.bookInfo ? (
                            <Link
                              to={`/home/bookdetail/${item.bookInfo.isbn13}/`}
                            >
                              <img
                                src={item.bookInfo.previewImgList[0]}
                                alt="book"
                                width="100px"
                                height="150px"
                              />
                            </Link>
                          ) : (
                            <div>no image</div>
                          )}
                        </div>
                        <div className={styles.itemInfoBox}>
                          {item.bookInfo ? (
                            <Link className={styles.title}
                              to={`/home/bookdetail/${item.bookInfo.isbn13}/`}
                            >
                              {item.bookInfo.title}
                            </Link>
                          ) : (
                            <div>Loading...</div>
                          )}

                          {item.bookInfo ? (
                            <div className="item-price">
                              <span className={styles.green}>10%</span>
                              {formattedPriceSales}원
                              <del className={styles.del}>
                                {formattedPriceStd}원
                              </del>
                              <p>
                                {item.bookInfo.author} ·{" "}
                                {item.bookInfo.publisher}
                              </p>
                            </div>
                          ) : (
                            <div>Loading...</div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className={styles.center}>
                      {item.bookInfo ? (
                        <>
                          <div>{formattedTotalPrice}원</div>
                          {/* 개별 상품의 수량 조절 */}
                          <div className={styles.btnBox}>
                            <Button
                            className={styles.btn}
                              onClick={() =>
                                handleQuantityChange(item.id, item.quantity - 1)
                              }
                            >
                              -
                            </Button>
                            <input
                              type="number"
                              className={styles.num}
                              value={item.quantity}
                              onChange={(e) =>
                                handleQuantityChange(
                                  item.id,
                                  parseInt(e.target.value)
                                )
                              }
                            />
                            <Button
                            className={styles.btn}
                              onClick={() =>
                                handleQuantityChange(item.id, item.quantity + 1)
                              }
                            >
                              +
                            </Button>
                          </div>
                        </>
                      ) : (
                        <div>Loading...</div>
                      )}
                    </td>
                    <td>
                      <div className={styles.center}>배송료 : 무료</div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className={styles.btnBox}>
          <div className={styles.btn}>
            <Button 
            green="true" 
            fullWidth
            onClick={handlePurchaseClick}
            >
              구매하기
            </Button>
          </div>
          <div className={styles.btn}>
            <Button red="true" fullWidth onClick={handleDeleteItems}>
              삭제하기
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;