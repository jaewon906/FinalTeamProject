package com.kdt.BookVoyage.Purchase;

import com.kdt.BookVoyage.Book.BookEntity;
import com.kdt.BookVoyage.Book.BookRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
@RequiredArgsConstructor
@Slf4j
public class PurchaseService {

    private final BookRepository bookRepository;
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
        log.info("{}",purchaseDTO);
    }
}
