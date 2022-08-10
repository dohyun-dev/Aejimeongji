package com.ssafy.aejimeongji.domain.condition;

import lombok.Data;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;

@Data
public class CalendarSearchCondition {
    private Long dogId;

    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate date;

    private Boolean isActive;
}
