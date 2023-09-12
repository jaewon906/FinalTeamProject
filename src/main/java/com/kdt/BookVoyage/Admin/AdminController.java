package com.kdt.BookVoyage.Admin;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.kdt.BookVoyage.Book.*;
import com.kdt.BookVoyage.Member.MemberDTO;
import com.kdt.BookVoyage.Order.OrderDTO;
import com.kdt.BookVoyage.Order.OrderDetailDTO;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

import java.io.UnsupportedEncodingException;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin/")
@RequiredArgsConstructor
@Slf4j
public class AdminController {

    private final AdminService adminService;

    private final BookService bookService;

    @GetMapping("autoLogin")
    public void autoLogin() {

        log.info("(admin)자동 로그인 되셨습니다.");
    }

    @GetMapping("login")
    public void login(AdminDTO adminDTO, HttpServletResponse response) throws UnsupportedEncodingException {

        adminService.login(adminDTO, response);
    }

    @GetMapping("summary")
    public int loadSummary() {

        return adminService.getTotalSummary();
    }

    @GetMapping("summaryNewUserPerDay")
    public Map<String, Integer> loadGetNewUserPerDaySummary() {

        return adminService.getNewUserPerDaySummary();
    }

    @GetMapping("showUnreadOrders") //관리자가 읽지않은 주문들을 불러옵니다.
    public List<OrderDTO> showOrderLists() {
        return adminService.showUnreadOrderLists();
    }

    @GetMapping("manage/user")
    public Page<MemberDTO> loadUserInfo(Pageable pageable) {

        return adminService.getUserInfo(pageable);
    }

    @GetMapping("manage/user/search")
    public Page<MemberDTO> searchUserInfo(String keyword, Pageable pageable) {

        return adminService.searchUserInfo(keyword, pageable);
    }

    @PostMapping("manage/user/update")
    public void updateUserState(@RequestBody List<Map<String, String>> updatedList) {

        adminService.updateUserState(updatedList);

    }


    @GetMapping("manage/order")
    public Page<OrderDTO> loadOrderInfo(Pageable pageable) {

        return adminService.getOrderInfo(pageable);
    }

    @GetMapping("manage/order/search")
    public Page<OrderDTO> searchOrderInfo(String keyword, Pageable pageable) {

        return adminService.searchOrderInfo(keyword, pageable);
    }

    @PostMapping("manage/order/detail")
    public OrderDetailDTO loadOrderDetailInfo(OrderDTO orderDTO) {

        return adminService.getOrderDetailAndSetIsRead(orderDTO);
    }

    @PostMapping("manage/order/update")
    public void updateOrderState(@RequestBody List<Map<String, String>> updatedList) {

        adminService.updateOrderState(updatedList);

    }

    @GetMapping("manage/product")
    public Page<BookDto> getProductLists(Pageable pageable) {
        return adminService.getProductLists(pageable);
    }

    @GetMapping("manage/product/search")
    public Page<BookDto> searchProductInfo(String keyword, Pageable pageable) {

        return adminService.searchProductInfo(keyword, pageable);
    }

    @GetMapping("manage/product/duplicateValidation")
    public BookDto duplicateValidation(String isbn13) {

        return adminService.duplicateValidation(isbn13);
    }

    @PostMapping("manage/product/register")
    public void registerBook(String isbn13) throws JsonProcessingException {

        AladinBookDetailReq aladinBookDetailReq = new AladinBookDetailReq();
        aladinBookDetailReq.setItemId(isbn13);

        bookService.saveBookFromDetailApi(aladinBookDetailReq);

    }

    @PostMapping("manage/product/update")
    public void updateProductState(@RequestBody List<Map<String, String>> updatedList) {

        adminService.updateProductState(updatedList);

    }
}
