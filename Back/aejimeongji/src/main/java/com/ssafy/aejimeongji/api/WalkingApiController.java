package com.ssafy.aejimeongji.api;

import com.ssafy.aejimeongji.api.dto.ResponseDTO;
import com.ssafy.aejimeongji.api.dto.ScrollResponse;
import com.ssafy.aejimeongji.api.dto.walking.*;
import com.ssafy.aejimeongji.domain.condition.WalkingDogCondition;
import com.ssafy.aejimeongji.domain.condition.WalkingSearchCondition;
import com.ssafy.aejimeongji.domain.entity.Walking;
import com.ssafy.aejimeongji.domain.entity.WalkingDog;
import com.ssafy.aejimeongji.domain.exception.MethodArgumentNotValidException;
import com.ssafy.aejimeongji.domain.repository.WalkingDogRepository;
import com.ssafy.aejimeongji.domain.repository.customrepository.WalkingDogRepositoryCustomImpl;
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
    private final WalkingDogRepositoryCustomImpl walkingDogRepository;

    @GetMapping("/dog/{dogId}/walkingdog")
    public ResponseEntity<ScrollResponse<?>> getWalkingData(@PathVariable Long dogId, @ModelAttribute WalkingDogCondition condition) {
        log.debug("condition {}", condition);
        ScrollResponse<WalkingDog> walkingDogList = walkingDogService.getWalkingDogList(dogId, condition);
        List<WalkingResponse> data = walkingDogList.getData().stream().map(WalkingResponse::new).collect(Collectors.toList());
        return ResponseEntity.ok().body(new ScrollResponse<>(data, walkingDogList.getHasNext(), walkingDogList.getCurLastIdx(), walkingDogList.getLimit()));
    }

    @GetMapping("/dog/{dogId}/walkingdog/{walkingDogId}")
    public ResponseEntity<WalkingDto> getWalkingDetail(@PathVariable Long walkingDogId) {
        return ResponseEntity.ok().body(new WalkingDto(walkingDogService.walkingDogDetail(walkingDogId)));
    }

    @GetMapping("/walking")
    public ResponseEntity<?> getWalkingDate(@ModelAttribute WalkingSearchCondition condition) {
        if (condition.getLastweek() != null && condition.getLastweek().equals(true)) {
            return ResponseEntity.ok().body(walkingDogRepository.getLastWeekWalkingDistance(condition.getDog()));
        } else {
            return ResponseEntity.ok().body(walkingDogRepository.getCurWeekWalkingInfo(condition.getDog()));
        }
    }

    @PostMapping("/walking")
    public ResponseEntity<CreateWalkingResponse> createWalking(@Valid @RequestBody CreateWalkingRequest request, BindingResult bindingResult) {
        validateRequest(bindingResult);
        Walking walking = new Walking(request.getWalkingDistance(), request.getWalkingTime(), request.getWalkingDate());
        Long walkingId = walkingDogService.saveWalking(walking);
        return ResponseEntity.ok().body(new CreateWalkingResponse(walkingId, "?????? ????????? ?????????????????????."));
    }

    @PostMapping("/walkingdog")
    public ResponseEntity<ResponseDTO> mappingWalkingDog(@RequestBody MappingWalkingDogRequest request) {
        walkingDogService.saveWalkingDog(request.getDogId(), request.getWalkingId(), request.getCalories());
        return ResponseEntity.ok().body(new ResponseDTO("?????? ????????? ?????????????????????."));
    }

    @DeleteMapping("/walkingdog/{walkingDogId}")
    public ResponseEntity<ResponseDTO> deleteWalkingDog(@PathVariable Long walkingDogId) {
        walkingDogService.deleteWalkingDog(walkingDogId);
        return ResponseEntity.ok().body(new ResponseDTO("?????? ????????? ?????????????????????."));
    }

    private void validateRequest(BindingResult bindingResult) {
        if (bindingResult.hasErrors())
            throw new MethodArgumentNotValidException(bindingResult);
    }
}
