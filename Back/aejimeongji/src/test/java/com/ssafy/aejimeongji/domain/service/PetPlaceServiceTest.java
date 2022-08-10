package com.ssafy.aejimeongji.domain.service;

import com.ssafy.aejimeongji.domain.entity.Bookmark;
import com.ssafy.aejimeongji.domain.entity.Member;
import com.ssafy.aejimeongji.domain.entity.PetPlace;
import com.ssafy.aejimeongji.domain.repository.BookmarkRepository;
import com.ssafy.aejimeongji.domain.repository.PetPlaceRepostiory;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
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


        //when
        List<PetPlace> list = petPlaceService.getNearPetPlaceList(37.0, 127.0, 100.0);

        //then
//        assertEquals(314, list.size());
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

        //when
        List<Bookmark> list = petPlaceService.findAllBookMark(member.getId());

        //then
        assertEquals(petPlace1.getName(), list.get(0).getPetPlace().getName());
    }

    @Test
    void petPlaceBookMarkTest() {
        //given
        Member member = new Member("ssafy@ssafy.com", "1234", "닉네임21", "01012341234", "닉12네임");
        em.persist(member);

        PetPlace petPlace1 = new PetPlace("펫플1", "내용", "주소"
                , "전화벊", "카테", null, "d", "d", 0.0, "d");
        em.persist(petPlace1);

        PetPlace petPlace2 = new PetPlace("펫플2", "내용", "주소"
                , "전화벊", "카테", null, "d", "d", 0.0, "d");
        em.persist(petPlace2);

        Bookmark bookmark1 = new Bookmark(member, petPlace1);
        em.persist(bookmark1);

        Bookmark bookmark2 = new Bookmark(member, petPlace2);
        em.persist(bookmark2);

        //when
        bookmarkRepository.save(bookmark1);
        bookmarkRepository.save(bookmark2);

        //then
        assertEquals(bookmark1.getId(), bookmarkRepository.findById(bookmark1.getId()).get().getId());
    }

    @Test
    void canclepetPlaceBookMarkTest() {
        //given
        Member member = new Member("ssafy@ssafy.com", "1234", "닉네임21", "01012341234", "닉12네임");
        em.persist(member);

        PetPlace petPlace1 = new PetPlace("펫플1", "내용", "주소"
                , "전화벊", "카테", null, "d", "d", 0.0, "d");
        em.persist(petPlace1);

        PetPlace petPlace2 = new PetPlace("펫플2", "내용", "주소"
                , "전화벊", "카테", null, "d", "d", 0.0, "d");
        em.persist(petPlace2);

        Bookmark bookmark1 = new Bookmark(member, petPlace1);
        em.persist(bookmark1);

        Bookmark bookmark2 = new Bookmark(member, petPlace2);
        em.persist(bookmark2);

        bookmarkRepository.save(bookmark1);
        bookmarkRepository.save(bookmark2);

        //when
        Optional<Bookmark> bookmark = bookmarkRepository.findBookmarkByMemberIdAndPetPlaceId(member.getId(), petPlace1.getId());
        Bookmark boomark = bookmark.get();
        bookmarkRepository.delete(boomark);

        //then
        Assertions.assertThrows(IllegalArgumentException.class, () -> petPlaceService.cancelPetPlaceBookMark(member.getId(), petPlace1.getId()));
    }
}