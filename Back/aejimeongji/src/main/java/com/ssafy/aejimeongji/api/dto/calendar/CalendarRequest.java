package com.ssafy.aejimeongji.api.dto.calendar;

import com.ssafy.aejimeongji.domain.entity.Calendar;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CalendarRequest {

    private String content;
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate date;
    private Boolean isActive;
    private Boolean isAlert;

    public Calendar toEntity() {
        return Calendar.builder()
                .content(content)
                .date(date)
                .isActive(isActive)
                .isAlert(isAlert)
                .build();
    }
}
