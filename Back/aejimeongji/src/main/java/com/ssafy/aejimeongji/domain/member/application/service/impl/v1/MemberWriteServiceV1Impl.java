package com.ssafy.aejimeongji.domain.member.application.service.impl.v1;

import com.ssafy.aejimeongji.domain.common.exception.CustomError;
import com.ssafy.aejimeongji.domain.common.exception.CustomException;
import com.ssafy.aejimeongji.domain.member.application.dto.MemberDto;
import com.ssafy.aejimeongji.domain.member.application.service.v1.MemberWriteServiceV1;
import com.ssafy.aejimeongji.domain.member.domain.Member;
import com.ssafy.aejimeongji.domain.member.domain.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class MemberWriteServiceV1Impl implements MemberWriteServiceV1 {

    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public Long join(MemberDto joinParam) {
        Member joinMember = new Member(
                joinParam.getEmail(),
                passwordEncoder.encode(joinParam.getPassword()),
                joinParam.getUsername(),
                joinParam.getPhoneNumber(),
                joinParam.getNickname()
        );
        return memberRepository.save(joinMember).getId();
    }

    @Override
    public Long update(Long memberId, MemberDto updateParam) {
        Member findMember = memberRepository.findById(memberId)
                .orElseThrow(() -> new CustomException(CustomError.MEMBER_NOT_FOUND));

        findMember.updateMember(
                updateParam.getNickname(),
                passwordEncoder.encode(updateParam.getPassword()),
                updateParam.getPhoneNumber()
        );

        return findMember.getId();
    }

    @Override
    public void delete(Long memberId) {
        Member findMember = memberRepository.findById(memberId)
                .orElseThrow(() -> new CustomException(CustomError.MEMBER_NOT_FOUND));
        memberRepository.delete(findMember);
    }
}
