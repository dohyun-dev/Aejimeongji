package com.ssafy.aejimeongji.domain.repository.customrepository;

import com.ssafy.aejimeongji.domain.condition.DuplicatedCheckCondition;

public interface MemberRepositoryCustom {
    boolean duplicatedCheck(DuplicatedCheckCondition condition);
}
