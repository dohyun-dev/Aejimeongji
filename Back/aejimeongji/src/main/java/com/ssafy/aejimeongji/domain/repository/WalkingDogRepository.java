package com.ssafy.aejimeongji.domain.repository;

import com.ssafy.aejimeongji.domain.entity.WalkingDog;
import com.ssafy.aejimeongji.domain.repository.customrepository.WalkingDogRepositoryCustom;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface WalkingDogRepository extends JpaRepository<WalkingDog, Long>, WalkingDogRepositoryCustom {
    @Query("select wd from WalkingDog wd " +
            "join fetch wd.dog d join fetch wd.walking w " +
            "where d.id = :dogId and wd.id < :curLastIdx " +
            "order by wd.id desc")
    Slice<WalkingDog> findByDogId(@Param("dogId") Long dogId, @Param("curLastIdx") Long curLastIdx, Pageable request);

    @Query(value = "select * from walkingdog wd " +
            "join dog d on wd.dog_id = d.id " +
            "join walking w on w.id = wd.walking_id " +
            "where d.id = :dogId and DATE(w.walking_date) = :date", nativeQuery = true)
    List<WalkingDog> findWalkings(@Param("dogId") Long dogId, @Param("date") String date);

    @Query("select sum(wd.walking.distance) " +
            "from WalkingDog wd " +
            "join wd.dog d join wd.walking w " +
            "where d.id = :dogId and w.walkingDate >= :lastMonday and w.walkingDate < :curMonday")
    double getLastWeekWalkingDistance(@Param("dogId") Long dogId, @Param("lastMonday") LocalDateTime lastMonday, @Param("curMonday") LocalDateTime curMonday);

    @Query("select wd from WalkingDog wd join fetch wd.walking w where wd.id = :walkingDogId")
    Optional<WalkingDog> findWalkingDogWithWalkingById(@Param("walkingDogId") Long walkingDogId);
}
