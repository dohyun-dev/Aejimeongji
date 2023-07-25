package com.ssafy.aejimeongji.domain.calendar.application.dto;

import com.ssafy.aejimeongji.domain.calendar.domain.Calendar;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
public class CalendarResponse {

    private Long id;
    private String content;
    private LocalDate date;
    private Boolean isActive;
    private Boolean isAlert;
    private Boolean isInjection;

    public CalendarResponse(Calendar calendar) {
        id = calendar.getId();
        content = calendar.getContent();
        date = calendar.getDate();
        isActive = calendar.getIsActive();
        isAlert = calendar.getIsAlert();
        isInjection = calendar.getIsInjection();
    }
}
