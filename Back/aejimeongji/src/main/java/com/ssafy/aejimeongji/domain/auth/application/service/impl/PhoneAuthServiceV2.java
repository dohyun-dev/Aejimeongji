package com.ssafy.aejimeongji.domain.auth.application.service.impl;

import com.ssafy.aejimeongji.domain.auth.application.service.PhoneAuthService;
import com.ssafy.aejimeongji.domain.auth.application.util.SendSmsUtil;
import com.ssafy.aejimeongji.domain.auth.domain.PhoneAuth;
import com.ssafy.aejimeongji.domain.auth.domain.PhoneAuthRepository;
import com.ssafy.aejimeongji.domain.common.exception.CustomError;
import com.ssafy.aejimeongji.domain.common.exception.CustomException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class PhoneAuthServiceV2 implements PhoneAuthService {

    private final SendSmsUtil messageSendUtil;
    private final PhoneAuthRepository phoneAuthRepository;

    @Transactional
    public String sendMessage(String recipientNumber) {
        String authNumber = messageSendUtil.makeAuthNumber();
        messageSendUtil.sendSms(recipientNumber, authNumber);
        return phoneAuthRepository.save(new PhoneAuth(authNumber)).getId().toString();
    }

    public boolean verifyAuthNumber(String phoneUUID, String authNumber) {
        PhoneAuth phoneAuth = phoneAuthRepository.findById(phoneUUID)
                .orElseThrow(() ->
            new CustomException(CustomError.PHONE_AUTH_EXPIRE)
        );
        return authNumber.equals(phoneAuth.getAuthNumber()) ? true : false;
    }
}
