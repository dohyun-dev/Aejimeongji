package com.ssafy.aejimeongji.domain.member.application.dto;

import com.ssafy.aejimeongji.domain.member.domain.Role;
import lombok.Builder;
import lombok.Data;

import java.io.Serializable;
import java.time.LocalDateTime;

@Data
@Builder
public class MemberDto implements Serializable {
    private final Long id;
    private final String email;
    private final String password;
    private final String username;
    private final String phoneNumber;
    private final String nickname;
    private final String refreshToken;
    private final Role role;
    private final LocalDateTime createdDate;
    private final LocalDateTime updatedDate;
}
