package com.ssafy.aejimeongji.api;

import com.ssafy.aejimeongji.api.dto.ResponseDTO;
import com.ssafy.aejimeongji.domain.entity.GuideBook;
import com.ssafy.aejimeongji.domain.entity.Member;
import com.ssafy.aejimeongji.domain.service.GuideBookService;
import com.ssafy.aejimeongji.domain.service.LikeService;
import com.ssafy.aejimeongji.domain.service.MemberService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping("/api/member/{memberId}")
@RequiredArgsConstructor
public class LikeApiController {

    private final LikeService likeService;

    @GetMapping("/guide/{guideId}/like")
    public ResponseEntity<Boolean> isGuideLiked(@PathVariable Long memberId, @PathVariable Long guideId) {
        log.info("사용자 {}의 가이드 {} 좋아요 여부 확인 요청", memberId, guideId);
        return ResponseEntity.ok().body(likeService.isGuideLiked(memberId, guideId));
    }

    @PostMapping("/guide/{guideId}/like")
    public ResponseEntity<ResponseDTO> likeGuideBook(@PathVariable Long memberId, @PathVariable Long guideId) {
        log.info("사용자 {}의 가이드북 {} 좋아요 요청", memberId, guideId);
        likeService.likeGuideBook(memberId, guideId);
        return ResponseEntity.ok().body(new ResponseDTO("가이드북 " + guideId + " 좋아요 완료되었습니다."));
    }

    @DeleteMapping("/guide/{guideId}/like")
    public ResponseEntity<ResponseDTO> unlikeGuideBook(@PathVariable Long memberId, @PathVariable Long guideId) {
        log.info("사용자 {}의 가이드북 {} 좋아요 취소 요청", memberId, guideId);
        likeService.unlikeGuideBook(memberId, guideId);
        return ResponseEntity.ok().body(new ResponseDTO("가이드북 " + guideId + " 좋아요 취소가 완료되었습니다다."));
    }
}
