package com.ssafy.aejimeongji.domain.common.exception;

import org.springframework.validation.BindingResult;

public class CustomMethodArgumentNotValidException extends CustomException {

    private BindingResult bindingResult;

    public CustomMethodArgumentNotValidException(BindingResult bindingResult) {
        super(CustomError.MEMBER_NOT_FOUND);
        this.bindingResult = bindingResult;
    }

    public BindingResult getBindingResult() {
        return bindingResult;
    }
}
