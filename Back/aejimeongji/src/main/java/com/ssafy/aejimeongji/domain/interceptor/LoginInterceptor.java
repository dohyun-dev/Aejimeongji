package com.ssafy.aejimeongji.domain.interceptor;

import com.ssafy.aejimeongji.domain.exception.auth.NotExistTokenException;
import com.ssafy.aejimeongji.domain.exception.auth.NotValidTokenException;
import com.ssafy.aejimeongji.security.TokenProvider;
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
        if (accessToken == null || !accessToken.startsWith("Bearer ")) {
            log.debug("엑세스 토큰이 존재하지 않습니다. 엑세스 토큰 = {}", accessToken);
            throw new NotExistTokenException();
        }

        // Bearer 삭제
        accessToken = accessToken.substring(7);

        // 토큰 검증
        if (StringUtils.hasText(accessToken) && tokenProvider.validateToken(accessToken)) {
            log.debug("유효한 토큰");
            return true;
        }
        log.debug("유효하지 않은 토큰");
        throw new NotValidTokenException();
    }
}
