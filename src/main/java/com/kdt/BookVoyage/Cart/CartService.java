package com.kdt.BookVoyage.Cart;

import com.kdt.BookVoyage.Book.BookEntity;
import com.kdt.BookVoyage.Book.BookRepository;
import com.kdt.BookVoyage.CartItem.CartItemEntity;
import com.kdt.BookVoyage.CartItem.CartItemRepository;
import com.kdt.BookVoyage.Member.MemberEntity;
import com.kdt.BookVoyage.Member.MemberRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CartService {

    private final CartRepository cartRepository;
    private final CartItemRepository cartItemRepository;
    private final BookRepository bookRepository;
    private final MemberRepository memberRepository;

    @Transactional
    public void addCart(MemberEntity member, BookEntity newBook, int amount) {

        // 한 명의 회원은 하나의 장바구니를 가지므로 특정 회원의 장바구니를 찾는다
        CartEntity cart = cartRepository.findByMember(member)
                .orElseGet(() -> {
                    // 만약 해당 회원에게 장바구니가 존재하지 않는다면 장바구니를 생성하고 db에 저장.
                    CartEntity newCart = CartEntity.createCart(member);
                    return cartRepository.save(newCart);
                });

        // 책을 조회한 뒤 장바구니 상품이 존재하지 않는다면 카트 아이템 생성 후 책을 담는다.
        Optional<CartItemEntity> optionalCartItem = cartItemRepository.findByCartAndBook(cart, newBook);
        if(optionalCartItem.isEmpty()) {
            CartItemEntity cartItem = CartItemEntity.createCartItem(cart, newBook, amount);
            cartItemRepository.save(cartItem);
        } else {
            CartItemEntity cartItem = optionalCartItem.get();
            cartItem.addCount(amount);
            cartItemRepository.save(cartItem);
        }

        // 카트 총 상품 개수 증가
        cart.setQuantity(cart.getQuantity() + amount);
    }
}
