package com.ssafy.aejimeongji.config;

import com.ssafy.aejimeongji.domain.interceptor.AuthorizationInterceptor;
import com.ssafy.aejimeongji.domain.interceptor.LoginInterceptor;
import com.ssafy.aejimeongji.security.TokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@RequiredArgsConstructor
public class WebConfig implements WebMvcConfigurer {

    private final TokenProvider tokenProvider;

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(new LoginInterceptor(tokenProvider))
                .order(1)
                .addPathPatterns("/api/**")
                .excludePathPatterns("/api/auth/**", "/api/phoneauth/**", "/api/signup", "/api/breed", "/api/image/**", "/api/admin/**", "/api/category");

//        registry.addInterceptor(new AuthorizationInterceptor(tokenProvider))
//                .order(2)
//                .addPathPatterns("/api/admin/**");
    }
}