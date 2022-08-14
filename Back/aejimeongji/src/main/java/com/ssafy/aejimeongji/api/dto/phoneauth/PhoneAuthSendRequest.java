package com.ssafy.aejimeongji.api.dto.phoneauth;

import lombok.Data;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;

@Data
public class PhoneAuthSendRequest {
    @NotBlank(message = "휴대폰 번호를 입력해주세요.")
    @Pattern(regexp = "([0-9]{11})", message = "-를 빼고 입력해주세요")
    private String phoneNumber;
}
