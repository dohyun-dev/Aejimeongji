package com.ssafy.aejimeongji.domain.member.application.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DuplicationCheckResponse {
    private boolean resultStatus;
    private String message;
}
