//package com.ssafy.aejimeongji.domain.service;
//
//import com.ssafy.aejimeongji.domain.entity.*;
//import com.ssafy.aejimeongji.domain.entity.image.DogImage;
//import com.ssafy.aejimeongji.domain.entity.image.GuideThumbnail;
//import com.ssafy.aejimeongji.domain.entity.image.Image;
//import com.ssafy.aejimeongji.domain.repository.DogRepository;
//import com.ssafy.aejimeongji.domain.repository.GuideBookRepository;
//import org.junit.jupiter.api.Assertions;
//import org.junit.jupiter.api.Test;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.context.SpringBootTest;
//import org.springframework.transaction.annotation.Transactional;
//
//import javax.persistence.EntityManager;
//import javax.persistence.PersistenceContext;
//
//import java.time.LocalDate;
//import java.util.List;
//import java.util.Map;
//
//import static org.assertj.core.api.Assertions.*;
//
//@Transactional
//@SpringBootTest
//class GuideBookServiceTest {
//
//    @Autowired
//    GuideBookRepository guideBookRepository;
//    @Autowired
//    GuideBookService guideBookService;
//    @Autowired
//    DogRepository dogRepository;
//    @PersistenceContext
//    EntityManager em;
//
//    @Test
//    void ageCustomizedGuideBookListTest() {
//        // given
//        Member member = new Member("test@ssafy.com", "1234", "테스트", "01012341234", "test");
//        em.persist(member);
//        Breed breed = new Breed("푸들");
//        em.persist(breed);
//
//        Dog dog1 = Dog.builder()
//                .name("강아지")
//                .weight(1)
//                .birthday(LocalDate.of(1990, 2, 2))
//                .adoptionDay(LocalDate.of(2020, 2, 3))
//                .gender(Gender.MALE)
//                .neutering(true)
//                .gone(false)
//                .member(member)
//                .breed(breed)
//                .image(new DogImage("dsafdasf", "dasfdsafdas"))
//                .build();
//        Long saveId = dogRepository.save(dog1).getId();
//
//        GuideBook guideBook1 = new GuideBook("제목1", "내용1", "건강", 9999, 9999);
//        guideBookRepository.save(guideBook1);
//        GuideBook guideBook2 = new GuideBook("제목2", "내용2", "음식", 9999, 9999);
//        guideBookRepository.save(guideBook2);
//
//        // when
//        Map<String, List<GuideBook>> result = guideBookService.customizedGuideBookList(saveId);
//
//        // then
//        System.out.println("fixedGuideList.size = " + result.get("fixedGuideList").size());
//        System.out.println("ageGuideList.size = " + result.get("ageGuideList").size());
//        System.out.println("weightGuideList.size = " + result.get("weightGuideList").size());
////        assertThat(result.get("fixedGuideList").size()).isEqualTo(2);
////        System.out.println("ageGuideList");
////        assertThat(result.get("ageGuideList").size()).isEqualTo(0);
////        System.out.println("weightGuideList");
////        assertThat(result.get("weightGuideList").size()).isEqualTo(0);
////        result.put("ageGuideList", ageGuideBookList);
////        result.put("weightGuideList", weightGuideBookList);
//    }
//
//    @Test
//    void findGuideBookTest() {
//        // given
//        GuideBook guideBook = new GuideBook("제목1", "내용1", "의료", 10, 1);
//        Long id = guideBookRepository.save(guideBook).getId();
//
//        // when
//        GuideBook findGuideBook = guideBookService.findGuideBook(id);
//
//        // then
//        assertThat(findGuideBook).isEqualTo(guideBook);
//    }
//
//    @Test
//    void saveGuideBookTest() {
//        // given
//        GuideBook guideBook = new GuideBook("제목1", "내용1", "의료", 10, 1);
//        em.persist(guideBook);
//
//        // when
//        Long savedGuideBookId = guideBookService.saveGuideBook(guideBook);
//        GuideBook savedGuideBook = guideBookService.findGuideBook(savedGuideBookId);
//
//        // then
//        assertThat(savedGuideBook.getTitle()).isEqualTo("제목1");
//        assertThat(savedGuideBook.getContent()).isEqualTo("내용1");
//        assertThat(savedGuideBook.getCategory()).isEqualTo("의료");
//        assertThat(savedGuideBook.getDogAge()).isEqualTo(10);
//        assertThat(savedGuideBook.getDogWeight()).isEqualTo(1);
//    }
//
//    @Test
//    void updateGuideBookTest() {
//        // given
//        GuideBook guideBook = new GuideBook("제목", "내용", "의료", 10, 1);
//        em.persist(guideBook);
//        Long savedGuideBookId = guideBookService.saveGuideBook(guideBook);
//
//        // when
//        guideBookService.updateGuideBook(savedGuideBookId, "new제목", "new내용",
//                "미용", 1, 2, new GuideThumbnail(new Image("dasfsda", "dsafdas")));
//
//        // then
//        assertThat(guideBook.getTitle()).isEqualTo("new제목");
//        assertThat(guideBook.getContent()).isEqualTo("new내용");
//        assertThat(guideBook.getCategory()).isEqualTo("미용");
//        assertThat(guideBook.getDogAge()).isEqualTo(1);
//        assertThat(guideBook.getDogWeight()).isEqualTo(2);
//    }
//
//    @Test
//    void deleteGuideBook() {
//        // given
//        GuideBook guideBook = new GuideBook("제목", "내용", "의료", 10, 1, new GuideThumbnail(new Image("dsafdasf", "dsafasd")));
//        em.persist(guideBook);
//        Long savedGuideBookId = guideBookService.saveGuideBook(guideBook);
//
//        // when
//        guideBookService.deleteGuideBook(savedGuideBookId);
//
//        // then
//        Assertions.assertThrows(IllegalArgumentException.class, () -> guideBookService.findGuideBook(savedGuideBookId));
//    }
//}