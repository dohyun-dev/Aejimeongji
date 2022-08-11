package com.ssafy.aejimeongji.domain.repository.customrepository;

import com.ssafy.aejimeongji.domain.condition.PetPlaceSearchCondition;
import com.ssafy.aejimeongji.domain.entity.PetPlace;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Slice;

public interface PetPlaceRepositoryCustom {
    Slice<PetPlace> searchPetPlaceAll(PetPlaceSearchCondition condition, Long curLastIdx, PageRequest request);
}
