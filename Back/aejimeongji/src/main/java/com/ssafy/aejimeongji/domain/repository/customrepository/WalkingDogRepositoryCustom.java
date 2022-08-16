package com.ssafy.aejimeongji.domain.repository.customrepository;

import com.ssafy.aejimeongji.domain.entity.WalkingDog;

import java.time.LocalDateTime;
import java.util.List;

public interface WalkingDogRepositoryCustom {
    List<WalkingDog> getcurWeekWalkingInfo(Long dogId, LocalDateTime curMonday);
}
