package com.ssafy.aejimeongji.domain.common.exception;

public class CustomException extends RuntimeException {
    private CustomError customError;

    public CustomException(CustomError customError) {
        this.customError = customError;
    }

    public CustomError getCustomError() {
        return customError;
    }
}
