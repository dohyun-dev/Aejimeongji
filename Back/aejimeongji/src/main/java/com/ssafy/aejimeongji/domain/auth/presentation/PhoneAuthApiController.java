package com.ssafy.aejimeongji.domain.auth.presentation;

import com.ssafy.aejimeongji.domain.auth.application.dto.PhoneAuthSendRequest;
import com.ssafy.aejimeongji.domain.auth.application.dto.PhoneAuthSendResponse;
import com.ssafy.aejimeongji.domain.auth.application.dto.PhoneAuthVerifyRequest;
import com.ssafy.aejimeongji.domain.auth.application.service.PhoneAuthService;
import com.ssafy.aejimeongji.domain.common.application.dto.ResponseDTO;
import com.ssafy.aejimeongji.domain.common.exception.CustomError;
import com.ssafy.aejimeongji.domain.common.exception.CustomException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@Slf4j
@RestController
@RequestMapping("/api/phoneauth")
@RequiredArgsConstructor
public class PhoneAuthApiController {

    private final PhoneAuthService phoneAuthService;

    @PostMapping("/verify")
    public ResponseEntity<ResponseDTO> confirmAuthNumber(@RequestBody PhoneAuthVerifyRequest request) {
        boolean result = phoneAuthService.verifyAuthNumber(request.getPhoneUUID(), request.getAuthNumber());
        if (!result) {
            log.info("{}번 UUID에서 인증이 실패되었습니다.", request.getPhoneUUID());
            throw new CustomException(CustomError.PHONE_AUTH_FAILURE);
        }
        log.info("{}번 UUID에서 인증이 완료되었습니다.", request.getPhoneUUID());
        return ResponseEntity.ok().body(new ResponseDTO("인증되었습니다."));
    }

    @PostMapping
    public ResponseEntity<PhoneAuthSendResponse> sendMessage(@Valid @RequestBody PhoneAuthSendRequest request) {
        String phoneUUID = phoneAuthService.sendMessage(request.getPhoneNumber());
        log.info("{}번으로 인증번호가 전송되었습니다.", request.getPhoneNumber());
        return ResponseEntity.ok().body(new PhoneAuthSendResponse("인증번호가 발송되었습니다.", phoneUUID));
    }
}
