package com.ssafy.aejimeongji.api.dto.dog;

import com.ssafy.aejimeongji.domain.entity.*;
import com.ssafy.aejimeongji.domain.entity.image.DogImage;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.PositiveOrZero;
import javax.validation.constraints.Size;
import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DogSaveRequest {

    @NotBlank(message = "강아지 이름을 입력해주세요.")
    private String name;

    @NotNull(message = "체중을 입력해주세요.")
    @PositiveOrZero(message = "0 이상의 값을 입력해주세요.")
    private Double weight;

    @NotNull(message = "생일을 입력해주세요.")
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate birthday;

    @NotNull(message = "입양일을 입력해주세요.")
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate adoptionDay;

    @NotNull(message = "성별을 입력해주세요.")
    private Gender gender;

    @NotNull(message = "중성화 여부를 입력해주세요.")
    private Boolean neutering;


    private Boolean gone;

    @NotBlank(message = "견종을 입력해주세요.")
    private String breed;

    @NotNull(message = "프로필 사진을 등록해주세요.")
    private MultipartFile image;

    public Dog toEntity(Member member, Breed breed, DogImage image){
        return new Dog(getName(), getWeight(), getBirthday(), getGender(), getNeutering(),
                getGone(), getAdoptionDay(), member, image, breed);
    }
}
