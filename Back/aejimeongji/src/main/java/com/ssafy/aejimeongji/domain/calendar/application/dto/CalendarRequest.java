package com.ssafy.aejimeongji.domain.calendar.application.dto;

import com.ssafy.aejimeongji.domain.calendar.domain.Calendar;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;

import javax.validation.constraints.NotBlank;
import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CalendarRequest {

    @NotBlank(message = "내용을 입력해주세요")
    private String content;
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate date;
    private Boolean isActive = false;
    private Boolean isAlert = false;

    public Calendar toEntity() {
        return Calendar.builder()
                .content(content)
                .date(date)
                .isActive(isActive)
                .isAlert(isAlert)
                .build();
    }
}
