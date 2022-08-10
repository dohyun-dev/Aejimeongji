package com.ssafy.aejimeongji.api;

import com.ssafy.aejimeongji.api.dto.ResponseDTO;
import com.ssafy.aejimeongji.api.dto.petPlace.PetPlaceResponse;
import com.ssafy.aejimeongji.domain.entity.Bookmark;
import com.ssafy.aejimeongji.domain.entity.PetPlace;
import com.ssafy.aejimeongji.domain.service.PetPlaceService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.locationtech.jts.geom.Point;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@RestController
@RequestMapping("/api/petplace")
@RequiredArgsConstructor
public class PetPlaceApiController {

    private final PetPlaceService petPlaceService;

    @GetMapping("/category/{category}")
    public ResponseEntity<?> getNearPetPlaceList(@PathVariable String category,
                                                 @RequestParam(value = "lat", defaultValue = "") String lat,
                                                 @RequestParam(value = "lng", defaultValue = "") String lng,
                                                 @RequestParam(value = "dist", defaultValue = "") String dist,
                                                 @RequestParam(value = "count", defaultValue = "10") int conut) {

        log.info("반경 {}km 안의 펫플레이스 리스트", dist);

        if (lat.isEmpty() || lng.isEmpty() || dist.isEmpty()) {
            List<PetPlace> list = petPlaceService.findPetPlaceList();
            Collections.shuffle(list);
            List<PetPlaceResponse> result = list.stream()
                    .filter(o -> o.getCategory().equals(category))
                    .map(o -> new PetPlaceResponse(o))
                    .limit(conut)
                    .collect(Collectors.toList());

            return ResponseEntity.ok().body(result);

        } else {
            List<PetPlace> list = petPlaceService.getNearPetPlaceList(Double.parseDouble(lat), Double.parseDouble(lng), Double.parseDouble(dist));
            List<PetPlaceResponse> result = list.stream()
                    .filter(o -> o.getCategory().equals(category))
                    .map(o -> new PetPlaceResponse(o, Double.parseDouble(lat), Double.parseDouble(lng), o.getPoint().getX(), o.getPoint().getY()))
                    .sorted(Comparator.comparing(PetPlaceResponse::getDistance))
                    .limit(conut)
                    .collect(Collectors.toList());

            return ResponseEntity.ok().body(result);
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
                .map(o -> new PetPlaceResponse(petPlaceService.findPetPlace(o.getId())))
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
