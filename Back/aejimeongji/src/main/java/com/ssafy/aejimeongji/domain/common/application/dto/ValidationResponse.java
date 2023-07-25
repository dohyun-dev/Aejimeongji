package com.ssafy.aejimeongji.domain.common.application.dto;

import com.ssafy.aejimeongji.domain.common.exception.MethodArgumentNotValidException;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.Map;

@Data
@AllArgsConstructor
public class ValidationResponse {
    private String message;
    private Map<String, String> validationErrors;

    public ValidationResponse(MethodArgumentNotValidException ex) {
        message = ex.getMessage();
        validationErrors = ex.makeErrors();
    }
}
