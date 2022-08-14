package com.ssafy.aejimeongji.api.dto.calendar;

import com.ssafy.aejimeongji.domain.entity.Calendar;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
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
