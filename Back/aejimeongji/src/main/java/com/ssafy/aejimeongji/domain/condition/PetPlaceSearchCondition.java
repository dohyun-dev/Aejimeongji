package com.ssafy.aejimeongji.domain.condition;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;

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
