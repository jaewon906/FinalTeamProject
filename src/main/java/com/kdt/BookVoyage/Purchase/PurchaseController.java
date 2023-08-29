package com.kdt.BookVoyage.Purchase;

import com.kdt.BookVoyage.Book.BookEntity;
import com.kdt.BookVoyage.Member.MemberDTO;
import com.kdt.BookVoyage.Member.MemberServiceImpl;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/user/purchase")
@RequiredArgsConstructor
@Slf4j
public class PurchaseController {

    private final MemberServiceImpl memberService;
    private final PurchaseService purchaseService;

    @GetMapping("/userInfo")
    public MemberDTO getMemberInfo(MemberDTO memberDTO) {
        return memberService.showMyInfo(memberDTO);
    }

    @GetMapping("/details")
    public List<ResponseEntity<BookEntity>> getBookDetails(PurchaseDTO purchaseDTO) throws Exception {
        log.info("list : {}",purchaseDTO.getIsbnList());
      return purchaseService.getBookDetails(purchaseDTO.getIsbnList());
    }
}
