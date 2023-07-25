package com.ssafy.aejimeongji.domain.walking.application.dto;

import com.querydsl.core.annotations.QueryProjection;
import lombok.Data;

@Data
public class WalkingDistanceResponse {
    private double tatalDistance;

    @QueryProjection
    public WalkingDistanceResponse(double tatalDistance) {
        this.tatalDistance = tatalDistance;
    }
}
