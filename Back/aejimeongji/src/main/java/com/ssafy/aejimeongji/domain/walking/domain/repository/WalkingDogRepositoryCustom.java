package com.ssafy.aejimeongji.domain.walking.domain.repository;

import com.ssafy.aejimeongji.domain.walking.application.dto.WalkingDistanceResponse;
import com.ssafy.aejimeongji.domain.walking.application.dto.WalkingInfoReponse;

public interface WalkingDogRepositoryCustom {
    WalkingInfoReponse getCurWeekWalkingInfo(Long dogId);
    WalkingDistanceResponse getLastWeekWalkingDistance(Long dogId);
}
