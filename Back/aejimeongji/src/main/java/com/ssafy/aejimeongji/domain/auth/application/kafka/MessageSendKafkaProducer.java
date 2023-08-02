package com.ssafy.aejimeongji.domain.auth.application.kafka;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.aejimeongji.domain.auth.application.dto.PhoneAuthSendRequest;
import com.ssafy.aejimeongji.global.util.KafkaProperties;
import lombok.RequiredArgsConstructor;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MessageSendKafkaProducer {

    private static final String topicName = KafkaProperties.SEND_MESSAGE;
    private final ObjectMapper objectMapper;
    private final KafkaTemplate<String, String> kafkaTemplate;

    public void sendMessage(PhoneAuthSendRequest request) {
        String json = "";
        try {
             json = objectMapper.writeValueAsString(request);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
        kafkaTemplate.send(topicName, json);
    }

}
