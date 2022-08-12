package com.ssafy.aejimeongji.api;

import com.ssafy.aejimeongji.api.dto.review.ReviewResponse;
import com.ssafy.aejimeongji.domain.entity.Review;
import com.ssafy.aejimeongji.domain.service.ReviewService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@RestController
@RequestMapping("/api/petplace/{petplaceId}/reviews")
@RequiredArgsConstructor
public class ReviewApiController {

    private final ReviewService reviewService;

    @GetMapping
    public ResponseEntity<List<ReviewResponse>> getReviewList(@PathVariable Long petplaceId) {
        log.info("{}번 펫플레이스 리뷰 목록 조회", petplaceId);
        List<Review> reviewList = reviewService.findReviewList(petplaceId);
        List<ReviewResponse> reviewResponsesList = reviewList.stream()
                .map(ReviewResponse::toDTO).collect(Collectors.toList());
        return ResponseEntity.ok().body(reviewResponsesList);
    }

}
