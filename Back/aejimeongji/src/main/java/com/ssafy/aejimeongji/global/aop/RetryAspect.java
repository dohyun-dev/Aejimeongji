package com.ssafy.aejimeongji.global.aop;

import lombok.extern.slf4j.Slf4j;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;

@Aspect
@Slf4j
public class RetryAspect {

    @Around("@annotation(retry)")
    public Object doRetry(ProceedingJoinPoint joinPoint, Retry retry) throws Throwable {
        Exception exceptionHolder = null;
        int maxCount = retry.maxCount();
        for (int retryCount = 0; retryCount <= maxCount; retryCount++) {
            try {
                return joinPoint.proceed();
            } catch (Exception e) {
                exceptionHolder = e;
            }
        }
        log.error("{}에서 {}번 재시도 실패", joinPoint.getSignature(), maxCount);
        throw exceptionHolder;
    }
}
