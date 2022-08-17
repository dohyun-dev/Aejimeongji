package com.ssafy.aejimeongji.api.dto.walking;

import com.querydsl.core.annotations.QueryProjection;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
public class WalkingDistanceResponse {
    private double tatalDistance;

    @QueryProjection
    public WalkingDistanceResponse(double tatalDistance) {
        this.tatalDistance = tatalDistance;
    }
}
