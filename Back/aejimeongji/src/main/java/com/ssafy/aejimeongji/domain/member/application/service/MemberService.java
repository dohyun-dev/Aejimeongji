package com.ssafy.aejimeongji.domain.member.application.service;

import com.ssafy.aejimeongji.domain.common.exception.CustomError;
import com.ssafy.aejimeongji.domain.common.exception.CustomException;
import com.ssafy.aejimeongji.domain.member.domain.Member;
import com.ssafy.aejimeongji.domain.member.domain.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


@Service
@Slf4j
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class MemberService {

    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;

    public Member findMember(Long memberId) {
        return memberRepository
                .findById(memberId)
                .orElseThrow(() -> new CustomException(CustomError.MEMBER_NOT_FOUND));
    }

    @Transactional
    public Long joinMember(Member member) {
        return memberRepository.save(member).getId();
    }

    @Transactional
    public Long updateMember(Long memberId, String nickname, String password, String phoneNumber) {
        Member findMember = findMember(memberId);
        findMember.updateMember(nickname, passwordEncoder.encode(password), phoneNumber);
        return findMember.getId();
    }

    @Transactional
    public void deleteMember(Long memberId) {
        Member member = findMember(memberId);
        memberRepository.delete(member);
    }
}
