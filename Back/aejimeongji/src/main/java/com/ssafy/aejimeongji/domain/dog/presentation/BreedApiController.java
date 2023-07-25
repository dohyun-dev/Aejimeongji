package com.ssafy.aejimeongji.domain.dog.presentation;

import com.ssafy.aejimeongji.domain.dog.application.dto.BreedResponse;
import com.ssafy.aejimeongji.domain.dog.application.service.BreedService;
import com.ssafy.aejimeongji.domain.dog.domain.Breed;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@RestController
@RequestMapping("/api/breed")
@RequiredArgsConstructor
public class BreedApiController {

    private final BreedService breedService;

    @GetMapping
    public ResponseEntity<List<BreedResponse>> getBreedList() {
        log.info("견종 목록 조회 요청");
        List<Breed> breedList = breedService.findBreedList();
        List<BreedResponse> breedResponseList = breedList.stream()
                .map(BreedResponse::toDTO).collect(Collectors.toList());
        return ResponseEntity.ok().body(breedResponseList);
    }
}
