package com.ssafy.aejimeongji.domain.service;

import com.ssafy.aejimeongji.api.dto.ScrollResponse;
import com.ssafy.aejimeongji.domain.condition.WalkingDogCondition;
import com.ssafy.aejimeongji.domain.entity.Dog;
import com.ssafy.aejimeongji.domain.entity.Walking;
import com.ssafy.aejimeongji.domain.entity.WalkingDog;
import com.ssafy.aejimeongji.domain.exception.DogNotFoundException;
import com.ssafy.aejimeongji.domain.exception.WalkingNotFoundException;
import com.ssafy.aejimeongji.domain.repository.DogRepository;
import com.ssafy.aejimeongji.domain.repository.WalkingDogRepository;
import com.ssafy.aejimeongji.domain.repository.WalkingRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Slice;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class WalkingDogService {

    private final WalkingDogRepository walkingDogRepository;
    private final WalkingRepository walkingRepository;
    private final DogRepository dogRepository;

    @Transactional
    public Long saveWalking(Walking walking) {
        return walkingRepository.save(walking).getId();
    }

    @Transactional
    public Long saveWalkingDog(Long dogId, Long walkingId , double walkingCalories) {

        // 강아지 엔티티 조회
        Dog dog = dogRepository.findById(dogId).orElseThrow(() -> new DogNotFoundException(dogId.toString()));

        // 산책 엔티티 생성 후 영속화
        Walking walking = walkingRepository.findById(walkingId).orElseThrow(() -> new WalkingNotFoundException(walkingId.toString()));

        // 중계 테이블 설정
        return walkingDogRepository.save(new WalkingDog(dog, walking, walkingCalories)).getId();
    }

    public ScrollResponse<WalkingDog> getWalkingDogList(Long dogId, WalkingDogCondition condition) {
        Slice<WalkingDog> result = walkingDogRepository.findByDogId(dogId, condition.getCurLastIdx(), PageRequest.of(0, condition.getLimit()));
        List<WalkingDog> data = result.getContent();
        return new ScrollResponse<WalkingDog>(data, result.hasNext(), data.get(data.size()-1).getId(), condition.getLimit());
    }

    public WalkingDog walkingDogDetail(Long walkingDogId) {
        return walkingDogRepository.findWalkingDogWithWalkingById(walkingDogId)
                .orElseThrow(() -> new IllegalArgumentException("요청하신 정보가 존재하지 않습니다."));
    }

    @Transactional
    public void deleteWalkingDog(Long walkingDogId) {
        WalkingDog walkingDog = walkingDogRepository.findById(walkingDogId)
                .orElseThrow(() -> new IllegalArgumentException("요청하신 정보가 존재하지 않습니다."));
        walkingDogRepository.delete(walkingDog);
    }
}
