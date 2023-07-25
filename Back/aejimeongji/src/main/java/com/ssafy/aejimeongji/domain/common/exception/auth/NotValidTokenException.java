package com.ssafy.aejimeongji.domain.common.exception.auth;

public class NotValidTokenException extends AuthException {
    public NotValidTokenException() {
        super("토큰이 유효하지 않습니다.");
    }
}
