package com.ssafy.aejimeongji.domain.auth.application.kafka;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.aejimeongji.domain.auth.application.dto.PhoneAuthSendRequest;
import com.ssafy.aejimeongji.domain.auth.application.service.PhoneAuthService;
import com.ssafy.aejimeongji.global.util.KafkaProperties;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class MessageSendKafkaConsumer {

    private final PhoneAuthService phoneAuthService;
    private final ObjectMapper objectMapper;

    @KafkaListener(
            topics = KafkaProperties.SEND_MESSAGE,
            groupId = KafkaProperties.CONSUMER_GROUP_ID,
            concurrency = KafkaProperties.DEFAULT_THREAD_COUNT
    )
    public void sendSms(String message) {
        PhoneAuthSendRequest request = null;
        try {
            request = objectMapper.readValue(message, PhoneAuthSendRequest.class);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
        phoneAuthService.sendMessage(request.getRecipientNumber());
    }
}
