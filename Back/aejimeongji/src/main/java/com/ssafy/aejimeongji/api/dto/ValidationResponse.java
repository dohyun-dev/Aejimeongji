package com.ssafy.aejimeongji.api.dto;

import com.ssafy.aejimeongji.domain.exception.MethodArgumentNotValidException;
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
