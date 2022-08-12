package com.ssafy.aejimeongji.domain.service;

import com.ssafy.aejimeongji.domain.entity.Review;
import com.ssafy.aejimeongji.domain.repository.ReviewRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Slf4j
@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class ReviewService {

    private final ReviewRepository reviewRepository;

    // 펫플레이스 리뷰 목록
    public List<Review> findReviewList(Long petplaceId) {
        return reviewRepository.findReviewsByPetPlaceId(petplaceId);
    }
}
