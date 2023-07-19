package com.ssafy.aejimeongji.domain.repository.customrepository;

import com.ssafy.aejimeongji.dto.walking.WalkingDistanceResponse;
import com.ssafy.aejimeongji.dto.walking.WalkingInfoReponse;

public interface WalkingDogRepositoryCustom {
    WalkingInfoReponse getCurWeekWalkingInfo(Long dogId);
    WalkingDistanceResponse getLastWeekWalkingDistance(Long dogId);
}
