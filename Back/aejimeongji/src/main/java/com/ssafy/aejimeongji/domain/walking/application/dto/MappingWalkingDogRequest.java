package com.ssafy.aejimeongji.domain.walking.application.dto;

import lombok.Data;

@Data
public class MappingWalkingDogRequest {
    private Long dogId;
    private Long walkingId;
    private double calories;
}
