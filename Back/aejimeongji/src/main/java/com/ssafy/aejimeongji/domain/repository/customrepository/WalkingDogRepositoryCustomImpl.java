package com.ssafy.aejimeongji.domain.repository.customrepository;

import com.querydsl.jpa.JPQLQueryFactory;
import com.ssafy.aejimeongji.domain.entity.WalkingDog;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

import static com.ssafy.aejimeongji.domain.entity.QDog.dog;
import static com.ssafy.aejimeongji.domain.entity.QWalking.walking;
import static com.ssafy.aejimeongji.domain.entity.QWalkingDog.walkingDog;

@Repository
@RequiredArgsConstructor
public class WalkingDogRepositoryCustomImpl implements WalkingDogRepositoryCustom {

    private final JPQLQueryFactory queryFactory;

    @Override
    public List<WalkingDog> getcurWeekWalkingInfo(Long dogId, LocalDateTime curMonday) {
        return queryFactory
                .selectFrom(walkingDog)
                .join(walkingDog.walking, walking)
                .fetchJoin()
                .join(walkingDog.dog, dog)
                .where(walkingDog.dog.id.eq(dogId), walking.walkingDate.goe(curMonday))
                .fetch();
    }
}
