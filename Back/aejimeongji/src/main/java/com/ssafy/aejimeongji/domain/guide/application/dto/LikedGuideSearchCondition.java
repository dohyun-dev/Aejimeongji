package com.ssafy.aejimeongji.domain.guide.application.dto;

import lombok.Data;

@Data
public class LikedGuideSearchCondition {
    private Long curLastIdx = Long.MAX_VALUE;
    private Integer limit = 10;
}
