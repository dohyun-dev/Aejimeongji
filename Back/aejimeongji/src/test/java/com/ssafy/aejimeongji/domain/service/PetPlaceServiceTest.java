package com.ssafy.aejimeongji.domain.service;

import com.ssafy.aejimeongji.api.dto.ScrollResponse;
import com.ssafy.aejimeongji.domain.condition.BookMarkListCondition;
import com.ssafy.aejimeongji.domain.condition.PetPlaceSearchCondition;
import com.ssafy.aejimeongji.domain.entity.Bookmark;
import com.ssafy.aejimeongji.domain.entity.Member;
import com.ssafy.aejimeongji.domain.entity.PetPlace;
import com.ssafy.aejimeongji.domain.repository.BookmarkRepository;
import com.ssafy.aejimeongji.domain.repository.PetPlaceRepostiory;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.Slice;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

@Transactional
@SpringBootTest
class PetPlaceServiceTest {

    @Autowired
    private PetPlaceService petPlaceService;

    @Autowired
    private PetPlaceRepostiory petPlaceRepostiory;

    @Autowired
    private BookmarkRepository bookmarkRepository;

    @PersistenceContext
    EntityManager em;

    @Test
    void getNearPetPlaceList() {
        //given
        PetPlaceSearchCondition condition = new PetPlaceSearchCondition("숙소", 37.0, 127.0, 1000.0, Long.MAX_VALUE, 10);

        //when
        ScrollResponse<PetPlace> list = petPlaceService.searchPetPlaceAll(condition);

        //then
//        assertEquals("", list.getData().get(1).getName());
//        test전용 db 추가 필요

    }

    @Test
    void findPetPlaceList() {
        //given
        int len = petPlaceRepostiory.findAll().size();

        //when
        int size = petPlaceService.findPetPlaceList().size();

        //then
        assertEquals(len, size);
    }

    @Test
    void findPetPlace() {
        //given
        PetPlace petPlace = new PetPlace("펫플", "내용", "주소"
                , "전화벊", "카테", null, "d",  "d", 0.0, "d");
        em.persist(petPlace);
        Long petPlaceId = petPlace.getId();

        //when
        PetPlace findPlace = petPlaceService.findPetPlace(petPlaceId);

        //then
        assertEquals(petPlace.getName(), findPlace.getName());

    }

    @Test
    void findAllBookMarkTest() {
        //given
        Member member = new Member("ssafy@ssafy.com", "1234", "닉네임21", "01012341234", "닉12네임");
        em.persist(member);

        PetPlace petPlace1 = new PetPlace("펫플1", "내용", "주소"
                , "전화벊", "카테", null, "d", "d", 0.0, "d");
        em.persist(petPlace1);

        PetPlace petPlace2 = new PetPlace("펫플2", "내용", "주소"
                , "전화벊", "카테", null, "d","d", 0.0, "d");
        em.persist(petPlace2);

        Bookmark bookmark1 = new Bookmark(member, petPlace1);
        em.persist(bookmark1);

        Bookmark bookmark2 = new Bookmark(member, petPlace2);
        em.persist(bookmark2);

        bookmarkRepository.save(bookmark1);
        bookmarkRepository.save(bookmark2);

        BookMarkListCondition condition = new BookMarkListCondition();

        //when
        ScrollResponse<Bookmark> list = petPlaceService.findAllBookMark(member.getId(), condition);

        //then
        assertEquals(petPlace2.getName(), list.getData().get(0).getPetPlace().getName());
    }

    @Test
    void petPlaceBookMarkTest() {
        //given
        Member member = new Member("ssafy@ssafy.com", "1234", "닉네임21", "01012341234", "닉12네임");
        em.persist(member);

        Member member2 = new Member("ssa1fy@ssafy.com", "1234", "닉네임321", "01012344234", "sss");
        em.persist(member2);

        PetPlace petPlace1 = new PetPlace("펫플1", "내용", "주소"
                , "전화벊", "카테", null, "d", "d", 0.0, "d");
        em.persist(petPlace1);

        PetPlace petPlace2 = new PetPlace("펫플2", "내용", "주소"
                , "전화벊", "카테", null, "d", "d", 0.0, "d");
        em.persist(petPlace2);

        //when
        Long id1 = petPlaceService.petPlaceBookMark(member.getId(), petPlace1.getId());
        petPlaceRepostiory.plusBookMark(id1);
        Long id2 = petPlaceService.petPlaceBookMark(member2.getId(), petPlace2.getId());
        Long id3 = petPlaceService.petPlaceBookMark(member.getId(), petPlace2.getId());


        //then
        assertEquals(member, bookmarkRepository.findById(id1).get().getMember());
    }

