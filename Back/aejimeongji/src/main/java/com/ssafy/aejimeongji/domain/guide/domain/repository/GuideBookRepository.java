package com.ssafy.aejimeongji.domain.guide.domain.repository;

import com.ssafy.aejimeongji.domain.guide.domain.GuideBook;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface GuideBookRepository extends JpaRepository<GuideBook, Long>, GuideBookRepositoryCustom {

    @Query(" select g from GuideBook g " +
            " join fetch g.thumbnail t " +
            " where g.category = :category " +
            " and g.id < :curLastIdx " +
            " order by g.id desc ")
    Slice<GuideBook> findByCategory(@Param("category")String category,@Param("curLastIdx") Long curLastIdx, Pageable request);

    @Override
    @Query("select g from GuideBook g join fetch g.thumbnail where g.id = :guideId")
    Optional<GuideBook> findById(@Param("guideId") Long guideId);
}
