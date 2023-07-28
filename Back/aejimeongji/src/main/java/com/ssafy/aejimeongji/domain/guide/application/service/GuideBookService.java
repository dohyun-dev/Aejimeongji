package com.ssafy.aejimeongji.domain.guide.application.service;

import com.ssafy.aejimeongji.domain.common.exception.CustomError;
import com.ssafy.aejimeongji.domain.common.exception.CustomException;
import com.ssafy.aejimeongji.domain.dog.domain.Dog;
import com.ssafy.aejimeongji.domain.dog.domain.repository.DogRepository;
import com.ssafy.aejimeongji.domain.file.GuideThumbnail;
import com.ssafy.aejimeongji.domain.file.application.service.impl.ImageUtil;
import com.ssafy.aejimeongji.domain.guide.domain.Category;
import com.ssafy.aejimeongji.domain.guide.domain.GuideBook;
import com.ssafy.aejimeongji.domain.guide.domain.Like;
import com.ssafy.aejimeongji.domain.guide.domain.repository.CategoryRepository;
import com.ssafy.aejimeongji.domain.guide.domain.repository.GuideBookRepository;
import com.ssafy.aejimeongji.domain.guide.domain.repository.LikeRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Slice;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDate;
import java.time.Period;
import java.util.*;

@Slf4j
@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class GuideBookService {

    private final GuideBookRepository guideBookRepository;
    private final LikeRepository likeRepository;
    private final DogRepository dogRepository;
    private final CategoryRepository categoryRepository;
    private final ImageUtil imageUtil;

    // 맞춤 가이드 조회
    public Map<String, List<GuideBook>> customizedGuideBookList(Long dogId) {
        Dog dog = dogRepository
                .findById(dogId)
                .orElseThrow(() -> new CustomException(CustomError.GUIDE_NOT_FOUND));

        List<GuideBook> fixedGuideBookList = randomFixedGuide(fixedGuideBookList());
        List<GuideBook> ageGuideBookList = randomAgeGuide(ageCustomizedGuideBookList(dog));
        List<GuideBook> weightGuideBookList = randomWeightGuide(weightCustomizedGuideBookList(dog), ageGuideBookList);

        Map<String, List<GuideBook>> result = new HashMap<>();
        result.put("fixedGuideList", fixedGuideBookList);
        result.put("ageGuideList", ageGuideBookList);
        result.put("weightGuideList", weightGuideBookList);
        return result;
    }

    private List<GuideBook> randomFixedGuide(List<GuideBook> fixedTemp) {
        Collections.shuffle(fixedTemp);
        return fixedTemp.size() >= 5 ? fixedTemp.subList(0, 5) : fixedTemp;
    }

    private List<GuideBook> randomAgeGuide(List<GuideBook> ageTemp) {
        Collections.shuffle(ageTemp);
        return ageTemp.size() >= 5 ? ageTemp.subList(0, 5) : ageTemp;
    }

    private List<GuideBook> randomWeightGuide(List<GuideBook> weightTemp, List<GuideBook> ageGuideBookList) {
        Collections.shuffle(weightTemp);
        if (weightTemp.size() < 5)
            return weightTemp;
        List<GuideBook> weightGuideBookList = new ArrayList<>();
        for (GuideBook guide : weightTemp) {
            if (!ageGuideBookList.contains(guide))
                weightGuideBookList.add(guide);
            if (weightGuideBookList.size() == 5)
                break;
        }
        return weightGuideBookList;
    }

    // 카테고리별 가이드 목록 조회
    public Slice<GuideBook> categorizedGuideBookList(String category, Long curLastIdx, Integer limit) {
        return guideBookRepository.findByCategory(category, curLastIdx, PageRequest.of(0, limit));
    }

    // 멤버별 좋아요 가이드 목록 조회
    public Slice<Like> likedGuideBookList(Long memberId, Long curLastIdx, Integer limit) {
        return likeRepository.findLikeGuideBook(memberId, curLastIdx, PageRequest.of(0, limit));
    }

    // 가이드 상세 조회
    public GuideBook findGuideBook(Long guideBookId) {
        return guideBookRepository
                .findById(guideBookId)
                .orElseThrow(() -> new CustomException(CustomError.GUIDE_NOT_FOUND));
    }

    // 강아지 홈 고정 가이드 목록 조회
    private List<GuideBook> fixedGuideBookList() {
        return guideBookRepository.findCustomizedGuideBookList(null, null);
    }

    // 강아지 홈 연령별 가이드 목록 조회
    private List<GuideBook> ageCustomizedGuideBookList(Dog dog) {
        int targetMonth = calculateNumberOfMonths(dog.getBirthday());
        return guideBookRepository.findCustomizedGuideBookList(targetMonth, null);
    }

    // 강아지 홈 무게별 가이드 목록 조회
    private List<GuideBook> weightCustomizedGuideBookList(Dog dog) {
        return guideBookRepository.findCustomizedGuideBookList(null, dog.getWeight());
    }

    // 카테고리 목록 조회
    public List<Category> getCategories() {
        return categoryRepository.findAll();
    }

    // 가이드 생성
    @Transactional
    public Long saveGuideBook(GuideBook guideBook, MultipartFile thumbnail) throws IOException {
        guideBook.saveGuideThumbnail(new GuideThumbnail(imageUtil.storeImage(thumbnail)));
        return guideBookRepository.save(guideBook).getId();
    }

    // 가이드 수정
    @Transactional
    public Long updateGuideBook(Long guideId, GuideBook updateParam, MultipartFile thumbnail) throws IOException {
        GuideBook findGuide = findGuideBook(guideId);
        if (!thumbnail.isEmpty()) {
            imageUtil.deleteStoreImage(findGuide.getThumbnail().getStoreFilename());
            findGuide.updateGuideBook(updateParam, new GuideThumbnail(imageUtil.storeImage(thumbnail)));
        }
        return findGuide.getId();
    }

    // 가이드 삭제
    @Transactional
    public void deleteGuideBook(Long guideId) {
        GuideBook findGuide = findGuideBook(guideId);
        imageUtil.deleteStoreImage(findGuide.getThumbnail().getStoreFilename());
        guideBookRepository.delete(findGuide);
    }

    private int calculateNumberOfMonths(LocalDate birthday) {
        Period period = Period.between(birthday, LocalDate.now());
        return period.getYears() * 12 + period.getMonths();
    }
}
