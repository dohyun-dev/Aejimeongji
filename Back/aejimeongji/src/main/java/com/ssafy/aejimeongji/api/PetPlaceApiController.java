package com.ssafy.aejimeongji.api;

import com.ssafy.aejimeongji.api.dto.ResponseDTO;
import com.ssafy.aejimeongji.api.dto.ScrollResponse;
import com.ssafy.aejimeongji.api.dto.petPlace.PetPlaceResponse;
import com.ssafy.aejimeongji.domain.condition.PetPlaceSearchCondition;
import com.ssafy.aejimeongji.domain.entity.Bookmark;
import com.ssafy.aejimeongji.domain.entity.PetPlace;
import com.ssafy.aejimeongji.domain.service.PetPlaceService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@RestController
@RequestMapping("/api/petplace")
@RequiredArgsConstructor
public class PetPlaceApiController {

    private final PetPlaceService petPlaceService;

    @GetMapping
    public ResponseEntity<?> getNearPetPlaceList(@ModelAttribute PetPlaceSearchCondition condition) {
        log.info("반경 {}km 안의 펫플레이스 리스트", condition.getDist());
        if (condition.getLat() != null && condition.getLng() != null && condition.getDist() != null) {
            ScrollResponse<PetPlace> result = petPlaceService.searchPetPlaceAll(condition);
            List<PetPlaceResponse> data = result.getData().stream()
                    .map(p -> new PetPlaceResponse(p, condition.getLat(), condition.getLng()))
                    .sorted(Comparator.comparing(PetPlaceResponse::getDistance))
                    .collect(Collectors.toList());
            return ResponseEntity.ok(new ScrollResponse<>(data, result.getHasNext(), result.getCurLastIdx(), result.getLimit()));
        } else {
            ScrollResponse<PetPlace> result = petPlaceService.searchPetPlaceAll(condition);
            List<PetPlaceResponse> data = result.getData().stream().map(p -> new PetPlaceResponse(p)).collect(Collectors.toList());
            return ResponseEntity.ok(new ScrollResponse<>(data, result.getHasNext(), result.getCurLastIdx(), result.getLimit()));
        }
    }

    @GetMapping("/{petplaceId}")
    public ResponseEntity<PetPlaceResponse> getPetPlace(@PathVariable Long petplaceId) {
        log.info("{}번 펫플레이스 조회", petplaceId);
        PetPlace petPlace = petPlaceService.findPetPlace(petplaceId);
        PetPlaceResponse result = new PetPlaceResponse(petPlace);
        return ResponseEntity.ok().body(result);
    }

    @GetMapping("/member/{memberId}")
    public ResponseEntity<?> getBookMarkedPetPlaceList(@PathVariable Long memberId) {
        log.info("{}번 회원이 북마크한 펫플레이스", memberId);
        List<Bookmark> list = petPlaceService.findAllBookMark(memberId);
        List<PetPlaceResponse> result = list.stream()
                .map(o -> new PetPlaceResponse(petPlaceService.findPetPlace(o.getPetPlace().getId())))
                .collect(Collectors.toList());
        return ResponseEntity.ok().body(result);
    }

    @PostMapping("/{petplaceId}/member/{memberId}/bookmark")
    public ResponseEntity<?> bookMark(@PathVariable Long petplaceId,
                                      @PathVariable Long memberId) {
        log.info("{}번 회원이 {}번 펫플레이스 북마크", memberId, petplaceId);
        petPlaceService.petPlaceBookMark(memberId, petplaceId);
        return ResponseEntity.ok(new ResponseDTO("펫플레이스를 북마크 하였습니다."));
    }

    @DeleteMapping("/{petplaceId}/member/{memberId}/bookmark")
    public ResponseEntity<?> cancelBookMark(@PathVariable Long petplaceId,
                                            @PathVariable Long memberId) {
        log.info("{}번 회원이 {}번 펫플레이스 북마크 해제", memberId, petplaceId);
        petPlaceService.cancelPetPlaceBookMark(memberId, petplaceId);
        return ResponseEntity.ok(new ResponseDTO("북마크를 취소 하였습니다."));
    }
}
