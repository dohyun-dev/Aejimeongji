package com.ssafy.aejimeongji.domain.exception;

public class GuideNotFoundException extends RuntimeException {
    public GuideNotFoundException(String guideId) {
        super(guideId + "번 가이드가 존재하지 않습니다.");
    }
}
