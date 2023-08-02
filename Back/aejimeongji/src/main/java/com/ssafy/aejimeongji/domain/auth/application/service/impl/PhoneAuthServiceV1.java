package com.ssafy.aejimeongji.domain.auth.application.service.impl;

import com.ssafy.aejimeongji.domain.auth.application.service.PhoneAuthService;
import com.ssafy.aejimeongji.domain.auth.domain.PhoneAuth;
import com.ssafy.aejimeongji.domain.auth.domain.PhoneAuthRepository;
import com.ssafy.aejimeongji.domain.common.exception.CustomError;
import com.ssafy.aejimeongji.domain.common.exception.CustomException;
import lombok.extern.slf4j.Slf4j;
import net.nurigo.java_sdk.api.Message;
import net.nurigo.java_sdk.exceptions.CoolsmsException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.Random;

@Slf4j
@Transactional(readOnly = true)
public class PhoneAuthServiceV1 implements PhoneAuthService {

    private final String apiKey;
    private final String apiSecret;
    private final PhoneAuthRepository phoneAuthRepository;
    private final Message coolSms;
    private final Random rand  = new Random();

    public PhoneAuthServiceV1(@Value("${coolsms.apiKey}") String apiKey, @Value("${coolsms.apiSecret}") String apiSecret, PhoneAuthRepository phoneAuthRepository) {
        this.apiKey = apiKey;
        this.apiSecret = apiSecret;
        this.phoneAuthRepository = phoneAuthRepository;
        this.coolSms = new Message(apiKey, apiSecret);
    }

    @Transactional
    public String sendMessage(String phoneNumber) {
        String authNumber = makeAuthNumber();
        try {
            coolSms.send(makeParams(phoneNumber, authNumber));
        } catch (CoolsmsException e) {
            throw new CustomException(CustomError.PHONE_AUTH_SEND_FAILURE);
        }
        return phoneAuthRepository.save(new PhoneAuth(authNumber)).getId().toString();
    }

    public boolean verifyAuthNumber(String phoneUUID, String authNumber) {
        PhoneAuth phoneAuth = phoneAuthRepository.findById(phoneUUID)
                .orElseThrow(() ->
            new CustomException(CustomError.PHONE_AUTH_EXPIRE)
        );
        return authNumber.equals(phoneAuth.getAuthNumber()) ? true : false;
    }

    private String makeAuthNumber() {
        String authNumber = "";
        for(int i=0; i<6; i++) {
            authNumber += Integer.toString(rand.nextInt(10));;
        }
        return authNumber;
    }

    private HashMap<String, String> makeParams(String phoneNumber, String authNumber) {
        HashMap<String, String> params = new HashMap<>();
        params.put("to", phoneNumber); // 수신 전화번호
        params.put("from", "01063230351"); // 발신 전화번호
        params.put("type", "sms");
        params.put("text", "인증번호는 [" + authNumber + "] 입니다.");
        return params;
    }
}
