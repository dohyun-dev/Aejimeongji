package com.ssafy.aejimeongji.domain.service;

import com.ssafy.aejimeongji.domain.entity.*;
import com.ssafy.aejimeongji.domain.entity.image.DogImage;
import com.ssafy.aejimeongji.domain.exception.DogNotFoundException;
import com.ssafy.aejimeongji.domain.repository.DogRepository;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.time.LocalDate;
import java.util.List;

import static org.assertj.core.api.Assertions.*;

@Transactional
@SpringBootTest
class DogServiceTest {

    @Autowired
    DogRepository dogRepository;
    @Autowired
    DogService dogService;
    @PersistenceContext
    EntityManager em;

    @Test
    void findDogListTest(){
        // given
        Member member1 = new Member("test1@ssafy.com", "1234", "테스트1", "01012341234", "test1");
        em.persist(member1);
        Member member2 = new Member("test2@ssafy.com", "1234", "테스트2", "01012341234", "test2");
        em.persist(member2);
        Breed breed = new Breed("푸들");
        em.persist(breed);

        for(int i = 1; i <= 2; i++){
            Dog dog = Dog.builder()
                    .name("강아지" + i)
                    .weight(3.1)
                    .birthday(LocalDate.of(2020, 2, 2))
                    .adoptionDay(LocalDate.of(2020, 2, 3))
                    .gender(Gender.MALE)
                    .neutering(true)
                    .gone(false)
                    .member(member1)
                    .breed(breed)
                    .image(new DogImage("dsafdasf", "dasfdsafdas"))
                    .build();
            dogRepository.save(dog);
        }
        Dog dog = Dog.builder()
                .name("강아지3")
                .weight(3.1)
                .birthday(LocalDate.of(2020, 2, 2))
                .adoptionDay(LocalDate.of(2020, 2, 3))
                .gender(Gender.MALE)
                .neutering(true)
                .gone(false)
                .member(member2)
                .breed(breed)
                .image(new DogImage("dsafdasf", "dasfdsafdas"))
                .build();
        dogRepository.save(dog);

        // when
        List<Dog> dogList = dogService.findDogList(member1.getId());

        // then
        assertThat(dogList.size()).isEqualTo(2);
    }

    @Test
    void findDogTest() {
        // given
        Member member = new Member("test@ssafy.com", "1234", "테스트", "01012341234", "test");
        em.persist(member);
        Breed breed = new Breed("푸들");
        em.persist(breed);

        Dog dog = Dog.builder()
                .name("강아지")
                .weight(3.1)
                .birthday(LocalDate.of(2020, 2, 2))
                .adoptionDay(LocalDate.of(2020, 2, 3))
                .gender(Gender.MALE)
                .neutering(true)
                .gone(false)
                .member(member)
                .breed(breed)
                .image(new DogImage("dsafdasf", "dasfdsafdas"))
                .build();
        Long savedDogId = dogRepository.save(dog).getId();

        // when
        Dog findDog = dogService.findDog(savedDogId);

        //then
        assertThat(findDog).isEqualTo(dog);
    }

    @Test
    void saveDogTest() {
        // given
        Member member = new Member("test@ssafy.com", "1234", "테스트", "01012341234", "test");
        em.persist(member);
        Breed breed = new Breed("푸들");
        em.persist(breed);

        Dog dog = Dog.builder()
                .name("강아지")
                .weight(3.1)
                .birthday(LocalDate.of(2020, 2, 2))
                .adoptionDay(LocalDate.of(2020, 2, 3))
                .gender(Gender.MALE)
                .neutering(true)
                .gone(false)
                .member(member)
                .breed(breed)
                .image(new DogImage("dsafdasf", "dasfdsafdas"))
                .build();

        // when
        Dog savedDog = dogService.findDog(dogRepository.save(dog).getId());

        // then
        assertThat(savedDog.getName()).isEqualTo("강아지");
        assertThat(dog.getWeight()).isEqualTo(3.1);
        assertThat(savedDog.getBirthday()).isEqualTo(LocalDate.of(2020, 2, 2));
        assertThat(savedDog.getAdoptionDay()).isEqualTo(LocalDate.of(2020, 2, 3));
        assertThat(savedDog.getGender()).isEqualTo(Gender.MALE);
        assertThat(savedDog.getNeutering()).isEqualTo(true);
        assertThat(savedDog.getGone()).isEqualTo(false);
        assertThat(savedDog.getMember().getUsername()).isEqualTo("테스트");
        assertThat(savedDog.getBreed().getBreedName()).isEqualTo("푸들");
    }

    @Test
    void updateDogTest() {
        // given
        Member member = new Member("test@ssafy.com", "1234", "테스트", "01012341234", "test");
        em.persist(member);
        Breed breed = new Breed("푸들");
        em.persist(breed);

        Dog dog = Dog.builder()
                .name("강아지")
                .weight(3.1)
                .birthday(LocalDate.of(2020, 2, 2))
                .adoptionDay(LocalDate.of(2020, 2, 3))
                .gender(Gender.MALE)
                .neutering(true)
                .gone(false)
                .member(member)
                .breed(breed)
                .image(new DogImage("dsafdasf", "dasfdsafdas"))
                .build();
        Long savedId = dogRepository.save(dog).getId();

        // when
        Breed newBreed = new Breed("포메라니안");
        em.persist(newBreed);

        dogService.updateDog(savedId, "강아지수정", 3.3, LocalDate.of(2020, 2, 2),
                LocalDate.of(2020, 5, 3), newBreed);

        // then
        assertThat(dog.getName()).isEqualTo("강아지수정");
        assertThat(dog.getWeight()).isEqualTo(3.3);
        assertThat(dog.getAdoptionDay()).isEqualTo("2020-05-03");
        assertThat(dog.getBreed().getBreedName()).isEqualTo("포메라니안");
    }

    @Test
    void deleteDog() {
        // given
        Member member = new Member("test@ssafy.com", "1234", "테스트", "01012341234", "test");
        em.persist(member);
        Breed breed = new Breed("푸들");
        em.persist(breed);

        Dog dog = Dog.builder()
                .name("강아지")
                .weight(3.1)
                .birthday(LocalDate.of(2020, 2, 2))
                .adoptionDay(LocalDate.of(2020, 2, 3))
                .gender(Gender.MALE)
                .neutering(true)
                .gone(false)
                .member(member)
                .breed(breed)
                .image(new DogImage("dsafdasf", "dasfdsafdas"))
                .build();
        Long savedId = dogRepository.save(dog).getId();

        // when
        dogService.deleteDog(savedId);

        // then
        Assertions.assertThrows(DogNotFoundException.class, () -> dogService.findDog(savedId));
    }
}