package com.ssafy.aejimeongji.domain.repository;

import com.ssafy.aejimeongji.domain.entity.Bookmark;
import com.ssafy.aejimeongji.domain.entity.PetPlace;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface BookmarkRepository extends JpaRepository<Bookmark, Long> {

    @Query("select bm from Bookmark bm " +
            "join fetch bm.petPlace p join bm.member m " +
            "where m.id = :memberId and bm.id < :curLastIdx " +
            "order by bm.id desc")
    Slice<Bookmark> findPetPlaceByMemberId(@Param("memberId") Long memberId, @Param("curLastIdx") Long curLastIdx, Pageable request);

    Optional<Bookmark> findBookmarkByMemberIdAndPetPlaceId(Long memberId, Long petplaceId);
}
