package com.ssafy.aejimeongji.domain.dog.domain.repository;

import com.ssafy.aejimeongji.domain.dog.domain.Dog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface DogRepository extends JpaRepository<Dog, Long> {

    @Query("select d from Dog d join fetch d.member m join fetch d.breed b join fetch d.image i where m.id = :memberId")
    List<Dog> findDogsByMemberId(@Param("memberId") Long memberId);

    @Override
    @Query("select d from Dog d join fetch d.breed b join fetch d.image i where d.id = :dogId")
    Optional<Dog> findById(@Param("dogId") Long dogId);
}
