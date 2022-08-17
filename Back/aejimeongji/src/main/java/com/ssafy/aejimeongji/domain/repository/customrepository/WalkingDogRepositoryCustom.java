package com.ssafy.aejimeongji.domain.repository.customrepository;

import com.ssafy.aejimeongji.api.dto.walking.WalkingDistanceResponse;
import com.ssafy.aejimeongji.api.dto.walking.WalkingInfoReponse;

public interface WalkingDogRepositoryCustom {
    WalkingInfoReponse getCurWeekWalkingInfo(Long dogId);
    WalkingDistanceResponse getLastWeekWalkingDistance(Long dogId);
}
