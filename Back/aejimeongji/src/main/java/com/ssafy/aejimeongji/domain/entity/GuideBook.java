package com.ssafy.aejimeongji.domain.entity;

import com.ssafy.aejimeongji.domain.entity.image.GuideThumbnail;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.io.IOException;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Table(name = "guidebook")
public class GuideBook extends BaseTimeEntity {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    private String content;

    private String category;

    private int monthMin;

    private int monthMax;

    private int weightMin;

    private int weightMax;

    @OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "thumbnail_id")
    private GuideThumbnail thumbnail;

    @Builder
    public GuideBook(String title, String content, String category, int monthMin, int monthMax, int weightMin, int weightMax) throws IOException {
        this.title = title;
        this.content = content;
        this.category = category;
        this.monthMin = monthMin;
        this.monthMax = monthMax;
        this.weightMin = weightMin;
        this.weightMax = weightMax;
    }

    public void updateGuideBook(GuideBook guideBookUpdateParam, GuideThumbnail thumbnail) throws IOException {
        this.title = guideBookUpdateParam.getTitle();
        this.content = guideBookUpdateParam.getContent();
        this.category = guideBookUpdateParam.getCategory();
        this.monthMin = guideBookUpdateParam.getMonthMin();
        this.monthMax = guideBookUpdateParam.getMonthMax();
        this.weightMin = guideBookUpdateParam.getWeightMin();
        this.weightMax = guideBookUpdateParam.getWeightMax();
        saveGuideThumbnail(thumbnail);
    }

    public void saveGuideThumbnail(GuideThumbnail thumbnail) {
        this.thumbnail = thumbnail;
    }
}
