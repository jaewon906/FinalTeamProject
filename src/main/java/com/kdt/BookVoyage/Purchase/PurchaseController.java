package com.kdt.BookVoyage.Purchase;

import com.kdt.BookVoyage.Book.BookDto;
import com.kdt.BookVoyage.Book.BookEntity;
import com.kdt.BookVoyage.Member.MemberDTO;
import com.kdt.BookVoyage.Member.MemberServiceImpl;
import com.kdt.BookVoyage.Order.OrderDTO;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/user/purchase")
@RequiredArgsConstructor
@Slf4j
public class PurchaseController {

    private final MemberServiceImpl memberService;
    private final PurchaseService purchaseService;

    @GetMapping("/userInfo")
    public MemberDTO getMemberInfo(MemberDTO memberDTO) {
        return memberService.showMyInfo(memberDTO);
    }

    @GetMapping("/details")
    public List<ResponseEntity<BookEntity>> getBookDetails(PurchaseDTO purchaseDTO) throws Exception {
        log.info("list : {}", purchaseDTO.getIsbnList());
        return purchaseService.getBookDetails(purchaseDTO.getIsbnList());
    }

    @PostMapping("/purchasedList")
    public void savePurchasedList(PurchaseDTO purchaseDTO) {
        purchaseService.savePurchasedList(purchaseDTO);
    }


    @GetMapping("/showAllOrders")
    public List<OrderDTO> showAllOrders(MemberDTO memberDTO) {

        return purchaseService.showAllOrders(memberDTO);
    }


    @GetMapping("/result")
    public List<OrderDTO> purchaseResult(HttpServletRequest request) {

        String merchantUid = request.getParameter("merchant_uid");
        String userNumber = request.getParameter("userNumber");
        String orderNumber = merchantUid.split("_")[1];

        return purchaseService.purchasedResult(userNumber, orderNumber);

    }

    @PostMapping("/cancel")
    public void cancelOrder(OrderDTO orderDTO) {
        purchaseService.cancelOrder(orderDTO);

    }

    @GetMapping("/validateProductIsExist")
    public void isProductExist(BookDto bookDto) {

        purchaseService.isProductExist(bookDto);
    }
}

