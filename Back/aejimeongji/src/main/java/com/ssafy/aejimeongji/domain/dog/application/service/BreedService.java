package com.ssafy.aejimeongji.domain.dog.application.service;

import com.ssafy.aejimeongji.domain.dog.domain.Breed;
import com.ssafy.aejimeongji.domain.dog.domain.repository.BreedRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Slf4j
@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class BreedService {

    private final BreedRepository breedRepository;

    // 견종 조회
    public Breed findBreed(String breedName) {
        return breedRepository.findBreedByBreedName(breedName);
    }

    // 견종 목록 조회
    public List<Breed> findBreedList() {
        return breedRepository.findAll();
    }
}
