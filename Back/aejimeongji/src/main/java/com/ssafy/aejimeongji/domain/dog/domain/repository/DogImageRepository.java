package com.ssafy.aejimeongji.domain.dog.domain.repository;

import com.ssafy.aejimeongji.domain.file.DogImage;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DogImageRepository extends JpaRepository<DogImage, Long> {
}
