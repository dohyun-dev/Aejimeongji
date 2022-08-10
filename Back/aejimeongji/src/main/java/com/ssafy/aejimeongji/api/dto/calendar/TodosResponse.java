package com.ssafy.aejimeongji.api.dto.calendar;

import com.ssafy.aejimeongji.domain.entity.Calendar;;
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
