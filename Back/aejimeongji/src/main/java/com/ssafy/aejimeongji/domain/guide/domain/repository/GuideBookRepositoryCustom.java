package com.ssafy.aejimeongji.domain.guide.domain.repository;

import com.ssafy.aejimeongji.domain.guide.domain.GuideBook;

import java.util.List;

public interface GuideBookRepositoryCustom {
    List<GuideBook> findCustomizedGuideBookList(Integer targetAge, Double targetWeight);
}
