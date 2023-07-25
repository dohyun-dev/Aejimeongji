package com.ssafy.aejimeongji.domain.common.exception.auth;

public class LoginException extends AuthException {

    public LoginException() {
        super("이메일 혹은 패스워드를 다시 확인해주세요.");
    }
}
