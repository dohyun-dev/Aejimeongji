package com.ssafy.aejimeongji.domain.service;

import com.ssafy.aejimeongji.api.dto.ScrollResponse;
import com.ssafy.aejimeongji.domain.condition.BookMarkListCondition;
import com.ssafy.aejimeongji.domain.condition.PetPlaceSearchCondition;
import com.ssafy.aejimeongji.domain.entity.Bookmark;
import com.ssafy.aejimeongji.domain.entity.PetPlace;
import com.ssafy.aejimeongji.domain.repository.BookmarkRepository;
import com.ssafy.aejimeongji.domain.repository.PetPlaceRepostiory;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Slice;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Slf4j
@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class PetPlaceService {

    private final PetPlaceRepostiory petPlaceRepostiory;

    private final BookmarkRepository bookmarkRepository;

    private final MemberService memberService;

    private final EntityManager em;

    public ScrollResponse<PetPlace> searchPetPlaceAll(PetPlaceSearchCondition condition) {
        Slice<PetPlace> result = petPlaceRepostiory.searchPetPlaceAll(condition, condition.getCurLastIdx(), PageRequest.of(0, condition.getLimit()));
        List<PetPlace> data = result.getContent();
        removeData(data);
        return new ScrollResponse(data, result.hasNext(), !data.isEmpty() ? data.get(data.size()-1).getId() : 0, condition.getLimit());
    }

    public List<PetPlace> findPetPlaceList() {
        return petPlaceRepostiory.findAll();
    }

    public PetPlace findPetPlace(Long petplaceId) {
        return petPlaceRepostiory.findById(petplaceId)
                .orElseThrow(() -> new IllegalArgumentException("해당 " + petplaceId + " 는 존재하지 않습니다."));
    }

    // 멤버 펫플레이스 북마크 목록
    public ScrollResponse<Bookmark> findAllBookMark(Long memberId, BookMarkListCondition condition) {
        log.info("{}", memberId);
        Slice<Bookmark> result = bookmarkRepository.findPetPlaceByMemberId(memberId, condition.getCurLastIdx(), PageRequest.of(0, condition.getLimit()));
        List<Bookmark> data = result.getContent();
        return new ScrollResponse<Bookmark>(data, result.hasNext(), data.get(data.size() - 1).getId(), condition.getLimit());
    }

    // 펫플레이스 북마크
    @Transactional
    public Long petPlaceBookMark(Long memberId, Long petplaceId) throws IllegalArgumentException {

        if (bookmarkRepository.findBookmarkByMemberIdAndPetPlaceId(memberId, petplaceId).isPresent()) {
            throw new IllegalArgumentException("이미 북마크 하였습니다.");
        }

        Bookmark bookmark = bookmarkRepository.save(new Bookmark(memberService.findMember(memberId), findPetPlace(petplaceId)));
        return bookmark.getId();
    }

    // 북마크 취소
    @Transactional
    public void cancelPetPlaceBookMark(Long memberId, Long petplaceId) throws IllegalArgumentException {
        Optional<Bookmark> bookmark = bookmarkRepository.findBookmarkByMemberIdAndPetPlaceId(memberId, petplaceId);
        if (bookmark.isEmpty()) {
            throw new IllegalArgumentException("아직 북마크 하지 않았습니다.");
        }
        bookmarkRepository.delete(bookmark.get());
    }

    private void removeData(List<PetPlace> data) {
        List<PetPlace> list = new ArrayList<>(data);
        if (list.size() > 1)
            list.remove(data.size()-1);
    }
}