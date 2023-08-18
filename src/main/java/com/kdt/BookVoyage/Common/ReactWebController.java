package com.kdt.BookVoyage.Common;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;


// 스프링 리액트 통합 빌드 시 첫 화면만 리액트 페이지 나오고 기존에 설정했던 URL 매핑이 안되는 현상이 발생
// 따라서 다음처럼 리액트 라우터 설정 URL을 지정해줌
@Controller
public class ReactWebController {
    @GetMapping({"", "/write/**","/signUp","/logIn","/findID","/findPW","/withdrawal","/board"})
    public String forward() {
        return "forward:/index.html";
    }
}
