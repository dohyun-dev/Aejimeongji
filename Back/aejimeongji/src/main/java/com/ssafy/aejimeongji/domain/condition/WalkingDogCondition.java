package com.ssafy.aejimeongji.domain.condition;

import lombok.Data;

@Data
public class WalkingDogCondition {
    private Long curLastIdx = Long.MAX_VALUE;
    private Integer limit = 10;
}
