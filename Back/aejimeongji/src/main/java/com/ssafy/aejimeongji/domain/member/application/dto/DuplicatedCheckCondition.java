package com.ssafy.aejimeongji.domain.member.application.dto;

import lombok.Data;

import javax.validation.constraints.Email;
import javax.validation.constraints.Size;

@Data
public class DuplicatedCheckCondition {

    @Email(message = "이메일을 입력해주세요.")
    private String email;
    @Size(min = 2, max = 10, message = "닉네임을 2 ~ 10자 사이로 입력해주세요.")
    private String nickname;
}
