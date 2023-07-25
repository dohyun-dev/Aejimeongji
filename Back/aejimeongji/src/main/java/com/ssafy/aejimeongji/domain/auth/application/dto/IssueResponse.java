package com.ssafy.aejimeongji.domain.auth.application.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class IssueResponse {
    private String message;
    private String accessToken;
}
