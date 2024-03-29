package com.ssafy.aejimeongji.domain.dog.application.service;

import com.ssafy.aejimeongji.domain.common.exception.CustomError;
import com.ssafy.aejimeongji.domain.common.exception.CustomException;
import com.ssafy.aejimeongji.domain.dog.domain.Breed;
import com.ssafy.aejimeongji.domain.dog.domain.Dog;
import com.ssafy.aejimeongji.domain.dog.domain.repository.DogRepository;
import com.ssafy.aejimeongji.domain.file.DogImage;
import com.ssafy.aejimeongji.domain.file.application.service.impl.ImageUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

@Slf4j
@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class DogService {

    private final DogRepository dogRepository;
    private final ImageUtil imageUtil;

    // 강아지 프로필 목록 조회
    public List<Dog> findDogList(Long memberId) {
        return dogRepository.findDogsByMemberId(memberId);
    }

    // 강아지 프로필 상세 조회
    public Dog findDog(Long dogId) {
        return dogRepository
                .findById(dogId)
                .orElseThrow(() -> new CustomException(CustomError.DOG_NOT_FOUND));
    }

    // 강아지 프로필 등록
    @Transactional
    public Long saveDog(Dog dog) {
        return dogRepository.save(dog).getId();
    }

    // 강아지 프로필 수정
    @Transactional
    public Long updateDog(Long dogId, String newName, double newWeight, LocalDate newBirthday, LocalDate newAdoptionDay, Breed newBreed) {
        Dog findDog = findDog(dogId);
        findDog.updateDog(newName, newWeight, newBirthday, newAdoptionDay, newBreed);
        return findDog.getId();
    }

    // 강아지 프로필 삭제
    @Transactional
    public void deleteDog(Long dogId) {
        Dog findDog = findDog(dogId);
        dogRepository.delete(findDog);
    }

    public DogImage getDogProfileImage(Long dogId) {
        return findDog(dogId).getImage();
    }

    @Transactional
    public void changeProfileImage(Long dogId, DogImage image) {
        Dog dog = findDog(dogId);
        if (dog.getImage() != null)
           imageUtil.deleteStoreImage(dog.getImage().getStoreFilename());
        dog.changeDogProfileImage(image);
    }

    @Transactional
    public String deleteProfileImage(Long dogId) {
        Dog dog = findDog(dogId);
        String storeFilename = dog.getImage().getStoreFilename();
        dog.changeDogProfileImage(null);
        return storeFilename;
    }
}
