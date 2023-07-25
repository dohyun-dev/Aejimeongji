package com.ssafy.aejimeongji.domain.dog.domain.repository;

import com.ssafy.aejimeongji.domain.dog.domain.Breed;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BreedRepository extends JpaRepository<Breed, Long> {
    Breed findBreedByBreedName(String breedName);
}
