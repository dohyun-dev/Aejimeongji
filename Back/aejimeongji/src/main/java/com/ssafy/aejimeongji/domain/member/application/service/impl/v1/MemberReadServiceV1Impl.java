package com.ssafy.aejimeongji.domain.member.application.service.impl.v1;

import com.ssafy.aejimeongji.domain.common.exception.CustomError;
import com.ssafy.aejimeongji.domain.common.exception.CustomException;
import com.ssafy.aejimeongji.domain.member.application.dto.MemberDto;
import com.ssafy.aejimeongji.domain.member.application.mapper.MemberMapper;
import com.ssafy.aejimeongji.domain.member.application.service.v1.MemberReadServiceV1;
import com.ssafy.aejimeongji.domain.member.domain.Member;
import com.ssafy.aejimeongji.domain.member.domain.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class MemberReadServiceV1Impl implements MemberReadServiceV1 {

    private final MemberRepository memberRepository;

    @Override
    public MemberDto findMember(Long memberId) {
        Member findMember = memberRepository.findById(memberId)
                .orElseThrow(() -> new CustomException(CustomError.MEMBER_NOT_FOUND));
        return MemberMapper.INSTANCE.toDto(findMember);
    }
}
