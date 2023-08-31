package com.kdt.BookVoyage.Cart;

import com.kdt.BookVoyage.Book.BookEntity;
import com.kdt.BookVoyage.Book.BookRepository;
import com.kdt.BookVoyage.CartItem.CartItemDto;
import com.kdt.BookVoyage.CartItem.CartItemEntity;
import com.kdt.BookVoyage.CartItem.CartItemRepository;
import com.kdt.BookVoyage.Member.MemberDTO;
import com.kdt.BookVoyage.Member.MemberEntity;
import com.kdt.BookVoyage.Member.MemberRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
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

}
