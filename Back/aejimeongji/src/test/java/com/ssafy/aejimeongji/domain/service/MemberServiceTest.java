//package com.ssafy.aejimeongji.domain.service;
//
//import com.ssafy.aejimeongji.domain.condition.DuplicatedCheckCondition;
//import com.ssafy.aejimeongji.domain.entity.Member;
//import com.ssafy.aejimeongji.domain.exception.MemberNotFoundException;
//import com.ssafy.aejimeongji.domain.repository.MemberRepository;
//import org.junit.jupiter.api.Assertions;
//import org.junit.jupiter.api.BeforeEach;
//import org.junit.jupiter.api.Test;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.context.SpringBootTest;
//import org.springframework.transaction.annotation.Transactional;
//
//import static org.assertj.core.api.Assertions.*;
//
//@Transactional
//@SpringBootTest
//class MemberServiceTest {
//    @Autowired
//    MemberRepository memberRepository;
//    @Autowired
//    AuthService authService;
//    @Autowired
//    MemberService memberService;
//
//    @BeforeEach
//    void beforeEach() {
//        for (int i = 0; i < 10; i++) {
//            memberRepository.save(new Member("ssafy"+i+"@ssafy.com", "1234", "닉네임" + i, "0101235123" + i, "닉네임" + i));
//        }
//    }
//
//    @Test
//    void duplicatedCheck1() {
//        // given
//        DuplicatedCheckCondition condition1 = new DuplicatedCheckCondition();
//        condition1.setEmail("ssafy1@ssafy.com");
//        DuplicatedCheckCondition condition2 = new DuplicatedCheckCondition();
//        condition2.setEmail("ssafy99@ssafy.com");
//
//        // when
//        boolean result1 = authService.duplicatedCheck(condition1);
//        boolean result2 = authService.duplicatedCheck(condition2);
//
//        // then
//        assertThat(result1).isEqualTo(false);
//        assertThat(result2).isEqualTo(true);
//    }
//
//    @Test
//    void duplicatedCheck2() {
//        // given
//        DuplicatedCheckCondition condition1 = new DuplicatedCheckCondition();
//        condition1.setNickname("닉네임1");
//        DuplicatedCheckCondition condition2 = new DuplicatedCheckCondition();
//        condition2.setNickname("닉네임100");
//
//        // when
//        boolean result1 = authService.duplicatedCheck(condition1);
//        boolean result2 = authService.duplicatedCheck(condition2);
//
//        // then
//        assertThat(result1).isEqualTo(false);
//        assertThat(result2).isEqualTo(true);
//    }
//
//    @Test
//    void findMember() {
//        // given
//        Member member = new Member("ssafy100@ssafy.com", "1234", "닉네임100", "01012341234", "닉네임100");
//        Long id = memberRepository.save(member).getId();
//
//        // when
//        Member findMember = memberRepository.findById(id).get();
//
//        // then
//        assertThat(findMember).isEqualTo(member);
//    }
//
//    @Test
//    void updateMember() {
//        // given
//        Member member = new Member("ssafy100@ssafy.com", "1234", "닉네임100", "01012341234", "닉네임100");
//        Long id = memberRepository.save(member).getId();
//
//        // when
//        memberService.updateMember(id, "권도현", "password", "01063230351");
//
//        // then
//        assertThat(member.getNickname()).isEqualTo("권도현");
//        assertThat(member.getPhoneNumber()).isEqualTo("01063230351");
//    }
//
//    @Test
//    void deleteMember() {
//        // given
//        Member member = new Member("ssafy100@ssafy.com", "1234", "닉네임100", "01012341234", "닉네임100");
//        Long id = memberRepository.save(member).getId();
//
//        // when
//        memberService.deleteMember(id);
//
//        // then
//        Assertions.assertThrows(MemberNotFoundException.class, () -> memberService.findMember(id));
//    }
//}