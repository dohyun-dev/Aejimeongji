package com.ssafy.aejimeongji.domain.repository.customrepository;

import com.ssafy.aejimeongji.domain.entity.GuideBook;

import java.util.List;

public interface GuideBookRepositoryCustom {
    List<GuideBook> findCustomizedGuideBookList(Integer targetAge, Double targetWeight);
}
