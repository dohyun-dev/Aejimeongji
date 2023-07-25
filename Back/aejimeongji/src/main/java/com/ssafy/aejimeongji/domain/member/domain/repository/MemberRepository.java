package com.ssafy.aejimeongji.domain.member.domain.repository;

import com.ssafy.aejimeongji.domain.member.domain.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface MemberRepository extends JpaRepository<Member, Long>, MemberRepositoryCustom {

    Optional<Member> findByEmail(String email);
    boolean existsByEmail(String email);
    boolean existsByNickname(String nickname);
    Optional<Member> findByRefreshToken(String refreshToken);
}
