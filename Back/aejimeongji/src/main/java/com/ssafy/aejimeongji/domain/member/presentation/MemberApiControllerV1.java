package com.ssafy.aejimeongji.domain.member.presentation;

import com.ssafy.aejimeongji.domain.common.application.dto.ResponseDTO;
import com.ssafy.aejimeongji.domain.common.application.dto.ResponseMessage;
import com.ssafy.aejimeongji.domain.member.application.dto.MemberDto;
import com.ssafy.aejimeongji.domain.member.application.dto.MemberModifyRequest;
import com.ssafy.aejimeongji.domain.member.application.dto.MemberProfileResponse;
import com.ssafy.aejimeongji.domain.member.application.dto.MemberSignUpRequest;
import com.ssafy.aejimeongji.domain.member.application.service.v1.MemberReadServiceV1;
import com.ssafy.aejimeongji.domain.member.application.service.v1.MemberWriteServiceV1;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@Slf4j
@RestController
@RequestMapping("/api/v1/members")
@RequiredArgsConstructor
public class MemberApiControllerV1 {

    private final MemberReadServiceV1 memberReadService;
    private final MemberWriteServiceV1 memberWriteService;

    @GetMapping("/{memberId}")
    public ResponseEntity<MemberProfileResponse> showMemberProfile(@PathVariable Long memberId) {
        MemberDto findMemberDto = memberReadService.findMember(memberId);
        return ResponseEntity.ok().body(new MemberProfileResponse(findMemberDto));
    }

    @PostMapping
    public ResponseEntity<ResponseDTO> signup(@Valid @RequestBody MemberSignUpRequest request) {
        MemberDto joinParam = request.toDto();
        memberWriteService.join(joinParam);
        return ResponseEntity.ok(new ResponseDTO(ResponseMessage.SIGN_UP_SUCCESS));
    }

    @PutMapping("/{memberId}")
    public ResponseEntity<ResponseDTO> modifyProfile(@PathVariable Long memberId, @Valid @RequestBody MemberModifyRequest request) {
        MemberDto updateParam = request.toDto();
        memberWriteService.update(memberId, updateParam);
        return ResponseEntity.ok(new ResponseDTO(ResponseMessage.UPDATE_MEMBER_SUCCESS));
    }

    @DeleteMapping("/{memberId}")
    public ResponseEntity<ResponseDTO> deleteMember(@PathVariable Long memberId) {
        memberWriteService.delete(memberId);
        return ResponseEntity.ok(new ResponseDTO(ResponseMessage.DELETE_MEMBER_SUCCESS));
    }
}
