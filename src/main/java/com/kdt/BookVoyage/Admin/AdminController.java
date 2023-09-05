package com.kdt.BookVoyage.Admin;

import com.kdt.BookVoyage.Member.MemberDTO;
import com.kdt.BookVoyage.Member.MemberEntity;
import com.kdt.BookVoyage.Order.OrderDTO;
import com.kdt.BookVoyage.Order.OrderDetailDTO;
import com.kdt.BookVoyage.Order.OrderEntity;
import com.kdt.BookVoyage.Purchase.PurchaseService;
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
@RequestMapping("/api/admin")
@RequiredArgsConstructor
@Slf4j
public class AdminController {

    private final AdminService adminService;
    private final PurchaseService purchaseService;

    @GetMapping("/autoLogin")
    public void autoLogin() {
        log.info("(admin)자동 로그인 되셨습니다.");
    }

    @GetMapping("/login")
    public void login(AdminDTO adminDTO, HttpServletResponse response) throws UnsupportedEncodingException {
        adminService.login(adminDTO, response);
    }

    @GetMapping("/summary")
    public int loadSummary(){
        return adminService.getTotalSummary();
    }
    @GetMapping("/summaryNewUserPerDay")
    public Map<String, Integer> loadGetNewUserPerDaySummary(){
        return adminService.getNewUserPerDaySummary();
    }


    @GetMapping("manage/user")
    public Page<MemberDTO> loadUserInfo(Pageable pageable){
        log.info("pageable : {}",pageable);
       return adminService.getUserInfo(pageable);
    }

    @GetMapping("manage/user/search")
    public Page<MemberDTO> searchUserInfo(String keyword, Pageable pageable){
        log.info("keyword : {}",keyword);
        log.info("pageable : {}",pageable);
        return adminService.searchUserInfo(keyword,pageable);
    }

    @PostMapping("manage/user/update")
    public void updateUserState(@RequestBody List<Map<String, String>> updatedList) {

        adminService.updateUserState(updatedList);

    }

    @GetMapping("/showAllOrders") //모든 주문 내역
    public List<OrderDTO> showOrderLists() {
        return adminService.showAllOrderLists();
    }

    @GetMapping("/showRecentOrders") //최근 읽지않은 4개 주문 내역
    public List<OrderDTO> showRecentOrders() {
        return adminService.showRecentOrders();
    }

    @GetMapping("/manage/order")
    public Page<OrderDTO> loadOrderInfo(Pageable pageable){

        return adminService.getOrderInfo(pageable);
    }

    @GetMapping("/manage/order/search")
    public Page<OrderDTO> searchOrderInfo(String keyword, Pageable pageable){
        log.info("keyword : {}",keyword);
        log.info("pageable : {}",pageable);
        return adminService.searchOrderInfo(keyword,pageable);
    }

    @PostMapping("/manage/orderDetail")
    public OrderDetailDTO loadOrderDetailInfo(OrderDTO orderDTO){

        return adminService.getOrderDetailAndSetIsRead(orderDTO);
    }

    @PostMapping("manage/order/update")
    public void updateOrderState(@RequestBody List<Map<String, String>> updatedList) {

        adminService.updateOrderState(updatedList);

    }


}
