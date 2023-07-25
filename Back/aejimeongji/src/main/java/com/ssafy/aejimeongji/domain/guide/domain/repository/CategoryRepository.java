package com.ssafy.aejimeongji.domain.guide.domain.repository;

import com.ssafy.aejimeongji.domain.guide.domain.Category;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository extends JpaRepository<Category, String> {
}
