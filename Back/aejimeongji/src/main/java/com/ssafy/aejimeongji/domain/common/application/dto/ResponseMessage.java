package com.ssafy.aejimeongji.domain.common.application.dto;

public enum ResponseMessage {
    SIGN_UP_SUCCESS("회원가입이 완료되었습니다."),
    UPDATE_MEMBER_SUCCESS("회원정보 수정이 완료되었습니다."),
    DELETE_MEMBER_SUCCESS("회원탈퇴가 완료되었습니다.");

    private String message;

    ResponseMessage(String message) {
        this.message = message;
    }

    public String getMessage() {
        return message;
    }
}
