package com.kdt.BookVoyage.Purchase;

import com.kdt.BookVoyage.Book.BookEntity;
import com.kdt.BookVoyage.Book.BookRepository;
import com.kdt.BookVoyage.Common.UserIdNotFoundException;
import com.kdt.BookVoyage.Member.MemberEntity;
import com.kdt.BookVoyage.Member.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Component
@RequiredArgsConstructor
public class PurchaseService {

    private final BookRepository bookRepository;
    private final OrderRepository orderRepository;
    private final MemberRepository memberRepository;
    private final OrderListRepository orderListRepository;
    public List<ResponseEntity<BookEntity>> getBookDetails(List<String> list) throws Exception {

        List<ResponseEntity<BookEntity>> result = new ArrayList<>();

        if(list.size()==0){
            throw new Exception("구매하기의 모든 물품을 삭제했습니다.");
        }

        try {
            for(String isbn13 : list ){
                BookEntity book = bookRepository.findBookByIsbn13(isbn13);

                if(book != null) {
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
        int totalPrice = 0;

        Optional<MemberEntity> allByUserNumber = memberRepository.findAllByUserNumber(purchaseDTO.getUserNumber());

        if(allByUserNumber.isPresent()){

            for(int i=0; i<isbn13.size(); i++) {
                BookEntity book = bookRepository.findBookByIsbn13(isbn13.get(i));

                totalPrice += Integer.parseInt(book.getPriceSales()) * amount.get(i);
            }

            MemberEntity memberEntity = allByUserNumber.get();

            OrderEntity orderEntity = OrderEntity.setOrderEntity(
                    purchaseDTO.getOrderNumber(),
                    memberEntity.getUsername(),
                    memberEntity.getUserEmail(),
                    memberEntity.getUserAddress() +" "+ memberEntity.getUserDetailAddress(),
                    memberEntity.getUserTel(),
                    totalPrice,
                    memberEntity
            );

            orderRepository.save(orderEntity);

            for(int i=0; i<isbn13.size(); i++){
                BookEntity book = bookRepository.findBookByIsbn13(isbn13.get(i));

                totalPrice += Integer.parseInt(book.getPriceSales()) * amount.get(i);

                OrderListEntity orderListEntity = OrderListEntity.builder()
                        .title(book.getTitle())
                        .author(book.getAuthor())
                        .pubDate(book.getPubDate())
                        .priceSales(book.getPriceSales())
                        .priceStandard(book.getPriceStandard())
                        .publisher(book.getPublisher())
                        .isbn13(book.getIsbn13())
                        .cover(book.getCover())
                        .orderEntity(orderEntity)
                        .build();

                orderListRepository.save(orderListEntity);

            }

        }else throw new UserIdNotFoundException("아이디가 존재하지 않습니다");

    }


}
