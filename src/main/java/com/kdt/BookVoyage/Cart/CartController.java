package com.kdt.BookVoyage.Cart;

import com.kdt.BookVoyage.Book.BookEntity;
import com.kdt.BookVoyage.Book.BookRepository;
import com.kdt.BookVoyage.CartItem.CartItemDto;
import com.kdt.BookVoyage.CartItem.CartItemEntity;
import com.kdt.BookVoyage.Member.MemberDTO;
import com.kdt.BookVoyage.Member.MemberEntity;
import com.kdt.BookVoyage.Member.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.awt.print.Book;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class CartController {

    private final MemberRepository memberRepository;
    private final BookRepository bookRepository;
    private final CartService cartService;


    @PostMapping("/cart/add")
    public ResponseEntity<String> addCartItemToCart(@RequestBody CartRequest cartRequest) {
        try {

            Optional<MemberEntity> optionalMember = memberRepository.findByUserNumber(cartRequest.getUserNumber());
            Optional<BookEntity> optionalBook = bookRepository.findById(cartRequest.getBookId());

            if (optionalMember.isEmpty() || optionalBook.isEmpty()) {
                return ResponseEntity.badRequest().body("회원 또는 상품을 찾을 수 없습니다.");
            }

            MemberEntity member = optionalMember.get();
            BookEntity book = optionalBook.get();

            cartService.addCart(member, book, cartRequest.getQuantity());

            return ResponseEntity.ok("상품이 장바구니에 추가되었습니다!");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("오류가 발생했습니다.");
        }
    }

    @GetMapping("/cart/{userNumber}")
    public ResponseEntity<?> getCartItemsByUserNumber(@PathVariable("userNumber") String userNumber) {

        // 로그인 되어 있는 회원의 장바구니를 가져오기
        Optional<MemberEntity> loginedUser = memberRepository.findByUserNumber(userNumber);

        if(loginedUser.isPresent()) {
            MemberEntity member = loginedUser.get();

            // 회원의 장바구니 정보 가져오기
            CartEntity cart = member.getCart();
            if(cart == null) {
                // 신규 회원이면 장바구니가 없을 수 있으므로 처리
                // 예를 들어, 빈 장바구니 정보를 생성하거나 null을 리턴하도록 처리
                // 빈 CartDto를 생성하여 리턴
                CartDto emptyCartDto = new CartDto();
                return ResponseEntity.ok(emptyCartDto);
            }

            CartDto cartDto = CartDto.entityToDto(cart);
            return ResponseEntity.ok(cartDto);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // 장바구니에서 상품 삭제
    @DeleteMapping("/cart/{userNumber}/items")
    public ResponseEntity<String> deleteItemsFromCart(
            @PathVariable String userNumber, @RequestBody List<Long> bookIdsToDelete) {

        try {
            cartService.deleteItemsFromCart(userNumber, bookIdsToDelete);
            return ResponseEntity.ok("상품이 삭제되었습니다.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("오류가 발생했습니다.");
        }

    }
}
