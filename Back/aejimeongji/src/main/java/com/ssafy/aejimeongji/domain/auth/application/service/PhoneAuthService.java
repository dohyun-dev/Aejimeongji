package com.ssafy.aejimeongji.domain.auth.application.service;

public interface PhoneAuthService {
    String sendMessage(String phoneNumber);
    boolean verifyAuthNumber(String phoneUUID, String authNumber);
}
