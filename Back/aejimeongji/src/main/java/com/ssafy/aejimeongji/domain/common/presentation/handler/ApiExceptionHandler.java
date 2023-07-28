package com.ssafy.aejimeongji.domain.common.presentation.handler;

import com.ssafy.aejimeongji.domain.common.application.dto.ErrorResponse;
import com.ssafy.aejimeongji.domain.common.exception.CustomException;
import com.ssafy.aejimeongji.domain.common.exception.CustomMethodArgumentNotValidException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class ApiExceptionHandler {

    @ExceptionHandler(CustomException.class)
    public ResponseEntity<ErrorResponse> handleCustomException(CustomException e) {
        return ErrorResponse.error(e);
    }

    @ExceptionHandler({MethodArgumentNotValidException.class, CustomMethodArgumentNotValidException.class})
    public ResponseEntity<ErrorResponse> handleValidationException(Exception e) {
        if (e instanceof MethodArgumentNotValidException)
            return ErrorResponse.error((MethodArgumentNotValidException) e);
        else
            return ErrorResponse.error((CustomMethodArgumentNotValidException) e);
    }
}
