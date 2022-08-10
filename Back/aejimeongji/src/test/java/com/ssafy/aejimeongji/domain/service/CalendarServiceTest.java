package com.ssafy.aejimeongji.domain.service;

import com.ssafy.aejimeongji.domain.condition.CalendarSearchCondition;
import com.ssafy.aejimeongji.domain.entity.*;
import com.ssafy.aejimeongji.domain.entity.image.DogImage;
import com.ssafy.aejimeongji.domain.exception.CalendarNotFoundException;
import com.ssafy.aejimeongji.domain.repository.CalendarRepository;
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

import static org.junit.jupiter.api.Assertions.assertEquals;

@SpringBootTest
@Transactional
class CalendarServiceTest {

    @Autowired
    CalendarRepository calendarRepository;
    @Autowired
    CalendarService calendarService;
    @PersistenceContext
    EntityManager em;
    @Autowired
    DogRepository dogRepository;

    @Test
    void findDogTest() {
        //given
        Member member = new Member("ssafy@naver.com", "닉네임");
        DogImage dogImage = new DogImage("filename1", "storeFilename");
        Breed breed = new Breed("breedTest");

        //when
        Dog dog = new Dog("DogTest", 12.0, LocalDate.now(), Gender.MALE, false, false, LocalDate.now(), member,
                dogImage, breed);

        //then
        assertEquals("DogTest", dog.getName(), "성공");
    }

    @Test
    void findTodoTest() {
        //given
        Member member = new Member("ssafy@naver.com", "닉네임");
        DogImage dogImage = new DogImage("filename1", "storeFilename");
        Breed breed = new Breed("breedTest");
        Dog dog = new Dog("DogTest", 12.0, LocalDate.now(), Gender.MALE, false, false, LocalDate.now(), member, dogImage, breed);
        Calendar calendar = new Calendar(dog, "내용1", LocalDate.now(), false, false);
        em.persist(calendar);

        //when
        Calendar calendarTest = calendarService.findTodo(calendar.getId());

        //then
        assertEquals("내용1", calendarTest.getContent(), "성공");

    }

    @Test
    void findCalendarTest() {
        //given
        Member member = new Member("ssafy@naver.com", "닉네임");
        DogImage dogImage = new DogImage("filename1", "storeFilename");
        Breed breed = new Breed("breedTest");
        em.persist(member);
        em.persist(dogImage);
        em.persist(breed);

        Dog dog1 = new Dog("DogTest1", 12.0, LocalDate.of(2022,8, 9), Gender.MALE, false, false, LocalDate.now(), member,
                dogImage, breed);
        em.persist(dog1);

        Dog dog2 = new Dog("DogTest2", 12.0, LocalDate.of(2022,8, 9), Gender.MALE, false, false, LocalDate.now(), member,
                dogImage, breed);
        em.persist(dog2);

        //when
        Calendar calendar1 = new Calendar(dog1,  "내용1" , LocalDate.of(2022,8, 9), false, false);
        em.persist(calendar1);
        Calendar calendar2 = new Calendar(dog1, "내용2" , LocalDate.of(2022,8, 9), true, false);
        em.persist(calendar2);
        Calendar calendar3 = new Calendar(dog1,  "내용3" , LocalDate.of(2022,8, 7), true, false);
        em.persist(calendar3);

        assertEquals(3, calendarRepository.findAll().size());


        CalendarSearchCondition condition1 = new CalendarSearchCondition();
        condition1.setDogId(dog1.getId());
        List<Calendar> calendars1 = calendarService.findCalendars(condition1);
        assertEquals(3, calendars1.size());


        CalendarSearchCondition condition2 = new CalendarSearchCondition();
        condition2.setDogId(dog1.getId());
        condition2.setDate(LocalDate.of(2022,8, 9));
        List<Calendar> calendars2 = calendarService.findCalendars(condition2);
        assertEquals(2, calendars2.size());

        CalendarSearchCondition condition3 = new CalendarSearchCondition();
        condition3.setDogId(dog1.getId());
        condition3.setDate(LocalDate.of(2022,8, 9));
        condition3.setIsActive(true);
        List<Calendar> calendars3 = calendarService.findCalendars(condition3);

        calendars3.forEach((c) -> System.out.println("c = " + c));
        assertEquals(1, calendars3.size());
    }

    @Test
    void createCalendarTest() {
        //given
        Member member = new Member("ssafy@naver.com", "닉네임");
        DogImage dogImage = new DogImage("filename1", "storeFilename");
        Breed breed = new Breed("breedTest");
        em.persist(member);
        em.persist(dogImage);
        em.persist(breed);

        Dog dog = new Dog("DogTest1", 12.0, LocalDate.now(), Gender.MALE, false, false, LocalDate.now(), member, dogImage, breed);
        em.persist(dog);

        //when
        Calendar calendar = Calendar.builder().content("내용1").date(LocalDate.now()).date(LocalDate.now()).isActive(false).build();
        Long calendarId = calendarService.saveCalender(dog.getId(), calendar);
        //then
        assertEquals(calendar.getId(), calendarId);
    }

    @Test
    void updateCalendarTest() {
        //given
        Member member = new Member("ssafy@naver.com", "닉네임");
        DogImage dogImage = new DogImage("filename1", "storeFilename");
        Breed breed = new Breed("breedTest");
        em.persist(member);
        em.persist(dogImage);
        em.persist(breed);

        Dog dog = new Dog("DogTest1", 12.0, LocalDate.now(), Gender.MALE, false, false, LocalDate.now(), member, dogImage, breed);
        em.persist(dog);

        //when
        Calendar calendar = Calendar.builder().content("내용1").date(LocalDate.now()).date(LocalDate.now()).isActive(false).build();
        Long calendarId = calendarService.saveCalender(dog.getId(), calendar);
        calendarService.updateCalendar(calendarId, Calendar.builder().content("수정내용").date(LocalDate.now()).isAlert(false).isActive(false).build());

        //then
        assertEquals(calendar.getContent(), "수정내용");
    }

    @Test
    void deleteCalendarTest() {
        //given
        Member member = new Member("ssafy@naver.com", "닉네임");
        DogImage dogImage = new DogImage("filename1", "storeFilename");
        Breed breed = new Breed("breedTest");
        em.persist(member);
        em.persist(dogImage);
        em.persist(breed);

        Dog dog = new Dog("DogTest1", 12.0, LocalDate.now(), Gender.MALE, false, false, LocalDate.now(), member, dogImage, breed);
        em.persist(dog);

        //when
        Calendar calendar = Calendar.builder().content("내용1").date(LocalDate.now()).date(LocalDate.now()).isActive(false).build();
        Long calendarId = calendarService.saveCalender(dog.getId(), calendar);
        calendarService.deleteCalendar(calendarId);

        //then
        Assertions.assertThrows(CalendarNotFoundException.class, () -> calendarService.findTodo(calendarId));
    }
}