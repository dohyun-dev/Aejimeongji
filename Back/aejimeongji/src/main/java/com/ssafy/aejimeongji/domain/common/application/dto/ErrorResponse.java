package com.ssafy.aejimeongji.domain.common.application.dto;

import com.ssafy.aejimeongji.domain.common.exception.CustomError;
import com.ssafy.aejimeongji.domain.common.exception.CustomException;
import com.ssafy.aejimeongji.domain.common.exception.CustomMethodArgumentNotValidException;
import lombok.Data;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;

import java.util.HashMap;
import java.util.Map;

@Data
public class ErrorResponse {
    private String message;

    protected ErrorResponse(String message) {
        this.message = message;
    }

    private static class ValidationResponse extends ErrorResponse {

        private Map<String, String> validationErrors;

        public ValidationResponse(CustomError error, MethodArgumentNotValidException ex) {
            super(error.getMessage());
            validationErrors = makeValidationErrors(ex.getBindingResult());
        }

        public ValidationResponse(CustomMethodArgumentNotValidException ex) {
            super(ex.getCustomError().getMessage());
            this.validationErrors = makeValidationErrors(ex.getBindingResult());
        }

        public Map<String, String> getValidationErrors() {
            return validationErrors;
        }

        private Map<String, String> makeValidationErrors(BindingResult bindingResult) {
            Map<String, String> validationErrorMap = new HashMap<>();
            bindingResult.getAllErrors()
                    .forEach(e -> {
                        if (e instanceof FieldError)
                            validationErrorMap.put(((FieldError) e).getField(), e.getDefaultMessage());
                        else
                            validationErrorMap.put(e.getCode(), e.getDefaultMessage());
                    });
            return validationErrorMap;
        }
    }

    public static ResponseEntity<ErrorResponse> error(CustomException e) {
        return ResponseEntity
                .status(e.getCustomError().getStatus())
                .body(new ErrorResponse(e.getCustomError().getMessage()));
    }

    public static ResponseEntity<ErrorResponse> error(MethodArgumentNotValidException e) {
        CustomError validationError = CustomError.VALIDATION_ERROR;
        ValidationResponse validationResponse = new ValidationResponse(validationError, e);
        return ResponseEntity
                .status(validationError.getStatus())
                .body(validationResponse);
    }

    public static ResponseEntity<ErrorResponse> error(CustomMethodArgumentNotValidException e) {
        CustomError validationError = CustomError.VALIDATION_ERROR;
        ValidationResponse validationResponse = new ValidationResponse(e);
        return ResponseEntity
                .status(validationError.getStatus())
                .body(validationResponse);
    }
}
