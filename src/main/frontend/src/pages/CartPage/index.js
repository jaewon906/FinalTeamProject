import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../../css/CartPage/Cart.css";
import { getUserNumber } from "../../js/getUserNumber";
import axios from "axios";

function CartPage() {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    // 사용자의 userNumber를 가져오기
    const userNumber = getUserNumber().userNumber;

    // 백엔드에서 장바구니 정보를 가져와서 상태 업데이트
    fetchCartItems(userNumber);
  }, []);

  useEffect(() => {
    console.log(cartItems);
  }, [cartItems]);

  const fetchCartItems = (userNumber) => {
    axios
      .get(`/api/cart/${userNumber}`)
      .then((response) => {
        // 가져온 장바구니 정보를 상태에 설정
        setCartItems(response.data);
        console.log(response.data);
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
              {cartItems.map((item) => (
                <tr key={item.id}>
                  <td className="checkbox">
                    <input type="checkbox" checked />
                  </td>
                  <td className="item">
                    <div className="item-area">
                      <div className="cover-box">
                        <Link>
                          <img src={item.book.cover} width="100px" height="140px" alt="book" />
                        </Link>
                      </div>
                      <div className="item-info-box">
                        <Link>{item.book.title}</Link>

                        <div className="item-price">10% 가격</div>
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
