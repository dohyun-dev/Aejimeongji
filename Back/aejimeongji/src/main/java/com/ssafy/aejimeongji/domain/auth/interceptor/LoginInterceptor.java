package com.ssafy.aejimeongji.domain.auth.interceptor;

import com.ssafy.aejimeongji.domain.auth.application.util.TokenProvider;
import com.ssafy.aejimeongji.domain.common.exception.CustomError;
import com.ssafy.aejimeongji.domain.common.exception.CustomException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.util.StringUtils;
import org.springframework.web.servlet.HandlerInterceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@Slf4j
public class LoginInterceptor implements HandlerInterceptor {

    private final TokenProvider tokenProvider;

    public LoginInterceptor(TokenProvider tokenProvider) {
        this.tokenProvider = tokenProvider;
    }

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        String accessToken = tokenProvider.resolveToken(request);

        log.debug("엑세스 토큰 = {}", accessToken);

        // Bearer 체크
        if (accessToken == null || !StringUtils.hasText(accessToken) | !accessToken.startsWith("Bearer ")) {
            log.debug("엑세스 토큰이 존재하지 않습니다. 엑세스 토큰 = {}", accessToken);
            throw new CustomException(CustomError.LOGIN_UNAUTHORIZED);
        }

        // Bearer 삭제
        accessToken = accessToken.substring(7);

        // 토큰 검증
        if (!tokenProvider.validateToken(accessToken)) {
            log.debug("유효하지 않은 토큰");
            throw new CustomException(CustomError.TOKEN_EXPIRED);
        }
        return true;
    }
}
