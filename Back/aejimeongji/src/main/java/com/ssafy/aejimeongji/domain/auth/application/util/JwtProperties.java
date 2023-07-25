package com.ssafy.aejimeongji.domain.auth.application.util;

public interface JwtProperties {
    long accessTokenValidTime = 3 * 60 * 1000L;
    long refreshTokenValidTime = 365 * 24 * 60 * 60 * 1000L;
}
