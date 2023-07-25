package com.ssafy.aejimeongji.domain.auth.presentation;

import com.ssafy.aejimeongji.domain.auth.application.dto.IssueRequest;
import com.ssafy.aejimeongji.domain.auth.application.dto.IssueResponse;
import com.ssafy.aejimeongji.domain.auth.application.dto.LoginRequest;
import com.ssafy.aejimeongji.domain.auth.application.dto.LoginResponse;
import com.ssafy.aejimeongji.domain.auth.application.service.AuthService;
import com.ssafy.aejimeongji.domain.auth.application.util.TokenProvider;
import com.ssafy.aejimeongji.domain.common.application.dto.ErrorDTO;
import com.ssafy.aejimeongji.domain.common.application.dto.ResponseDTO;
import com.ssafy.aejimeongji.domain.common.exception.MethodArgumentNotValidException;
import com.ssafy.aejimeongji.domain.member.application.dto.DuplicatedCheckCondition;
import com.ssafy.aejimeongji.domain.member.application.dto.DuplicationCheckResponse;
import com.ssafy.aejimeongji.domain.member.application.service.MemberService;
import com.ssafy.aejimeongji.domain.member.domain.Member;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;
import java.util.Map;

@Slf4j
@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;
    private final MemberService memberService;
    private final TokenProvider tokenProvider;

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@Valid @RequestBody LoginRequest request, BindingResult bindingResult) {
        log.info("로그인 요청");

        validateRequest(bindingResult);

        Long memberId = authService.login(request.getEmail(), request.getPassword());
        String refreshToken = authService.createRefreshToken(memberId);
        Member member = memberService.findMember(memberId);
        String accessToken = tokenProvider.createAccessToken(member);

        return ResponseEntity.ok().body(new LoginResponse("로그인되었습니다.", accessToken, refreshToken));
    }

    @PostMapping("/logout")
    public ResponseEntity<ResponseDTO> logout(@RequestBody Map<String, String> request) {
        String refreshToken = request.get("refreshToken");
        authService.logout(refreshToken);
        return ResponseEntity.ok().body(new ResponseDTO("로그아웃되었습니다."));
    }


    @PostMapping("/duplicationcheck")
    public ResponseEntity<DuplicationCheckResponse> checkDuplicated(@Valid @RequestBody DuplicatedCheckCondition condition, BindingResult bindingResult) {
        validateRequest(bindingResult);
        boolean resultStatus = authService.duplicatedCheck(condition);
        String message = makeDuplicateCheckResponseMessage(condition, resultStatus);
        if (resultStatus)
            return ResponseEntity.ok().body(new DuplicationCheckResponse(resultStatus, message));
        return ResponseEntity.badRequest().body(new DuplicationCheckResponse(resultStatus, message));
    }

    @PostMapping("/issue")
    public ResponseEntity<?> issue(@RequestBody IssueRequest request) {
        String refreshToken = request.getRefreshToken();
        log.debug("refreshToken = {}", request.getRefreshToken());

        if (StringUtils.hasText(refreshToken) && tokenProvider.validateToken(refreshToken)) {
            log.info("토큰 유효함");
            String newAccessToken = authService.createNewAccessToken(refreshToken);
            return ResponseEntity.ok().body(new IssueResponse("토큰이 재발급 되었습니다.", newAccessToken));
        }
        log.info("토큰 유효하지 않음");
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new ErrorDTO(401, "토큰이 유효하지 않습니다."));
    }

    private String makeDuplicateCheckResponseMessage(DuplicatedCheckCondition condition, boolean resultStatus) {
        String message = resultStatus ? "사용가능한 " : "이미 존재하는 ";
        message += addMessage(condition);
        return message;
    }

    private String addMessage(DuplicatedCheckCondition condition) {
        return condition.getEmail() != null ? "이메일입니다." : "닉네임입니다.";
    }

    private void validateRequest(BindingResult bindingResult) {
        if (bindingResult.hasErrors())
            throw new MethodArgumentNotValidException(bindingResult);
    }
}
