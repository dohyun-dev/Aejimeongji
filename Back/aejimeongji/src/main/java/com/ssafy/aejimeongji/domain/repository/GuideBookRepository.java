package com.ssafy.aejimeongji.domain.repository;

import com.ssafy.aejimeongji.domain.entity.GuideBook;
import com.ssafy.aejimeongji.domain.repository.customrepository.GuideBookRepositoryCustom;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface GuideBookRepository extends JpaRepository<GuideBook, Long>, GuideBookRepositoryCustom {

    @Query("select g from GuideBook g join fetch g.thumbnail t where g.category = :category")
    List<GuideBook> findByCategory(@Param("category") String category);

    @Override
    @Query("select g from GuideBook g join fetch g.thumbnail where g.id = :guideId")
    Optional<GuideBook> findById(@Param("guideId") Long guideId);
}
