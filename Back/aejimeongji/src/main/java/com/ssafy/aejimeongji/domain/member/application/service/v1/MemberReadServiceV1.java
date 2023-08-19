package com.ssafy.aejimeongji.domain.member.application.service.v1;

import com.ssafy.aejimeongji.domain.member.application.dto.MemberDto;

public interface MemberReadServiceV1 {
    MemberDto findMember(Long memberId);
}
