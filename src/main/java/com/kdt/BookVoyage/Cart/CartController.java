package com.kdt.BookVoyage.Cart;

import com.kdt.BookVoyage.Book.BookEntity;
import com.kdt.BookVoyage.Book.BookRepository;
import com.kdt.BookVoyage.Member.MemberEntity;
import com.kdt.BookVoyage.Member.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class CartController {

   private final MemberRepository memberRepository;
   private final BookRepository bookRepository;
   private final CartService cartService;


    @PostMapping("/cart/add")
    public ResponseEntity<String> addCartItemToCart(@RequestParam("memberId") Long memberId,
                                                    @RequestParam("bookId") Long bookId,
                                                    @RequestParam("quantity") int quantity) {
        try {
            Optional<MemberEntity> optionalMember = memberRepository.findById(memberId);
            Optional<BookEntity> optionalBook = bookRepository.findById(bookId);

            if(optionalMember.isEmpty() || optionalBook.isEmpty()) {
                return ResponseEntity.badRequest().body("회원 또는 상품을 찾을 수 없습니다.");
            }

            MemberEntity member = optionalMember.get();
            BookEntity book = optionalBook.get();

            cartService.addCart(member, book, quantity);

            return ResponseEntity.ok("상품이 장바구니에 추가되었습니다!");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("오류가 발생했습니다.");
        }
    }
}
