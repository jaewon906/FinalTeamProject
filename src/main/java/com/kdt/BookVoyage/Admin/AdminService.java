package com.kdt.BookVoyage.Admin;

import com.kdt.BookVoyage.Book.BookDto;
import com.kdt.BookVoyage.Book.BookEntity;
import com.kdt.BookVoyage.Book.BookRepository;
import com.kdt.BookVoyage.Common.CookieConfig;
import com.kdt.BookVoyage.Common.OrderNotFoundException;
import com.kdt.BookVoyage.Common.UserIdNotFoundException;
import com.kdt.BookVoyage.Common.UserPasswordNotMatchException;
import com.kdt.BookVoyage.Member.MemberDTO;
import com.kdt.BookVoyage.Member.MemberEntity;
import com.kdt.BookVoyage.Member.MemberRepository;
import com.kdt.BookVoyage.Order.*;
import com.kdt.BookVoyage.Security.TokenConfig;
import com.kdt.BookVoyage.Security.TokenDTO;
import jakarta.annotation.PostConstruct;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Controller;

import java.io.UnsupportedEncodingException;
import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.*;

@Controller
@RequiredArgsConstructor
@Slf4j
public class AdminService {

    private final TokenConfig tokenConfig;
    private final CookieConfig cookieConfig;
    private final BookRepository bookRepository;
    private final AdminRepository adminRepository;
    private final OrderRepository orderRepository;
    private final MemberRepository memberRepository;

    @PostConstruct
    public void createAdminAccount() {

        Optional<MemberEntity> admin = memberRepository.findByUserId("admin");

        if (admin.isEmpty()) {

            adminRepository.createAdminId();
        }

        admin.ifPresent(memberEntity -> log.info("INITIAL ADMIN id : {}, password : {}", memberEntity.getUserId(), memberEntity.getPassword()));

    }

    public void login(AdminDTO adminDTO, HttpServletResponse response) throws UnsupportedEncodingException {
        String userId = adminDTO.getAdminId();
        Optional<MemberEntity> byUserId = memberRepository.findByUserId(userId);

        if (byUserId.isPresent()) {
            if (byUserId.get().getPassword().equals(adminDTO.getPassword()) && byUserId.get().getRole().equals("ADMIN")) {

                MemberDTO memberDTO = MemberDTO.EntityToDTO(byUserId.get());

                TokenDTO generateAccessToken = tokenConfig.generateAccessToken(memberDTO);
                TokenDTO generateRefreshToken = tokenConfig.generateRefreshToken(memberDTO);

                Cookie accessToken = cookieConfig.setCookie(generateAccessToken.getAccessToken(), "accessToken", false, "/", 3600);
                Cookie refreshToken = cookieConfig.setCookie(generateRefreshToken.getRefreshToken(), "refreshToken", true, "/", 7 * 24 * 3600);

                response.addCookie(accessToken);
                response.addCookie(refreshToken);
            } else throw new UserPasswordNotMatchException("비밀번호가 일치하지 않습니다.");
        } else throw new UserIdNotFoundException("아이디가 존재하지 않습니다.");

    }

    public int getTotalSummary() {

        List<MemberEntity> all = memberRepository.findAll();

        return all.size();
    }

    public Map<String, Integer> getNewUserPerDaySummary() {

        List<MemberEntity> all = memberRepository.findAll();
        Map<String, Integer> result = new HashMap<>();

        long eightDays = 15 * 24 * 3600 * 1000;
        long oneDay = 24 * 3600 * 1000;

        int a[] = new int[15];

        long now = new Timestamp(System.currentTimeMillis()).getTime();
        long sevenDaysAgo = now - eightDays; // 현재 기준 15일 전

        String split = new Timestamp(sevenDaysAgo).toString().split(" ")[0];

        long sevenDaysAgo_0Hour = Timestamp.valueOf(split + " " + "00:00:00").getTime(); // 현재 기준 7일 전 00시 00분 00초

        for (int i = 1; i <= 15; i++) {

            for (int j = 0; j < all.size() - 1; j++) {

                long signUpDate = all.get(j).getTimeBaseEntity().getCreatedTime().getTime();


                if (signUpDate >= i * oneDay + sevenDaysAgo_0Hour && signUpDate < (i + 1) * oneDay + sevenDaysAgo_0Hour) {// 2주전 00시 00분 00초 ~ 23시 59분 59초
                    a[i - 1]++;
                }

            }
            String timestamp1 = new Timestamp(i * oneDay + sevenDaysAgo_0Hour).toString();
            String date = timestamp1.split(" ")[0];

            result.put(date, a[i - 1]);
        }

        log.info("회원 수 : {}", all.size());

        return result;
    }

    public Page<MemberDTO> getUserInfo(Pageable pageable) {
        Page<MemberEntity> all = memberRepository.findAll(pageable);

        List<MemberDTO> memberDTOS = AdminDTO.EntityToDTO(all.stream().toList());


        return new PageImpl<>(memberDTOS, pageable, all.getTotalElements());
    }

