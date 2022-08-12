package com.ssafy.aejimeongji.domain.service;

import com.ssafy.aejimeongji.domain.entity.GuideBook;
import com.ssafy.aejimeongji.domain.entity.Like;
import com.ssafy.aejimeongji.domain.entity.Member;
import com.ssafy.aejimeongji.domain.exception.GuideNotFoundException;
import com.ssafy.aejimeongji.domain.exception.MemberNotFoundException;
import com.ssafy.aejimeongji.domain.repository.GuideBookRepository;
import com.ssafy.aejimeongji.domain.repository.LikeRepository;
import com.ssafy.aejimeongji.domain.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class LikeService {

    private final MemberRepository memberRepository;
    private final GuideBookRepository guideBookRepository;
    private final LikeRepository likeRepository;

    // 좋아요
    public void likeGuideBook(Long memberId, Long guideId) throws IllegalArgumentException {
        if (likeRepository.existsByMemberId(memberId))
            throw new IllegalArgumentException("이미 좋아요한 가이드입니다.");
        Member findMember = memberRepository.findById(memberId).orElseThrow(() -> new MemberNotFoundException(memberId));
        GuideBook findGuideBook = guideBookRepository.findById(guideId).orElseThrow(() -> new GuideNotFoundException(guideId.toString()));
        likeRepository.save(new Like(findMember, findGuideBook));
    }

    // 좋아요 취소
    public void unlikeGuideBook(Long memberId, Long guideId) throws IllegalArgumentException {
        Like like = likeRepository.findByMemberIdAndGuideBookId(memberId, guideId).orElseThrow(() -> new IllegalArgumentException("아직 좋아요하지 않은 가이드입니다."));
        likeRepository.delete(like);
    }
}
