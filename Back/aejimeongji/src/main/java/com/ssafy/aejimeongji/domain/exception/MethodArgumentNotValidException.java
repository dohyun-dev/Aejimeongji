package com.ssafy.aejimeongji.domain.exception;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;

import java.util.HashMap;
import java.util.Map;

@Getter
@Setter
public class MethodArgumentNotValidException extends RuntimeException {

    private BindingResult bindingResult;

    public MethodArgumentNotValidException(BindingResult bindingResult) {
        super("유효성 검증 실패");
        this.bindingResult = bindingResult;
    }

    public Map<String, String> makeErrors() {
        HashMap<String, String> errors = new HashMap<>();
        bindingResult.getAllErrors().stream()
            .forEach(e -> {
                    if (e instanceof FieldError) {
                        errors.put(((FieldError) e).getField(), e.getDefaultMessage());
                    } else {
                        errors.put(e.getCode(), e.getDefaultMessage());
                    }
                }
            );
        return errors;
    }
}
