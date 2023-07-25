package com.ssafy.aejimeongji.domain.common.exception.auth;

public class NotExistTokenException extends AuthException {
    public NotExistTokenException() {
        super("토큰이 존재하지 않습니다.");
    }
}
