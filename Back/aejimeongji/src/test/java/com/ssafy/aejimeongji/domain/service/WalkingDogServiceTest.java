package com.ssafy.aejimeongji.domain.service;

import com.ssafy.aejimeongji.domain.entity.*;
import com.ssafy.aejimeongji.domain.entity.image.DogImage;
import com.ssafy.aejimeongji.domain.repository.WalkingRepository;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Calendar;
import java.util.Date;
import java.util.Locale;

@SpringBootTest
@Transactional
class WalkingDogServiceTest {

    @Autowired
    WalkingDogService walkingDogService;
    @Autowired
    WalkingRepository walkingRepository;
    @PersistenceContext
    EntityManager em;

    @Test
    void saveWalking() {
        Walking walking = new Walking(1000, "10:20:11.1234", LocalDateTime.now());
        Long saveId = walkingDogService.saveWalking(walking);

        Walking findWalking = walkingRepository.findById(saveId).get();

        Assertions.assertThat(saveId).isEqualTo(findWalking.getId());
    }

    @Test
    void saveWalkingDog() {

        // given
        Member member = new Member("ssafy@ssafy.com", "1234", "닉네임", "01012341234", "닉네임");
        em.persist(member);
        DogImage dogImage = new DogImage("originFilename", "storeFilename");
        em.persist(dogImage);
        Breed breed = new Breed("testBreed");
        em.persist(breed);
        Dog dog = new Dog("강아지", 12, LocalDate.now(), Gender.MALE, true, true, LocalDate.now(), member, dogImage, breed);
        em.persist(dog);
        Walking walking = new Walking(1000, "10:20:11.1234", LocalDateTime.now());
        Long saveId = walkingDogService.saveWalking(walking);

        // when
        Long saveWalkingdogId = walkingDogService.saveWalkingDog(dog.getId(), walking.getId(), 12);
        WalkingDog findWalkingDog = walkingDogService.walkingDogDetail(saveWalkingdogId);

        // then
        Assertions.assertThat(findWalkingDog.getDog()).isEqualTo(dog);
        Assertions.assertThat(findWalkingDog.getCalories()).isEqualTo(12);
        Assertions.assertThat(findWalkingDog.getWalking()).isEqualTo(walking);
    }

    @Test
    void getLastweekTotalDistance() {
        java.util.Calendar cal = java.util.Calendar.getInstance(Locale.KOREA);
        cal.setTime(new Date());
        System.out.println("오늘 cal = " + cal.getTime().toInstant().atZone(ZoneId.systemDefault()).toLocalDate());
        cal.set(Calendar.DAY_OF_WEEK, Calendar.MONDAY);
        System.out.println("월요일 cal = " + cal.getTime().toInstant().atZone(ZoneId.systemDefault()).toLocalDate());
        cal.add(Calendar.DATE, -7);
        cal.set(Calendar.DAY_OF_WEEK, Calendar.MONDAY);
        System.out.println("지난주 월요일 cal = " + cal.getTime().toInstant().atZone(ZoneId.systemDefault()).toLocalDate());
    }

//    @Test
//    void getWalkingDogList() {
//        // given
//        Member member = new Member("ssafy@ssafy.com", "1234", "닉네임", "01012341234", "닉네임");
//        em.persist(member);
//        DogImage dogImage = new DogImage("originFilename", "storeFilename");
//        em.persist(dogImage);
//        Breed breed = new Breed("testBreed");
//        em.persist(breed);
//        Dog dog = new Dog("강아지", 12, LocalDate.now(), Gender.MALE, true, true, LocalDate.now(), member, dogImage, breed);
//        em.persist(dog);
//        Walking walking = new Walking(1000, "10:20:11.1234", LocalDateTime.now());
//        Long saveId = walkingDogService.saveWalking(walking);
//        Long saveWalkingdogId = walkingDogService.saveWalkingDog(dog.getId(), walking.getId(), 12);
//
//        // when
//        List<WalkingDog> result = walkingDogService.getWalkingDogList(dog.getId());
//
//        // then
//        Assertions.assertThat(result.size()).isEqualTo(1);
//    }
}