package com.ssafy.aejimeongji.api.dto.dog;

import com.ssafy.aejimeongji.domain.entity.Breed;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.PositiveOrZero;
import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DogUpdateRequest {

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

    @NotBlank(message = "견종을 입력해주세요.")
    private Breed breed;
}
