package com.ssafy.aejimeongji.api.dto.walking;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.ssafy.aejimeongji.domain.entity.WalkingDog;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class WalkingResponse {
    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    private Long walkingId;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "hh:mm", timezone = "Asia/seoul")
    private LocalDateTime walkingDate;
    private Double walkingTime;
    private Double walkingDistance;
    private String walkingCalories;

    public WalkingResponse(WalkingDog walkingDog) {
        this.walkingId = walkingDog.getId();
        this.walkingDate = walkingDog.getWalking().getWalkingDate();
        this.walkingTime = walkingDog.getWalking().getWalkingTime();
        this.walkingDistance = walkingDog.getWalking().getDistance();
        this.walkingCalories = walkingDog.getCalories() + "kcal";
    }
}
