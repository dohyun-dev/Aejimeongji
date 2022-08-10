package com.ssafy.aejimeongji.api;

import com.ssafy.aejimeongji.api.dto.guidebook.GuideBookResponse;
import com.ssafy.aejimeongji.domain.entity.Category;
import com.ssafy.aejimeongji.domain.entity.GuideBook;
import com.ssafy.aejimeongji.domain.service.GuideBookService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Slf4j
@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class GuideBookApiController {

    private final GuideBookService guideBookService;

    @GetMapping(value = "/guide", params = {"dog"})
    public ResponseEntity<Map<String, List<GuideBookResponse>>> getCustomizedGuideBookList(@RequestParam(value = "dog") Long dogId) {
        log.info("강아지 {} 맞춤 가이드 목록 요청", dogId);
        Map<String, List<GuideBook>> guideBookMap = guideBookService.customizedGuideBookList(dogId);
        return ResponseEntity.ok().body(getCustomizedGuideResult(guideBookMap));
    }

    @GetMapping(value = "/guide", params = "category")
    public ResponseEntity<List<GuideBookResponse>> getCategorizedGuideBookList(@RequestParam("category") String categoryName) {
        log.info("'{}' 카테고리 가이드 목록 요청", categoryName);
        List<GuideBookResponse> guideBookResponseList = guideBookService.categorizedGuideBookList(categoryName).stream().map(GuideBookResponse::toDTO).collect(Collectors.toList());
        return ResponseEntity.ok().body(guideBookResponseList);
    }

    @GetMapping(value = "/guide", params = "member")
    public ResponseEntity<List<GuideBookResponse>> getLikedGuideBookList(@RequestParam("member") Long memberId) {
        log.info("사용자 {} 좋아요 가이드 목록 요청", memberId);
        List<GuideBookResponse> guideBookResponseList = guideBookService.likedGuideBookList(memberId).stream().map(GuideBookResponse::toDTO).collect(Collectors.toList());
        return ResponseEntity.ok().body(guideBookResponseList);
    }

    @GetMapping("/guide/{guideId}")
    public ResponseEntity<GuideBookResponse> getGuideBook(@PathVariable Long guideId) {
        log.info("가이드북 {}번 상세 정보 요청", guideId);
        GuideBook guideBook = guideBookService.findGuideBook(guideId);
        return ResponseEntity.ok().body(new GuideBookResponse(guideBook));
    }

    @GetMapping("/category")
    public ResponseEntity<List<String>> getCategories() {
        List<String> result = guideBookService.getCategories().stream().map(Category::getName).collect(Collectors.toList());
        return ResponseEntity.ok().body(result);
    }

    private Map<String, List<GuideBookResponse>> getCustomizedGuideResult(Map<String, List<GuideBook>> guideBookMap) {
        Map<String, List<GuideBookResponse>> result = new HashMap<>();
        result.put("fixedGuideList", guideBookMap.get("fixedGuideList").stream().map(GuideBookResponse::new).collect(Collectors.toList()));
        result.put("ageGuideList", guideBookMap.get("ageGuideList").stream().map(GuideBookResponse::new).collect(Collectors.toList()));
        result.put("weightGuideList", guideBookMap.get("weightGuideList").stream().map(GuideBookResponse::new).collect(Collectors.toList()));
        return result;
    }
}

