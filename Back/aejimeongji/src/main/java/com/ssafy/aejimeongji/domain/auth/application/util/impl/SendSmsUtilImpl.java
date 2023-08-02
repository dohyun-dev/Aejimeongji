package com.ssafy.aejimeongji.domain.auth.application.util.impl;

import com.ssafy.aejimeongji.domain.auth.application.util.SendSmsUtil;
import com.ssafy.aejimeongji.domain.common.exception.CustomError;
import com.ssafy.aejimeongji.domain.common.exception.CustomException;
import com.ssafy.aejimeongji.global.aop.Retry;
import net.nurigo.java_sdk.exceptions.CoolsmsException;
import net.nurigo.java_sdk.api.Message;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.Map;

@Component
public class SendSmsUtilImpl implements SendSmsUtil {

    public static final String BASE_MESSAGE = "인증번호는 [%s] 입니다.";
    private final Message coolSms;
    private final String senderNumber;

    public SendSmsUtilImpl(
            @Value("${coolSms.apiKey}") String apiKey,
            @Value("${coolSms.apiSecret}") String apiSecret,
            @Value("${coolSms.senderNumber}") String senderNumber
    ) {
        this.coolSms = new Message(apiKey, apiSecret);
        this.senderNumber = senderNumber;
    }

    @Override
    public void sendSms(String recipientNumber, String authNumber) {
        process(recipientNumber, authNumber);
    }

    @Retry
    @Override
    public String makeAuthNumberAndSendSms(String recipientNumber) {
        String authNumber = makeAuthNumber();
        process(recipientNumber, authNumber);
        return authNumber;
    }

    private void process(String recipientNumber, String authNumber) {
        try {
            coolSms.send(makeParams(recipientNumber, authNumber));
        } catch (CoolsmsException e) {
            throw new CustomException(CustomError.PHONE_AUTH_SEND_FAILURE);
        }
    }

    private HashMap<String, String> makeParams(String recipientNumber, String authNumber) {
        Map<String, String> params = Map.of(
                "to", recipientNumber,
                "from", senderNumber,
                "type", "sms",
                "text", String.format(BASE_MESSAGE, authNumber)

        );
        return new HashMap<>(params);
    }
}
