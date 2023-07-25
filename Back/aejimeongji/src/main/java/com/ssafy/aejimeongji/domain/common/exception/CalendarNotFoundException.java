package com.ssafy.aejimeongji.domain.common.exception;

public class CalendarNotFoundException extends RuntimeException {
    public CalendarNotFoundException(String calendarId) {
        super(calendarId + "번 캘린더가 존재하지 않습니다.");
    }
}
