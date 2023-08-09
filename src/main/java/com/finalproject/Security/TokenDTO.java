package com.finalproject.Security;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Builder //생성자의 경우 정해진 파라미터 순으로 입력해야 하지만 @Builder 어노테이션을 활용하면 순서대로 입력하지 않아도 되고 가독성도 뛰어나게 된다.
@Getter
@Setter
public class TokenDTO {
    private String grantType;
    private String accessToken;
    private String refreshToken;
}

