package com.kdt.BookVoyage.Book;

import com.fasterxml.jackson.core.JsonProcessingException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@Slf4j
public class AladinApiController {

    @Autowired
    private BookRepository bookRepository;


    private final AladinApiService aladinApiService;

    @Autowired
    public AladinApiController(AladinApiService aladinApiService) {
        this.aladinApiService = aladinApiService;
    }


    // 카테고리를 통해 도서를 검색해서 book_list 테이블에 저장시킴
//    @GetMapping("/list/{category}")
//    public boolean getBookList(@PathVariable("category") String category) {
//        return aladinApiService.saveBookListFromApi(category);
//    }

//    @GetMapping("/detail")
//    public AladinBookDetailRes getDetail() {
//        AladinBookDetailReq aladinBookDetailReq = new AladinBookDetailReq();
//
//        return aladinApiService.getDetails(aladinBookDetailReq);
//    }

    // book_list 테이블에 들어있는 도서에 대한 isbn13을 통해 book 테이블에 자동으로 저장시킴
//    @GetMapping("/search-books")
//    public boolean searchBooks() {
//        List<BookListEntity> bookWihtIsbn13 = bookListRepository.findAll();
//
//        try {
//            for (BookListEntity book : bookWihtIsbn13) {
//                String isbn13 = book.getIsbn13();
//
//                AladinBookDetailReq aladinBookDetailReq = new AladinBookDetailReq();
//                aladinBookDetailReq.setItemId(isbn13);
//                BookEntity bookDetail = aladinApiService.saveBookFromDetailApi(aladinBookDetailReq);
//
//            }
//            return true;
//        } catch (Exception e) {
//            e.printStackTrace();
//            return false;
//        }
//    }

    // isbn13으로 검색해서 나온 결과를 db(book)에 저장
    @GetMapping("/search/{isbn}")
    public BookEntity searchBooks(@PathVariable("isbn") String isbn13) throws JsonProcessingException {

        AladinBookDetailReq aladinBookDetailReq = new AladinBookDetailReq();
        aladinBookDetailReq.setItemId(isbn13);
        try {
            return aladinApiService.saveBookFromDetailApi(aladinBookDetailReq);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    // db에 저장된 250개 도서 모두 출력
    @GetMapping("/bookdetail")
    public ResponseEntity<List<BookEntity>> showBookDetail() {
        List<BookEntity> bookDetails = bookRepository.findAll();

        return ResponseEntity.ok(bookDetails);
    }

    // 페이징 처리(클라이언트에서 요청한 도서 개수와 페이지 수만큼 출력)
    @GetMapping("/books")
    public ResponseEntity<List<BookEntity>> getBooks
            (@RequestParam("_page") int page, @RequestParam("_limit") int limit) {
        List<BookEntity> books = aladinApiService.getBooksByPage(page, limit);
        return ResponseEntity.ok(books);
    }

    @GetMapping("/search")
    public ResponseEntity<List<BookEntity>> searchBookList(@RequestParam("title") String title) {

        try {
            List<BookEntity> books = bookRepository.findBooksByTitleContaining(title);

            if (!books.isEmpty()) {
                return ResponseEntity.ok(books);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            // 예외 발생 시 로깅 또는 적절한 에러 메시지를 클라이언트에 반환할 수 있다.
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    @GetMapping("/detail/{isbn13}")
    public ResponseEntity<BookEntity> getBookDetail(@PathVariable("isbn13") String isbn13) {
        try {
            BookEntity book = bookRepository.findBookByIsbn13(isbn13);

            if(book != null) {
                return ResponseEntity.ok(book);
            } else {
                return ResponseEntity.notFound().build();   // 도서가 존재하지 않을 경우
            }
        } catch (Exception e) {
            // 예외 발생 시 내부 서버 에러 메시지 반환
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
