package com.ssafy.aejimeongji.dto.dog;

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