    public Page<MemberDTO> searchUserInfo(String keyword, Pageable pageable) {
        Page<MemberEntity> memberEntities = memberRepository.searchByUserIdContainingIgnoreCaseOrUsernameContainingIgnoreCaseOrNicknameContainingIgnoreCaseOrUserNumberContainingIgnoreCaseOrUserEmailContainingIgnoreCaseOrUserAddressContainingIgnoreCaseOrUserTelContainingIgnoreCase(
                keyword, keyword, keyword, keyword, keyword, keyword, keyword, pageable
        );

        List<MemberDTO> memberDTOS = AdminDTO.EntityToDTO(memberEntities.stream().toList());

        return new PageImpl<>(memberDTOS, pageable,memberEntities.getTotalElements());

    }

    public void updateUserState(List<Map<String, String>> updatedList) {

        for (Map<String, String> updated : updatedList) {

            String userNumber = updated.get("userNumber");
            String deleteFlag = updated.get("deleteFlag");

            memberRepository.updateUserState(userNumber, deleteFlag, LocalDateTime.now());
        }
    }

    public List<OrderDTO> showUnreadOrderLists() {

        List<OrderEntity> allOrderByOrderNumberDesc = orderRepository.findAll(Sort.by(Sort.Order.desc("orderedTime")));
        List<OrderEntity> unreadOrders = new ArrayList<>();

        if (allOrderByOrderNumberDesc.size() != 0) {

            for(OrderEntity orderEntity : allOrderByOrderNumberDesc){

                if(orderEntity.getIsRead()==0)
                    unreadOrders.add(orderEntity);

            }

            return OrderDTO.EntityToDTO(unreadOrders);

        } else return null;

    }

    public Page<OrderDTO> searchOrderInfo(String keyword, Pageable pageable) {


        Page<OrderEntity> orderEntities = orderRepository.searchByOrderNumberContainingIgnoreCaseOrOrderNameContainingIgnoreCaseOrUsernameContainingIgnoreCaseOrUserAddressContainingIgnoreCaseOrUserTelContainingIgnoreCaseOrTotalPriceContainingIgnoreCase(
                keyword, keyword, keyword, keyword, keyword, keyword, pageable
        );

        List<OrderDTO> orderDTO = OrderDTO.EntityToDTO(orderEntities.stream().toList());

        return new PageImpl<>(orderDTO, pageable, orderEntities.getTotalElements());
    }

    public Page<OrderDTO> getOrderInfo(Pageable pageable) {

        Page<OrderEntity> all = orderRepository.findAll(pageable);

        List<OrderDTO> orderDTO = OrderDTO.EntityToDTO(all.stream().toList());

        return new PageImpl<>(orderDTO, pageable, all.getTotalElements());


    }

    public OrderDetailDTO getOrderDetailAndSetIsRead(OrderDTO orderDTO) {

        Optional<OrderEntity> byOrderNumber = orderRepository.findByOrderNumber(orderDTO.getOrderNumber());

        if (byOrderNumber.isPresent()) {
            MemberEntity memberEntity = byOrderNumber.get().getMemberEntity();
            List<OrderProductEntity> orderProductEntity = byOrderNumber.get().getOrderProductEntity();
            OrderEntity orderEntity = byOrderNumber.get();

            List<OrderEntity> result = new ArrayList<>();
            result.add(byOrderNumber.get());

            orderEntity.setIsRead(orderDTO.getIsRead());

            orderRepository.save(orderEntity);

            return OrderDetailDTO.getOrderDetailDTO(memberEntity, orderProductEntity, orderEntity);

        } else throw new OrderNotFoundException("주문 내역이 존재하지 않습니다.");
    }

    public void updateOrderState(List<Map<String, String>> updatedList) {
        for (Map<String, String> updated : updatedList) {

            String orderNumber = updated.get("orderNumber");
            String orderState = updated.get("orderState");

            if (orderState.equals("배송 중"))
                orderRepository.updateDeliveryStart(orderState, orderNumber, LocalDateTime.now().toString());

            else if (orderState.equals("배송 완료")) {
                orderRepository.updateDeliveryEnd(orderState, orderNumber, LocalDateTime.now().toString());
            }
            else
                orderRepository.updateUserState(orderNumber, orderState);
        }
    }

    public Page<BookDto> getProductLists(Pageable pageable) {

        Page<BookEntity> all = bookRepository.findAll(pageable);

        List<BookEntity> list = all.stream().toList();

        List<BookDto> bookDtos = BookDto.EntityToDTO(list);

        return new PageImpl<>(bookDtos, pageable,all.getTotalElements());
    }


    public Page<BookDto> searchProductInfo(String keyword, Pageable pageable) {
        Page<BookEntity> productEntities = bookRepository.searchByIsbn13ContainingIgnoreCaseOrAuthorContainingIgnoreCaseOrTitleContainingIgnoreCaseOrPublisherContainingIgnoreCase(
                keyword, keyword, keyword, keyword,pageable
        );

        List<BookDto> bookDtos = BookDto.EntityToDTO(productEntities.stream().toList());

        return new PageImpl<>(bookDtos, pageable, productEntities.getTotalElements());
    }
}
