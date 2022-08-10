package com.ssafy.aejimeongji.api;

import com.ssafy.aejimeongji.api.dto.ResponseDTO;
import com.ssafy.aejimeongji.api.dto.dog.DogProfileResponse;
import com.ssafy.aejimeongji.api.dto.dog.DogSaveRequest;
import com.ssafy.aejimeongji.api.dto.dog.DogUpdateRequest;
import com.ssafy.aejimeongji.domain.entity.Breed;
import com.ssafy.aejimeongji.domain.entity.Dog;
import com.ssafy.aejimeongji.domain.entity.image.DogImage;
import com.ssafy.aejimeongji.domain.entity.Member;
import com.ssafy.aejimeongji.domain.service.BreedService;
import com.ssafy.aejimeongji.domain.service.DogService;
import com.ssafy.aejimeongji.domain.service.MemberService;
import com.ssafy.aejimeongji.domain.util.ImageUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@RestController
@RequestMapping("/api/member/{memberId}/dog")
@RequiredArgsConstructor
public class DogApiController {

    private final DogService dogService;
    private final BreedService breedService;
    private final MemberService memberService;
    private final ImageUtil imageUtil;

    @GetMapping
    public ResponseEntity<List<DogProfileResponse>> getDogList(@PathVariable("memberId") Long memberId) {
        log.info("사용자 {}의 강아지 프로필 목록 조회 요청", memberId);
        List<Dog> dogList = dogService.findDogList(memberId);
        List<DogProfileResponse> dogProfileResponseList = dogList.stream()
                .map(DogProfileResponse::toDTO).collect(Collectors.toList());
        return ResponseEntity.ok().body(dogProfileResponseList);
    }

    @GetMapping("/{dogId}/profile")
    public ResponseEntity<DogProfileResponse> getDog(@PathVariable("memberId") Long memberId, @PathVariable("dogId") Long dogId) {
        log.info("강아지 프로필 {} 상세 정보 요청", dogId);
        Dog dog = dogService.findDog(dogId);
        return ResponseEntity.ok().body(new DogProfileResponse(dog));
    }

    @PostMapping(consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity<ResponseDTO> saveDog(@PathVariable("memberId") Long memberId, @ModelAttribute DogSaveRequest request) throws IOException {
        log.info("강아지 프로필 등록 요청");
        DogImage dogImage = new DogImage(imageUtil.storeImage(request.getImage()));
        Member member = memberService.findMember(memberId);
        Breed breed = breedService.findBreed(request.getBreed());
        Long savedId = dogService.saveDog(request.toEntity(member, breed, dogImage));
        return ResponseEntity.ok(new ResponseDTO("강아지 프로필 " + savedId + " 등록이 완료되었습니다."));
    }

    @PutMapping("/{dogId}")
    public ResponseEntity<ResponseDTO> updateDog(@PathVariable("memberId") Long memberId, @PathVariable("dogId") Long dogId, @RequestBody DogUpdateRequest request) {
        log.info("강아지 프로필 {} 수정 요청", dogId);
        Breed breed = breedService.findBreed(request.getBreed().getBreedName());
        Long updatedId = dogService.updateDog(dogId, request.getName(), request.getWeight(), request.getBirthday(), request.getAdoptionDay(), breed);
        return ResponseEntity.ok(new ResponseDTO("강아지 프로필 "+ updatedId + " 수정이 완료되었습니다."));
    }

    @DeleteMapping("/{dogId}")
    public ResponseEntity<ResponseDTO> deleteDog(@PathVariable("memberId") Long memberId, @PathVariable("dogId") Long dogId) {
        log.info("강아지 프로필 {} 삭제 요청", dogId);
        dogService.deleteDog(dogId);
        return ResponseEntity.ok(new ResponseDTO("강아지 프로필 "+ dogId + " 삭제가 완료되었습니다."));
    }

    @PostMapping("/{dogId}/profileimage")
    public ResponseEntity<ResponseDTO> saveDogProfileImage(@PathVariable("dogId") Long dogId, @RequestPart("image") MultipartFile image) throws IOException {
        log.info("강아지 프로필이미지 등록 요청");
        log.info("{}", image.getOriginalFilename());
        DogImage dogImage = new DogImage(imageUtil.storeImage(image));
        dogService.changeProfileImage(dogId, dogImage);
        return ResponseEntity.ok(new ResponseDTO("강아지 프로필 이미지 등록이 완료되었습니다."));
    }

    @PutMapping("/{dogId}/profileimage")
    public ResponseEntity<ResponseDTO> updateDogProfileImage(@PathVariable("dogId") Long dogId, @RequestPart("image") MultipartFile image) throws IOException {
        log.info("강아지 프로필이미지 수정 요청", dogId);
        DogImage dogImage = new DogImage(imageUtil.storeImage(image));
        dogService.changeProfileImage(dogId, dogImage);
        return ResponseEntity.ok(new ResponseDTO("강아지 프로필 이미지 수정이 완료되었습니다."));
    }

    @DeleteMapping("/{dogId}/profileimage")
    public ResponseEntity<ResponseDTO> deleteDogProfileImage(@PathVariable("dogId") Long dogId) {
        String storeFilename = dogService.deleteProfileImage(dogId);
        imageUtil.deleteStoreImage(storeFilename);
        return ResponseEntity.ok(new ResponseDTO("강아지 프로필 이미지 삭제가 완료되었습니다."));
    }
}
