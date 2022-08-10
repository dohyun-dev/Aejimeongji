package com.ssafy.aejimeongji.domain.repository.customrepository;

import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.JPQLQuery;
import com.querydsl.jpa.JPQLQueryFactory;
import com.ssafy.aejimeongji.domain.condition.CalendarSearchCondition;
import com.ssafy.aejimeongji.domain.entity.Calendar;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import java.time.LocalDate;
import java.util.List;

import static com.ssafy.aejimeongji.domain.entity.QCalendar.calendar;

@Slf4j
@RequiredArgsConstructor
public class CalendarRepositoryCustomImpl implements CalendarRepositoryCustom {

    private final JPQLQueryFactory queryFactory;

    @Override
    public List<Calendar> getCalendar(CalendarSearchCondition condition) {
        JPQLQuery<Calendar> query = queryFactory
                .selectFrom(calendar)
                .where(getDogEq(condition.getDogId()), getDateEq(condition.getDate()), getIsActive(condition.getIsActive()));
        query = (getIsActive(condition.getIsActive()) != null) ? query.limit(3) : query;
        List<Calendar> fetch = query.fetch();
        return fetch;
    }

    private BooleanExpression getDogEq(Long dogId) {
        return dogId != null ? calendar.dog.id.eq(dogId) : null;
    }

    private BooleanExpression getDateEq(LocalDate date) {
        return date != null ? calendar.date.eq(date) : null;
    }

    private BooleanExpression getIsActive(Boolean isActive) {
        return isActive != null ? calendar.isActive.eq(isActive) : null;
    }
}
