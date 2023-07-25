package com.ssafy.aejimeongji.global.config;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;

import javax.annotation.PostConstruct;

@Profile("!test")
@Slf4j
@Configuration
public class TestConfig {
    @Value("${spring.datasource.url}")
    private String url;
    @Value("${spring.datasource.username}")
    private String username;
    @Value("${spring.datasource.password}")
    private String password;
    @Value("${jasypt.encryptor.password}")
    private String jasyptPassword;

    @PostConstruct
    public void healthCheck() {
        log.info("url = {}", url);
        log.info("username = {}", username);
        log.info("password = {}", password);
        log.info("jasyptPassword = {}", jasyptPassword);
    }
}
