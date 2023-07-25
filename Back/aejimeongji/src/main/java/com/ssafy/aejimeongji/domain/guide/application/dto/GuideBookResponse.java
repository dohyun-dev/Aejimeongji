package com.ssafy.aejimeongji.domain.guide.application.dto;

import com.ssafy.aejimeongji.domain.guide.domain.GuideBook;
import com.ssafy.aejimeongji.domain.guide.domain.Like;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class GuideBookResponse {
    private Long guideId;
    private String title;
    private String content;
    private String category;
    private String thumbnail;

    public GuideBookResponse(GuideBook guideBook) {
        guideId = guideBook.getId();
        title = guideBook.getTitle();
        content = guideBook.getContent();
        category = guideBook.getCategory();
        thumbnail = guideBook.getThumbnail().getStoreFilename();
    }

    public static GuideBookResponse toDTO(GuideBook guideBook) {
        return new GuideBookResponse(guideBook);
    }
    public static GuideBookResponse toDTO(Like like) {
        return new GuideBookResponse(like.getGuideBook());
    }
}
