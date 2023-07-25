package com.ssafy.aejimeongji.domain.dog.application.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DogSaveResponse {
    private String message;
    private Long dogId;
}
