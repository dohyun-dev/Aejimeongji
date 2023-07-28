package com.ssafy.aejimeongji.domain.member.presentation;

import com.ssafy.aejimeongji.domain.common.application.dto.ResponseDTO;
import com.ssafy.aejimeongji.domain.member.application.dto.MemberModifyRequest;
import com.ssafy.aejimeongji.domain.member.application.dto.MemberProfileResponse;
import com.ssafy.aejimeongji.domain.member.application.dto.MemberSignUpRequest;
import com.ssafy.aejimeongji.domain.member.application.service.MemberService;
import com.ssafy.aejimeongji.domain.member.domain.Member;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@Slf4j
@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class MemberApiController {

    private final MemberService memberService;
    private final PasswordEncoder passwordEncoder;

    @GetMapping("/member/{memberId}/profile")
    public ResponseEntity<MemberProfileResponse> showMemberProfile(@PathVariable Long memberId) {
        log.info("회원정보조회 요청 = {}", memberId);
        Member member = memberService.findMember(memberId);
        return ResponseEntity.ok().body(new MemberProfileResponse(member));
    }

    @PostMapping("/signup")
    public ResponseEntity<ResponseDTO> signup(@Valid @RequestBody MemberSignUpRequest request) {
        log.info("회원가입 요청");
        memberService.joinMember(request.convertMember(passwordEncoder));
        return ResponseEntity.ok(new ResponseDTO("회원가입이 완료되었습니다."));
    }

    @PutMapping("/member/{memberId}")
    public ResponseEntity<ResponseDTO> modifyProfile(@PathVariable Long memberId, @Valid @RequestBody MemberModifyRequest request) {
        log.info("회원정보수정 요청 = {}", memberId);
        memberService.updateMember(memberId, request.getNickname(), request.getPassword(), request.getPhoneNumber());
        return ResponseEntity.ok(new ResponseDTO("회원 정보 수정이 완료되었습니다."));
    }

    @DeleteMapping("/member/{memberId}")
    public ResponseEntity<ResponseDTO> deleteMember(@PathVariable Long memberId) {
        log.info("회원탈퇴 요청 = {}", memberId);
        memberService.deleteMember(memberId);
        return ResponseEntity.ok(new ResponseDTO("회원탈퇴가 완료되었습니다."));
    }
}
