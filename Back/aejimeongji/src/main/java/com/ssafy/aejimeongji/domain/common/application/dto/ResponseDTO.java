package com.ssafy.aejimeongji.domain.common.application.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ResponseDTO {

    private String message;

    public ResponseDTO(ResponseMessage message) {
        this.message = message.getMessage();
    }
}
