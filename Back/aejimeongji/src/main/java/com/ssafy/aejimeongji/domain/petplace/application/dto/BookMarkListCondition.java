package com.ssafy.aejimeongji.domain.petplace.application.dto;

import lombok.Data;

@Data
public class BookMarkListCondition {
    private Long curLastIdx = Long.MAX_VALUE;
    private Integer limit = 10;
}