    @Test
    void canclepetPlaceBookMarkTest() {
        //given
        Member member = new Member("ssafy@ssafy.com", "1234", "닉네임21", "01012341234", "닉12네임");
        em.persist(member);

        Member member2 = new Member("ssa1fy@ssafy.com", "1234", "닉네임321", "01012344234", "sss");
        em.persist(member2);

        PetPlace petPlace1 = new PetPlace("펫플1", "내용", "주소"
                , "전화벊", "카테", null, "d", "d", 0.0, "d");
        em.persist(petPlace1);

        PetPlace petPlace2 = new PetPlace("펫플2", "내용", "주소"
                , "전화벊", "카테", null, "d", "d", 0.0, "d");
        em.persist(petPlace2);

        Bookmark bookmark1 = new Bookmark(member, petPlace1);
        em.persist(bookmark1);

        Bookmark bookmark3 = new Bookmark(member2, petPlace1);
        em.persist(bookmark3);

        Bookmark bookmark2 = new Bookmark(member, petPlace2);
        em.persist(bookmark2);

        bookmarkRepository.save(bookmark1);
        bookmarkRepository.save(bookmark2);

        //when
        petPlaceService.cancelPetPlaceBookMark(member.getId(), petPlace1.getId());

        //then
        Assertions.assertThrows(IllegalArgumentException.class, () -> petPlaceService.cancelPetPlaceBookMark(member.getId(), petPlace1.getId()));
    }

    @Test
    void findPopPetPlaceListTest() {
        //given
        PetPlace petPlace1 = new PetPlace("펫플1", "내용", "주소"
                , "전화벊", "카테", null, "d", "d", 0.0, "d");
        em.persist(petPlace1);

        PetPlace petPlace2 = new PetPlace("펫플2", "내용", "주소"
                , "전화벊", "카테", null, "d", "d", 0.0, "d");
        em.persist(petPlace2);

        PetPlace petPlace3 = new PetPlace("펫플3", "내용", "주소"
                , "전화벊", "카테", null, "d", "d", 0.0, "d");
        em.persist(petPlace3);

        PetPlace petPlace4 = new PetPlace("펫플4", "내용", "주소"
                , "전화벊", "카테", null, "d", "d", 0.0, "d");
        em.persist(petPlace4);

        PetPlace petPlace5 = new PetPlace("펫플5", "내용", "주소"
                , "전화벊", "카테", null, "d", "d", 0.0, "d");
        em.persist(petPlace5);

        Member member = new Member("ssafy@ssafy.com", "1234", "닉네임21", "01012341234", "닉12네임");
        em.persist(member);

        Member member2 = new Member("ssa1fy@ssafy.com", "1234", "닉네임321", "01012344234", "sss");
        em.persist(member2);

        Member member3 = new Member("ss2afy@ssafy.com", "1234", "닉네1임21", "01012341234", "닉12네45임");
        em.persist(member3);

        Member member4 = new Member("ssa31fy@ssafy.com", "1234", "닉네4임321", "01012344234", "sss");
        em.persist(member4);

        Member member5 = new Member("ssaf4y@ssafy.com", "1234", "닉7네임21", "01012341234", "3");
        em.persist(member5);

        //when
        petPlaceService.petPlaceBookMark(member.getId(), petPlace1.getId());
        petPlaceService.petPlaceBookMark(member.getId(), petPlace2.getId());
        petPlaceService.petPlaceBookMark(member.getId(), petPlace3.getId());
        petPlaceService.petPlaceBookMark(member.getId(), petPlace4.getId());
        petPlaceService.petPlaceBookMark(member.getId(), petPlace5.getId());

        petPlaceService.petPlaceBookMark(member2.getId(), petPlace1.getId());
        petPlaceService.petPlaceBookMark(member2.getId(), petPlace2.getId());
        petPlaceService.petPlaceBookMark(member2.getId(), petPlace3.getId());
        petPlaceService.petPlaceBookMark(member2.getId(), petPlace4.getId());

        petPlaceService.petPlaceBookMark(member3.getId(), petPlace1.getId());
        petPlaceService.petPlaceBookMark(member3.getId(), petPlace2.getId());
        petPlaceService.petPlaceBookMark(member3.getId(), petPlace3.getId());
        petPlaceService.petPlaceBookMark(member3.getId(), petPlace4.getId());

        petPlaceService.petPlaceBookMark(member4.getId(), petPlace1.getId());
        petPlaceService.petPlaceBookMark(member4.getId(), petPlace2.getId());
        petPlaceService.petPlaceBookMark(member4.getId(), petPlace3.getId());
        petPlaceService.petPlaceBookMark(member4.getId(), petPlace4.getId());

        petPlaceService.petPlaceBookMark(member5.getId(), petPlace1.getId());
        petPlaceService.petPlaceBookMark(member5.getId(), petPlace2.getId());
        petPlaceService.petPlaceBookMark(member5.getId(), petPlace3.getId());
        petPlaceService.petPlaceBookMark(member5.getId(), petPlace4.getId());

        List<PetPlace> popPetPlaceList = petPlaceService.findPopPetPlaceList();

        //then
        assertEquals(3, popPetPlaceList.size());

    }
}