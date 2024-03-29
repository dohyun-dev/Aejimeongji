package com.ssafy.aejimeongji.domain.guide.application.dto;

import lombok.Data;

@Data
public class GuideSearchCondition {
    private Long dog;
    private Long member;
    private String category;
    private Long curLastIdx = Long.MAX_VALUE;
    private Integer limit = 10;
}
