package com.ssafy.aejimeongji.api.dto.walking;

import com.querydsl.core.annotations.QueryProjection;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class WalkingInfoReponse {
    private int totalCount;
    private double totalDistance;
    private int totalMinute;

    @QueryProjection
    public WalkingInfoReponse(int totalCount, double totalDistance, int totalMinute) {
        this.totalCount = totalCount;
        this.totalDistance = totalDistance;
        this.totalMinute = totalMinute;
    }
}
