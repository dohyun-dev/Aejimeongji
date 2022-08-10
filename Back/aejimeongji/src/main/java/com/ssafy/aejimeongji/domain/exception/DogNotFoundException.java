package com.ssafy.aejimeongji.domain.exception;

public class DogNotFoundException extends RuntimeException {
    public DogNotFoundException(String dogId) {
        super(dogId + "번 강아지 프로필이 존재하지 않습니다.");
    }
}
