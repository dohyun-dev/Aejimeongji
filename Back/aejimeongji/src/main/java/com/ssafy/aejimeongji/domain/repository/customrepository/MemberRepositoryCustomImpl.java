package com.ssafy.aejimeongji.domain.repository.customrepository;

import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.aejimeongji.domain.condition.DuplicatedCheckCondition;
import com.ssafy.aejimeongji.domain.entity.QMember;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Repository;
import org.springframework.util.StringUtils;

import static com.ssafy.aejimeongji.domain.entity.QMember.*;

@Slf4j
@Repository
@RequiredArgsConstructor
public class MemberRepositoryCustomImpl implements MemberRepositoryCustom {

    private final JPAQueryFactory queryFactory;

    @Override
    public boolean duplicatedCheck(DuplicatedCheckCondition condition) {
        Long count = queryFactory
                .select(member.count())
                .from(member)
                .where(getEqualEmail(member, condition.getEmail()), getEqualNickname(member, condition.getNickname()))
                .fetchOne();
        return count.equals(1L) ? true : false;
    }

    private BooleanExpression getEqualNickname(QMember member, String nickname) {
        return StringUtils.hasText(nickname) ? member.nickname.eq(nickname) : null;
    }

    private BooleanExpression getEqualEmail(QMember member, String email) {
        return StringUtils.hasText(email) ? member.email.eq(email) : null;
    }
}
