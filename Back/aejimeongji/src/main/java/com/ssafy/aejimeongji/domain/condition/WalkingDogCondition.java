package com.ssafy.aejimeongji.domain.condition;

import lombok.Data;

import java.time.LocalDate;

@Data
public class WalkingDogCondition {
    private LocalDate date;
    private Long curLastIdx = Long.MAX_VALUE;
    private Integer limit = 10;
}
