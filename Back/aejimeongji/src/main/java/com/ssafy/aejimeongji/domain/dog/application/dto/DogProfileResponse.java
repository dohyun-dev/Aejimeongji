package com.ssafy.aejimeongji.domain.dog.application.dto;

import com.ssafy.aejimeongji.domain.dog.domain.Dog;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDate;

@Data
@AllArgsConstructor
public class DogProfileResponse {
    private Long dogId;
    private String name;
    private double weight;
    private LocalDate birthday;
    private LocalDate adoptionDay;
    private String breedName;
    private String imageName;

    public DogProfileResponse(Dog dog) {
        dogId = dog.getId();
        name = dog.getName();
        weight = dog.getWeight();
        birthday = dog.getBirthday();
        adoptionDay = dog.getAdoptionDay();
        breedName = dog.getBreed().getBreedName();
        imageName = dog.getImage().getStoreFilename();
    }

    public static DogProfileResponse toDTO(Dog dog) {
        return new DogProfileResponse(dog);
    }

}