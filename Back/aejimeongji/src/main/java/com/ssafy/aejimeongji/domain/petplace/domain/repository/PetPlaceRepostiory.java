package com.ssafy.aejimeongji.domain.petplace.domain.repository;

import com.ssafy.aejimeongji.domain.petplace.domain.PetPlace;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface PetPlaceRepostiory extends JpaRepository<PetPlace, Long>, PetPlaceRepositoryCustom {

    @Modifying
    @Query("update PetPlace set bookmarkCount = bookmarkCount + 1 where id = :petplaceId")
    void plusBookMark(@Param("petplaceId") Long petplaceId);

    @Modifying
    @Query("update PetPlace set bookmarkCount = bookmarkCount - 1 where id = :petplaceId")
    void minusBookMark(@Param("petplaceId") Long petplaceId);

    @Query("select p from PetPlace p where p.bookmarkCount >= 5")
    List<PetPlace> popPetPlaceList();
}
