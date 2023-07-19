package com.ssafy.aejimeongji.api.advice;

import com.ssafy.aejimeongji.dto.ErrorDTO;
import com.ssafy.aejimeongji.domain.exception.auth.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import javax.servlet.http.HttpServletResponse;

@Slf4j
@RestControllerAdvice
public class AuthControllerAdvice {

    @ExceptionHandler(AuthException.class)
    public ResponseEntity<ErrorDTO> AuthExceptionHandler(AuthException ex) {
        log.error("ExceptionName = {}, message = {}", ex.getClass().getName(), ex.getMessage());
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new ErrorDTO(HttpServletResponse.SC_UNAUTHORIZED, ex.getMessage()));
    }

    @ExceptionHandler(ForbiddenException.class)
    public ResponseEntity<ErrorDTO> ForbiddenExceptionHandler(ForbiddenException ex) {
        log.error("ExceptionName = {}, message = {}", ex.getClass().getName(), ex.getMessage());
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new ErrorDTO(HttpServletResponse.SC_FORBIDDEN, ex.getMessage()));
    }

    @ExceptionHandler(ExpireAuthNumberException.class)
    public ResponseEntity<ErrorDTO> expireAuthNumberExHandler(ExpireAuthNumberException ex) {
        log.error("{}번 {}", ex.getUUID(), ex.getMessage());
        return ResponseEntity.badRequest().body(new ErrorDTO(HttpServletResponse.SC_BAD_REQUEST, ex.getMessage()));
    }
}
