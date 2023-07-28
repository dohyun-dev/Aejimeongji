package com.ssafy.aejimeongji.domain.auth.application.service;

import com.ssafy.aejimeongji.domain.auth.application.util.TokenProvider;
import com.ssafy.aejimeongji.domain.common.exception.CustomError;
import com.ssafy.aejimeongji.domain.common.exception.CustomException;
import com.ssafy.aejimeongji.domain.member.application.dto.DuplicatedCheckCondition;
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
public class AuthService {

    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;
    private final TokenProvider tokenProvider;

    public boolean duplicatedCheck(DuplicatedCheckCondition condition) {
        return memberRepository.duplicatedCheck(condition) ? false : true;
    }

    @Transactional
    public Long login(String email, String inputPassword) {
        Member member = memberRepository
                .findByEmail(email)
                .orElseThrow(() -> new CustomException(CustomError.LOGIN_FAILURE));

        if(!member.matchPassword(passwordEncoder, inputPassword)) {
            log.debug("로그인 실패");
            throw new CustomException(CustomError.LOGIN_FAILURE);
        }

        return member.getId();
    }

    @Transactional
    public String createRefreshToken(Long memberId) {
        Member member = memberRepository
                .findById(memberId)
                .orElseThrow(() -> new CustomException(CustomError.LOGIN_FAILURE));

        String refreshToken = tokenProvider.createRefreshToken(member);
        member.createRefreshToken(refreshToken);
        return refreshToken;
    }

    public String createNewAccessToken(String refreshToken) {
        Member member = memberRepository
                .findByRefreshToken(refreshToken)
                .orElseThrow(() -> new CustomException(CustomError.LOGIN_FAILURE));
        String newAccessToken = tokenProvider.createAccessToken(member);
        return newAccessToken;
    }

    @Transactional
    public void logout(String refreshToken) {
        Member member = memberRepository
                .findByRefreshToken(refreshToken)
                .orElseThrow(() -> new CustomException(CustomError.LOGIN_FAILURE));
        member.deleteRefreshToken();
    }
}
