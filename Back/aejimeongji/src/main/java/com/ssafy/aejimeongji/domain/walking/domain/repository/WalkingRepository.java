package com.ssafy.aejimeongji.domain.walking.domain.repository;

import com.ssafy.aejimeongji.domain.walking.domain.Walking;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WalkingRepository extends JpaRepository<Walking, Long> {
}
