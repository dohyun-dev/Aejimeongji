package com.ssafy.aejimeongji.api.dto.member;

import com.ssafy.aejimeongji.domain.entity.Member;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MemberSignUpRequest {
    @NotBlank(message = "이메일을 입력해주세요.")
    @Email(message = "이메일을 입력해주세요.")
    private String email;

    @NotBlank(message = "비밀번호를 입력해주세요.")
    @Pattern(regexp="(?=.*[0-9])(?=.*[a-zA-Z])(?=.*\\W)(?=\\S+$).{8,20}", message = "비밀번호는 영문 대,소문자와 숫자, 특수기호가 적어도 1개 이상씩 포함된 8자 ~ 20자의 비밀번호여야 합니다.")
    private String password;

    @NotBlank(message = "성명을 입력해주세요.")
    private String username;

    @NotBlank(message = "닉네임을 입력해주세요.")
    private String nickname;

    @NotBlank(message = "휴대폰 번호를 입력해주세요.")
    @Pattern(regexp = "([0-9]{11})", message = "-를 빼고 입력해주세요")
    private String phoneNumber;

    public Member convertMember(PasswordEncoder passwordEncoder) {
        return new Member(getEmail(), passwordEncoder.encode(getPassword()), getUsername(), getPhoneNumber(), getNickname());
    }
}
