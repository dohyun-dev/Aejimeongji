package com.ssafy.aejimeongji.api.dto.review;

import com.ssafy.aejimeongji.domain.entity.Review;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDate;
import java.util.List;

@Data
@AllArgsConstructor
public class ReviewResponse {

    private Long reviewId;
    private String reviewer;
    private String content;
    private LocalDate date;
    private List<String> hashTags;

    public ReviewResponse(Review review) {
        reviewId = review.getId();
        reviewer = review.getReviewer();
        content = review.getContent().replace('\"', ' ').replace('\n', ' ');
        date = review.getDate();
        hashTags = List.of(review.getHashTags().split(","));
    }

    public static ReviewResponse toDTO(Review review) {
        return new ReviewResponse(review);
    }

}
