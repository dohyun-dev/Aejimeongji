package com.ssafy.aejimeongji.dto.walking;

import lombok.Data;

@Data
public class MappingWalkingDogRequest {
    private Long dogId;
    private Long walkingId;
    private double calories;
}
