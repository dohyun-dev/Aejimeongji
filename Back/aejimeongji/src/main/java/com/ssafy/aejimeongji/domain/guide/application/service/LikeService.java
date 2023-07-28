package com.ssafy.aejimeongji.domain.guide.application.service;

import com.ssafy.aejimeongji.domain.common.exception.CustomError;
import com.ssafy.aejimeongji.domain.common.exception.CustomException;
import com.ssafy.aejimeongji.domain.guide.domain.GuideBook;
import com.ssafy.aejimeongji.domain.guide.domain.Like;
import com.ssafy.aejimeongji.domain.guide.domain.repository.GuideBookRepository;
import com.ssafy.aejimeongji.domain.guide.domain.repository.LikeRepository;
import com.ssafy.aejimeongji.domain.member.domain.Member;
import com.ssafy.aejimeongji.domain.member.domain.repository.MemberRepository;
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

    // 좋아요 확인
    public Boolean isGuideLiked(Long memberId, Long guideId) {
        if (likeRepository.findByMemberIdAndGuideBookId(memberId, guideId).isPresent())
            return true;
        else
            return false;
    }

    // 좋아요
    public void likeGuideBook(Long memberId, Long guideId) throws IllegalArgumentException {
        if (likeRepository.existsByMemberIdAndGuideBookId(memberId, guideId))
            throw new CustomException(CustomError.DUPLICATED_LIKE_GUIDE);

        Member findMember = memberRepository
                .findById(memberId)
                .orElseThrow(() -> new CustomException(CustomError.MEMBER_NOT_FOUND));

        GuideBook findGuideBook = guideBookRepository
                .findById(guideId)
                .orElseThrow(() -> new CustomException(CustomError.GUIDE_NOT_FOUND));

        likeRepository.save(new Like(findMember, findGuideBook));
    }

    // 좋아요 취소
    public void unlikeGuideBook(Long memberId, Long guideId) throws IllegalArgumentException {
        Like like = likeRepository
                .findByMemberIdAndGuideBookId(memberId, guideId)
                .orElseThrow(() -> new CustomException(CustomError.NOT_LIKED_GUIDE));
        likeRepository.delete(like);
    }
}
