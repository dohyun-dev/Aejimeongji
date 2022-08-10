package com.ssafy.aejimeongji.api.dto.dog;

import com.ssafy.aejimeongji.domain.entity.Breed;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DogUpdateRequest {
    private String name;
    private double weight;
    private LocalDate birthday;
    private LocalDate adoptionDay;
    private Breed breed;
}
