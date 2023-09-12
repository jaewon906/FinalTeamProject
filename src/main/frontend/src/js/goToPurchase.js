import {getUserNumber} from "./getUserNumber";
import axios from "axios";

const goToPurchase = (isbn, quantity) => {
    const userNumber = getUserNumber().userNumber;

    if (userNumber) {

        axios.get("/api/user/purchase/validateProductIsExist",{
            params:{
                isbnList : isbn
            }
        })
            .then(()=>{
                const sessionStorage = window.sessionStorage;

                let item = sessionStorage.getItem(isbn);
                let item_number = parseInt(item);

                if(!quantity){
                    quantity=1
                }

                if (item_number) {

                    item_number += quantity;
                    sessionStorage.setItem(isbn, item_number);
                } else {

                    sessionStorage.setItem(isbn, quantity);
                }

                window.location.href = "/home/purchase";
            })
            .catch(e =>{
                console.error(e)
                alert("품절 되었습니다.")
            });

    } else {
        const ret = window.confirm(
            "로그인이 필요한 서비스입니다. 로그인 하시겠습니까?"
        );
        if (ret) {
            window.location.href = "/home/logIn";
        }
    }
};

export default goToPurchase;