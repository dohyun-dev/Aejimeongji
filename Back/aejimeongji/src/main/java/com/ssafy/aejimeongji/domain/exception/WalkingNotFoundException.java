package com.ssafy.aejimeongji.domain.exception;

public class WalkingNotFoundException extends RuntimeException {

    public WalkingNotFoundException(String walkingId) {
        super(walkingId + "번 산책정보가 존재하지 않습니다.");
    }
}
