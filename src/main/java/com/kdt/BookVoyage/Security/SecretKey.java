package com.kdt.BookVoyage.Security;

import lombok.Getter;

@Getter
// @Builder는 빌드 패턴을 쉽게 만들어주는 어노테이션
// TokenDTO.builder().grantType(grantType).accessToken(accessToken).refreshToken(refreshToken)를 구현 가능하게 해줌
public class SecretKey {

    private static final String accessSecretKey = "salgbTJWujnsJejsfSLfghaSSjAUWQdjGFUCDOWdJFUAIOFGDGAsdldfojwahfdgFGsajhsdl";
    private static final String refreshSecretKey = "ssHhjaVjwog5773SDchnias129gSgjnwaGJsdfHJHowiGSDjiw892jSDJgois390129GFDsjkGj1";

    protected static final byte[] accessSecretKeyBytes = accessSecretKey.getBytes();
    protected static final byte[] refreshSecretKeyBytes = refreshSecretKey.getBytes();

}
