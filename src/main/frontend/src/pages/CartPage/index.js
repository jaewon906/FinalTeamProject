import React from "react";
import { Link } from "react-router-dom";
import "../../css/Cart.css";

function CartPage() {


  return (
    <div className="container1">
      <div className="main1">
        <div className="tbl-item-wrap">
          <table className="tbl-item">
            <caption>장바구니</caption>
            <tbody>
              <tr>
                <td className="checkbox">
                  <input type="checkbox" checked />
                </td>
                <td className="item">
                  <div className="item-area">
                    <div className="cover-box">
                      <Link>
                        <img src="" width="100px" height="140px" alt="book" />
                      </Link>
                    </div>
                    <div className="item-info-box">
                      <Link>타이틀</Link>

                      <div className="item-price">10% 가격</div>
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default CartPage;
