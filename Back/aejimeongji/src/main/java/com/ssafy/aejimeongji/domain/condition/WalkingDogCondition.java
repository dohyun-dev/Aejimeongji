package com.ssafy.aejimeongji.domain.condition;

import lombok.Data;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;

@Data
public class WalkingDogCondition {
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate date;
    private Long curLastIdx = Long.MAX_VALUE;
    private Integer limit = 10;
}
