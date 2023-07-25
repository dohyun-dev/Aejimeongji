package com.ssafy.aejimeongji.domain.common.exception;

import lombok.Getter;

@Getter
public class MemberNotFoundException extends IllegalArgumentException {

    private Long memberId;
    public MemberNotFoundException(Long memberId) {
        super("요청하신 회원이 존재하지 않습니다.");
        this.memberId = memberId;
    }
}
