package com.ssafy.aejimeongji.api.dto.guidebook;

import com.ssafy.aejimeongji.domain.entity.GuideBook;
import com.ssafy.aejimeongji.domain.entity.image.GuideThumbnail;
import com.ssafy.aejimeongji.domain.entity.image.Image;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.PositiveOrZero;
import java.io.IOException;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class GuideBookRequest {

    @NotBlank(message = "제목을 입력해주세요.")
    private String title;
    @NotBlank(message = "내용을 입력해주세요.")
    private String content;
    @NotBlank(message = "카테고리를 입력해주세요.")
    private String category;

    @PositiveOrZero(message = "0이상 값을 입력해주세요.")
    private Integer monthMin = 9999;
    @PositiveOrZero(message = "0이상 값을 입력해주세요.")
    private Integer monthMax = 9999;
    @PositiveOrZero(message = "0이상 값을 입력해주세요.")
    private Integer weightMin = 9999;
    @PositiveOrZero(message = "0이상 값을 입력해주세요.")
    private Integer weightMax = 9999;

    @NotNull(message = "썸네일을 입력해주세요.")
    private MultipartFile thumbnail;

    public GuideBook convertGuideBook() throws IOException {
        return GuideBook.builder()
                .title(title)
                .content(content)
                .category(category)
                .monthMin(monthMin)
                .monthMax(monthMax)
                .weightMin(weightMin)
                .weightMax(weightMax)
                .build();
    }

    public GuideBook toUpdateParam() throws IOException {
        return GuideBook.builder().title(title).content(content).category(category).monthMin(monthMin).monthMax(monthMax).weightMin(weightMin).weightMax(weightMax).build();
    }
}
