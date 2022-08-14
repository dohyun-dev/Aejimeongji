package com.ssafy.aejimeongji.api;

import com.ssafy.aejimeongji.api.dto.ResponseDTO;
import com.ssafy.aejimeongji.api.dto.ScrollResponse;
import com.ssafy.aejimeongji.api.dto.walking.CreateWalkingRequest;
import com.ssafy.aejimeongji.api.dto.walking.CreateWalkingResponse;
import com.ssafy.aejimeongji.api.dto.walking.MappingWalkingDogRequest;
import com.ssafy.aejimeongji.api.dto.walking.WalkingDto;
import com.ssafy.aejimeongji.domain.condition.WalkingDogCondition;
import com.ssafy.aejimeongji.domain.entity.Walking;
import com.ssafy.aejimeongji.domain.entity.WalkingDog;
import com.ssafy.aejimeongji.domain.exception.MethodArgumentNotValidException;
import com.ssafy.aejimeongji.domain.service.WalkingDogService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class WalkingApiController {

    private final WalkingDogService walkingDogService;

    @GetMapping("/dog/{dogId}/walkingdog")
    public ResponseEntity<ScrollResponse<WalkingDto>> getWalkingData(@PathVariable Long dogId, @ModelAttribute WalkingDogCondition condition) {
        log.debug("condition {}", condition);
        ScrollResponse<WalkingDog> walkingDogList = walkingDogService.getWalkingDogList(dogId, condition);
        List<WalkingDto> data = walkingDogList.getData().stream().map(WalkingDto::new).collect(Collectors.toList());
        return ResponseEntity.ok().body(new ScrollResponse<>(data, walkingDogList.getHasNext(), walkingDogList.getCurLastIdx(), walkingDogList.getLimit()));
    }

    @GetMapping("/dog/{dogId}/walkingdog/{walkingDogId}")
    public ResponseEntity<WalkingDto> getWalkingDetail(@PathVariable Long walkingDogId) {
        return ResponseEntity.ok().body(new WalkingDto(walkingDogService.walkingDogDetail(walkingDogId)));
    }

    @PostMapping("/walking")
    public ResponseEntity<CreateWalkingResponse> createWalking(@Valid @RequestBody CreateWalkingRequest request, BindingResult bindingResult) {
        validateRequest(bindingResult);
        Walking walking = new Walking(request.getWalkingDistance(), request.getWalkingTime(), request.getWalkingDate());
        Long walkingId = walkingDogService.saveWalking(walking);
        return ResponseEntity.ok().body(new CreateWalkingResponse(walkingId, "산책 정보가 등록되었습니다."));
    }

    @PostMapping("/walkingdog")
    public ResponseEntity<ResponseDTO> mappingWalkingDog(@RequestBody MappingWalkingDogRequest request) {
        walkingDogService.saveWalkingDog(request.getDogId(), request.getWalkingId(), request.getCalories());
        return ResponseEntity.ok().body(new ResponseDTO("산책 정보가 등록되었습니다."));
    }

    @DeleteMapping("/walkingdog/{walkingDogId}")
    public ResponseEntity<ResponseDTO> deleteWalkingDog(@PathVariable Long walkingDogId) {
        walkingDogService.deleteWalkingDog(walkingDogId);
        return ResponseEntity.ok().body(new ResponseDTO("산책 정보가 삭제되었습니다."));
    }

    private void validateRequest(BindingResult bindingResult) {
        if (bindingResult.hasErrors())
            throw new MethodArgumentNotValidException(bindingResult);
    }
}
