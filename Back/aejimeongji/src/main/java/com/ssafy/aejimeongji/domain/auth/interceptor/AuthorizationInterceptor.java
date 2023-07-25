package com.ssafy.aejimeongji.domain.auth.interceptor;

import com.ssafy.aejimeongji.domain.auth.application.util.TokenProvider;
import com.ssafy.aejimeongji.domain.common.exception.auth.ForbiddenException;
import com.ssafy.aejimeongji.domain.member.domain.Role;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.servlet.HandlerInterceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@Slf4j
public class AuthorizationInterceptor implements HandlerInterceptor {

    private final TokenProvider tokenProvider;

    public AuthorizationInterceptor(TokenProvider tokenProvider) {
        this.tokenProvider = tokenProvider;
    }

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        String accessToken = tokenProvider.resolveToken(request).substring(7);;
        if (tokenProvider.getClaims(accessToken).get("role").toString().equals(Role.ROLE_ADMIN))
            return true;
        throw new ForbiddenException();
    }
}
