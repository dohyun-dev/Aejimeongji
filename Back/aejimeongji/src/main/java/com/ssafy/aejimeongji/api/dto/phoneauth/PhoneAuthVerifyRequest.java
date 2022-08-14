package com.ssafy.aejimeongji.api.dto.phoneauth;

import lombok.Data;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Data
public class PhoneAuthVerifyRequest {
    @NotBlank(message = "발급 받은 UUID를 입력해주세요.")
    private String phoneUUID;
    @NotBlank(message = "인증번호 6자리를 입력해주세요.")
    @Size(min = 6, max = 6, message = "인증번호 6자리를 입력해주세요.")
    private String authNumber;
}
