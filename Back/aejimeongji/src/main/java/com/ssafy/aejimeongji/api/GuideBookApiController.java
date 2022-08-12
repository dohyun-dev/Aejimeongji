package com.ssafy.aejimeongji.api;

import com.ssafy.aejimeongji.api.dto.ScrollResponse;
import com.ssafy.aejimeongji.api.dto.guidebook.GuideBookResponse;
import com.ssafy.aejimeongji.domain.condition.GuideSearchCondition;
import com.ssafy.aejimeongji.domain.entity.Category;
import com.ssafy.aejimeongji.domain.entity.GuideBook;
import com.ssafy.aejimeongji.domain.entity.Like;
import com.ssafy.aejimeongji.domain.service.GuideBookService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Slice;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Slf4j
@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class GuideBookApiController {

    private final GuideBookService guideBookService;

    @GetMapping(value = "/guide")
    public ResponseEntity<?> getCustomizedGuideBookList(@ModelAttribute GuideSearchCondition condition) {
        if (condition.getDog() != null) {
            log.info("강아지 {} 맞춤 가이드 목록 요청", condition);
            return ResponseEntity.ok().body(getCustomizedGuideResult(guideBookService.customizedGuideBookList(condition.getDog())));
        } else if (condition.getCategory() != null) {
            log.info("'{}' 카테고리 가이드 목록 요청", condition);
            Slice<GuideBook> result = guideBookService.categorizedGuideBookList(condition.getCategory(), condition.getCurLastIdx(), condition.getLimit());
            List<GuideBookResponse> data = result.getContent().stream().map(GuideBookResponse::toDTO).collect(Collectors.toList());
            return ResponseEntity.ok().body(new ScrollResponse(data, result.hasNext(), data.get(data.size() - 1).getGuideId(), result.getSize()));
        } else {
            log.info("사용자 {} 좋아요 가이드 목록 요청", condition);
            Slice<Like> result = guideBookService.likedGuideBookList(condition.getMember(), condition.getCurLastIdx(), condition.getLimit());
            List<GuideBookResponse> data = result.getContent().stream().map(GuideBookResponse::toDTO).collect(Collectors.toList());
            return ResponseEntity.ok().body(new ScrollResponse(data, result.hasNext(), data.get(data.size()-1).getGuideId(), result.getSize()));
        }
    }

    @GetMapping("/guide/{guideId}")
    public ResponseEntity<GuideBookResponse> getGuideBook(@PathVariable Long guideId) {
        log.info("가이드북 {}번 상세 정보 요청", guideId);
        GuideBook guideBook = guideBookService.findGuideBook(guideId);
        return ResponseEntity.ok().body(new GuideBookResponse(guideBook));
    }

    @GetMapping("/category")
    public ResponseEntity<List<String>> getCategories() {
        log.info("카테고리 목록 조회 요청");
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