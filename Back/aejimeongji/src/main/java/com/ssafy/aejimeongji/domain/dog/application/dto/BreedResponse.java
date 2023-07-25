package com.ssafy.aejimeongji.domain.dog.application.dto;

import com.ssafy.aejimeongji.domain.dog.domain.Breed;
import lombok.Data;

@Data
public class BreedResponse {
    private Long breedId;
    private String breedName;

    public BreedResponse(Breed breed) {
        breedId = breed.getId();
        breedName = breed.getBreedName();
    }

    public static BreedResponse toDTO(Breed breed) {
        return new BreedResponse(breed);
    }
}
