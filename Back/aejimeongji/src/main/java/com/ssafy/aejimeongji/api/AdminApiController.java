package com.ssafy.aejimeongji.api;

import com.ssafy.aejimeongji.api.dto.ResponseDTO;
import com.ssafy.aejimeongji.api.dto.guidebook.GuideBookRequest;
import com.ssafy.aejimeongji.domain.exception.MethodArgumentNotValidException;
import com.ssafy.aejimeongji.domain.service.GuideBookService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.io.IOException;

@Slf4j
@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
public class AdminApiController {

    private final GuideBookService guideBookService;

    @PostMapping("/guide")
    public ResponseEntity<ResponseDTO> saveGuideBook(@Valid @ModelAttribute GuideBookRequest request, BindingResult bindingResult) throws IOException {
        log.info("가이드북 등록 요청");
        validateRequest(request, bindingResult);
        guideBookService.saveGuideBook(request.convertGuideBook(), request.getThumbnail());
        return ResponseEntity.ok(new ResponseDTO("가이드 등록이 완료되었습니다."));
    }

    @PutMapping("/guide/{guideId}")
    public ResponseEntity<ResponseDTO> updateGuideBook(@PathVariable Long guideId, @Valid @ModelAttribute GuideBookRequest request, BindingResult bindingResult) throws IOException {
        log.info("가이드북 {} 수정 요청", guideId);
        validateRequest(request, bindingResult);
        Long updatedId = guideBookService.updateGuideBook(guideId, request.convertGuideBook(), request.getThumbnail());
        return ResponseEntity.ok(new ResponseDTO(guideId + "번 가이드 수정이 완료되었습니다."));
    }

    @DeleteMapping("/guide/{guideId}")
    public ResponseEntity<ResponseDTO> deleteGuideBook(@PathVariable Long guideId) {
        log.info("가이드북 {} 삭제 요청", guideId);
        guideBookService.deleteGuideBook(guideId);
        return ResponseEntity.ok().body(new ResponseDTO(guideId + "번 가이드북 삭제가 완료되었습니다."));
    }

    private void validateRequest(GuideBookRequest request, BindingResult bindingResult) {
        if (bindingResult.hasErrors())
            throw new MethodArgumentNotValidException(bindingResult);

        log.info("{} {}", request.getWeightMin(), request.getWeightMax());
        if (request.getMonthMin() > request.getMonthMax()) {
            bindingResult.reject("weightMin", "최소 개월이 최대 개월보다 클 수 없습니다.");
            bindingResult.reject("weightMax", "최대 개월이 최소 개월보다 작을 수 없습니다.");
            throw new MethodArgumentNotValidException(bindingResult);
        }

        if (request.getMonthMin() > request.getMonthMax()) {
            bindingResult.reject("monthMin", "최소 뭄무게가 최대 몸무게보다 클 수 없습니다.");
            bindingResult.reject("monthMax", "최대 몸무게가 최소 몸무게보다 작을 수 없습니다.");
            throw new MethodArgumentNotValidException(bindingResult);
        }
    }
}
