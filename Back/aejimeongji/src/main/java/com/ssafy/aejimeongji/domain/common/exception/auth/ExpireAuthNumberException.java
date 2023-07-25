package com.ssafy.aejimeongji.domain.common.exception.auth;

import lombok.Getter;

@Getter
public class ExpireAuthNumberException extends AuthException {

    private Long UUID;

    public ExpireAuthNumberException(Long UUID) {
        super("휴대폰 인증 기한이 만료되었습니다.");
        this.UUID = UUID;
    }
}
