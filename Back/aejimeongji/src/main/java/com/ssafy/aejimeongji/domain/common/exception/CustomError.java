package com.ssafy.aejimeongji.domain.common.exception;

import org.springframework.http.HttpStatus;

public enum CustomError {

    // Member
    MEMBER_NOT_FOUND(HttpStatus.NOT_FOUND, "해당 사용자를 찾을 수 없습니다."),

    // Dog
    DOG_NOT_FOUND(HttpStatus.NOT_FOUND, "강아지 프로필을 찾을 수 없습니다."),

    // Guide
    GUIDE_NOT_FOUND(HttpStatus.NOT_FOUND, "해당 가이드를 찾을 수 없습니다."),
    DUPLICATED_LIKE_GUIDE(HttpStatus.BAD_REQUEST, "이미 좋아요한 가이드입니다."),
    NOT_LIKED_GUIDE(HttpStatus.BAD_REQUEST, "좋아요하지 않은 가이드입니다."),

    // Walking
    WALKING_NOT_FOUND(HttpStatus.NOT_FOUND, "해당 산책 데이터를 불러올 수 없습니다."),
    WALKING_DOG_NOT_FOUND(HttpStatus.NOT_FOUND, "해당 강아지 산책 데이터를 찾을 수 없습니다."),

    // Calendar
    CALENDAR_NOT_FOUND(HttpStatus.NOT_FOUND, "해당 일정을 찾을 수 없습니다."),

    // Validation
    VALIDATION_ERROR(HttpStatus.BAD_REQUEST, "유효하지 않은 RequestBody 입니다."),

    // Auth
    LOGIN_FAILURE(HttpStatus.UNAUTHORIZED, "로그인을 실패하였습니다."),
    LOGIN_UNAUTHORIZED(HttpStatus.UNAUTHORIZED, "로그인을 시도해주세요."),
    TOKEN_EXPIRED(HttpStatus.UNAUTHORIZED, "세션이 만료되었습니다. 로그인을 다시 시도해주세요."),
    FORBIDDEN(HttpStatus.FORBIDDEN, "접근 권한이 존재하지 않습니다."),
    PHONE_AUTH_EXPIRE(HttpStatus.UNAUTHORIZED, "휴대폰 인증 기간이 만료되었습니다."),
    PHONE_AUTH_SEND_FAILURE(HttpStatus.INTERNAL_SERVER_ERROR, "휴대폰 인증번호 발송에 실패하였습니다."),
    PHONE_AUTH_FAILURE(HttpStatus.UNAUTHORIZED, "인증번호가 올바르지 않습니다.");

    private final HttpStatus status;
    private final String message;

    CustomError(HttpStatus status, String message) {
        this.status = status;
        this.message = message;
    }

    public HttpStatus getStatus() {
        return status;
    }

    public String getMessage() {
        return message;
    }
}
