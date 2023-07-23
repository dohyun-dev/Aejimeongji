package com.ssafy.aejimeongji.dto.member;

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
