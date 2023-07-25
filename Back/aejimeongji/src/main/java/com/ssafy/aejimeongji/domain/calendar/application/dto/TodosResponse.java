package com.ssafy.aejimeongji.domain.calendar.application.dto;

import com.ssafy.aejimeongji.domain.calendar.domain.Calendar;;
import lombok.Data;

import java.time.LocalDate;

@Data
public class TodosResponse {

    private Long calendarId;
    private String content;
    private LocalDate date;

    public TodosResponse(Calendar calendar) {
        this.calendarId = calendar.getId();
        this.content = calendar.getContent();
        this.date = calendar.getDate();
    }
}
