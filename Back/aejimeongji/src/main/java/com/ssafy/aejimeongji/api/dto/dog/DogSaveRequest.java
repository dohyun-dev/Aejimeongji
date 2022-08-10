package com.ssafy.aejimeongji.api.dto.dog;

import com.ssafy.aejimeongji.domain.entity.*;
import com.ssafy.aejimeongji.domain.entity.image.DogImage;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DogSaveRequest {

    private String name;
    private Double weight;
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate birthday;
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate adoptionDay;
    private Gender gender;
    private Boolean neutering;
    private Boolean gone;
    private String breed;
    private MultipartFile image;

    public Dog toEntity(Member member, Breed breed, DogImage image){
        return new Dog(getName(), getWeight(), getBirthday(), getGender(), getNeutering(),
                getGone(), getAdoptionDay(), member, image, breed);
    }
}
