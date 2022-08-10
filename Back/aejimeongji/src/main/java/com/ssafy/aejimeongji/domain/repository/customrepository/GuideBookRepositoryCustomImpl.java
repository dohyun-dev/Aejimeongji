package com.ssafy.aejimeongji.domain.repository.customrepository;

import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.JPQLQueryFactory;
import com.ssafy.aejimeongji.domain.entity.GuideBook;
import lombok.RequiredArgsConstructor;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

import static com.ssafy.aejimeongji.domain.entity.QGuideBook.guideBook;
import static com.ssafy.aejimeongji.domain.entity.image.QGuideThumbnail.*;

@RequiredArgsConstructor
public class GuideBookRepositoryCustomImpl implements GuideBookRepositoryCustom {

    private final JPQLQueryFactory queryFactory;

    @Override
    public List<GuideBook> findCustomizedGuideBookList(Integer targetAge, Double targetWeight) {
        List<GuideBook> result = queryFactory
                .selectFrom(guideBook)
                .leftJoin(guideBook.thumbnail, guideThumbnail)
                .where(getAgeAndWeightEq(targetAge, targetWeight))
                .fetch();
        Collections.shuffle(result);
        return result.stream().limit(5).collect(Collectors.toList());
    }

    private BooleanExpression getMonthBetween(Integer dogAge) {
        return dogAge != null ? guideBook.monthMin.loe(dogAge).and(guideBook.monthMax.goe(dogAge)) : null;
    }

    private BooleanExpression getWeightBetween(Double dogWeight) {
        return dogWeight != null ? guideBook.weightMin.loe(dogWeight).and(guideBook.weightMax.goe(dogWeight)) : null;
    }

    private BooleanExpression getAgeAndWeightEq(Integer dogMonth, Double dogWeight) {
        if (dogMonth != null)
            return getMonthBetween(dogMonth);
        if (dogWeight != null)
            return getWeightBetween(dogWeight);
        return guideBook.weightMin.eq(9999);
    }
}
