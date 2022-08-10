package com.ssafy.aejimeongji.api;

import com.ssafy.aejimeongji.api.dto.ResponseDTO;
import com.ssafy.aejimeongji.api.dto.guidebook.GuideBookRequest;
import com.ssafy.aejimeongji.domain.service.GuideBookService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@Slf4j
@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
public class AdminApiController {

    private final GuideBookService guideBookService;

    @PostMapping(value = "/guide")
    public ResponseEntity<ResponseDTO> saveGuideBook(@ModelAttribute GuideBookRequest request) throws IOException {
        log.info("가이드북 등록 요청");
        guideBookService.saveGuideBook(request.convertGuideBook(), request.getThumbnail());
        return ResponseEntity.ok(new ResponseDTO("가이드 등록이 완료되었습니다."));
    }

    @PutMapping("/guide/{guideId}")
    public ResponseEntity<ResponseDTO> updateGuideBook(@PathVariable Long guideId, @ModelAttribute GuideBookRequest request) throws IOException {
        log.info("가이드북 {} 수정 요청", guideId);
        Long updatedId = guideBookService.updateGuideBook(guideId, request.convertGuideBook(), request.getThumbnail());
        return ResponseEntity.ok(new ResponseDTO(guideId + "번 가이드 수정이 완료되었습니다."));
    }

    @DeleteMapping("/guide/{guideId}")
    public ResponseEntity<ResponseDTO> deleteGuideBook(@PathVariable Long guideId) {
        log.info("가이드북 {} 삭제 요청", guideId);
        guideBookService.deleteGuideBook(guideId);
        return ResponseEntity.ok().body(new ResponseDTO(guideId + "번 가이드북 삭제가 완료되었습니다."));
    }
}
