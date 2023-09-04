package com.kdt.BookVoyage.Cart;

import com.kdt.BookVoyage.Book.BookEntity;
import com.kdt.BookVoyage.Book.BookRepository;
import com.kdt.BookVoyage.CartItem.CartItemDto;
import com.kdt.BookVoyage.CartItem.CartItemEntity;
import com.kdt.BookVoyage.CartItem.CartItemRepository;
import com.kdt.BookVoyage.Member.MemberDTO;
import com.kdt.BookVoyage.Member.MemberEntity;
import com.kdt.BookVoyage.Member.MemberRepository;
import jakarta.persistence.EntityManager;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CartService {

    private final CartRepository cartRepository;
    private final CartItemRepository cartItemRepository;
    private final BookRepository bookRepository;
    private final MemberRepository memberRepository;
    private final EntityManager entityManager;

    @Transactional
    public void addCart(MemberEntity member, BookEntity book, int quantity) {

        CartEntity cart = cartRepository.findByMember(member)
                .orElseGet(() -> {
                    CartEntity newCart = new CartEntity();
                    newCart.setMember(member);
                    return cartRepository.save(newCart);
                });

        Optional<CartItemEntity> optionalCartItem = cartItemRepository.findByCartAndBook(cart, book);
        if (optionalCartItem.isEmpty()) {
            CartItemEntity cartItem = new CartItemEntity();
            cartItem.setCart(cart);
            cartItem.setBook(book);
            cartItem.setQuantity(quantity);
            cartItemRepository.save(cartItem);
        } else {
            CartItemEntity cartItem = optionalCartItem.get();
            cartItem.addCount(quantity);
            cartItemRepository.save(cartItem);
        }

        cart.setQuantity(cart.getQuantity() + quantity);
    }

    // 장바구니에서 선택한 상품 삭제
    @Transactional
    @Modifying
    public void deleteItemsFromCart(String userNumber, List<Long> cartItemIds) {

        MemberEntity member = memberRepository.findByUserNumber(userNumber)
                .orElseThrow();

            // 선택한 상품들을 차례대로 찾아서 삭제
            for (Long cartItemId : cartItemIds) {
                cartItemRepository.deleteById(cartItemId);
            }

            entityManager.flush();
            // 업데이트된 cart 엔티티를 다시 조회하여 정보를 가져옴
        CartEntity cart = cartRepository.findByMember(member).orElse(null);

        if(cart != null) {
            List<CartItemEntity> cartItems = cart.getCartItems();
            System.out.println("----------------개수-----------" + cartItems);
            cart.setQuantity(cartItems.size());
        }
        }

}
