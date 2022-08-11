package com.ssafy.aejimeongji.domain.repository;

import com.ssafy.aejimeongji.domain.entity.PetPlace;
import com.ssafy.aejimeongji.domain.repository.customrepository.PetPlaceRepositoryCustom;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PetPlaceRepostiory extends JpaRepository<PetPlace, Long>, PetPlaceRepositoryCustom {
}
