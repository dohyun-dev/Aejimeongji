package com.ssafy.aejimeongji.domain.petplace.domain.repository;

import com.ssafy.aejimeongji.domain.petplace.application.dto.PetPlaceSearchCondition;
import com.ssafy.aejimeongji.domain.petplace.domain.PetPlace;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Slice;

public interface PetPlaceRepositoryCustom {
    Slice<PetPlace> searchPetPlaceAll(PetPlaceSearchCondition condition, Long curLastIdx, PageRequest request);
}
