package com.ssafy.aejimeongji.domain.auth.application.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class LoginResponse {
    private String message;
    private String accessToken;
    private String refreshToken;
}
