package com.ssafy.aejimeongji.domain.service;

import com.ssafy.aejimeongji.domain.entity.Category;
import com.ssafy.aejimeongji.domain.entity.Dog;
import com.ssafy.aejimeongji.domain.entity.GuideBook;
import com.ssafy.aejimeongji.domain.entity.Like;
import com.ssafy.aejimeongji.domain.entity.image.GuideThumbnail;
import com.ssafy.aejimeongji.domain.exception.DogNotFoundException;
import com.ssafy.aejimeongji.domain.exception.GuideNotFoundException;
import com.ssafy.aejimeongji.domain.repository.CategoryRepository;
import com.ssafy.aejimeongji.domain.repository.DogRepository;
import com.ssafy.aejimeongji.domain.repository.GuideBookRepository;
import com.ssafy.aejimeongji.domain.repository.LikeRepository;
import com.ssafy.aejimeongji.domain.util.ImageUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDate;
import java.time.Period;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

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
        Dog dog = dogRepository.findById(dogId).orElseThrow(() -> new DogNotFoundException(dogId.toString()));

        List<GuideBook> fixedGuideBookList = fixedGuideBookList();
        List<GuideBook> ageGuideBookList = ageCustomizedGuideBookList(dog);
        List<GuideBook> weightGuideBookList = weightCustomizedGuideBookList(dog);

        Map<String, List<GuideBook>> result = new HashMap<>();
        result.put("fixedGuideList", fixedGuideBookList);
        result.put("ageGuideList", ageGuideBookList);
        result.put("weightGuideList", weightGuideBookList);
        return result;
    }

    // 카테고리별 가이드 목록 조회
    public List<GuideBook> categorizedGuideBookList(String category) {
        return guideBookRepository.findByCategory(category);
    }

    // 멤버별 좋아요 가이드 목록 조회
    public List<GuideBook> likedGuideBookList(Long memberId) {
        List<Like> likeList = likeRepository.findLikesByMemberId(memberId);
        return likeList.stream().map(Like::getGuideBook).collect(Collectors.toList());
    }

    // 가이드 상세 조회
    public GuideBook findGuideBook(Long guideBookId) {
        return guideBookRepository.findById(guideBookId).orElseThrow(() -> new GuideNotFoundException(guideBookId.toString()));
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
        if (!thumbnail.isEmpty())
            imageUtil.deleteStoreImage(findGuide.getThumbnail().getStoreFilename());
            findGuide.updateGuideBook(updateParam, new GuideThumbnail(imageUtil.storeImage(thumbnail)));
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
