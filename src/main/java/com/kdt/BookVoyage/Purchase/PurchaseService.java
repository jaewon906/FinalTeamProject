package com.kdt.BookVoyage.Purchase;

import com.kdt.BookVoyage.Book.BookEntity;
import com.kdt.BookVoyage.Book.BookRepository;
import com.kdt.BookVoyage.Common.OrderNotFoundException;
import com.kdt.BookVoyage.Common.UserIdNotFoundException;
import com.kdt.BookVoyage.Member.MemberDTO;
import com.kdt.BookVoyage.Member.MemberEntity;
import com.kdt.BookVoyage.Member.MemberRepository;
import com.kdt.BookVoyage.Order.*;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;
import java.util.Optional;

@Component
@RequiredArgsConstructor
@Slf4j
public class PurchaseService {

    private final BookRepository bookRepository;
    private final OrderRepository orderRepository;
    private final MemberRepository memberRepository;
    private final OrderProductRepository orderProductRepository;

    public List<ResponseEntity<BookEntity>> getBookDetails(List<String> list) throws Exception {

        List<ResponseEntity<BookEntity>> result = new ArrayList<>();

        if (list.size() == 0) {
            throw new Exception("구매하기의 모든 물품을 삭제했습니다.");
        }

        try {
            for (String isbn13 : list) {
                BookEntity book = bookRepository.findBookByIsbn13(isbn13);

                if (book != null) {
                    result.add(ResponseEntity.ok(book));
                } else {
                    result.add(ResponseEntity.notFound().build());   // 도서가 존재하지 않을 경우
                }
            }
            return result;

        } catch (Exception e) {
            // 예외 발생 시 내부 서버 에러 메시지 반환
            throw new Exception("에러");
        }
    }

    public void savePurchasedList(PurchaseDTO purchaseDTO) {
        List<String> isbn13 = purchaseDTO.getPurchasedList();
        List<Integer> amount = purchaseDTO.getAmount();

        Optional<MemberEntity> allByUserNumber = memberRepository.findAllByUserNumber(purchaseDTO.getUserNumber());

        if (allByUserNumber.isPresent()) {

            MemberEntity memberEntity = allByUserNumber.get();

            OrderEntity orderEntity = OrderEntity.setOrderEntity(
                    purchaseDTO.getOrderNumber(),
                    memberEntity.getUsername(),
                    memberEntity.getUserEmail(),
                    memberEntity.getUserAddress() + " " + memberEntity.getUserDetailAddress(),
                    memberEntity.getUserTel(),
                    purchaseDTO.getTotalPrice(),
                    "주문 완료",
                    memberEntity
            );

            orderRepository.save(orderEntity);

            for (int i = 0; i < isbn13.size(); i++) {
                BookEntity book = bookRepository.findBookByIsbn13(isbn13.get(i));

                OrderProductEntity orderProductEntity = OrderProductEntity.builder()
                        .title(book.getTitle())
                        .author(book.getAuthor())
                        .pubDate(book.getPubDate())
                        .priceSales(book.getPriceSales())
                        .priceStandard(book.getPriceStandard())
                        .publisher(book.getPublisher())
                        .isbn13(book.getIsbn13())
                        .cover(book.getCover())
                        .amount(amount.get(i))
                        .orderEntity(orderEntity)
                        .build();

                orderProductRepository.save(orderProductEntity);

            }

        } else throw new UserIdNotFoundException("아이디가 존재하지 않습니다");

    }

    public List<OrderDTO> showAllOrders(MemberDTO memberDTO) {

        String userNumber = memberDTO.getUserNumber();

        Optional<MemberEntity> allByUserNumber = memberRepository.findAllByUserNumber(userNumber);

        if (allByUserNumber.isPresent()) {
            Long id = allByUserNumber.get().getId();
            Optional<List<OrderEntity>> allByMemberEntityId = orderRepository.findAllByMemberEntityIdOrderByOrderNumberDesc(id);

            if (allByMemberEntityId.isPresent()) {
                log.info("주문 내역이 있습니다.");
                return OrderDTO.EntityToDTO(allByMemberEntityId.get());
            } else
                throw new OrderNotFoundException("회원이 주문한 내역이 없습니다.");
        } else
            throw new UserIdNotFoundException("회원이 존재하지 않습니다.");

    }

    public List<OrderDTO> showRecentOrders() {
        List<OrderDTO> lists3 = new ArrayList<>();
        List<OrderEntity> allOrderByOrderNumberDesc = orderRepository.findAll(Sort.by(Sort.Order.desc("orderedTime")));

        if(allOrderByOrderNumberDesc.size()!=0){
            for (int i = 0; i < 3; i++) {
                lists3.add(OrderDTO.EntityToDTO(allOrderByOrderNumberDesc).get(i));
            }

            return lists3;
        }
        else throw new OrderNotFoundException("주문 내역이 없습니다.");


    }

    public List<OrderDTO> showAllOrderLists() {

        List<OrderEntity> allOrderByOrderNumberDesc = orderRepository.findAll(Sort.by(Sort.Order.desc("orderedTime")));

        if (allOrderByOrderNumberDesc.size()!=0) {

            return OrderDTO.EntityToDTO(allOrderByOrderNumberDesc);

        } else throw new OrderNotFoundException("주문 내역이 없습니다.");

    }

    @Transactional
    public void cancelOrder(OrderDTO orderDTO) {
        Optional<OrderEntity> byOrderNumber = orderRepository.findByOrderNumber(orderDTO.getOrderNumber());

        if(byOrderNumber.isPresent()){

            Long orderEntityId = byOrderNumber.get().getId();

            try{
                orderProductRepository.deleteAllByOrderEntityId(orderEntityId);
                orderRepository.deleteById(orderEntityId);
            }catch (Exception e){
                log.error("주문을 삭제하는 도중 에러가 발생했습니다.",e);
            }

        }
        else throw new OrderNotFoundException("찾고자 하는 주문이 존재하지 않습니다.");

    }
}
