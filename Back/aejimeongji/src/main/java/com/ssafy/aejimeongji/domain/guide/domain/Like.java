package com.ssafy.aejimeongji.domain.guide.domain;

import com.ssafy.aejimeongji.domain.member.domain.Member;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@EntityListeners(AuditingEntityListener.class)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Table(name = "likes")
public class Like {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "guidebook_id")
    private GuideBook guideBook;

    @CreatedDate
    @Column(updatable = false)
    private LocalDateTime liketime;

    public Like(Member member, GuideBook guideBook) {
        this.member = member;
        this.guideBook = guideBook;
    }
}
