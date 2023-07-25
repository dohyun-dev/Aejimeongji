package com.ssafy.aejimeongji.domain.petplace.application.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PetPlaceSearchCondition {
    private String category;
    private Double lat;
    private Double lng;
    private Double dist;
    private Long curLastIdx = Long.MAX_VALUE;
    private int limit = 10;
}
