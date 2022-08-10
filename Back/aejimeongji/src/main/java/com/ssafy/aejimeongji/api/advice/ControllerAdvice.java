package com.ssafy.aejimeongji.api.advice;

import com.ssafy.aejimeongji.api.dto.ErrorDTO;
import com.ssafy.aejimeongji.domain.exception.CalendarNotFoundException;
import com.ssafy.aejimeongji.domain.exception.DogNotFoundException;
import com.ssafy.aejimeongji.domain.exception.GuideNotFoundException;
import com.ssafy.aejimeongji.domain.exception.MemberNotFoundException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@Slf4j
@RestControllerAdvice
public class ControllerAdvice {

    @ExceptionHandler(MemberNotFoundException.class)
    public ResponseEntity<ErrorDTO> memberNotFoundExHandler(MemberNotFoundException ex) {
        log.error("{}번 회원 정보가 존재하지 않습니다. 요청거부", ex.getMemberId());
        return ResponseEntity.badRequest().body(new ErrorDTO(400, ex.getMessage()));
    }

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<ErrorDTO> illegalArgumentExHandler(IllegalArgumentException ex) {
        log.error("메시지 = {}", ex.getMessage());
        return ResponseEntity.badRequest().body(new ErrorDTO(400, ex.getMessage()));
    }

    @ExceptionHandler(DogNotFoundException.class)
    public ResponseEntity<ErrorDTO> dogNotFoundExHandler(DogNotFoundException ex) {
        log.error("{}번 강아지 프로필 조회 중 오류 발생, ex : {}", ex.getMessage(), ex.getClass().getName());
        return ResponseEntity.badRequest().body(new ErrorDTO(400, ex.getMessage()));
    }

    @ExceptionHandler(CalendarNotFoundException.class)
    public ResponseEntity<ErrorDTO> calendarNotFoundExHandler(CalendarNotFoundException ex) {
        log.error("{}번 강아지 프로필 조회 중 오류 발생, ex : {}", ex.getMessage(), ex.getClass().getName());
        return ResponseEntity.badRequest().body(new ErrorDTO(400, ex.getMessage()));
    }

    @ExceptionHandler(GuideNotFoundException.class)
    public ResponseEntity<ErrorDTO> guideNotFoundException(GuideNotFoundException ex) {
        log.error("{}", ex.getMessage());
        return ResponseEntity.badRequest().body(new ErrorDTO(400, ex.getMessage()));
    }
}
