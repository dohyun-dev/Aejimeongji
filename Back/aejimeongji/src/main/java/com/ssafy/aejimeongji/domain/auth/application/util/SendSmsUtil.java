package com.ssafy.aejimeongji.domain.auth.application.util;

import java.util.Random;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

public interface SendSmsUtil {

    int AUTH_NUMBER_LENGTH = 6;

    void sendSms(String recipientNumber, String authNumber);
    String makeAuthNumberAndSendSms(String recipientNumber);

    default String makeAuthNumber() {
        return IntStream.range(0, AUTH_NUMBER_LENGTH)
                .map(x -> new Random().nextInt(10))
                .mapToObj(x -> String.valueOf(x))
                .collect(Collectors.joining());
    }
}
