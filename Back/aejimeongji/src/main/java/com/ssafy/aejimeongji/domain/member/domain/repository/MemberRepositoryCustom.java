package com.ssafy.aejimeongji.domain.member.domain.repository;

import com.ssafy.aejimeongji.domain.member.application.dto.DuplicatedCheckCondition;

public interface MemberRepositoryCustom {
    boolean duplicatedCheck(DuplicatedCheckCondition condition);
}
