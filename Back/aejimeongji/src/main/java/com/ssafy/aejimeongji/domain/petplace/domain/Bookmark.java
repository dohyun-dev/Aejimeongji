package com.ssafy.aejimeongji.domain.petplace.domain;

import com.ssafy.aejimeongji.domain.member.domain.Member;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Table(name = "bookmark")
public class Bookmark {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "petplace_id")
    private PetPlace petPlace;

    public Bookmark(Member member, PetPlace petPlace) {
        this.member = member;
        this.petPlace = petPlace;
    }
}
