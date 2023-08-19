package com.ssafy.aejimeongji.domain.member.application.service.v1;

import com.ssafy.aejimeongji.domain.member.application.dto.MemberDto;

public interface MemberWriteServiceV1 {
    Long join(MemberDto joinParam);
    Long update(Long memberId, MemberDto updateParam);
    void delete(Long memberId);
}
